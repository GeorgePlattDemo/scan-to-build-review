import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const STORE_PIN='4402abeb6b0299a5b6db2eec85ed04c3b0236bcc';
const root=process.env.STB_STORE_ZERO_S001_ROOT;
assert.ok(root,'STB_STORE_ZERO_S001_ROOT is required');

const store=await import(pathToFileURL(resolve(root,'store-zero-stage2-store.mjs')).href);
const catalog=store.loadCatalog();

const sandbox={window:{}};
vm.runInNewContext(readFileSync('stb-store-zero-s001.generated.js','utf8'),sandbox,{filename:'stb-store-zero-s001.generated.js'});
const browserStore=sandbox.window.STBStoreZeroS001;
assert.ok(browserStore);
assert.equal(browserStore.storePin,STORE_PIN);

const base={
  definitionVersionId:'S001-PARITY-v1',
  apertureW_in:36,
  apertureStraightH_in:24,
  arcChord_in:36,
  arcRise_in:12,
  arcRadius_in:19.5,
  tabCount:4
};

function direct(input){
  const spec={
    title:'Sarah playhouse arched opening',
    line:{
      storeSku:'STB-ZERO-PLY-050-48X96-001',
      qty:1,
      geometryClass:'CURVILINEAR',
      outerL_in:96,
      outerW_in:48,
      apertureW_in:input.apertureW_in,
      apertureStraightH_in:input.apertureStraightH_in,
      arcChord_in:input.arcChord_in,
      arcRise_in:input.arcRise_in,
      arcRadius_in:input.arcRadius_in,
      tabCount:input.tabCount,
      ...(input.routeDepthIn==null?{}:{routeDepthIn:input.routeDepthIn})
    }
  };
  return {
    evaluation:store.evaluateSheetMode2ArchedJob(catalog,spec),
    estimate:store.estimateSheetMode2ArchedJob(catalog,{
      title:spec.title,
      line:{storeSku:spec.line.storeSku,qty:1}
    })
  };
}

const unresolvedBrowser=browserStore.evaluate(base);
const unresolvedDirect=direct(base);
assert.equal(unresolvedBrowser.rawEvaluation.status,unresolvedDirect.evaluation.status,'S-001 no-depth browser/Store disposition drift');
assert.equal(unresolvedBrowser.rawEvaluation.status,'UNRESOLVED');
assert.ok(unresolvedBrowser.rawEvaluation.line.capability.unresolved.includes('ROUTE_DEPTH_UNRESOLVED'),'S-001 active definition must retain ROUTE_DEPTH_UNRESOLVED');
assert.equal(unresolvedBrowser.rawEstimate.Q,unresolvedDirect.estimate.Q);
assert.equal(unresolvedBrowser.rawEstimate.Q,26.55);
assert.equal(unresolvedBrowser.rawEstimate.processQ_status,'UNRESOLVED');
assert.equal(unresolvedBrowser.request.line.routeDepthIn,undefined);
assert.equal(unresolvedBrowser.physicalExecutionAuthorized,false);

const complete={...base,definitionVersionId:'S001-PARITY-v2',routeDepthIn:0.5};
const completeBrowser=browserStore.evaluate(complete);
const completeDirect=direct(complete);
assert.equal(completeBrowser.rawEvaluation.status,completeDirect.evaluation.status,'S-001 depth-complete browser/Store disposition drift');
assert.equal(completeBrowser.rawEvaluation.status,'SUPPORTABLE');
assert.equal(
  completeBrowser.rawEvaluation.line.capability.retention.requestedTabCount,
  completeDirect.evaluation.line.capability.retention.requestedTabCount
);
assert.equal(
  completeBrowser.rawEvaluation.line.capability.retention.plannedTabCount,
  completeDirect.evaluation.line.capability.retention.plannedTabCount
);
assert.equal(completeBrowser.rawEvaluation.line.capability.retention.requestedTabCount,4);
assert.equal(completeBrowser.rawEvaluation.line.capability.retention.plannedTabCount,5);
assert.equal(completeBrowser.rawEstimate.Q,26.55);

console.log('PASS · generated S-001 browser Store matches exact pinned Store behavior');
