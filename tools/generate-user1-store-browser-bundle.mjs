import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const EXPECTED_PIN="ab8a4c5d470c310f27fef82683611622ab976168";
const pin=EXPECTED_PIN;
const root=resolve(process.env.STB_STORE_ZERO_ROOT||"");
if(!process.env.STB_STORE_ZERO_ROOT) throw new Error("STB_STORE_ZERO_ROOT is required");
const actualPin=execFileSync("git",["-C",root,"rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(actualPin!==EXPECTED_PIN) throw new Error(`Store pin mismatch: expected ${EXPECTED_PIN}, got ${actualPin}`);

const files={
  envelope:"d001-stage2-envelope.mjs",
  pricing:"store-zero-pricing-engine.mjs",
  store:"store-zero-stage2-store.mjs",
  catalog:"store-zero-catalog.json"
};
const src=Object.fromEntries(Object.entries(files).map(([k,name])=>[k,readFileSync(join(root,name),"utf8")]));
const blobs=Object.fromEntries(Object.entries(files).map(([k,name])=>[
  k,
  execFileSync("git",["-C",root,"hash-object",name],{encoding:"utf8"}).trim()
]));

function transformEnvelope(s){return s.replace(/^import .*;\s*$/gm,"").replace(/\bexport\s+/g,"");}
function transformPricing(s){return s.replace(/^import .*;\s*$/gm,"").replace(/\bexport\s+/g,"");}
function transformStore(s){
  let x=s.replace(/^import .*;\s*$/gm,"");
  const a=x.indexOf("const ROOT =");
  const b=x.indexOf("export function findSku");
  if(a<0||b<0) throw new Error("Store source layout changed");
  x=x.slice(0,a)+`function loadCatalog(){ return CATALOG; }
function loadObservations(){ return { clock: CATALOG.clock || null, observations: [] }; }

`+x.slice(b);
  return x.replace(/\bexport\s+/g,"");
}
function buildBundle(src,blobIds){
  const catalog=JSON.stringify(JSON.parse(src.catalog));
  return `/* GENERATED FILE — DO NOT HAND EDIT.
Source: GeorgePlattDemo/scan-to-build-store@${pin}
Generator: tools/generate-user1-store-browser-bundle.mjs
This browser package carries Store evaluation/economics only. It grants no physical authority.
*/
(function(root){
"use strict";
const STORE_PIN=${JSON.stringify(pin)};
const SOURCE_BLOBS=Object.freeze(${JSON.stringify(blobIds)});
const CATALOG=Object.freeze(${catalog});

${transformEnvelope(src.envelope)}

${transformPricing(src.pricing)}

${transformStore(src.store)}

function collectMaterialUnresolved(materialResolution){
  const reasons=[];
  const add=value=>{ if(typeof value==="string"&&value) reasons.push(value); };
  if(!materialResolution||materialResolution.status!=="UNRESOLVED") return reasons;
  add(materialResolution.reason);
  (materialResolution.unresolved||[]).forEach(add);
  (materialResolution.considered||[]).forEach(entry=>{
    ((entry&&entry.capability&&entry.capability.unresolved)||[]).forEach(add);
  });
  return Array.from(new Set(reasons));
}

function evaluateUser1Reference(input){
  input=input||{};
  const workpiece=Number(input.definedWorkpieceLengthIn);
  const sawAngleDeg=Number(input.sawAngleDeg);
  const sawCuts=Number(input.sawCuts);
  const drillCycles=Number(input.drillCycles||0);
  const drillDepthIn=input.drillDepthIn==null?null:Number(input.drillDepthIn);
  const requiredOps=Array.isArray(input.requiredOps)?input.requiredOps.slice():[];
  const spotDemand=input.spotDemand&&typeof input.spotDemand==="object"?JSON.parse(JSON.stringify(input.spotDemand)):null;
  const materialDemand=Object.assign({species:"spf",form:"board",nominalT:2,nominalW:4},input.materialDemand||{});

  const materialResolution=resolveBoardMaterial(CATALOG,{
    ...materialDemand,
    definedWorkpieceLengthIn:workpiece,
    qty:1,
    requiredOps,
    sawAngleDeg,
    cutPlane:input.cutPlane,
    spotDemand
  });
  const item=materialResolution&&materialResolution.item?materialResolution.item:null;
  const title="User-defined Board · "+workpiece+" in workpiece";
  const evaluateInput=item?{
    title,
    lines:[{
      storeSku:item.storeSku,
      qty:1,
      requiredOps,
      keptLengthIn:workpiece,
      sawAngleDeg,
      cutPlane:input.cutPlane,
      spotDemand
    }]
  }:null;
  const rawEvaluation=evaluateInput?evaluateJob(CATALOG,evaluateInput):{
    title,stage:2,store:"Store Zero",
    status:(materialResolution&&materialResolution.status)||"UNRESOLVED",
    lines:[],materialResolution,estimate:null
  };

  let estimateInput=null,rawEstimate=null;
  if(rawEvaluation.status==="SUPPORTABLE"&&item){
    const radians=(sawAngleDeg*Math.PI)/180;
    const sawTraverseIn=sawAngleDeg>0?item.actualW/Math.cos(radians):item.actualW;
    const spotCycles=spotDemand&&spotDemand.required!==false
      ? Number(spotDemand.totalCount!=null?spotDemand.totalCount:(spotDemand.countPerPart||0))
      : 0;
    estimateInput={
      title,
      classId:"app.user-defined-board.v1",
      pieces:[{
        storeSku:item.storeSku,
        qty:1,
        keptLengthIn:workpiece,
        widthIn:item.actualW,
        sawCuts,
        sawTraverseIn,
        holes:drillCycles,
        spots:Number.isFinite(spotCycles)?Math.max(0,spotCycles):0,
        depthIn:drillCycles>0?drillDepthIn:0
      }]
    };
    rawEstimate=estimateJob(CATALOG,estimateInput);
  }

  const capabilityUnresolved=(rawEvaluation.lines||[]).flatMap(entry=>
    entry&&entry.capability&&Array.isArray(entry.capability.unresolved)?entry.capability.unresolved:[]
  );
  const materialUnresolved=collectMaterialUnresolved(materialResolution);
  const unresolvedConditions=Array.from(new Set([...(input.unresolvedConditions||[]),...materialUnresolved,...capabilityUnresolved]));
  const refusalConditions=(rawEvaluation.lines||[]).flatMap(entry=>
    entry&&entry.capability&&Array.isArray(entry.capability.missing)?entry.capability.missing:[]
  );

  return Object.freeze({
    protocol:"stb.browser-store-reference/0.1",
    storePin:STORE_PIN,
    sourceBlobs:SOURCE_BLOBS,
    definitionVersionId:input.definitionVersionId||null,
    materialResolution:Object.freeze({
      status:(materialResolution&&materialResolution.status)||null,
      reason:(materialResolution&&materialResolution.reason)||null,
      unresolvedConditions:Object.freeze(materialUnresolved.slice()),
      pricingReferenceSku:(materialResolution&&materialResolution.pricingReferenceSku)||null,
      pricingReferenceStockLengthIn:(materialResolution&&materialResolution.pricingReferenceStockLengthIn)||null,
      allocationClaimed:false,
      workpieceLengthIn:workpiece
    }),
    rawEvaluation,
    rawEstimate,
    priceCompleteness:Object.freeze({
      status:rawEstimate?(unresolvedConditions.length?"PARTIAL":"COMPLETE_FOR_ENCODED_DEMAND"):"UNAVAILABLE",
      unresolvedConditions:Object.freeze(unresolvedConditions.slice())
    }),
    refusalConditions:Object.freeze(Array.from(new Set(refusalConditions))),
    mappedCallInputs:Object.freeze({
      evaluation:evaluateInput,
      estimate:estimateInput,
      definition:Object.freeze({
        materialDemand:Object.freeze({...materialDemand}),
        definedWorkpieceLengthIn:workpiece,
        productionSawCuts:sawCuts,
        totalModeledSawCuts:sawCuts,
        sawAngleDeg,
        drillCycles,
        drillDepthIn,
        cutPlane:input.cutPlane||null,
        endIdentity:input.endIdentity||null,
        endRelation:input.endRelation||null,
        lengthDatum:input.lengthDatum||null,
        spotDemand:spotDemand?Object.freeze(spotDemand):null,
        unresolvedConditions:Object.freeze(unresolvedConditions.slice())
      })
    }),
    attributedBasis:Object.freeze({
      pricingEngine:Object.freeze({id:ENGINE.id,version:ENGINE.version,clock:ENGINE.clock||null}),
      cycleModel:Object.freeze({id:CYCLE_MODEL.id,basis:CYCLE_MODEL.basis,measured:CYCLE_MODEL.measured===true,commissioned:CYCLE_MODEL.commissioned===true}),
      envelope:Object.freeze({id:D001_STAGE2_ENVELOPE.id,basis:D001_STAGE2_ENVELOPE.basis,measured:D001_STAGE2_ENVELOPE.measured===true,commissioned:D001_STAGE2_ENVELOPE.commissioned===true})
    }),
    physicalExecutionAuthorized:false
  });
}

root.STBStoreZeroUser1=Object.freeze({
  version:"0.1",
  storePin:STORE_PIN,
  sourceBlobs:SOURCE_BLOBS,
  envelopeId:D001_STAGE2_ENVELOPE.id,
  pricingEngine:Object.freeze({id:ENGINE.id,version:ENGINE.version}),
  offerings:Object.freeze(CATALOG.offerings.slice()),
  evaluate:evaluateUser1Reference
});
})(window);
`;
}
const output=buildBundle(src,blobs);
const outPath=resolve(process.argv.find(arg=>arg.endsWith(".js"))||"stb-store-zero-user1.generated.js");
if(process.argv.includes("--check")){
  if(readFileSync(outPath,"utf8")!==output) throw new Error("generated browser Store bundle is stale");
}else{
  writeFileSync(outPath,output);
}
console.log(JSON.stringify({storePin:EXPECTED_PIN,sourceBlobs:blobs,outPath},null,2));
