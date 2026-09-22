(function(root){
  "use strict";

  const VERSION = "STB-JOB1-SIMULATED-FULFILLMENT-0.1";

  const ACTIONS = Object.freeze({
    STORE_ACCEPT_AS_ASKED:"STORE_ACCEPT_AS_ASKED",
    STORE_RETURN_FOR_MODIFICATION:"STORE_RETURN_FOR_MODIFICATION",
    STORE_DECLINE:"STORE_DECLINE",
    CUSTOMER_ACCEPT_OFFER:"CUSTOMER_ACCEPT_OFFER",
    CUSTOMER_DECLINE_OFFER:"CUSTOMER_DECLINE_OFFER",
    SIMULATE_PURCHASE:"SIMULATE_PURCHASE",
    STORE_ALLOCATE:"STORE_ALLOCATE",
    STORE_RELEASE:"STORE_RELEASE",
    STORE_QUEUE:"STORE_QUEUE",
    LOCAL_READY:"LOCAL_READY",
    LOCAL_CYCLE_START:"LOCAL_CYCLE_START",
    COMPLETE_OPERATIONS:"COMPLETE_OPERATIONS",
    INSPECTION_PASS:"INSPECTION_PASS",
    LABELS_COMPLETE:"LABELS_COMPLETE",
    STAGE_JOB:"STAGE_JOB",
    ISSUE_READY:"ISSUE_READY",
    RECORD_PICKUP:"RECORD_PICKUP",
    CLOSE_JOB:"CLOSE_JOB"
  });

  const YARD_SEQUENCE = Object.freeze([
    ACTIONS.STORE_ALLOCATE,
    ACTIONS.STORE_RELEASE,
    ACTIONS.STORE_QUEUE,
    ACTIONS.LOCAL_READY,
    ACTIONS.LOCAL_CYCLE_START,
    ACTIONS.COMPLETE_OPERATIONS,
    ACTIONS.INSPECTION_PASS,
    ACTIONS.LABELS_COMPLETE,
    ACTIONS.STAGE_JOB,
    ACTIONS.ISSUE_READY
  ]);

  function clone(value){
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function requiredString(value,name){
    if(typeof value !== "string" || !value.trim()) throw new Error(name+"_REQUIRED");
    return value;
  }

  function requiredFinite(value,name){
    const n=Number(value);
    if(!Number.isFinite(n)) throw new Error(name+"_REQUIRED");
    return n;
  }

  function eventId(state,type){
    return "SIM-"+String(state.events.length+1).padStart(3,"0")+"-"+type;
  }

  function addEvent(state,type,detail){
    state.events.push(Object.freeze({
      eventId:eventId(state,type),
      type,
      basis:"SIMULATED_REFERENCE_EVENT",
      authority:"SIMULATION_ONLY",
      jobId:state.identity.jobId,
      versionId:state.identity.versionId,
      storePin:state.identity.storePin,
      inputHash:state.identity.inputHash,
      resultHash:state.identity.resultHash,
      detail:clone(detail||{})
    }));
  }

  function create(seed){
    const identity=Object.freeze({
      jobId:requiredString(seed?.jobId,"JOB_ID"),
      versionId:requiredString(seed?.versionId,"VERSION_ID"),
      storePin:requiredString(seed?.storePin,"STORE_PIN"),
      inputHash:requiredString(seed?.inputHash,"INPUT_HASH"),
      resultHash:requiredString(seed?.resultHash,"RESULT_HASH")
    });
    const q=requiredFinite(seed?.q,"Q");
    const modeledCycleMin=requiredFinite(seed?.modeledCycleMin,"MODELED_CYCLE_MIN");

    const state={
      engineVersion:VERSION,
      simulation:true,
      liveCommerce:false,
      liveMotion:false,
      identity,
      economics:{
        q,
        modeledCycleMin,
        documentKind:"BudgetaryEstimate",
        basis:"STORE_RETURNED_REFERENCE"
      },
      storeReview:"PENDING",
      offer:null,
      acceptance:null,
      settlement:null,
      allocation:null,
      productionRelease:null,
      queue:null,
      machineReadiness:null,
      cycleStart:null,
      operations:null,
      inspection:null,
      labels:null,
      staging:null,
      ready:null,
      custody:null,
      closeout:null,
      events:[]
    };
    addEvent(state,"STORE_ANSWER_RECEIVED",{q,modeledCycleMin});
    return Object.freeze(state);
  }

  function mutable(state){
    const next=clone(state);
    next.events=Array.isArray(next.events)?next.events:[];
    return next;
  }

  function fail(code){
    const err=new Error(code);
    err.code=code;
    throw err;
  }

  function transition(state,action){
    if(!state || state.engineVersion!==VERSION) fail("JOB1_STATE_REQUIRED");
    if(!Object.values(ACTIONS).includes(action)) fail("UNKNOWN_JOB1_ACTION");
    const next=mutable(state);

    switch(action){
      case ACTIONS.STORE_ACCEPT_AS_ASKED:
        if(next.storeReview!=="PENDING") fail("STORE_REVIEW_ALREADY_RESOLVED");
        next.storeReview="ACCEPTED_AS_ASKED";
        next.offer={
          offerId:"SIM-OFFER-"+next.identity.resultHash.slice(0,12),
          status:"ACTIVE",
          amount:next.economics.q,
          validity:"SIMULATION_SESSION",
          basis:"SIMULATED_FROM_STORE_BUDGETARY_Q",
          sellerOfRecord:"SIMULATED_STORE_ZERO"
        };
        addEvent(next,"STORE_ACCEPTED_AS_ASKED",{offerId:next.offer.offerId,amount:next.offer.amount});
        addEvent(next,"SIMULATED_OFFER_ISSUED",next.offer);
        break;

      case ACTIONS.STORE_RETURN_FOR_MODIFICATION:
        if(next.storeReview!=="PENDING") fail("STORE_REVIEW_ALREADY_RESOLVED");
        next.storeReview="RETURNED_FOR_MODIFICATION";
        addEvent(next,"STORE_RETURNED_FOR_MODIFICATION",{});
        break;

      case ACTIONS.STORE_DECLINE:
        if(next.storeReview!=="PENDING") fail("STORE_REVIEW_ALREADY_RESOLVED");
        next.storeReview="DECLINED";
        addEvent(next,"STORE_DECLINED",{});
        break;

      case ACTIONS.CUSTOMER_ACCEPT_OFFER:
        if(next.offer?.status!=="ACTIVE") fail("ACTIVE_OFFER_REQUIRED");
        if(next.acceptance) fail("ACCEPTANCE_ALREADY_RECORDED");
        next.acceptance={status:"ACCEPTED",offerId:next.offer.offerId,basis:"SIMULATED_CUSTOMER_DECISION"};
        addEvent(next,"CUSTOMER_ACCEPTED_OFFER",next.acceptance);
        break;

      case ACTIONS.CUSTOMER_DECLINE_OFFER:
        if(next.offer?.status!=="ACTIVE") fail("ACTIVE_OFFER_REQUIRED");
        if(next.acceptance) fail("ACCEPTANCE_ALREADY_RECORDED");
        next.acceptance={status:"DECLINED",offerId:next.offer.offerId,basis:"SIMULATED_CUSTOMER_DECISION"};
        next.offer.status="DECLINED";
        addEvent(next,"CUSTOMER_DECLINED_OFFER",next.acceptance);
        break;

      case ACTIONS.SIMULATE_PURCHASE:
        if(next.acceptance?.status!=="ACCEPTED") fail("ACCEPTED_OFFER_REQUIRED");
        if(next.settlement) fail("SETTLEMENT_ALREADY_RECORDED");
        next.settlement={
          status:"SIMULATED_SETTLED",
          amount:next.offer.amount,
          paymentReference:"SIM-PAY-"+next.identity.resultHash.slice(0,12),
          basis:"SIMULATED_PAYMENT_EVENT"
        };
        next.offer.status="PURCHASED";
        addEvent(next,"SIMULATED_PURCHASE_SETTLED",next.settlement);
        break;

      case ACTIONS.STORE_ALLOCATE:
        if(next.settlement?.status!=="SIMULATED_SETTLED") fail("SETTLEMENT_REQUIRED");
        if(next.allocation) fail("ALLOCATION_ALREADY_RECORDED");
        next.allocation={status:"SIMULATED_ALLOCATED",basis:"STORE_ZERO_REFERENCE_STOCK"};
        addEvent(next,"MATERIAL_ALLOCATED",next.allocation);
        break;

      case ACTIONS.STORE_RELEASE:
        if(next.allocation?.status!=="SIMULATED_ALLOCATED") fail("ALLOCATION_REQUIRED");
        if(next.productionRelease) fail("RELEASE_ALREADY_RECORDED");
        next.productionRelease={status:"SIMULATED_RELEASED",basis:"STORE_RELEASE_GATE"};
        addEvent(next,"PRODUCTION_RELEASED",next.productionRelease);
        break;

      case ACTIONS.STORE_QUEUE:
        if(next.productionRelease?.status!=="SIMULATED_RELEASED") fail("PRODUCTION_RELEASE_REQUIRED");
        if(next.queue) fail("QUEUE_ALREADY_RECORDED");
        next.queue={status:"SIMULATED_QUEUED",position:"REFERENCE_QUEUE"};
        addEvent(next,"JOB_QUEUED",next.queue);
        break;

      case ACTIONS.LOCAL_READY:
        if(next.queue?.status!=="SIMULATED_QUEUED") fail("QUEUE_REQUIRED");
        if(next.machineReadiness) fail("MACHINE_READINESS_ALREADY_RECORDED");
        next.machineReadiness={status:"SIMULATED_READY",cell:"D-001",authority:"LOCAL_CELL_SIMULATION"};
        addEvent(next,"LOCAL_CELL_READY",next.machineReadiness);
        break;

      case ACTIONS.LOCAL_CYCLE_START:
        if(next.machineReadiness?.status!=="SIMULATED_READY") fail("LOCAL_MACHINE_READINESS_REQUIRED");
        if(next.cycleStart) fail("CYCLE_ALREADY_STARTED");
        next.cycleStart={status:"SIMULATED_STARTED",authority:"LOCAL_CELL_SIMULATION",remoteStart:false};
        addEvent(next,"LOCAL_CYCLE_STARTED",next.cycleStart);
        break;

      case ACTIONS.COMPLETE_OPERATIONS:
        if(next.cycleStart?.status!=="SIMULATED_STARTED") fail("CYCLE_START_REQUIRED");
        if(next.operations) fail("OPERATIONS_ALREADY_RECORDED");
        next.operations={
          status:"SIMULATED_COMPLETE",
          modeledCycleMin:next.economics.modeledCycleMin,
          basis:"STORE_TRAVEL_MODEL"
        };
        addEvent(next,"MODELED_OPERATIONS_COMPLETED",next.operations);
        break;

      case ACTIONS.INSPECTION_PASS:
        if(next.operations?.status!=="SIMULATED_COMPLETE") fail("OPERATIONS_COMPLETE_REQUIRED");
        if(next.inspection) fail("INSPECTION_ALREADY_RECORDED");
        next.inspection={status:"SIMULATED_PASS",basis:"REFERENCE_QUALITY_GATE"};
        addEvent(next,"INSPECTION_PASSED",next.inspection);
        break;

      case ACTIONS.LABELS_COMPLETE:
        if(next.inspection?.status!=="SIMULATED_PASS") fail("INSPECTION_PASS_REQUIRED");
        if(next.labels) fail("LABELS_ALREADY_RECORDED");
        next.labels={status:"SIMULATED_COMPLETE",basis:"REFERENCE_LABEL_GATE"};
        addEvent(next,"LABELS_COMPLETED",next.labels);
        break;

      case ACTIONS.STAGE_JOB:
        if(next.labels?.status!=="SIMULATED_COMPLETE") fail("LABELS_COMPLETE_REQUIRED");
        if(next.staging) fail("STAGING_ALREADY_RECORDED");
        next.staging={status:"SIMULATED_STAGED",custodyTransferred:false};
        addEvent(next,"JOB_STAGED",next.staging);
        break;

      case ACTIONS.ISSUE_READY:
        if(next.staging?.status!=="SIMULATED_STAGED") fail("STAGING_REQUIRED");
        if(next.ready) fail("READY_ALREADY_RECORDED");
        next.ready={status:"SIMULATED_READY_NOTICE",pickupWindow:"REFERENCE_ONLY"};
        addEvent(next,"READY_NOTICE_ISSUED",next.ready);
        break;

      case ACTIONS.RECORD_PICKUP:
        if(next.ready?.status!=="SIMULATED_READY_NOTICE") fail("READY_NOTICE_REQUIRED");
        if(next.custody) fail("CUSTODY_ALREADY_RECORDED");
        next.custody={status:"SIMULATED_PICKED_UP",method:"CUSTOMER_PICKUP",basis:"SIMULATED_CUSTODY_TRANSFER"};
        addEvent(next,"CUSTODY_TRANSFERRED",next.custody);
        break;

      case ACTIONS.CLOSE_JOB:
        if(next.custody?.status!=="SIMULATED_PICKED_UP") fail("CUSTODY_REQUIRED");
        if(next.closeout) fail("JOB_ALREADY_CLOSED");
        next.closeout={status:"SIMULATED_CLOSED",ownerRecord:"COMPLETE"};
        addEvent(next,"JOB_CLOSED",next.closeout);
        break;
    }

    return Object.freeze(next);
  }

  function nextYardAction(state){
    if(!state?.settlement) return null;
    if(!state.allocation) return ACTIONS.STORE_ALLOCATE;
    if(!state.productionRelease) return ACTIONS.STORE_RELEASE;
    if(!state.queue) return ACTIONS.STORE_QUEUE;
    if(!state.machineReadiness) return ACTIONS.LOCAL_READY;
    if(!state.cycleStart) return ACTIONS.LOCAL_CYCLE_START;
    if(!state.operations) return ACTIONS.COMPLETE_OPERATIONS;
    if(!state.inspection) return ACTIONS.INSPECTION_PASS;
    if(!state.labels) return ACTIONS.LABELS_COMPLETE;
    if(!state.staging) return ACTIONS.STAGE_JOB;
    if(!state.ready) return ACTIONS.ISSUE_READY;
    return null;
  }

  function canVisit(state,stage){
    if(stage==="store") return !!state;
    if(stage==="terms") return state?.offer?.status==="ACTIVE" || state?.offer?.status==="PURCHASED";
    if(stage==="request") return !!state?.offer;
    if(stage==="yard") return state?.settlement?.status==="SIMULATED_SETTLED";
    if(stage==="record") return state?.ready?.status==="SIMULATED_READY_NOTICE" || !!state?.custody || !!state?.closeout;
    return true;
  }

  root.STBJob1SimulatedFulfillment=Object.freeze({
    version:VERSION,
    ACTIONS,
    YARD_SEQUENCE,
    create,
    transition,
    nextYardAction,
    canVisit
  });
})(window);
