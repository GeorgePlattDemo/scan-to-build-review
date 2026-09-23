import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const bridge = fs.readFileSync(new URL('../stb-user-defined-board-runtime-bridge.js',import.meta.url),'utf8');
const runtimeConfig = JSON.parse(fs.readFileSync(new URL('../stb-store-runtime.json',import.meta.url),'utf8'));
if (!runtimeConfig.jobEndpoint) throw new Error('public Store runtime endpoint is not configured');
const reviewOrigin = 'https://georgeplattdemo.github.io';

function demand(finishedLengthIn){
  const angleDeg=Math.asin(8/finishedLengthIn)*180/Math.PI;
  const center=finishedLengthIn/2;
  const version=Math.abs(finishedLengthIn-16)<1e-9 ? '0.1' : Math.abs(finishedLengthIn-18)<1e-9 ? '0.2' : 'review-intermediate-'+finishedLengthIn.toFixed(3);
  return {
    configurationId:'SYO-USER1-XBRACE',
    configurationVersion:version,
    definedWorkpieceLengthIn:60,
    sawAngleDeg:angleDeg,
    cutPlane:'miter-face',
    endIdentity:'both',
    endRelation:'parallel',
    lengthDatum:'long-long-outer-edge',
    datumCMethod:'REFERENCE_CUT',
    requiredOps:['MITER_LIMITED','SPOT_ON_LOCATION'],
    declaredSawCuts:3,
    declaredSpotCount:2,
    parts:[1,2].map(number=>({
      partId:'PART-'+number,
      lengthIn:finishedLengthIn,
      features:[{
        featureId:'SPOT-'+number,
        kind:'SPOT_ON_LOCATION',
        xIn:center,
        locationRule:'CENTERED_ON_PART',
        acrossWidthRule:'CENTERED_ON_WIDE_FACE'
      }]
    }))
  };
}

test('Start Own sends 16, 17, and 18 in definitions to public Store Zero', async () => {
  const context=vm.createContext({
    URL,crypto,TextEncoder,AbortSignal,
    window:{location:{hostname:'georgeplattdemo.github.io'}},
    document:{currentScript:{src:'https://georgeplattdemo.github.io/scan-to-build-review/stb-user-defined-board-runtime-bridge.js'}},
    fetch:async (url,options={}) => {
      if(String(url).endsWith('/stb-store-runtime.json')) return Response.json(runtimeConfig);
      return fetch(url,{...options,headers:{...options.headers,Origin:reviewOrigin}});
    }
  });
  vm.runInContext(bridge,context);
  const runtime=context.window.STBUserDefinedBoardRuntimeBridge;
  assert.ok(runtime);

  const sixteen=await runtime.request(demand(16),{requestId:'PUBLIC-USER1-16',candidateRevisionId:'USER1-16'});
  const seventeen=await runtime.request(demand(17),{requestId:'PUBLIC-USER1-17',candidateRevisionId:'USER1-17'});
  const eighteen=await runtime.request(demand(18),{requestId:'PUBLIC-USER1-18',candidateRevisionId:'USER1-18'});

  for(const [answer,id] of [[sixteen,'PUBLIC-USER1-16'],[seventeen,'PUBLIC-USER1-17'],[eighteen,'PUBLIC-USER1-18']]){
    assert.equal(answer.storePin,'39a1b318063f62220c9c20c42200389098e0c687');
    assert.equal(answer.rawEvaluation.status,'SUPPORTABLE');
    assert.equal(answer.rawEvaluation.freshEvaluation,true);
    assert.equal(answer.evaluationReceipt.requestId,id);
    assert.equal(answer.evaluationReceipt.freshnessRule,'STB-STORE-FRESH-EVALUATION-0.1');
    assert.equal(answer.priceCompleteness.status,'COMPLETE_FOR_TRAVEL_STANDARD');
    assert.equal(answer.rawEstimate.complete,true);
    assert.ok(answer.rawEstimate.totals.Q>0);
  }

  assert.equal(sixteen.materialResolution.pricingReferenceSku,'STB-ZERO-SPF-2X4-60-001');
  assert.equal(sixteen.materialResolution.pricingReferenceStockLengthIn,60);
  assert.equal(sixteen.rawEstimate.totals.material,2.61);
  assert.equal(sixteen.rawEstimate.totals.machine_service,5.89);
  assert.equal(sixteen.rawEstimate.totals.Q,8.50);
  assert.equal(sixteen.rawEstimate.travel.finalRemainderIn,27.625);

  assert.equal(eighteen.materialResolution.pricingReferenceSku,'STB-ZERO-SPF-2X4-72-001');
  assert.equal(eighteen.materialResolution.pricingReferenceStockLengthIn,72);
  assert.equal(eighteen.rawEstimate.totals.Q,9.03);
  assert.equal(eighteen.rawEstimate.travel.finalRemainderIn,35.625);

  assert.equal(seventeen.materialResolution.requestedDefinedWorkpieceLengthIn,60);
  assert.ok(Number.isFinite(seventeen.rawEstimate.travel.finalRemainderIn));

  assert.notEqual(sixteen.evaluationReceipt.receiptHash,seventeen.evaluationReceipt.receiptHash);
  assert.notEqual(seventeen.evaluationReceipt.receiptHash,eighteen.evaluationReceipt.receiptHash);

  for(const forbidden of ['sellingPrice','machineHourRate','setupCharge','parentLengthIn','storeSku:']){
    assert.equal(bridge.includes(forbidden),false,'runtime bridge contains Store decision logic: '+forbidden);
  }

  console.log(JSON.stringify({
    sixteen:{sku:sixteen.materialResolution.pricingReferenceSku,Q:sixteen.rawEstimate.totals.Q},
    seventeen:{sku:seventeen.materialResolution.pricingReferenceSku,Q:seventeen.rawEstimate.totals.Q},
    eighteen:{sku:eighteen.materialResolution.pricingReferenceSku,Q:eighteen.rawEstimate.totals.Q}
  }));
});
