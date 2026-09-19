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
      catalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      stage2ExecutablePin:'b40cdc60a405d6c2a63d846f2c2e89cddc5bb95d',
      publishedJobsPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc'
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
      projectClass:'BOUNDED_SOURCE_BACKED',
      materialCatalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      capabilityBasis:'CURRENT_CANONICAL_STORE_ZERO',
      capabilityPin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      economicsModel:null,
      economicsStatus:'UNRESOLVED_CLASS_SCOPED_RECOVERY',
      legacyGeneralRecoverySelected:false
    }),
    alcove: Object.freeze({
      projectId:'alcove',
      projectClass:'ALCOVE_INSERT',
      materialCatalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      capabilityBasis:'CURRENT_CANONICAL_STORE_ZERO',
      capabilityPin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      economicsModel:'STB-STORE-ZERO-PRICE-1 v0.2.2',
      economicsStatus:'LEGACY_GENERAL_RECOVERY_STILL_VISIBLE_PENDING_MIGRATION',
      legacyGeneralRecoverySelected:true
    }),
    windowSeat: Object.freeze({
      projectId:'window-seat',
      projectClass:'SPACE_UTILIZATION',
      materialCatalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      capabilityBasis:'D001-BOARD-EDGE-MILL-REF-0.3',
      capabilityPin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      economicsModel:'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0.1',
      economicsPin:'f88ec61c42446755d00259f88e7fd09f2702fd92',
      economicsStatus:'DECLARED_REFERENCE',
      legacyGeneralRecoverySelected:false
    }),
    sheetS001: Object.freeze({
      projectId:'sheet-s001',
      projectClass:'SHEET_ROUTED_OPENING',
      materialCatalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      capabilityBasis:'S001-MODE2-ARCHED-APERTURE-V0',
      capabilityPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
      economicsModel:null,
      economicsStatus:'BUDGETARY_MATERIAL_ONLY',
      legacyGeneralRecoverySelected:false
    })
  });


  /*
   * Static browser snapshot of the exact Store Zero offerings used by the
   * Start Your Own configurator. The snapshot is copied from
   * store-zero-catalog.json at the published-job/catalog pin below so the
   * GitHub Pages build can ask one versioned Store source without falling back
   * to project-local price tables.
   */
  var START_OWN_STORE_CATALOG = Object.freeze({
    repository:'GeorgePlattDemo/scan-to-build-store',
    file:'store-zero-catalog.json',
    pin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc',
    clock:"2026-09-10",
    selections:Object.freeze({
    "2x4": [
      {
        "storeSku": "STB-ZERO-SPF-2X4-72-001",
        "description": "2x4 x 72 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 3.13,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X4-96-001",
        "description": "2x4 x 96 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 4.18,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X4-108-001",
        "description": "2x4 x 108 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 108,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 4.7,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X4-120-001",
        "description": "2x4 x 120 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 5.69,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X4-144-001",
        "description": "2x4 x 144 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 6.8,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X4-168-001",
        "description": "2x4 x 168 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 168,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 7.31,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X4-192-001",
        "description": "2x4 x 192 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 4,
        "actualT": 1.5,
        "actualW": 3.5,
        "stockL_in": 192,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 8.36,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "2x6": [
      {
        "storeSku": "STB-ZERO-SPF-2X6-72-001",
        "description": "2x6 x 72 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 6,
        "actualT": 1.5,
        "actualW": 5.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 5.66,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X6-96-001",
        "description": "2x6 x 96 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 6,
        "actualT": 1.5,
        "actualW": 5.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 7.55,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X6-120-001",
        "description": "2x6 x 120 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 6,
        "actualT": 1.5,
        "actualW": 5.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 9.44,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X6-144-001",
        "description": "2x6 x 144 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 6,
        "actualT": 1.5,
        "actualW": 5.5,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 11.33,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X6-192-001",
        "description": "2x6 x 192 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 6,
        "actualT": 1.5,
        "actualW": 5.5,
        "stockL_in": 192,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 15.1,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "2x8": [
      {
        "storeSku": "STB-ZERO-SPF-2X8-96-001",
        "description": "2x8 x 96 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 8,
        "actualT": 1.5,
        "actualW": 7.25,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 9.95,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X8-120-001",
        "description": "2x8 x 120 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 8,
        "actualT": 1.5,
        "actualW": 7.25,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 12.44,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X8-144-001",
        "description": "2x8 x 144 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 8,
        "actualT": 1.5,
        "actualW": 7.25,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 14.93,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-2X8-192-001",
        "description": "2x8 x 192 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 2,
        "nominalW": 8,
        "actualT": 1.5,
        "actualW": 7.25,
        "stockL_in": 192,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 19.91,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "4x4": [
      {
        "storeSku": "STB-ZERO-SPF-4X4-96-001",
        "description": "4x4 x 96 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 4,
        "nominalW": 4,
        "actualT": 3.5,
        "actualW": 3.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 9.2,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-4X4-120-001",
        "description": "4x4 x 120 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 4,
        "nominalW": 4,
        "actualT": 3.5,
        "actualW": 3.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 11.5,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-SPF-4X4-144-001",
        "description": "4x4 x 144 in SPF construction",
        "form": "board",
        "species": "spf",
        "grade": "construction",
        "nominalT": 4,
        "nominalW": 4,
        "actualT": 3.5,
        "actualW": 3.5,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 13.79,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x4p": [
      {
        "storeSku": "STB-ZERO-PINE-1X4-72-001",
        "description": "1x4 x 72 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 8.65,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PINE-1X4-96-001",
        "description": "1x4 x 96 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 11.54,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PINE-1X4-120-001",
        "description": "1x4 x 120 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 14.43,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PINE-1X4-144-001",
        "description": "1x4 x 144 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 17.3,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x6p": [
      {
        "storeSku": "STB-ZERO-PINE-1X6-72-001",
        "description": "1x6 x 72 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 15.74,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PINE-1X6-96-001",
        "description": "1x6 x 96 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 20.99,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PINE-1X6-120-001",
        "description": "1x6 x 120 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 26.24,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PINE-1X6-144-001",
        "description": "1x6 x 144 in select pine S4S",
        "form": "board",
        "species": "pine",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 31.48,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x4o": [
      {
        "storeSku": "STB-ZERO-OAK-1X4-72-001",
        "description": "1x4 x 72 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 18.1,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-OAK-1X4-96-001",
        "description": "1x4 x 96 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 24.14,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-OAK-1X4-120-001",
        "description": "1x4 x 120 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 30.18,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x6o": [
      {
        "storeSku": "STB-ZERO-OAK-1X6-72-001",
        "description": "1x6 x 72 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 26.24,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-OAK-1X6-96-001",
        "description": "1x6 x 96 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 34.99,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-OAK-1X6-120-001",
        "description": "1x6 x 120 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 43.73,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x8o": [
      {
        "storeSku": "STB-ZERO-OAK-1X8-72-001",
        "description": "1x8 x 72 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 8,
        "actualT": 0.75,
        "actualW": 7.25,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 34.59,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-OAK-1X8-96-001",
        "description": "1x8 x 96 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 8,
        "actualT": 0.75,
        "actualW": 7.25,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 46.12,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-OAK-1X8-120-001",
        "description": "1x8 x 120 in red oak S4S",
        "form": "board",
        "species": "oak",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 8,
        "actualT": 0.75,
        "actualW": 7.25,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 57.65,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x4c": [
      {
        "storeSku": "STB-ZERO-CHR-1X4-72-001",
        "description": "1x4 x 72 in cherry S4S (no public 1x peg — 1.6 × oak)",
        "form": "board",
        "species": "cherry",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 28.97,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-CHR-1X4-96-001",
        "description": "1x4 x 96 in cherry S4S (no public 1x peg — 1.6 × oak)",
        "form": "board",
        "species": "cherry",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 4,
        "actualT": 0.75,
        "actualW": 3.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 38.62,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x6c": [
      {
        "storeSku": "STB-ZERO-CHR-1X6-72-001",
        "description": "1x6 x 72 in cherry S4S (no public 1x peg — 1.6 × oak)",
        "form": "board",
        "species": "cherry",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 41.98,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-CHR-1X6-96-001",
        "description": "1x6 x 96 in cherry S4S (no public 1x peg — 1.6 × oak)",
        "form": "board",
        "species": "cherry",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 55.98,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "1x6w": [
      {
        "storeSku": "STB-ZERO-POP-1X6-72-001",
        "description": "1x6 x 72 in poplar S4S",
        "form": "board",
        "species": "poplar",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 72,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 24.14,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-POP-1X6-96-001",
        "description": "1x6 x 96 in poplar S4S",
        "form": "board",
        "species": "poplar",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 96,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 32.18,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-POP-1X6-120-001",
        "description": "1x6 x 120 in poplar S4S",
        "form": "board",
        "species": "poplar",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 120,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 40.24,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-POP-1X6-144-001",
        "description": "1x6 x 144 in poplar S4S",
        "form": "board",
        "species": "poplar",
        "grade": "select",
        "nominalT": 1,
        "nominalW": 6,
        "actualT": 0.75,
        "actualW": 5.5,
        "stockL_in": 144,
        "sheetW_in": null,
        "sheetL_in": null,
        "sellingPrice": 48.28,
        "supportedOps": [
          "CROSSCUT",
          "MITER_LIMITED",
          "DRILL",
          "DADO",
          "GROOVE",
          "RABBET",
          "MILL_LONGITUDINAL_PROFILE",
          "MILL_END_PROFILE"
        ],
        "cellFamily": [
          "D-001"
        ],
        "offered": true
      }
    ],
    "p25": [
      {
        "storeSku": "STB-ZERO-PLY-025-48X48-001",
        "description": "0.25 in x 48 x 48 handi-panel sanded-utility",
        "form": "sheet",
        "species": "fir",
        "grade": "sanded-utility",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.25,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 48,
        "sellingPrice": 8.47,
        "supportedOps": [
          "CROSSCUT",
          "RIP"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PLY-025-48X96-001",
        "description": "0/25 approx in x 48 x 96 sanded-utility",
        "form": "sheet",
        "species": "fir",
        "grade": "sanded-utility",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.25,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 96,
        "sellingPrice": 14.61,
        "supportedOps": [
          "CROSSCUT",
          "RIP",
          "DADO"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      }
    ],
    "p38": [
      {
        "storeSku": "STB-ZERO-PLY-038-48X48-001",
        "description": "0.375 in x 48 x 48 handi-panel ACX",
        "form": "sheet",
        "species": "fir",
        "grade": "ACX",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.375,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 48,
        "sellingPrice": 11.09,
        "supportedOps": [
          "CROSSCUT",
          "RIP"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PLY-038-48X96-001",
        "description": "0/38 approx in x 48 x 96 ACX",
        "form": "sheet",
        "species": "fir",
        "grade": "ACX",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.375,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 96,
        "sellingPrice": 19.12,
        "supportedOps": [
          "CROSSCUT",
          "RIP",
          "DADO",
          "ROUTE_PROFILE",
          "RETAIN_TABS"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      }
    ],
    "p50": [
      {
        "storeSku": "STB-ZERO-PLY-050-48X96-001",
        "description": "1/2 in x 48 x 96 4-ply sheathing",
        "form": "sheet",
        "species": "pine",
        "grade": "sheathing-4ply",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.5,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 96,
        "sellingPrice": 26.55,
        "supportedOps": [
          "CROSSCUT",
          "RIP",
          "ROUTE_PROFILE",
          "RETAIN_TABS"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      }
    ],
    "p63": [
      {
        "storeSku": "STB-ZERO-PLY-063-48X96-001",
        "description": "5/8 in x 48 x 96 BCX sanded plywood",
        "form": "sheet",
        "species": "fir",
        "grade": "BCX-sanded",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.625,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 96,
        "sellingPrice": 50.28,
        "supportedOps": [
          "CROSSCUT",
          "RIP",
          "DADO",
          "GROOVE",
          "ROUTE_PROFILE",
          "RETAIN_TABS"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      }
    ],
    "p75": [
      {
        "storeSku": "STB-ZERO-PLY-075-48X48-001",
        "description": "0.75 in x 48 x 48 handi-panel ACX-sanded",
        "form": "sheet",
        "species": "fir",
        "grade": "ACX-sanded",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.75,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 48,
        "sellingPrice": 33.54,
        "supportedOps": [
          "CROSSCUT",
          "RIP"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      },
      {
        "storeSku": "STB-ZERO-PLY-075-48X96-001",
        "description": "0/75 approx in x 48 x 96 ACX-sanded",
        "form": "sheet",
        "species": "fir",
        "grade": "ACX-sanded",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.75,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 96,
        "sellingPrice": 57.82,
        "supportedOps": [
          "CROSSCUT",
          "RIP",
          "DADO",
          "ROUTE_PROFILE",
          "RETAIN_TABS"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      }
    ],
    "o75": [
      {
        "storeSku": "STB-ZERO-OSB-075-48X96-001",
        "description": "3/4 in x 48 x 96 square-edge OSB",
        "form": "sheet",
        "species": "osb",
        "grade": "square-edge",
        "nominalT": null,
        "nominalW": null,
        "actualT": 0.75,
        "actualW": null,
        "stockL_in": null,
        "sheetW_in": 48,
        "sheetL_in": 96,
        "sellingPrice": 28.46,
        "supportedOps": [
          "CROSSCUT",
          "RIP"
        ],
        "cellFamily": [
          "S-001"
        ],
        "offered": true
      }
    ]
  })
  });

  function startOwnOfferings(sizeKey){
    var rows=START_OWN_STORE_CATALOG.selections[String(sizeKey || '')];
    return rows ? clone(rows) : [];
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
          form:'board',
          storeSku:offering.storeSku,
          description:offering.description,
          stockLengthIn:offering.stockL_in,
          quantity:left.length,
          unitPrice:offering.sellingPrice,
          materialTotal:Math.round(left.length*offering.sellingPrice*100)/100,
          cuts:cuts,
          left:left,
          waste:left.reduce(function(sum,value){return sum+value},0),
          supportedOps:clone(offering.supportedOps || []),
          cellFamily:clone(offering.cellFamily || [])
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
          form:'sheet',
          storeSku:offering.storeSku,
          description:offering.description,
          sheetWIn:offering.sheetW_in,
          sheetLIn:offering.sheetL_in,
          parentLabel:offering.sheetW_in+' × '+offering.sheetL_in,
          quantity:total,
          unitPrice:offering.sellingPrice,
          materialTotal:Math.round(total*offering.sellingPrice*100)/100,
          supportedOps:clone(offering.supportedOps || []),
          cellFamily:clone(offering.cellFamily || [])
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
      repository:START_OWN_STORE_CATALOG.repository,
      file:START_OWN_STORE_CATALOG.file,
      pin:START_OWN_STORE_CATALOG.pin,
      clock:START_OWN_STORE_CATALOG.clock
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
    createComparisonHandoff:createComparisonHandoff,
    storeDemandIdentity:storeDemandIdentity,
    sameStoreDemand:sameStoreDemand
  });
})(window);
