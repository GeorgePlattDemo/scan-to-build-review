(function(root){
  'use strict';
  // RECOVERY BOUNDARY: this contract serves only the two recovering project paths.
  // Mature reference projects remain outside this registry and are not modified by it.
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
    startOwn: Object.freeze({projectId:'start-own', artifact:'stb-start-own-0.10.html', projectClass:'USER_DEFINED_BOARD'}),
    outdoor: Object.freeze({projectId:'outdoor-build', artifact:'stb-outdoor-build.html', projectClass:'BOUNDED_REPLACEMENT_PART'})
  });

  /*
   * Store authority is path-specific. Do not collapse these into one universal
   * Store pin: the current Store master explicitly preserves different pins for
   * documentary doctrine, executable Stage-2 evidence, published jobs, and the
   * class-scoped Window Seat recovery model.
   */
  var STORE_AUTHORITIES = Object.freeze({
    canonical: Object.freeze({
      repository:'GeorgePlattDemo/scan-to-build-store',
      doctrineFile:'STORE-ZERO.md',
      doctrinePin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      catalogFile:'store-zero-catalog.json',
      catalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc'
    }),
    startOwn: Object.freeze({
      projectId:'start-own',
      projectClass:'USER_DEFINED_BOARD',
      materialCatalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      capabilityBasis:'CURRENT_CANONICAL_STORE_ZERO',
      capabilityPin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      economicsModel:null,
      economicsStatus:'UNRESOLVED_CLASS_SCOPED_RECOVERY',
      legacyGeneralRecoverySelected:false
    }),
    outdoor: Object.freeze({
      projectId:'outdoor-build',
      projectClass:'BOUNDED_REPLACEMENT_PART',
      materialCatalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      capabilityBasis:'CURRENT_CANONICAL_STORE_ZERO',
      capabilityPin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      economicsModel:null,
      economicsStatus:'UNRESOLVED_CLASS_SCOPED_RECOVERY',
      legacyGeneralRecoverySelected:false
    })
  });


  /*
   * Exact Store Zero material rows needed by the Start Your Own browser surface.
   * Source: store-zero-catalog.json at the pinned published-job/catalog commit.
   * Project UI data contains no material price authority of its own.
   */
  var START_OWN_CATALOG_ROWS = Object.freeze([
    ["2x4","STB-ZERO-SPF-2X4-72-001","board",72,null,null,3.13,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x4","STB-ZERO-SPF-2X4-96-001","board",96,null,null,4.18,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x4","STB-ZERO-SPF-2X4-108-001","board",108,null,null,4.7,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x4","STB-ZERO-SPF-2X4-120-001","board",120,null,null,5.69,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x4","STB-ZERO-SPF-2X4-144-001","board",144,null,null,6.8,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x4","STB-ZERO-SPF-2X4-168-001","board",168,null,null,7.31,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x4","STB-ZERO-SPF-2X4-192-001","board",192,null,null,8.36,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x6","STB-ZERO-SPF-2X6-72-001","board",72,null,null,5.66,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x6","STB-ZERO-SPF-2X6-96-001","board",96,null,null,7.55,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x6","STB-ZERO-SPF-2X6-120-001","board",120,null,null,9.44,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x6","STB-ZERO-SPF-2X6-144-001","board",144,null,null,11.33,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x6","STB-ZERO-SPF-2X6-192-001","board",192,null,null,15.1,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x8","STB-ZERO-SPF-2X8-96-001","board",96,null,null,9.95,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x8","STB-ZERO-SPF-2X8-120-001","board",120,null,null,12.44,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x8","STB-ZERO-SPF-2X8-144-001","board",144,null,null,14.93,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["2x8","STB-ZERO-SPF-2X8-192-001","board",192,null,null,19.91,["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["4x4","STB-ZERO-SPF-4X4-96-001","board",96,null,null,9.2,["CROSSCUT","MITER_LIMITED"],["D-001"]],
    ["4x4","STB-ZERO-SPF-4X4-120-001","board",120,null,null,11.5,["CROSSCUT","MITER_LIMITED"],["D-001"]],
    ["4x4","STB-ZERO-SPF-4X4-144-001","board",144,null,null,13.79,["CROSSCUT","MITER_LIMITED"],["D-001"]],
    ["1x4p","STB-ZERO-PINE-1X4-72-001","board",72,null,null,8.65,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x4p","STB-ZERO-PINE-1X4-96-001","board",96,null,null,11.54,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x4p","STB-ZERO-PINE-1X4-120-001","board",120,null,null,14.43,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x4p","STB-ZERO-PINE-1X4-144-001","board",144,null,null,17.3,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6p","STB-ZERO-PINE-1X6-72-001","board",72,null,null,15.74,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6p","STB-ZERO-PINE-1X6-96-001","board",96,null,null,20.99,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6p","STB-ZERO-PINE-1X6-120-001","board",120,null,null,26.24,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6p","STB-ZERO-PINE-1X6-144-001","board",144,null,null,31.48,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x4o","STB-ZERO-OAK-1X4-72-001","board",72,null,null,18.1,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x4o","STB-ZERO-OAK-1X4-96-001","board",96,null,null,24.14,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x4o","STB-ZERO-OAK-1X4-120-001","board",120,null,null,30.18,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x6o","STB-ZERO-OAK-1X6-72-001","board",72,null,null,26.24,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x6o","STB-ZERO-OAK-1X6-96-001","board",96,null,null,34.99,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x6o","STB-ZERO-OAK-1X6-120-001","board",120,null,null,43.73,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x8o","STB-ZERO-OAK-1X8-72-001","board",72,null,null,34.59,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x8o","STB-ZERO-OAK-1X8-96-001","board",96,null,null,46.12,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x8o","STB-ZERO-OAK-1X8-120-001","board",120,null,null,57.65,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],["D-001"]],
    ["1x4c","STB-ZERO-CHR-1X4-72-001","board",72,null,null,28.97,["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],["D-001"]],
    ["1x4c","STB-ZERO-CHR-1X4-96-001","board",96,null,null,38.62,["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],["D-001"]],
    ["1x6c","STB-ZERO-CHR-1X6-72-001","board",72,null,null,41.98,["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],["D-001"]],
    ["1x6c","STB-ZERO-CHR-1X6-96-001","board",96,null,null,55.98,["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],["D-001"]],
    ["1x6w","STB-ZERO-POP-1X6-72-001","board",72,null,null,24.14,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6w","STB-ZERO-POP-1X6-96-001","board",96,null,null,32.18,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6w","STB-ZERO-POP-1X6-120-001","board",120,null,null,40.24,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["1x6w","STB-ZERO-POP-1X6-144-001","board",144,null,null,48.28,["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],["D-001"]],
    ["p25","STB-ZERO-PLY-025-48X48-001","sheet",null,48,48,8.47,["CROSSCUT","RIP"],["S-001"]],
    ["p25","STB-ZERO-PLY-025-48X96-001","sheet",null,48,96,14.61,["CROSSCUT","RIP","DADO"],["S-001"]],
    ["p38","STB-ZERO-PLY-038-48X48-001","sheet",null,48,48,11.09,["CROSSCUT","RIP"],["S-001"]],
    ["p38","STB-ZERO-PLY-038-48X96-001","sheet",null,48,96,19.12,["CROSSCUT","RIP","DADO","ROUTE_PROFILE","RETAIN_TABS"],["S-001"]],
    ["p50","STB-ZERO-PLY-050-48X96-001","sheet",null,48,96,26.55,["CROSSCUT","RIP","ROUTE_PROFILE","RETAIN_TABS"],["S-001"]],
    ["p63","STB-ZERO-PLY-063-48X96-001","sheet",null,48,96,50.28,["CROSSCUT","RIP","DADO","GROOVE","ROUTE_PROFILE","RETAIN_TABS"],["S-001"]],
    ["p75","STB-ZERO-PLY-075-48X48-001","sheet",null,48,48,33.54,["CROSSCUT","RIP"],["S-001"]],
    ["p75","STB-ZERO-PLY-075-48X96-001","sheet",null,48,96,57.82,["CROSSCUT","RIP","DADO","ROUTE_PROFILE","RETAIN_TABS"],["S-001"]],
    ["o75","STB-ZERO-OSB-075-48X96-001","sheet",null,48,96,28.46,["CROSSCUT","RIP"],["S-001"]]
  ]);

  var START_OWN_STORE_CATALOG = Object.freeze({
    repository:'GeorgePlattDemo/scan-to-build-store',
    file:'store-zero-catalog.json',
    pin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
    clock:"2026-09-10"
  });

  function startOwnOfferings(sizeKey){
    return START_OWN_CATALOG_ROWS.filter(function(row){return row[0]===String(sizeKey || '')}).map(function(row){
      return {
        sizeKey:row[0],
        storeSku:row[1],
        form:row[2],
        stockL_in:row[3],
        sheetW_in:row[4],
        sheetL_in:row[5],
        sellingPrice:row[6],
        supportedOps:clone(row[7] || []),
        cellFamily:clone(row[8] || []),
        offered:true
      };
    });
  }

  function materialFail(code, details){
    return Object.freeze({
      status:'UNRESOLVED',
      code:code,
      details:details || null,
      source:Object.freeze({
        repository:START_OWN_STORE_CATALOG.repository,
        file:START_OWN_STORE_CATALOG.file,
        pin:START_OWN_STORE_CATALOG.pin,
        clock:START_OWN_STORE_CATALOG.clock
      })
    });
  }

  function validPart(part){
    return part && Number.isFinite(Number(part.len)) && Number(part.len)>0 &&
      Number.isFinite(Number(part.wid)) && Number(part.wid)>0 &&
      Number.isFinite(Number(part.qty)) && Number(part.qty)>0;
  }

  function sheetYield(parentW,parentL,pieceW,pieceL){
    var a=Math.floor(parentW/pieceW)*Math.floor(parentL/pieceL);
    var b=Math.floor(parentW/pieceL)*Math.floor(parentL/pieceW);
    return Math.max(a,b);
  }

  function resolveStartOwnMaterial(input){
    input=input || {};
    var parts=Array.isArray(input.parts)?input.parts.map(function(part){
      return {name:String(part.name || ''),len:Number(part.len),wid:Number(part.wid),qty:Number(part.qty)};
    }):[];
    if(!parts.length || parts.some(function(part){return !validPart(part)})){
      return materialFail('INVALID_PART_DEMAND','Start Your Own requires positive length, width and quantity.');
    }
    var offerings=startOwnOfferings(input.sizeKey);
    if(!offerings.length){
      return materialFail('STORE_OFFERING_NOT_MAPPED','No Store Zero offering is mapped to this material choice.');
    }

    var candidates=[];
    offerings.forEach(function(offering){
      if(offering.offered!==true || !Number.isFinite(Number(offering.sellingPrice))) return;
      if(offering.form==='board'){
        var pieces=[];
        parts.forEach(function(part){
          for(var i=0;i<part.qty;i++) pieces.push(part.len);
        });
        if(pieces.some(function(len){return len>offering.stockL_in+0.0001})) return;
        pieces.sort(function(a,b){return b-a});
        var left=[], cuts=[];
        pieces.forEach(function(len){
          var index=-1;
          for(var i=0;i<left.length;i++){
            if(left[i]>=len-0.0001){index=i;break;}
          }
          if(index<0){
            left.push(offering.stockL_in-len);
            cuts.push([len]);
          }else{
            left[index]-=len;
            cuts[index].push(len);
          }
        });
        candidates.push({
          form:'board',storeSku:offering.storeSku,stockLengthIn:offering.stockL_in,
          quantity:left.length,unitPrice:offering.sellingPrice,
          materialTotal:Math.round(left.length*offering.sellingPrice*100)/100,
          cuts:cuts,left:left,waste:left.reduce(function(sum,value){return sum+value},0),
          supportedOps:clone(offering.supportedOps || []),cellFamily:clone(offering.cellFamily || [])
        });
      }else if(offering.form==='sheet'){
        var total=0, ok=true;
        parts.forEach(function(part){
          var per=sheetYield(offering.sheetW_in,offering.sheetL_in,part.wid,part.len);
          if(!per){ok=false;return;}
          total+=Math.ceil(part.qty/per);
        });
        if(!ok || !total) return;
        candidates.push({
          form:'sheet',storeSku:offering.storeSku,sheetWIn:offering.sheetW_in,sheetLIn:offering.sheetL_in,
          parentLabel:offering.sheetW_in+' × '+offering.sheetL_in,quantity:total,
          unitPrice:offering.sellingPrice,materialTotal:Math.round(total*offering.sellingPrice*100)/100,
          supportedOps:clone(offering.supportedOps || []),cellFamily:clone(offering.cellFamily || [])
        });
      }
    });

    if(!candidates.length){
      return materialFail('STORE_STOCK_CONTAINMENT_UNRESOLVED','No mapped Store Zero parent offering contains the current part demand.');
    }
    candidates.sort(function(a,b){
      if(a.materialTotal!==b.materialTotal) return a.materialTotal-b.materialTotal;
      var al=a.stockLengthIn || a.sheetLIn || 0;
      var bl=b.stockLengthIn || b.sheetLIn || 0;
      return al-bl;
    });
    var selected=candidates[0];
    selected.status='MAPPED';
    selected.source={
      repository:START_OWN_STORE_CATALOG.repository,file:START_OWN_STORE_CATALOG.file,
      pin:START_OWN_STORE_CATALOG.pin,clock:START_OWN_STORE_CATALOG.clock
    };
    return Object.freeze(selected);
  }

  function storeAuthority(key){
    return STORE_AUTHORITIES[key] || null;
  }

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

  function createProjectHandoff(input){
    input = input || {};
    if(!input.projectId) throw new Error('projectId is required');
    if(!input.definitionId) throw new Error('definitionId is required');
    if(!input.materialDemand) throw new Error('materialDemand is required');
    if(!Array.isArray(input.operationDemand)) throw new Error('operationDemand array is required');
    var authorityKey = String(input.authorityKey || '');
    return Object.freeze({
      protocol:'stb.store-handoff/0.2',
      actorOrder:ACTOR_ORDER,
      projectId:String(input.projectId),
      projectClass:String(input.projectClass || ''),
      definitionId:String(input.definitionId),
      versionId:String(input.versionId || input.definitionId),
      projectDefinition:freezeCopy(input.projectDefinition || null),
      materialDemand:freezeCopy(input.materialDemand),
      operationDemand:Object.freeze(input.operationDemand.map(function(op){return freezeCopy(op)})),
      quantity:Number(input.quantity || 0),
      requiredGeometryDatumFacts:freezeCopy(input.requiredGeometryDatumFacts || null),
      materialResolution:freezeCopy(input.materialResolution || null),
      storeAuthority:freezeCopy(storeAuthority(authorityKey) || null),
      unresolvedConditions:Object.freeze((input.unresolvedConditions || []).map(String)),
      requestedServices:Object.freeze((input.requestedServices || [
        'material-answer','capability-answer','economics','availability-timing','services'
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
    version:'0.3',
    actorOrder:ACTOR_ORDER,
    currentArtifacts:CURRENT_ARTIFACTS,
    storeAuthorities:STORE_AUTHORITIES,
    storeAuthority:storeAuthority,
    startOwnStoreCatalog:START_OWN_STORE_CATALOG,
    startOwnOfferings:startOwnOfferings,
    resolveStartOwnMaterial:resolveStartOwnMaterial,
    comparisonDemand:comparisonDemand,
    createProjectHandoff:createProjectHandoff,
    createComparisonHandoff:createComparisonHandoff,
    storeDemandIdentity:storeDemandIdentity,
    sameStoreDemand:sameStoreDemand
  });
})(window);
