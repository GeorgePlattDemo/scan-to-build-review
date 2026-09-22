import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const EXPECTED_PIN="bc1a77297df752e32fb3687acc883a629c0b5b13";
const pin=EXPECTED_PIN;
const root=resolve(process.env.STB_STORE_ZERO_ROOT||"");
if(!process.env.STB_STORE_ZERO_ROOT) throw new Error("STB_STORE_ZERO_ROOT is required");
const actualPin=execFileSync("git",["-C",root,"rev-parse","HEAD"],{encoding:"utf8"}).trim();
if(actualPin!==EXPECTED_PIN) throw new Error(`Store pin mismatch: expected ${EXPECTED_PIN}, got ${actualPin}`);
const files={"envelope":"d001-stage2-envelope.mjs","pricing":"store-zero-pricing-engine.mjs","store":"store-zero-stage2-store.mjs","catalog":"store-zero-catalog.json"};
const src=Object.fromEntries(Object.entries(files).map(([k,name])=>[k,readFileSync(join(root,name),"utf8")]));
const blobs=Object.fromEntries(Object.entries(files).map(([k,name])=>[k,execFileSync("git",["-C",root,"hash-object",name],{encoding:"utf8"}).trim()]));

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

function unique(values){ return Array.from(new Set(values.filter(value=>typeof value==="string"&&value))); }

function collectMaterialUnresolved(materialResolution){
  return unique([
    ...((materialResolution&&materialResolution.plan&&materialResolution.plan.unresolvedConditions)||[]),
    ...((materialResolution&&materialResolution.capability&&materialResolution.capability.unresolved)||[])
  ]);
}

