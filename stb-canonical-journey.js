(function(g){
  "use strict";

  const stages=Object.freeze([
    "scan",
    "configure",
    "store",
    "review",
    "request",
    "yard",
    "terms",
    "recap",
    "record"
  ]);

  const gates=Object.freeze([
    Object.freeze({
      id:"scan-to-configure",
      action:"CONTINUE TO CONFIGURE",
      source:"scan",
      destination:"configure",
      may:Object.freeze(["activeStage"]),
      doesNot:Object.freeze(["confirmation","storeAnswer","order","offer","acceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"configure-to-store",
      action:"SEND TO STORE ZERO",
      source:"configure",
      destination:"store",
      may:Object.freeze(["activeStage","storeReferenceAnswerForCurrentRevision"]),
      doesNot:Object.freeze(["confirmation","order","offer","acceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"store-to-review",
      action:"NEXT",
      source:"store",
      destination:"review",
      may:Object.freeze(["activeStage"]),
      doesNot:Object.freeze(["storeAnswer","confirmation","order","offer","acceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"review-to-request",
      action:"CONFIRM THIS VERSION",
      source:"review",
      destination:"request",
      may:Object.freeze(["activeStage","revisionConfirmation"]),
      doesNot:Object.freeze(["order","offer","acceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"request-to-yard",
      action:"SEND TO THE YARD / NEXT",
      source:"request",
      destination:"yard",
      may:Object.freeze(["activeStage","requestEventState"]),
      doesNot:Object.freeze(["order","offerAcceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"yard-to-terms",
      action:"CONTINUE TO TERMS / NEXT",
      source:"yard",
      destination:"terms",
      may:Object.freeze(["activeStage"]),
      doesNot:Object.freeze(["acceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"terms-to-recap",
      action:"NEXT",
      source:"terms",
      destination:"recap",
      may:Object.freeze(["activeStage"]),
      doesNot:Object.freeze(["transactionHistory","acceptance","payment","allocation","productionRelease","machineReadiness","cycleStart","physicalOutcome","custody","closeout"])
    }),
    Object.freeze({
      id:"recap-to-record",
      action:"NEXT",
      source:"recap",
      destination:"record",
      may:Object.freeze(["activeStage"]),
      doesNot:Object.freeze(["physicalOutcome","staging","custody","closeout"])
    })
  ]);

  g.STB_CANONICAL_JOURNEY=Object.freeze({
    version:"STB-CANONICAL-BOUNDED-JOURNEY-0.1",
    stages,
    gates
  });
})(window);
