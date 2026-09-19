(function(root){
  'use strict';

  var ACTOR_ORDER = Object.freeze([
    'project-definition',
    'store-answer',
    'accept-pay',
    'store-yard',
    'handoff-record',
    'project-library'
  ]);

  var CURRENT_ARTIFACTS = Object.freeze({
    startOwn: Object.freeze({projectId:'start-own', artifact:'stb-start-own-0.11.html', projectClass:'USER_DEFINED_BOARD'}),
    outdoor: Object.freeze({projectId:'outdoor-build', artifact:'stb-outdoor-build.html', projectClass:'BOUNDED_SOURCE_BACKED'}),
    alcove: Object.freeze({projectId:'alcove', artifact:'system-build-current.html#alcove-capture', projectClass:'ALCOVE_INSERT'}),
    windowSeat: Object.freeze({projectId:'window-seat', artifact:'stb-window-seat-space-utilization-0.7.4.html', projectClass:'SPACE_UTILIZATION'}),
    sheetS001: Object.freeze({projectId:'sheet-s001', artifact:'system-build-current.html#playhouse-s001', projectClass:'SHEET_ROUTED_OPENING'})
  });

  function clone(value){
    return value == null ? value : JSON.parse(JSON.stringify(value));
  }

  function freezeCopy(value){
    var copy = clone(value);
    if(copy && typeof copy === 'object') Object.freeze(copy);
    return copy;
  }

  function comparisonDemand(part){
    if(!part) return null;
    return Object.freeze({
      materialDemand: Object.freeze({stockClass:String(part.stockClass || '')}),
      operationDemand: Object.freeze([
        Object.freeze({kind:'STRAIGHT_CUT', required:part.straightCut !== false}),
        Object.freeze({
          kind:'ANGLED_CUT',
          endCondition:String(part.endCondition || ''),
          angleDegrees:Number(part.angleDegrees),
          angleReference:String(part.angleReference || ''),
          cutPlane:String(part.cutPlane || ''),
          endIdentity:String(part.endIdentity || ''),
          endRelation:String(part.endRelation || ''),
          lengthDatum:String(part.lengthDatum || '')
        })
      ]),
      quantity:Number(part.quantity),
      requiredGeometryDatumFacts:Object.freeze({
        finishedLength:Number(part.finishedLength),
        endCondition:String(part.endCondition || ''),
        angleDegrees:Number(part.angleDegrees),
        angleReference:String(part.angleReference || ''),
        cutPlane:String(part.cutPlane || ''),
        endIdentity:String(part.endIdentity || ''),
        endRelation:String(part.endRelation || ''),
        lengthDatum:String(part.lengthDatum || '')
      })
    });
  }

  function createComparisonHandoff(input){
    input = input || {};
    var demand = comparisonDemand(input.physicalDemand);
    if(!demand) throw new Error('physicalDemand is required');
    if(!input.projectId) throw new Error('projectId is required');
    if(!input.definitionId) throw new Error('definitionId is required');
    return Object.freeze({
      protocol:'stb.store-handoff/0.1',
      actorOrder:ACTOR_ORDER,
      projectId:String(input.projectId),
      projectClass:String(input.projectClass || ''),
      definitionId:String(input.definitionId),
      versionId:String(input.versionId || input.definitionId),
      materialDemand:demand.materialDemand,
      operationDemand:demand.operationDemand,
      quantity:demand.quantity,
      requiredGeometryDatumFacts:demand.requiredGeometryDatumFacts,
      sourceAuthority:freezeCopy(input.sourceAuthority || null),
      unresolvedConditions:Object.freeze((input.unresolvedConditions || []).map(String)),
      requestedServices:Object.freeze((input.requestedServices || [
        'material-answer',
        'capability-answer',
        'economics',
        'availability-timing',
        'services'
      ]).map(String)),
      authority:Object.freeze({
        commercial:false,
        productionRelease:false,
        machineReadiness:false,
        cycleStart:false,
        physicalFabrication:false
      })
    });
  }

  function stable(value){
    if(Array.isArray(value)) return '['+value.map(stable).join(',')+']';
    if(value && typeof value === 'object'){
      return '{'+Object.keys(value).sort().map(function(key){
        return JSON.stringify(key)+':'+stable(value[key]);
      }).join(',')+'}';
    }
    return JSON.stringify(value);
  }

  function storeDemandIdentity(handoff){
    if(!handoff) return null;
    return stable({
      materialDemand:handoff.materialDemand,
      operationDemand:handoff.operationDemand,
      quantity:handoff.quantity,
      requiredGeometryDatumFacts:handoff.requiredGeometryDatumFacts,
      requestedServices:handoff.requestedServices
    });
  }

  function sameStoreDemand(a,b){
    var left=storeDemandIdentity(a), right=storeDemandIdentity(b);
    return !!left && left===right;
  }

  root.STBStoreHandoffContract = Object.freeze({
    version:'0.1',
    actorOrder:ACTOR_ORDER,
    currentArtifacts:CURRENT_ARTIFACTS,
    comparisonDemand:comparisonDemand,
    createComparisonHandoff:createComparisonHandoff,
    storeDemandIdentity:storeDemandIdentity,
    sameStoreDemand:sameStoreDemand
  });
})(window);