function evaluateUser1Reference(input){
  input=input||{};
  const finishedPartLengthIn=Number(input.finishedPartLengthIn);
  const quantity=Number(input.quantity);
  const sawAngleDeg=Number(input.sawAngleDeg);
  const drillCycles=Number(input.drillCycles||0);
  const drillDepthIn=input.drillDepthIn==null?null:Number(input.drillDepthIn);
  const requiredOps=Array.isArray(input.requiredOps)?input.requiredOps.slice():[];
  const spotDemand=input.spotDemand&&typeof input.spotDemand==="object"?JSON.parse(JSON.stringify(input.spotDemand)):null;
  const materialDemand=Object.assign({species:"spf",form:"board",nominalT:2,nominalW:4},input.materialDemand||{});

  const materialResolution=resolveBoardMaterial(CATALOG,{
    ...materialDemand,
    finishedPartLengthIn,
    quantity,
    requiredOps,
    sawAngleDeg,
    cutPlane:input.cutPlane,
    endIdentity:input.endIdentity,
    endRelation:input.endRelation,
    lengthDatum:input.lengthDatum,
    spotDemand
  });
  const item=materialResolution&&materialResolution.item?materialResolution.item:null;
  const capability=materialResolution&&materialResolution.capability?materialResolution.capability:null;
  const title="User-defined Board · "+quantity+" × "+finishedPartLengthIn+" in finished member"+(quantity===1?"":"s");
  const rawEvaluation={
    title,stage:2,store:"Store Zero",
    status:materialResolution&&materialResolution.status==="MAPPED"
      ? ((capability&&capability.status)||"UNRESOLVED")
      : ((materialResolution&&materialResolution.status)||"UNRESOLVED"),
    lines:item?[{
      storeSku:item.storeSku,
      qty:materialResolution.parentCount||1,
      stock:materialResolution.stock||null,
      price:materialResolution.price||null,
      capability
    }]:[],
    materialResolution,
    estimate:null,
    not_claimed:["live ERP","Cycle Start","physical stock allocation","commercial quote"]
  };

  const spotCycles=spotDemand&&spotDemand.required!==false
    ? Number(spotDemand.totalCount!=null?spotDemand.totalCount:(spotDemand.countPerPart||0))
    : 0;
  let rawEstimate=null;
  let estimateInput=null;
  if(item&&materialResolution.plan&&(rawEvaluation.status==="SUPPORTABLE"||rawEvaluation.status==="UNRESOLVED")){
    estimateInput={
      title,
      classId:"app.user-defined-board.v1",
      plan:materialResolution.plan,
      spotCycles:Number.isFinite(spotCycles)?Math.max(0,spotCycles):0
    };
    rawEstimate=estimateResolvedBoardPlan(CATALOG,materialResolution,{
      title,
      classId:"app.user-defined-board.v1",
      spotCycles:estimateInput.spotCycles
    });
  }

  const spotOperation=spotDemand?Object.freeze({
    operation:D001_STAGE2_ENVELOPE.spot.operation,
    operationContract:D001_STAGE2_ENVELOPE.spot.operationContract,
    toolDefinitionId:D001_STAGE2_ENVELOPE.spot.toolDefinitionId,
    toolDiameterIn:D001_STAGE2_ENVELOPE.spot.toolDiameterIn,
    fullDiameterPenetrationIn:D001_STAGE2_ENVELOPE.spot.fullDiameterPenetrationIn,
    depthReference:D001_STAGE2_ENVELOPE.spot.depthReference,
    pointAngleDeg:D001_STAGE2_ENVELOPE.spot.pointAngleDeg,
    pointAxialLengthIn:D001_STAGE2_ENVELOPE.spot.pointAxialLengthIn,
    pointGeometryStatus:D001_STAGE2_ENVELOPE.spot.pointGeometryStatus,
    totalTipPenetrationIn:D001_STAGE2_ENVELOPE.spot.totalTipPenetrationIn,
    customerDepthProgrammingRequired:D001_STAGE2_ENVELOPE.spot.customerDepthProgrammingRequired
  }):null;

  const materialUnresolved=collectMaterialUnresolved(materialResolution);
  const estimateUnresolved=Array.isArray(rawEstimate&&rawEstimate.unresolved)?rawEstimate.unresolved:[];
  const unresolvedConditions=unique([
    ...(input.unresolvedConditions||[]),
    ...materialUnresolved,
    ...estimateUnresolved
  ]);
  const refusalConditions=unique([
    ...((materialResolution&&materialResolution.refusalConditions)||[]),
    ...((capability&&capability.missing)||[])
  ]);

  return Object.freeze({
    protocol:"stb.browser-store-reference/0.3",
    storePin:STORE_PIN,
    sourceBlobs:SOURCE_BLOBS,
    definitionVersionId:input.definitionVersionId||null,
    materialResolution:Object.freeze({
      status:(materialResolution&&materialResolution.status)||null,
      reason:(materialResolution&&materialResolution.reason)||null,
      unresolvedConditions:Object.freeze(materialUnresolved.slice()),
      storeSku:(materialResolution&&materialResolution.pricingReferenceSku)||null,
      stockLengthIn:(materialResolution&&materialResolution.pricingReferenceStockLengthIn)||null,
      pricingReferenceSku:(materialResolution&&materialResolution.pricingReferenceSku)||null,
      pricingReferenceStockLengthIn:(materialResolution&&materialResolution.pricingReferenceStockLengthIn)||null,
      parentCount:(materialResolution&&materialResolution.parentCount)||null,
      unitPrice:item&&Number.isFinite(Number(item.sellingPrice))?Number(item.sellingPrice):null,
      materialTotal:rawEstimate&&rawEstimate.totals?rawEstimate.totals.material:null,
      cellFamily:Object.freeze(item&&Array.isArray(item.cellFamily)?item.cellFamily.slice():[]),
      supportedOps:Object.freeze(item&&Array.isArray(item.supportedOps)?item.supportedOps.slice():[]),
      source:Object.freeze({repository:"GeorgePlattDemo/scan-to-build-store",pin:STORE_PIN,clock:CATALOG.clock||null}),
      allocationClaimed:false,
      finishedPartLengthIn,
      finishedPartQuantity:quantity,
      selectionPolicy:(materialResolution&&materialResolution.selectionPolicy)||null,
      plan:(materialResolution&&materialResolution.plan)||null
    }),
    rawEvaluation,
    rawEstimate,
    priceCompleteness:Object.freeze({
      status:rawEstimate?(unresolvedConditions.length?"PARTIAL":"COMPLETE_FOR_ENCODED_DEMAND"):"UNAVAILABLE",
      unresolvedConditions:Object.freeze(unresolvedConditions.slice())
    }),
    refusalConditions:Object.freeze(refusalConditions),
    mappedCallInputs:Object.freeze({
      evaluation:Object.freeze({
        finishedPartDemand:Object.freeze({
          lengthIn:finishedPartLengthIn,
          quantity,
          lengthDatum:input.lengthDatum||null,
          sawAngleDeg,
          cutPlane:input.cutPlane||null,
          endIdentity:input.endIdentity||null,
          endRelation:input.endRelation||null
        }),
        materialDemand:Object.freeze({...materialDemand}),
        requiredOps:Object.freeze(requiredOps.slice()),
        spotDemand:spotDemand?Object.freeze(spotDemand):null
      }),
      estimate:estimateInput?Object.freeze(estimateInput):null,
      definition:Object.freeze({
        materialSource:"STORE_SELECTED",
        materialDemand:Object.freeze({...materialDemand}),
        finishedPartLengthIn,
        finishedPartQuantity:quantity,
        sawAngleDeg,
        drillCycles,
        drillDepthIn,
        cutPlane:input.cutPlane||null,
        endIdentity:input.endIdentity||null,
        endRelation:input.endRelation||null,
        lengthDatum:input.lengthDatum||null,
        spotDemand:spotDemand?Object.freeze(spotDemand):null,
        spotOperation,
        selectedParentPlan:(materialResolution&&materialResolution.plan)||null,
        unresolvedConditions:Object.freeze(unresolvedConditions.slice())
      })
    }),
    attributedBasis:Object.freeze({
      pricingEngine:Object.freeze({id:ENGINE.id,version:ENGINE.version,clock:ENGINE.clock||null}),
      cycleModel:Object.freeze({id:CYCLE_MODEL.id,basis:CYCLE_MODEL.basis,measured:CYCLE_MODEL.measured===true,commissioned:CYCLE_MODEL.commissioned===true}),
      envelope:Object.freeze({
        id:D001_STAGE2_ENVELOPE.id,
        basis:D001_STAGE2_ENVELOPE.basis,
        measured:D001_STAGE2_ENVELOPE.measured===true,
        commissioned:D001_STAGE2_ENVELOPE.commissioned===true,
        spot:spotOperation
      })
    }),
    physicalExecutionAuthorized:false
  });
}

root.STBStoreZeroUser1=Object.freeze({
  version:"0.3",
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
