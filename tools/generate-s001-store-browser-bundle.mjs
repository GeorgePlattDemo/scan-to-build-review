import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const EXPECTED_PIN="4402abeb6b0299a5b6db2eec85ed04c3b0236bcc";
const pin=EXPECTED_PIN;
const root=resolve(process.env.STB_STORE_ZERO_S001_ROOT||"");
if(!process.env.STB_STORE_ZERO_S001_ROOT) throw new Error("STB_STORE_ZERO_S001_ROOT is required");
const actualPin=execFileSync("git",["-C",root,"rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(actualPin!==EXPECTED_PIN) throw new Error(`Store pin mismatch: expected ${EXPECTED_PIN}, got ${actualPin}`);
const files={"s001-mode2-envelope.mjs":"s001-mode2-envelope.mjs","circular-segment.mjs":"circular-segment.mjs","stencil-tab-policy.mjs":"stencil-tab-policy.mjs","s001-mode2-arched.mjs":"s001-mode2-arched.mjs","store-zero-stage2-store.mjs":"store-zero-stage2-store.mjs","store-zero-catalog.json":"store-zero-catalog.json"};
const source=Object.fromEntries(Object.entries(files).map(([k,name])=>[k,readFileSync(join(root,name),"utf8")]));
const blobs=Object.fromEntries(Object.entries(files).map(([k,name])=>[k,execFileSync("git",["-C",root,"hash-object",name],{encoding:"utf8"}).trim()]));

function stripImports(s){
  return s.replace(/import[\s\S]*?from\s+["'][^"']+["'];\s*/g,"");
}
function plain(s){ return stripImports(s).replace(/\bexport\s+/g,""); }
function storeTransform(s){
  let x=stripImports(s);
  x=x.replace(/export\s+\{\s*estimateJob,\s*estimatePineAlcove\s*\};\s*/g,"");
  x=x.replace(/\bexport\s+/g,"");
  const a=x.indexOf("const ROOT =");
  const b=x.indexOf("function findSku",a);
  if(a<0||b<0) throw new Error("Store transform root bounds missing");
  x=x.slice(0,a)+`function loadCatalog(){ return CATALOG; }
function loadObservations(){ return { clock: CATALOG.clock || null, observations: [] }; }

`+x.slice(b);
  const tail=x.lastIndexOf("\n{\n  evaluateSheetMode2,");
  if(tail>=0) x=x.slice(0,tail);
  return x;
}
function buildBundle(source,ids){
  const catalog=JSON.stringify(JSON.parse(source["store-zero-catalog.json"]));
  return `/* GENERATED FILE — DO NOT HAND EDIT.
Source: GeorgePlattDemo/scan-to-build-store@${pin}
Generator: tools/generate-s001-store-browser-bundle.mjs
Exact Store S-001 reference evaluator. No commercial or physical authority.
*/
(function(root){
"use strict";
const STORE_PIN=${JSON.stringify(pin)};
const SOURCE_BLOBS=Object.freeze(${JSON.stringify(ids)});
const CATALOG=Object.freeze(${catalog});

${plain(source["s001-mode2-envelope.mjs"])}

${plain(source["circular-segment.mjs"])}

${plain(source["stencil-tab-policy.mjs"])}

${plain(source["s001-mode2-arched.mjs"])}

${storeTransform(source["store-zero-stage2-store.mjs"])}

function evaluateS001(input){
  input=input||{};
  const request={
    title:input.title||"Sarah playhouse arched opening",
    line:{
      storeSku:"STB-ZERO-PLY-050-48X96-001",
      qty:1,
      geometryClass:"CURVILINEAR",
      outerL_in:96,
      outerW_in:48,
      apertureW_in:Number(input.apertureW_in),
      apertureStraightH_in:Number(input.apertureStraightH_in),
      arcChord_in:Number(input.arcChord_in),
      arcRise_in:Number(input.arcRise_in),
      arcRadius_in:Number(input.arcRadius_in),
      tabCount:Number(input.tabCount),
      ...(input.routeDepthIn==null?{}:{routeDepthIn:Number(input.routeDepthIn)})
    }
  };
  const rawEvaluation=evaluateSheetMode2ArchedJob(CATALOG,request);
  const rawEstimate=estimateSheetMode2ArchedJob(CATALOG,{
    title:request.title,
    line:{storeSku:request.line.storeSku,qty:1}
  });
  return Object.freeze({
    protocol:"stb.browser-s001-store-reference/0.1",
    storePin:STORE_PIN,
    sourceBlobs:SOURCE_BLOBS,
    definitionVersionId:input.definitionVersionId||null,
    request:Object.freeze(JSON.parse(JSON.stringify(request))),
    rawEvaluation,
    rawEstimate,
    physicalExecutionAuthorized:false
  });
}
root.STBStoreZeroS001=Object.freeze({
  version:"0.1",
  storePin:STORE_PIN,
  sourceBlobs:SOURCE_BLOBS,
  capabilityId:S001_MODE2_ARCHED_ENVELOPE.capabilityId,
  envelopeId:S001_MODE2_ARCHED_ENVELOPE.id,
  evaluate:evaluateS001
});
})(window);
`;
}

const output=buildBundle(source,blobs);
const outPath=resolve(process.argv.find(arg=>arg.endsWith(".js"))||"stb-store-zero-s001.generated.js");
if(process.argv.includes("--check")){
  if(readFileSync(outPath,"utf8")!==output) throw new Error("generated S-001 browser Store bundle is stale");
}else{
  writeFileSync(outPath,output);
}
console.log(JSON.stringify({storePin:EXPECTED_PIN,sourceBlobs:blobs,outPath},null,2));
