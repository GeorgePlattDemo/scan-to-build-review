/* GENERATED FILE — DO NOT HAND EDIT.
Source: GeorgePlattDemo/scan-to-build-store@4402abeb6b0299a5b6db2eec85ed04c3b0236bcc
Generator: tools/generate-s001-store-browser-bundle.mjs
Exact Store S-001 reference evaluator. No commercial or physical authority.
*/
(function(root){
"use strict";
const STORE_PIN="4402abeb6b0299a5b6db2eec85ed04c3b0236bcc";
const SOURCE_BLOBS=Object.freeze({"s001-mode2-envelope.mjs":"14184dcb57489314ea8077dbec103e68eb59da8c","circular-segment.mjs":"05f4bf737339d2ba5da2f591689a181f824a1bfc","stencil-tab-policy.mjs":"205406099cd92d74ef8ce3aed669ed720358967b","s001-mode2-arched.mjs":"4b6beac274ee458f15b7c35c07729aba81da5983","store-zero-stage2-store.mjs":"331c6dea7623baeec39bebf40215f310670c2410","store-zero-catalog.json":"4b53bbbfdb041af294a1bef7592690b77682817f"});
const CATALOG=Object.freeze({"documentKind":"StoreZeroCallableCatalog","stage":2,"store":"Store Zero","clock":"2026-09-10","skuCount":92,"markOn":0.05,"pricingRule":{"ruleId":"SZ-MARK-ON-5","basis":"DECLARED_FIXTURE","formula":"sellingPrice = ROUND(list_reference * 1.05, 2)","note":"Mark-on, not margin. Budgetary estimate is not a commercial quote."},"onHandLanguage":"fixture-declared on-hand stock — not a physical count","offerings":[{"storeSku":"STB-ZERO-SPF-2X4-96-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":3.98,"mark_on":0.05,"sellingPrice":4.18,"onHand":84,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-001","limitations":[],"description":"2x4 x 96 in SPF construction","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-001","value":3.98},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-SPF-2X4-120-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":5.42,"mark_on":0.05,"sellingPrice":5.69,"onHand":48,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-002","limitations":[],"description":"2x4 x 120 in SPF construction","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-002","value":5.42},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-SPF-2X4-144-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":6.48,"mark_on":0.05,"sellingPrice":6.8,"onHand":36,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-003","limitations":[],"description":"2x4 x 144 in SPF construction","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-003","value":6.48},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-SPF-2X6-96-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":6,"actualT":1.5,"actualW":5.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":7.19,"mark_on":0.05,"sellingPrice":7.55,"onHand":40,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-004","limitations":[],"description":"2x6 x 96 in SPF construction","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-004","value":7.19},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-SPF-2X4-72-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":2.98,"mark_on":0.05,"sellingPrice":3.13,"onHand":60,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x4 x 72 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X4-108-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":108,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":4.48,"mark_on":0.05,"sellingPrice":4.7,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x4 x 108 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X4-168-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":168,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":6.96,"mark_on":0.05,"sellingPrice":7.31,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x4 x 168 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X4-192-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":192,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":7.96,"mark_on":0.05,"sellingPrice":8.36,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x4 x 192 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X6-72-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":6,"actualT":1.5,"actualW":5.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":5.39,"mark_on":0.05,"sellingPrice":5.66,"onHand":28,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x6 x 72 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X6-120-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":6,"actualT":1.5,"actualW":5.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":8.99,"mark_on":0.05,"sellingPrice":9.44,"onHand":22,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x6 x 120 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X6-144-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":6,"actualT":1.5,"actualW":5.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":10.79,"mark_on":0.05,"sellingPrice":11.33,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x6 x 144 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X6-192-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":6,"actualT":1.5,"actualW":5.5,"stockL_in":192,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":14.38,"mark_on":0.05,"sellingPrice":15.1,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x6 x 192 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X8-96-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":8,"actualT":1.5,"actualW":7.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":9.48,"mark_on":0.05,"sellingPrice":9.95,"onHand":24,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x8 x 96 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X8-120-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":8,"actualT":1.5,"actualW":7.25,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":11.85,"mark_on":0.05,"sellingPrice":12.44,"onHand":16,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x8 x 120 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X8-144-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":8,"actualT":1.5,"actualW":7.25,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":14.22,"mark_on":0.05,"sellingPrice":14.93,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x8 x 144 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X8-192-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":8,"actualT":1.5,"actualW":7.25,"stockL_in":192,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":18.96,"mark_on":0.05,"sellingPrice":19.91,"onHand":6,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x8 x 192 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-4X4-96-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":4,"nominalW":4,"actualT":3.5,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":8.76,"mark_on":0.05,"sellingPrice":9.2,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED"],"priceBasis":"CALCULATED","observationId":null,"limitations":["Envelope check required — 3.5 in thickness may exceed D-001 mill depth"],"description":"4x4 x 96 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-4X4-120-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":4,"nominalW":4,"actualT":3.5,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":10.95,"mark_on":0.05,"sellingPrice":11.5,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED"],"priceBasis":"CALCULATED","observationId":null,"limitations":["Envelope check required — 3.5 in thickness may exceed D-001 mill depth"],"description":"4x4 x 120 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-4X4-144-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":4,"nominalW":4,"actualT":3.5,"actualW":3.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":13.13,"mark_on":0.05,"sellingPrice":13.79,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED"],"priceBasis":"CALCULATED","observationId":null,"limitations":["Envelope check required — 3.5 in thickness may exceed D-001 mill depth"],"description":"4x4 x 144 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X4-72-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":8.24,"mark_on":0.05,"sellingPrice":8.65,"onHand":30,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 72 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X4-96-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":10.99,"mark_on":0.05,"sellingPrice":11.54,"onHand":36,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-008","limitations":[],"description":"1x4 x 96 in select pine S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-008","value":10.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PINE-1X4-120-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":13.74,"mark_on":0.05,"sellingPrice":14.43,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 120 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X4-144-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":16.48,"mark_on":0.05,"sellingPrice":17.3,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 144 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X6-72-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":14.99,"mark_on":0.05,"sellingPrice":15.74,"onHand":30,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-006","limitations":[],"description":"1x6 x 72 in select pine S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-006","value":14.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PINE-1X6-96-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":19.99,"mark_on":0.05,"sellingPrice":20.99,"onHand":36,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-007","limitations":[],"description":"1x6 x 96 in select pine S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-007","value":19.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PINE-1X6-120-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":24.99,"mark_on":0.05,"sellingPrice":26.24,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 120 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X6-144-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":29.98,"mark_on":0.05,"sellingPrice":31.48,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 144 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X8-72-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":19.76,"mark_on":0.05,"sellingPrice":20.75,"onHand":30,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 72 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X8-96-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":26.35,"mark_on":0.05,"sellingPrice":27.67,"onHand":36,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 96 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X8-120-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":32.94,"mark_on":0.05,"sellingPrice":34.59,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 120 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X8-144-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":39.53,"mark_on":0.05,"sellingPrice":41.51,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 144 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINEQ-1X4-96-001","offered":true,"form":"board","species":"pine","grade":"quality","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":5.97,"mark_on":0.05,"sellingPrice":6.27,"onHand":50,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL"],"priceBasis":"CALCULATED","observationId":"OBS-009","limitations":[],"description":"1x4 x 96 in quality pine S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-009","value":5.97},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PINESTD-1X4-96-001","offered":true,"form":"board","species":"pine","grade":"standard","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":2.73,"mark_on":0.05,"sellingPrice":2.87,"onHand":80,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT"],"priceBasis":"CALCULATED","observationId":"OBS-010","limitations":["Appearance not guaranteed — rustic / knotty"],"description":"1x4 x 96 in standard pine S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-010","value":2.73},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PINEQ-1X8-96-001","offered":true,"form":"board","species":"pine","grade":"quality","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":11.98,"mark_on":0.05,"sellingPrice":12.58,"onHand":22,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE"],"priceBasis":"CALCULATED","observationId":"OBS-011","limitations":[],"description":"1x8 x 96 in quality pine S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-011","value":11.98},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-POP-1X6-72-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":22.99,"mark_on":0.05,"sellingPrice":24.14,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-012","limitations":[],"description":"1x6 x 72 in poplar S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-012","value":22.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-POP-1X4-96-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":17.99,"mark_on":0.05,"sellingPrice":18.89,"onHand":16,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-013","limitations":[],"description":"1x4 x 96 in poplar S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-013","value":17.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-POP-1X8-120-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":46.7,"mark_on":0.05,"sellingPrice":49.04,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-014","limitations":[],"description":"1x8 x 120 in poplar S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-014","value":46.7},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-POP-1X4-72-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":13.49,"mark_on":0.05,"sellingPrice":14.16,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 72 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X4-120-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":22.49,"mark_on":0.05,"sellingPrice":23.61,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 120 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X4-144-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":26.98,"mark_on":0.05,"sellingPrice":28.33,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 144 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X6-96-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":30.65,"mark_on":0.05,"sellingPrice":32.18,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 96 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X6-120-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":38.32,"mark_on":0.05,"sellingPrice":40.24,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 120 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X6-144-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":45.98,"mark_on":0.05,"sellingPrice":48.28,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 144 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X8-72-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":28.02,"mark_on":0.05,"sellingPrice":29.42,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 72 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X8-96-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":37.36,"mark_on":0.05,"sellingPrice":39.23,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 96 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-POP-1X8-144-001","offered":true,"form":"board","species":"poplar","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":56.04,"mark_on":0.05,"sellingPrice":58.84,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","RABBET","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 144 in poplar S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X4-96-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":22.99,"mark_on":0.05,"sellingPrice":24.14,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-015","limitations":[],"description":"1x4 x 96 in red oak S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-015","value":22.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-OAK-1X6-72-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":24.99,"mark_on":0.05,"sellingPrice":26.24,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":"OBS-016","limitations":[],"description":"1x6 x 72 in red oak S4S","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-016","value":24.99},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-OAK-1X4-72-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":17.24,"mark_on":0.05,"sellingPrice":18.1,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 72 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X4-120-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":28.74,"mark_on":0.05,"sellingPrice":30.18,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x4 x 120 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X6-96-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":33.32,"mark_on":0.05,"sellingPrice":34.99,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 96 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X6-120-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":41.65,"mark_on":0.05,"sellingPrice":43.73,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x6 x 120 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X8-72-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":32.94,"mark_on":0.05,"sellingPrice":34.59,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 72 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X8-96-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":43.92,"mark_on":0.05,"sellingPrice":46.12,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 96 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-OAK-1X8-120-001","offered":true,"form":"board","species":"oak","grade":"select","nominalT":1,"nominalW":8,"actualT":0.75,"actualW":7.25,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":54.9,"mark_on":0.05,"sellingPrice":57.65,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","DADO","GROOVE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x8 x 120 in red oak S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-CHR-1X4-72-001","offered":true,"form":"board","species":"cherry","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":27.59,"mark_on":0.05,"sellingPrice":28.97,"onHand":6,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":["No OBSERVED cherry 1x list in the 2026-09-10 basket"],"description":"1x4 x 72 in cherry S4S (no public 1x peg — 1.6 × oak)","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null,"note":"No public 1x cherry observation in the 2026-09-10 basket. list_reference is calculated 1.6 x oak."},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"},"listReferenceDerivation":{"basis":"CALCULATED","rule":"1.6 × corresponding oak list_reference"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-CHR-1X4-96-001","offered":true,"form":"board","species":"cherry","grade":"select","nominalT":1,"nominalW":4,"actualT":0.75,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":36.78,"mark_on":0.05,"sellingPrice":38.62,"onHand":6,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":["No OBSERVED cherry 1x list in the 2026-09-10 basket"],"description":"1x4 x 96 in cherry S4S (no public 1x peg — 1.6 × oak)","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null,"note":"No public 1x cherry observation in the 2026-09-10 basket. list_reference is calculated 1.6 x oak."},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"},"listReferenceDerivation":{"basis":"CALCULATED","rule":"1.6 × corresponding oak list_reference"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-CHR-1X6-72-001","offered":true,"form":"board","species":"cherry","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":39.98,"mark_on":0.05,"sellingPrice":41.98,"onHand":6,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":["No OBSERVED cherry 1x list in the 2026-09-10 basket"],"description":"1x6 x 72 in cherry S4S (no public 1x peg — 1.6 × oak)","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null,"note":"No public 1x cherry observation in the 2026-09-10 basket. list_reference is calculated 1.6 x oak."},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"},"listReferenceDerivation":{"basis":"CALCULATED","rule":"1.6 × corresponding oak list_reference"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-CHR-1X6-96-001","offered":true,"form":"board","species":"cherry","grade":"select","nominalT":1,"nominalW":6,"actualT":0.75,"actualW":5.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":53.31,"mark_on":0.05,"sellingPrice":55.98,"onHand":6,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":["No OBSERVED cherry 1x list in the 2026-09-10 basket"],"description":"1x6 x 96 in cherry S4S (no public 1x peg — 1.6 × oak)","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null,"note":"No public 1x cherry observation in the 2026-09-10 basket. list_reference is calculated 1.6 x oak."},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"},"listReferenceDerivation":{"basis":"CALCULATED","rule":"1.6 × corresponding oak list_reference"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PLY-050-48X96-001","offered":true,"form":"sheet","species":"pine","grade":"sheathing-4ply","nominalT":null,"nominalW":null,"actualT":0.5,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":96,"uom":"ea","list_reference":25.29,"mark_on":0.05,"sellingPrice":26.55,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP","ROUTE_PROFILE","RETAIN_TABS"],"priceBasis":"CALCULATED","observationId":"OBS-017","limitations":[],"description":"1/2 in x 48 x 96 4-ply sheathing","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-017","value":25.29},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PLY-063-48X96-001","offered":true,"form":"sheet","species":"fir","grade":"BCX-sanded","nominalT":null,"nominalW":null,"actualT":0.625,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":96,"uom":"ea","list_reference":47.89,"mark_on":0.05,"sellingPrice":50.28,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP","DADO","GROOVE","ROUTE_PROFILE","RETAIN_TABS"],"priceBasis":"CALCULATED","observationId":"OBS-018","limitations":[],"description":"5/8 in x 48 x 96 BCX sanded plywood","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-018","value":47.89},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-OSB-075-48X96-001","offered":true,"form":"sheet","species":"osb","grade":"square-edge","nominalT":null,"nominalW":null,"actualT":0.75,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":96,"uom":"ea","list_reference":27.1,"mark_on":0.05,"sellingPrice":28.46,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP"],"priceBasis":"CALCULATED","observationId":"OBS-019","limitations":[],"description":"3/4 in x 48 x 96 square-edge OSB","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-019","value":27.1},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-PLY-025-48X96-001","offered":true,"form":"sheet","species":"fir","grade":"sanded-utility","nominalT":null,"nominalW":null,"actualT":0.25,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":96,"uom":"ea","list_reference":13.91,"mark_on":0.05,"sellingPrice":14.61,"onHand":14,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP","DADO"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"0/25 approx in x 48 x 96 sanded-utility","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PLY-025-48X48-001","offered":true,"form":"sheet","species":"fir","grade":"sanded-utility","nominalT":null,"nominalW":null,"actualT":0.25,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":48,"uom":"ea","list_reference":8.07,"mark_on":0.05,"sellingPrice":8.47,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"0.25 in x 48 x 48 handi-panel sanded-utility","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PLY-038-48X96-001","offered":true,"form":"sheet","species":"fir","grade":"ACX","nominalT":null,"nominalW":null,"actualT":0.375,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":96,"uom":"ea","list_reference":18.21,"mark_on":0.05,"sellingPrice":19.12,"onHand":14,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP","DADO","ROUTE_PROFILE","RETAIN_TABS"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"0/38 approx in x 48 x 96 ACX","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PLY-038-48X48-001","offered":true,"form":"sheet","species":"fir","grade":"ACX","nominalT":null,"nominalW":null,"actualT":0.375,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":48,"uom":"ea","list_reference":10.56,"mark_on":0.05,"sellingPrice":11.09,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"0.375 in x 48 x 48 handi-panel ACX","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PLY-075-48X96-001","offered":true,"form":"sheet","species":"fir","grade":"ACX-sanded","nominalT":null,"nominalW":null,"actualT":0.75,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":96,"uom":"ea","list_reference":55.07,"mark_on":0.05,"sellingPrice":57.82,"onHand":14,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP","DADO","ROUTE_PROFILE","RETAIN_TABS"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"0/75 approx in x 48 x 96 ACX-sanded","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PLY-075-48X48-001","offered":true,"form":"sheet","species":"fir","grade":"ACX-sanded","nominalT":null,"nominalW":null,"actualT":0.75,"actualW":null,"stockL_in":null,"sheetW_in":48,"sheetL_in":48,"uom":"ea","list_reference":31.94,"mark_on":0.05,"sellingPrice":33.54,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["S-001"],"supportedOps":["CROSSCUT","RIP"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"0.75 in x 48 x 48 handi-panel ACX-sanded","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-SHELFPIN-5MM-12-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"pkg","list_reference":2.49,"mark_on":0.05,"sellingPrice":2.61,"onHand":40,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":"OBS-020","limitations":["Sourced component — not fabricated on D-001"],"description":"5 mm nickel angle shelf support — 12 pack","assertions":{"externalListPrice":{"basis":"OBSERVED","observationId":"OBS-020","value":2.49},"materialMapping":{"basis":"MAPPED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"OBSERVED"},{"storeSku":"STB-ZERO-HW-SHELFPIN-5MM-100-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"box","list_reference":14.52,"mark_on":0.05,"sellingPrice":15.25,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced component"],"description":"5 mm shelf pins — 100 box","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-SCREW-8X150-110-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"box","list_reference":14.29,"mark_on":0.05,"sellingPrice":15,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced component"],"description":"#8 x 1-1/2 in wood screw 110 count (GRK-class reference)","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-ALCOVE-PACK-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"kit","list_reference":17.14,"mark_on":0.05,"sellingPrice":18,"onHand":25,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced kit — selling price is fixture policy"],"description":"Alcove hardware pack — pins + screws","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-PICNIC-BOLT-PACK-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"kit","list_reference":12.5,"mark_on":0.05,"sellingPrice":13.13,"onHand":15,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced kit"],"description":"Picnic table carriage-bolt pack","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-HINGE-CONCEAL-2-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"pr","list_reference":8.99,"mark_on":0.05,"sellingPrice":9.44,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced. Door features are not Stage-2 project-class defaults."],"description":"Concealed hinge pair — alcove door option later","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PT-2X4-96-001","offered":true,"form":"board","species":"syp-treated","grade":"above-ground","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":4.58,"mark_on":0.05,"sellingPrice":4.81,"onHand":30,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED"],"priceBasis":"CALCULATED","observationId":null,"limitations":["Treated stock — finish and indoor use are project facts, not Store facts"],"description":"2x4 x 96 in treated SYP above-ground","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PT-2X4-120-001","offered":true,"form":"board","species":"syp-treated","grade":"above-ground","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":5.72,"mark_on":0.05,"sellingPrice":6.01,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED"],"priceBasis":"CALCULATED","observationId":null,"limitations":["Treated stock — finish and indoor use are project facts, not Store facts"],"description":"2x4 x 120 in treated SYP above-ground","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PT-2X4-144-001","offered":true,"form":"board","species":"syp-treated","grade":"above-ground","nominalT":2,"nominalW":4,"actualT":1.5,"actualW":3.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":6.87,"mark_on":0.05,"sellingPrice":7.21,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED"],"priceBasis":"CALCULATED","observationId":null,"limitations":["Treated stock — finish and indoor use are project facts, not Store facts"],"description":"2x4 x 144 in treated SYP above-ground","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PT-4X4-96-001","offered":true,"form":"board","species":"syp-treated","grade":"ground-contact","nominalT":4,"nominalW":4,"actualT":3.5,"actualW":3.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":9.49,"mark_on":0.05,"sellingPrice":9.96,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT"],"priceBasis":"CALCULATED","observationId":null,"limitations":["3.5 in section — mill depth may be unsupported on D-001"],"description":"4x4 x 96 in treated SYP ground-contact","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PT-4X4-120-001","offered":true,"form":"board","species":"syp-treated","grade":"ground-contact","nominalT":4,"nominalW":4,"actualT":3.5,"actualW":3.5,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":11.86,"mark_on":0.05,"sellingPrice":12.45,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT"],"priceBasis":"CALCULATED","observationId":null,"limitations":["3.5 in section — mill depth may be unsupported on D-001"],"description":"4x4 x 120 in treated SYP ground-contact","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PT-4X4-144-001","offered":true,"form":"board","species":"syp-treated","grade":"ground-contact","nominalT":4,"nominalW":4,"actualT":3.5,"actualW":3.5,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":14.23,"mark_on":0.05,"sellingPrice":14.94,"onHand":10,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT"],"priceBasis":"CALCULATED","observationId":null,"limitations":["3.5 in section — mill depth may be unsupported on D-001"],"description":"4x4 x 144 in treated SYP ground-contact","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X10-96-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":10,"actualT":0.75,"actualW":9.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":33.62,"mark_on":0.05,"sellingPrice":35.3,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x10 x 96 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X10-120-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":10,"actualT":0.75,"actualW":9.25,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":42.02,"mark_on":0.05,"sellingPrice":44.12,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x10 x 120 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X10-144-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":10,"actualT":0.75,"actualW":9.25,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":50.43,"mark_on":0.05,"sellingPrice":52.95,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x10 x 144 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X2-72-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":2,"actualT":0.75,"actualW":1.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":1.59,"mark_on":0.05,"sellingPrice":1.67,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x2 x 72 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X2-96-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":2,"actualT":0.75,"actualW":1.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":2.12,"mark_on":0.05,"sellingPrice":2.23,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x2 x 96 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X3-72-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":3,"actualT":0.75,"actualW":2.5,"stockL_in":72,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":3.65,"mark_on":0.05,"sellingPrice":3.83,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x3 x 72 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-PINE-1X3-96-001","offered":true,"form":"board","species":"pine","grade":"select","nominalT":1,"nominalW":3,"actualT":0.75,"actualW":2.5,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":4.87,"mark_on":0.05,"sellingPrice":5.11,"onHand":20,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"1x3 x 96 in select pine S4S","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X10-96-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":10,"actualT":1.5,"actualW":9.25,"stockL_in":96,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":12.09,"mark_on":0.05,"sellingPrice":12.69,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x10 x 96 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X10-120-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":10,"actualT":1.5,"actualW":9.25,"stockL_in":120,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":15.12,"mark_on":0.05,"sellingPrice":15.88,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x10 x 120 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-SPF-2X10-144-001","offered":true,"form":"board","species":"spf","grade":"construction","nominalT":2,"nominalW":10,"actualT":1.5,"actualW":9.25,"stockL_in":144,"sheetW_in":null,"sheetL_in":null,"uom":"ea","list_reference":18.14,"mark_on":0.05,"sellingPrice":19.05,"onHand":8,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":["D-001"],"supportedOps":["CROSSCUT","MITER_LIMITED","DRILL","MILL_LONGITUDINAL_PROFILE","MILL_END_PROFILE"],"priceBasis":"CALCULATED","observationId":null,"limitations":[],"description":"2x10 x 144 in SPF construction","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-SCREW-10X300-LB-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"box","list_reference":11.98,"mark_on":0.05,"sellingPrice":12.58,"onHand":12,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced component"],"description":"#10 x 3 in construction screw 1 lb","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"},{"storeSku":"STB-ZERO-HW-CARR-BOLT-516-4-001","offered":true,"form":"hardware","species":null,"grade":null,"nominalT":null,"nominalW":null,"actualT":null,"actualW":null,"stockL_in":null,"sheetW_in":null,"sheetL_in":null,"uom":"box","list_reference":6.49,"mark_on":0.05,"sellingPrice":6.81,"onHand":18,"allocated":0,"supplierPath":"SPECIAL_ORDER_REPRESENTED","cellFamily":[],"supportedOps":[],"priceBasis":"CALCULATED","observationId":null,"limitations":["Sourced component"],"description":"5/16 x 4 in carriage bolt box","assertions":{"externalListPrice":{"basis":"NONE","observationId":null,"value":null},"materialMapping":{"basis":"DECLARED"},"sellingPrice":{"basis":"CALCULATED"},"pricingRule":{"basis":"DECLARED_FIXTURE","ruleId":"SZ-MARK-ON-5"},"onHand":{"basis":"SYNTHETIC_FIXTURE","label":"fixture-declared on-hand stock"},"allocation":{"basis":"SIMULATED_STATE"},"supplierPath":{"basis":"SYNTHETIC_FIXTURE"},"cellCompatibility":{"basis":"DECLARED_STAGE2_CAPABILITY"}},"listReferenceBasis":"CALCULATED"}]});

/**
 * S-001 Mode-2 Stage-2 REFERENCE envelope.
 * measured = false. commissioned = false.
 * Does not replace D-001 envelopeCheck. Sheet must not fall through dimensional logic.
 *
 * Declared relationship (issued specification / claims; not commissioned hardware):
 * - vertical tooling assembly remains at machine centerline in X
 * - tooling platform moves vertically / in Y
 * - sheet itself moves along X via servo-controlled manipulating rollers / rotating yokes
 * - router provides the cutting tool; depth is bounded in Z
 * - coordinated sheet-X and tool-Y permit straight and curvilinear 2D profiles
 * - selected attachment points may remain; secondary separation is later
 */
const S001_MODE2_ENVELOPE = {
  id: "S001-MODE2-STENCIL-V1",
  capabilityId: "SHEET_MODE2_STENCIL_V1",
  basis: "DECLARED_STAGE2_CAPABILITY",
  evidenceClass: "REFERENCE",
  measured: false,
  commissioned: false,
  physicalStatus: "NOT_CLAIMED",
  relationship: {
    toolingX: "vertical tooling assembly remains at machine centerline in X",
    toolingY: "tooling platform moves vertically / in Y",
    sheetX: "sheet itself moves along X via servo-controlled manipulating rollers / rotating yokes",
    tool: "router",
    depthZ: "bounded router depth; not commissioned sensor-controlled Z",
    profiles: "straight and curvilinear two-dimensional profiles",
    stencil: "selected attachment points may remain; secondary separation later",
    not: "Mode 3 moving-tool X/Y carrier-plate architecture; generic CNC router flattening"
  },
  stock: {
    form: "sheet",
    parentW_in: 48,
    parentL_in: 96,
    minBlankIn: 6,
    maxRouteDepthIn: 0.75
  },
  profileKinds: ["STRAIGHT_RECT", "CURVILINEAR_OUTLINE"],
  requiredOps: ["ROUTE_PROFILE", "RETAIN_TABS"],
  cellFamily: "S-001"
};

const SHEET_MODE2_PROFILE_KINDS = S001_MODE2_ENVELOPE.profileKinds;

function evaluateSheetMode2(item, req = {}) {
  const reasons = [];
  const unresolved = [];
  const env = S001_MODE2_ENVELOPE;

  if (!item) {
    return { status: "REFUSED", reasons: ["NO_OFFERING"], unresolved, envelope: env.id, capabilityId: env.capabilityId };
  }
  if (item.form !== "sheet") {
    return {
      status: "REFUSED",
      reasons: ["SHEET_MODE2_NOT_DIMENSIONAL", `FORM_${String(item.form).toUpperCase()}`],
      unresolved,
      envelope: env.id,
      capabilityId: env.capabilityId
    };
  }

  const family = item.cellFamily || [];
  if (family.length && !family.includes("S-001")) reasons.push("CELL_FAMILY_NOT_S001");

  const have = new Set(item.supportedOps || []);
  const missing = env.requiredOps.filter((op) => !have.has(op));
  if (missing.length) reasons.push(`OP_NOT_ON_OFFERING:${missing.join(",")}`);

  const kind = req.profileKind;
  if (!kind) unresolved.push("PROFILE_KIND_MISSING");
  else if (!env.profileKinds.includes(kind)) reasons.push("PROFILE_KIND_UNSUPPORTED");
  else if (kind === "CURVILINEAR_OUTLINE") unresolved.push("CURVILINEAR_GEOMETRY_REQUIRED");

  const L = req.blankL_in;
  const W = req.blankW_in;
  if (L == null || W == null) unresolved.push("BLANK_SIZE_MISSING");
  else if (!(Number.isFinite(L) && Number.isFinite(W))) unresolved.push("BLANK_SIZE_NOT_NUMERIC");
  else {
    if (L < env.stock.minBlankIn || W < env.stock.minBlankIn) reasons.push("BLANK_BELOW_REFERENCE_MINIMUM");
    const parentW = item.sheetW_in ?? env.stock.parentW_in;
    const parentL = item.sheetL_in ?? env.stock.parentL_in;
    if (L > parentL || W > parentW) reasons.push("BLANK_EXCEEDS_PARENT_SHEET");
  }

  const tabs = req.tabCount;
  if (tabs == null) unresolved.push("TAB_COUNT_MISSING");
  else if (!Number.isInteger(tabs) || tabs < 1) reasons.push("STENCIL_TABS_REQUIRED");

  if (req.routeDepthIn == null) unresolved.push("ROUTE_DEPTH_UNRESOLVED");
  else if (!Number.isFinite(req.routeDepthIn) || req.routeDepthIn <= 0) reasons.push("ROUTE_DEPTH_INVALID");
  else {
    if (req.routeDepthIn > env.stock.maxRouteDepthIn) reasons.push("ROUTE_DEPTH_EXCEEDS_REFERENCE_ENVELOPE");
    if (item.actualT != null && req.routeDepthIn > item.actualT) reasons.push("ROUTE_DEPTH_EXCEEDS_STOCK_THICKNESS");
  }

  if (req.spline || req.toolpath || req.gcode || req.controller) {
    reasons.push("MACHINE_LOCAL_LANGUAGE_NOT_ACCEPTED");
  }

  if (reasons.length) {
    return { status: "REFUSED", reasons, unresolved, envelope: env.id, capabilityId: env.capabilityId };
  }
  if (unresolved.length) {
    return { status: "UNRESOLVED", reasons, unresolved, envelope: env.id, capabilityId: env.capabilityId };
  }
  return {
    status: "SUPPORTABLE",
    reasons: [],
    unresolved: [],
    envelope: env.id,
    capabilityId: env.capabilityId,
    evidenceClass: "REFERENCE",
    physicalStatus: "NOT_CLAIMED",
    measured: false,
    commissioned: false,
    profileKind: kind,
    secondarySeparation: "OPERATOR_OR_LATER — not claimed automated"
  };
}

function sheetMode2NeutralOps(req = {}) {
  return [
    "LOAD",
    "SEAT",
    "REGISTER",
    "ROUTE_PROFILE",
    req.tabCount ? "RETAIN_TABS" : null,
    "RELEASE",
    "SECONDARY_SEPARATION",
    "LABEL"
  ].filter(Boolean);
}


/**
 * Circular-segment geometry for SHEET_MODE2_ARCHED_APERTURE_V0.
 * Canonical pair is chord + rise. Radius is derived and checked.
 * Not a CAD kernel. Not a toolpath.
 */
const CIRCULAR_SEGMENT_V0 = {
  id: "CIRCULAR_SEGMENT_V0",
  canonicalPair: ["chord_in", "rise_in"],
  derived: "radius_in",
  radiusToleranceIn: 0.001
};

function radiusFromChordRise(chord, rise) {
  if (!(Number.isFinite(chord) && Number.isFinite(rise))) return null;
  if (!(chord > 0 && rise > 0)) return null;
  if (rise * 2 >= chord && false) {
    // rise may exceed chord/2 (more than a semicircle). Allow as long as formula is defined.
  }
  return chord * chord / (8 * rise) + rise / 2;
}

function evaluateCircularSegment({ chord_in, rise_in, radius_in } = {}) {
  const reasons = [];
  const unresolved = [];

  if (chord_in == null || rise_in == null) {
    unresolved.push("CURVE_CHORD_OR_RISE_MISSING");
    return { ok: false, status: "UNRESOLVED", reasons, unresolved, radius_in: null, derivedRadius_in: null };
  }
  if (!(Number.isFinite(chord_in) && Number.isFinite(rise_in))) {
    return {
      ok: false,
      status: "REFUSED",
      reasons: ["CURVE_NOT_NUMERIC"],
      unresolved,
      radius_in: null,
      derivedRadius_in: null
    };
  }
  if (!(chord_in > 0 && rise_in > 0)) {
    return {
      ok: false,
      status: "REFUSED",
      reasons: ["CURVE_CHORD_OR_RISE_INVALID"],
      unresolved,
      radius_in: null,
      derivedRadius_in: null
    };
  }

  const derived = radiusFromChordRise(chord_in, rise_in);
  if (derived == null || !Number.isFinite(derived) || derived <= 0) {
    return {
      ok: false,
      status: "REFUSED",
      reasons: ["CURVE_RADIUS_NOT_CONSTRUCTIBLE"],
      unresolved,
      radius_in: null,
      derivedRadius_in: null
    };
  }

  if (radius_in != null) {
    if (!Number.isFinite(radius_in) || radius_in <= 0) {
      return {
        ok: false,
        status: "REFUSED",
        reasons: ["CURVE_RADIUS_INVALID"],
        unresolved,
        radius_in,
        derivedRadius_in: derived
      };
    }
    if (Math.abs(radius_in - derived) > CIRCULAR_SEGMENT_V0.radiusToleranceIn) {
      return {
        ok: false,
        status: "REFUSED",
        reasons: ["CURVE_RADIUS_CONTRADICTS_CHORD_RISE"],
        unresolved,
        radius_in,
        derivedRadius_in: derived
      };
    }
  }

  return {
    ok: true,
    status: "SUPPORTABLE",
    reasons: [],
    unresolved: [],
    radius_in: radius_in ?? derived,
    derivedRadius_in: derived,
    chord_in,
    rise_in,
    geometryClass: "CURVILINEAR",
    curveKind: "CIRCULAR_SEGMENT"
  };
}

function referenceArchedAperture() {
  const chord_in = 36;
  const rise_in = 12;
  const derived = radiusFromChordRise(chord_in, rise_in);
  return {
    outerW_in: 48,
    outerL_in: 72,
    apertureW_in: 36,
    apertureStraightH_in: 36,
    chord_in,
    rise_in,
    radius_in: derived
  };
}


/**
 * REFERENCE stencil-tab planning policy for S-001 Mode-2 arched apertures.
 *
 * This is geometry/planning logic, not a physical holding-force model and not a
 * safety factor. Commercial CAM practice commonly exposes tab count/distance,
 * width/height, and manual/automatic placement. This V0 keeps those concerns
 * separate and does not invent unmeasured plywood retention constants.
 */
const STENCIL_TAB_POLICY_V0 = Object.freeze({
  id: "S001-STENCIL-TAB-POLICY-V0",
  evidenceClass: "REFERENCE",
  physicalRetentionStatus: "NOT_MEASURED",
  placementMethod: "DISTRIBUTED_ARCLENGTH_TRANSITION_AVOIDANCE",
  referenceBaseCount: 4,
  planningReserveTabs: 1,
  maxAllowedGap_in: null,
  minBridgeWidth_in: null,
  minRemainingThickness_in: null,
  cornerKeepout_in: null,
  transitionKeepout_in: null,
  userVeto: "PLANNED_RE-SOLVE",
  note:
    "The extra tab is a conservative planning reserve only. It is not a validated safety factor or proof of workholding sufficiency."
});

function finitePositive(value) {
  return Number.isFinite(value) && value > 0;
}

function round6(value) {
  return Number(value.toFixed(6));
}

function archedAperturePerimeter({
  chord_in,
  rise_in,
  radius_in,
  straightHeight_in
} = {}) {
  if (![chord_in, rise_in, radius_in, straightHeight_in].every(finitePositive)) {
    return null;
  }
  const ratio = chord_in / (2 * radius_in);
  if (!(ratio > 0 && ratio <= 1)) return null;
  const arcAngle_rad = 2 * Math.asin(ratio);
  const arcLength_in = radius_in * arcAngle_rad;
  return {
    perimeter_in: chord_in + 2 * straightHeight_in + arcLength_in,
    arcAngle_rad,
    arcLength_in
  };
}

function transitionAvoidingPhase(perimeter, count, transitions) {
  const spacing = perimeter / count;
  const residues = transitions
    .map((value) => ((value % spacing) + spacing) % spacing)
    .sort((a, b) => a - b)
    .filter((value, index, list) => index === 0 || Math.abs(value - list[index - 1]) > 1e-9);
  if (residues.length === 0) return spacing / 2;

  let bestStart = residues[0];
  let bestGap = -1;
  for (let index = 0; index < residues.length; index += 1) {
    const start = residues[index];
    const end = index + 1 < residues.length ? residues[index + 1] : residues[0] + spacing;
    const gap = end - start;
    if (gap > bestGap) {
      bestGap = gap;
      bestStart = start;
    }
  }
  return (bestStart + bestGap / 2) % spacing;
}

function cyclicDistance(a, b, perimeter) {
  const raw = Math.abs(a - b) % perimeter;
  return Math.min(raw, perimeter - raw);
}

function pointAtArclength({ chord_in, rise_in, radius_in, straightHeight_in }, arclength_in) {
  const half = chord_in / 2;
  const base = chord_in;
  const rightTop = base + straightHeight_in;
  const geometry = archedAperturePerimeter({ chord_in, rise_in, radius_in, straightHeight_in });
  if (!geometry) return null;
  const arcEnd = rightTop + geometry.arcLength_in;
  const perimeter = geometry.perimeter_in;
  const s = ((arclength_in % perimeter) + perimeter) % perimeter;

  if (s < base) {
    return { segment: "BOTTOM", x_in: -half + s, y_in: 0, curved: false };
  }
  if (s < rightTop) {
    return { segment: "RIGHT_SIDE", x_in: half, y_in: s - base, curved: false };
  }
  if (s < arcEnd) {
    const centerY = straightHeight_in + rise_in - radius_in;
    const endpointOffsetY = radius_in - rise_in;
    const startAngle = Math.atan2(endpointOffsetY, half);
    const angle = startAngle + (s - rightTop) / radius_in;
    return {
      segment: "ARCH",
      x_in: radius_in * Math.cos(angle),
      y_in: centerY + radius_in * Math.sin(angle),
      curved: true
    };
  }
  return {
    segment: "LEFT_SIDE",
    x_in: -half,
    y_in: straightHeight_in - (s - arcEnd),
    curved: false
  };
}

function planArchedStencilTabs({
  chord_in,
  rise_in,
  radius_in,
  straightHeight_in,
  requestedTabCount
} = {}) {
  const geometry = archedAperturePerimeter({ chord_in, rise_in, radius_in, straightHeight_in });
  if (!geometry) {
    return { ok: false, status: "UNRESOLVED", reason: "TAB_PLAN_GEOMETRY_UNRESOLVED" };
  }
  if (requestedTabCount != null && (!Number.isInteger(requestedTabCount) || requestedTabCount < 1)) {
    return { ok: false, status: "REFUSED", reason: "TAB_PLAN_COUNT_INVALID" };
  }

  const spacingRequired = STENCIL_TAB_POLICY_V0.maxAllowedGap_in == null
    ? 0
    : Math.ceil(geometry.perimeter_in / STENCIL_TAB_POLICY_V0.maxAllowedGap_in);
  const policyMinimum = Math.max(STENCIL_TAB_POLICY_V0.referenceBaseCount, spacingRequired);
  const policyTarget = policyMinimum + STENCIL_TAB_POLICY_V0.planningReserveTabs;
  const plannedTabCount = Math.max(requestedTabCount ?? 0, policyTarget);
  const nominalSpacing = geometry.perimeter_in / plannedTabCount;

  const transitionArclengths = [
    0,
    chord_in,
    chord_in + straightHeight_in,
    chord_in + straightHeight_in + geometry.arcLength_in
  ];
  const phase = transitionAvoidingPhase(
    geometry.perimeter_in,
    plannedTabCount,
    transitionArclengths
  );

  const candidates = [];
  for (let index = 0; index < plannedTabCount; index += 1) {
    const arclength = (phase + index * nominalSpacing) % geometry.perimeter_in;
    const point = pointAtArclength(
      { chord_in, rise_in, radius_in, straightHeight_in },
      arclength
    );
    const transitionDistance = Math.min(
      ...transitionArclengths.map((value) => cyclicDistance(arclength, value, geometry.perimeter_in))
    );
    candidates.push({
      index: index + 1,
      arclength_in: round6(arclength),
      normalizedArclength: round6(arclength / geometry.perimeter_in),
      segment: point.segment,
      curved: point.curved,
      x_in: round6(point.x_in),
      y_in: round6(point.y_in),
      distanceToNearestTransition_in: round6(transitionDistance)
    });
  }

  return {
    ok: true,
    status: "REFERENCE_PLAN_READY",
    policyId: STENCIL_TAB_POLICY_V0.id,
    evidenceClass: STENCIL_TAB_POLICY_V0.evidenceClass,
    physicalRetentionStatus: STENCIL_TAB_POLICY_V0.physicalRetentionStatus,
    placementMethod: STENCIL_TAB_POLICY_V0.placementMethod,
    requestedTabCount: requestedTabCount ?? null,
    referenceBaseCount: STENCIL_TAB_POLICY_V0.referenceBaseCount,
    spacingRequiredCount: spacingRequired || null,
    planningReserveTabs: STENCIL_TAB_POLICY_V0.planningReserveTabs,
    plannedTabCount,
    perimeter_in: round6(geometry.perimeter_in),
    arcLength_in: round6(geometry.arcLength_in),
    nominalSpacing_in: round6(nominalSpacing),
    maxAllowedGap_in: STENCIL_TAB_POLICY_V0.maxAllowedGap_in,
    minBridgeWidth_in: STENCIL_TAB_POLICY_V0.minBridgeWidth_in,
    minRemainingThickness_in: STENCIL_TAB_POLICY_V0.minRemainingThickness_in,
    cornerKeepout_in: STENCIL_TAB_POLICY_V0.cornerKeepout_in,
    transitionKeepout_in: STENCIL_TAB_POLICY_V0.transitionKeepout_in,
    userVeto: STENCIL_TAB_POLICY_V0.userVeto,
    candidates,
    physicalNote:
      "Reference tab-plan geometry is complete. Bridge width, retained thickness, maximum proven gap, and physical holding performance remain unmeasured."
  };
}


/**
 * S-001 Mode-2 arched-aperture family.
 * First published curvilinear Store Zero study envelope.
 * Does not replace SHEET_MODE2_STENCIL_V1.
 * Does not claim the entire Mode-2 disclosure.
 */
const S001_MODE2_ARCHED_ENVELOPE = {
  id: "S001-MODE2-ARCHED-APERTURE-V0",
  capabilityId: "SHEET_MODE2_ARCHED_APERTURE_V0",
  parentCapabilityId: "SHEET_MODE2_STENCIL_V1",
  basis: "DECLARED_STAGE2_CAPABILITY",
  evidenceClass: "REFERENCE",
  measured: false,
  commissioned: false,
  physicalStatus: "NOT_CLAIMED",
  geometryClass: "CURVILINEAR",
  processClass: "MODE2_STENCIL_ROUTE",
  apertureKind: "ARCHED_RECT",
  outerKind: "STRAIGHT_RECT",
  minMarginIn: 3,
  workField: Object.freeze({
    id: "S001-CENTER-WORK-FIELD-V0",
    placement: "CENTERED_ON_PARENT",
    horizontalAxis: "PARENT_LONG_AXIS",
    verticalAxis: "PARENT_SHORT_AXIS",
    horizontalSpan_in: 48,
    verticalSpan_in: 36,
    containment: "WHOLE_PROFILE",
    edgeWork: "REFUSED_OUTSIDE_FIELD"
  }),
  tabPolicyId: STENCIL_TAB_POLICY_V0.id,
  tabWidth_in: STENCIL_TAB_POLICY_V0.minBridgeWidth_in,
  tabPlacement: STENCIL_TAB_POLICY_V0.placementMethod,
  referenceArchitecture: "S-001-MODE2-REFERENCE-ARCHITECTURE-0.1",
  controlsReference: "S-001-MODE2-CONTROLS-REFERENCE-0.1",
  stock: S001_MODE2_ENVELOPE.stock,
  requiredOps: S001_MODE2_ENVELOPE.requiredOps,
  cellFamily: "S-001",
  relationship: S001_MODE2_ENVELOPE.relationship
};

const REFERENCE_ARCHED_APERTURE = referenceArchedAperture();

function centeredWorkFieldResult(req, apertureW, openingH) {
  const field = S001_MODE2_ARCHED_ENVELOPE.workField;
  if (!(Number.isFinite(req.outerL_in) && Number.isFinite(req.outerW_in))) return null;
  const parentContainsField = req.outerL_in >= field.horizontalSpan_in && req.outerW_in >= field.verticalSpan_in;
  const profileInsideField = Number.isFinite(apertureW) && Number.isFinite(openingH)
    ? apertureW <= field.horizontalSpan_in && openingH <= field.verticalSpan_in
    : null;
  return {
    id: field.id,
    placement: field.placement,
    horizontalAxis: field.horizontalAxis,
    verticalAxis: field.verticalAxis,
    horizontalSpan_in: field.horizontalSpan_in,
    verticalSpan_in: field.verticalSpan_in,
    containment: field.containment,
    parentContainsField,
    profileInsideField,
    parentMargins_in: {
      left: (req.outerL_in - field.horizontalSpan_in) / 2,
      right: (req.outerL_in - field.horizontalSpan_in) / 2,
      bottom: (req.outerW_in - field.verticalSpan_in) / 2,
      top: (req.outerW_in - field.verticalSpan_in) / 2
    },
    profileMarginsWithinField_in: profileInsideField
      ? {
          left: (field.horizontalSpan_in - apertureW) / 2,
          right: (field.horizontalSpan_in - apertureW) / 2,
          bottom: (field.verticalSpan_in - openingH) / 2,
          top: (field.verticalSpan_in - openingH) / 2
        }
      : null
  };
}

function evaluateSheetMode2Arched(item, req = {}) {
  const env = S001_MODE2_ARCHED_ENVELOPE;
  const base = evaluateSheetMode2(item, {
    profileKind: "CURVILINEAR_OUTLINE",
    blankL_in: req.outerL_in,
    blankW_in: req.outerW_in,
    tabCount: req.tabCount,
    routeDepthIn: req.routeDepthIn,
    spline: req.spline,
    toolpath: req.toolpath,
    gcode: req.gcode,
    controller: req.controller
  });

  const reasons = [...base.reasons];
  const unresolved = [...base.unresolved].filter(
    (code) => code !== "PROFILE_KIND_MISSING" && code !== "CURVILINEAR_GEOMETRY_REQUIRED"
  );

  if (req.exteriorRatingRequested === true && item && item.grade !== "exterior" && item.rating !== "exterior") {
    unresolved.push("EXTERIOR_RATING_NOT_ESTABLISHED_BY_SKU");
  }

  const curve = evaluateCircularSegment({
    chord_in: req.arcChord_in,
    rise_in: req.arcRise_in,
    radius_in: req.arcRadius_in
  });
  if (!curve.ok) {
    reasons.push(...curve.reasons);
    unresolved.push(...curve.unresolved);
  }

  const apertureW = req.apertureW_in ?? req.arcChord_in;
  const apertureStraightH = req.apertureStraightH_in;
  let openingH = null;
  if (apertureW == null || apertureStraightH == null) {
    unresolved.push("APERTURE_SIZE_MISSING");
  } else if (!(Number.isFinite(apertureW) && Number.isFinite(apertureStraightH))) {
    reasons.push("APERTURE_SIZE_NOT_NUMERIC");
  } else if (!(apertureW > 0 && apertureStraightH > 0)) {
    reasons.push("APERTURE_SIZE_INVALID");
  } else if (curve.ok && Number.isFinite(req.outerL_in) && Number.isFinite(req.outerW_in)) {
    openingH = apertureStraightH + curve.rise_in;
    const margin = env.minMarginIn;
    if (apertureW + 2 * margin > req.outerL_in || openingH + 2 * margin > req.outerW_in) {
      reasons.push("APERTURE_OUTSIDE_OUTER_PANEL");
    }
    if (apertureW !== curve.chord_in) {
      reasons.push("APERTURE_WIDTH_MUST_EQUAL_CHORD");
    }
  }

  const workField = centeredWorkFieldResult(req, apertureW, openingH);
  if (workField && workField.parentContainsField === false) {
    reasons.push("CENTER_WORK_FIELD_OUTSIDE_PARENT");
  }
  if (workField && workField.profileInsideField === false) {
    reasons.push("CENTER_WORK_FIELD_EXCEEDED");
  }

  if (req.geometryClass && req.geometryClass !== "CURVILINEAR") {
    reasons.push("GEOMETRY_CLASS_NOT_CURVILINEAR");
  }

  let tabPlan = null;
  if (
    curve.ok &&
    Number.isFinite(apertureW) && apertureW > 0 &&
    Number.isFinite(apertureStraightH) && apertureStraightH > 0 &&
    apertureW === curve.chord_in
  ) {
    tabPlan = planArchedStencilTabs({
      chord_in: curve.chord_in,
      rise_in: curve.rise_in,
      radius_in: curve.radius_in,
      straightHeight_in: apertureStraightH,
      requestedTabCount: req.tabCount
    });
    if (!tabPlan.ok) {
      if (tabPlan.status === "REFUSED") reasons.push(tabPlan.reason);
      else unresolved.push(tabPlan.reason);
    }
  }

  const status = reasons.length
    ? "REFUSED"
    : unresolved.length
      ? "UNRESOLVED"
      : "SUPPORTABLE";

  return {
    status,
    reasons: [...new Set(reasons)],
    unresolved: [...new Set(unresolved)],
    envelope: env.id,
    capabilityId: env.capabilityId,
    parentCapabilityId: env.parentCapabilityId,
    evidenceClass: "REFERENCE",
    physicalStatus: "NOT_CLAIMED",
    measured: false,
    commissioned: false,
    geometryClass: curve.ok ? "CURVILINEAR" : null,
    processClass: env.processClass,
    profileKind: "ARCHED_APERTURE",
    outerKind: env.outerKind,
    apertureKind: env.apertureKind,
    workField,
    curve: curve.ok
      ? {
          kind: "CIRCULAR_SEGMENT",
          chord_in: curve.chord_in,
          rise_in: curve.rise_in,
          radius_in: curve.radius_in,
          derivedRadius_in: curve.derivedRadius_in
        }
      : null,
    retention: {
      class: "STENCIL_TABS",
      requestedTabCount: req.tabCount ?? null,
      plannedTabCount: tabPlan?.plannedTabCount ?? null,
      tabPolicyId: env.tabPolicyId,
      tabPlanStatus: tabPlan?.status ?? null,
      planningReserveTabs: tabPlan?.planningReserveTabs ?? STENCIL_TAB_POLICY_V0.planningReserveTabs,
      tabWidth_in: tabPlan?.minBridgeWidth_in ?? env.tabWidth_in,
      maxAllowedGap_in: tabPlan?.maxAllowedGap_in ?? STENCIL_TAB_POLICY_V0.maxAllowedGap_in,
      placement: env.tabPlacement,
      plan: tabPlan,
      fullSeverance: false,
      physicalRetentionStatus: STENCIL_TAB_POLICY_V0.physicalRetentionStatus,
      secondarySeparation: "OPERATOR_OR_LATER — not claimed automated"
    },
    secondarySeparation: "OPERATOR_OR_LATER — not claimed automated"
  };
}

function sheetMode2ArchedNeutralOps(req = {}) {
  return sheetMode2NeutralOps({ tabCount: req.tabCount ?? 1 });
}


/**
 * Store Zero Stage-2 callable Store
 * Ask for the answer, not the database.
 *
 * Job dispositions declared at Stage 2:
 *   UNRESOLVED  missing SKU or missing price
 *   REFUSED     required operation not in the offering / no offering
 *   UNAVAILABLE fixture-declared available stock < qty needed
 *               (ON_HAND_SHORT and NOT_ON_HAND both fail the job)
 *   SUPPORTABLE every line priced, capable, and sufficient
 *
 * Line stock facts remain: ON_HAND_SUFFICIENT | ON_HAND_SHORT | NOT_ON_HAND
 * DEFERRED and REFERRED are not Stage-2 Store Zero meanings.
 * A synthetic supplierPath does not convert a shortage into SUPPORTABLE.
 */
const STAGE2_JOB_DISPOSITIONS = [
  "SUPPORTABLE",
  "UNRESOLVED",
  "REFUSED",
  "UNAVAILABLE"
];

function loadCatalog(){ return CATALOG; }
function loadObservations(){ return { clock: CATALOG.clock || null, observations: [] }; }

function findSku(catalog, storeSku) {
  return catalog.offerings.find((o) => o.storeSku === storeSku) || null;
}

function offerMaterial(catalog, q) {
  return catalog.offerings.filter((o) => {
    if (q.species && o.species !== q.species) return false;
    if (q.form && o.form !== q.form) return false;
    if (q.nominalT != null && o.nominalT !== q.nominalT) return false;
    if (q.nominalW != null && o.nominalW !== q.nominalW) return false;
    if (q.stockL_in != null && o.stockL_in !== q.stockL_in) return false;
    return o.offered;
  });
}

function stockAnswer(item, qtyNeeded = 1) {
  if (!item) return { status: "UNAVAILABLE", reason: "SKU_NOT_OFFERED" };
  const available = item.onHand - item.allocated;
  return {
    status: available >= qtyNeeded ? "ON_HAND_SUFFICIENT" : available > 0 ? "ON_HAND_SHORT" : "NOT_ON_HAND",
    offered: item.offered,
    fixtureDeclaredOnHand: item.onHand,
    allocatedSimulated: item.allocated,
    available,
    qtyNeeded,
    sufficient: available >= qtyNeeded,
    supplierPath: item.supplierPath,
    assertions: {
      onHand: item.assertions.onHand,
      allocation: item.assertions.allocation,
      supplierPath: item.assertions.supplierPath
    },
    asOf: "2026-09-10"
  };
}

function priceAnswer(item) {
  if (!item || item.sellingPrice == null) return { status: "UNRESOLVED", reason: "MISSING_PRICE" };
  return {
    status: "STORE_ZERO_SELLING_PRICE",
    list_reference: item.list_reference,
    listReferenceBasis: item.listReferenceBasis,
    mark_on: item.mark_on,
    sellingPrice: item.sellingPrice,
    sellingPriceBasis: "CALCULATED",
    observationId: item.observationId || null,
    asOf: "2026-09-10",
    note: "Budgetary fixture price. Not a commercial quote."
  };
}

function capabilityAnswer(item, requiredOps = [], feature = {}) {
  if (!item) return { status: "REFUSED", reason: "NO_OFFERING" };
  const env = envelopeCheck(item, { requiredOps, ...feature });
  if (env.status === "SOURCED") {
    return { status: "SOURCED", envelope: env };
  }
  if (env.status === "REFUSED") {
    return {
      status: "REFUSED",
      missing: env.reasons,
      declared: item.supportedOps,
      cellFamily: item.cellFamily,
      basis: "DECLARED_STAGE2_CAPABILITY",
      envelope: env
    };
  }
  return {
    status: "SUPPORTABLE",
    declared: item.supportedOps,
    cellFamily: item.cellFamily,
    limitations: item.limitations || [],
    basis: "DECLARED_STAGE2_CAPABILITY",
    envelope: env
  };
}

function evaluateJob(catalog, spec) {
  const lines = [];
  let unresolved = false;
  let refused = false;
  let unavailable = false;
  for (const line of spec.lines) {
    const item = findSku(catalog, line.storeSku);
    const stock = stockAnswer(item, line.qty);
    const price = priceAnswer(item);
    const cap = capabilityAnswer(item, line.requiredOps || ["CROSSCUT"], {
      keptLengthIn: line.keptLengthIn,
      millYIn: line.millYIn,
      millDepthIn: line.millDepthIn
    });
    if (!item || price.status === "UNRESOLVED") unresolved = true;
    if (cap.status === "REFUSED") refused = true;
    if (stock.status === "NOT_ON_HAND" || stock.status === "ON_HAND_SHORT") unavailable = true;
    lines.push({
      storeSku: line.storeSku,
      description: item?.description,
      qty: line.qty,
      stock,
      price,
      capability: cap
    });
  }
  const status = unresolved ? "UNRESOLVED" : refused ? "REFUSED" : unavailable ? "UNAVAILABLE" : "SUPPORTABLE";
  return {
    title: spec.title,
    stage: 2,
    store: "Store Zero",
    status,
    lines,
    estimate: spec.estimate || null,
    not_claimed: ["live ERP", "Cycle Start", "Menards integration", "physical stock count", "commercial quote"]
  };
}

function pineAlcoveEvaluation(catalog) {
  const estimate = estimatePineAlcove(catalog);
  return evaluateJob(catalog, {
    title: estimate.title,
    estimate,
    lines: [
      { storeSku: "STB-ZERO-PINE-1X6-72-001", qty: 4, requiredOps: ["CROSSCUT"] },
      { storeSku: "STB-ZERO-PINE-1X6-96-001", qty: 10, requiredOps: ["CROSSCUT"] }
    ]
  });
}

const SHEET_NOT_CLAIMED = [
  "live ERP",
  "Cycle Start",
  "physical stock count",
  "commercial quote",
  "commissioned S-001",
  "automated secondary separation",
  "G-code",
  "measured cycle time"
];

function evaluateSheetMode2Job(catalog, spec) {
  const line = spec.line || spec.lines?.[0] || {};
  const item = findSku(catalog, line.storeSku);
  const stock = stockAnswer(item, line.qty || 1);
  const price = priceAnswer(item);
  const cap = evaluateSheetMode2(item, {
    profileKind: line.profileKind,
    blankL_in: line.blankL_in,
    blankW_in: line.blankW_in,
    tabCount: line.tabCount,
    routeDepthIn: line.routeDepthIn,
    spline: line.spline,
    toolpath: line.toolpath,
    gcode: line.gcode,
    controller: line.controller
  });
  let status;
  if (!item || price.status === "UNRESOLVED" || cap.status === "UNRESOLVED") status = "UNRESOLVED";
  else if (cap.status === "REFUSED") status = "REFUSED";
  else if (stock.status === "NOT_ON_HAND" || stock.status === "ON_HAND_SHORT") status = "UNAVAILABLE";
  else status = "SUPPORTABLE";
  return {
    title: spec.title || "Sheet Mode-2 stencil",
    stage: 2,
    store: "Store Zero",
    jobType: "SHEET_MODE2_STENCIL_V1",
    status,
    capabilityId: S001_MODE2_ENVELOPE.capabilityId,
    evidenceClass: "REFERENCE",
    physicalStatus: "NOT_CLAIMED",
    measured: false,
    commissioned: false,
    neutralOps: sheetMode2NeutralOps(line),
    line: {
      storeSku: line.storeSku,
      description: item?.description,
      qty: line.qty || 1,
      stock,
      price,
      capability: cap
    },
    estimate: spec.estimate || null,
    not_claimed: SHEET_NOT_CLAIMED
  };
}

function evaluateSheetMode2ArchedJob(catalog, spec) {
  const line = spec.line || spec.lines?.[0] || {};
  const item = findSku(catalog, line.storeSku);
  const stock = stockAnswer(item, line.qty || 1);
  const price = priceAnswer(item);
  const cap = evaluateSheetMode2Arched(item, {
    geometryClass: line.geometryClass || "CURVILINEAR",
    outerL_in: line.outerL_in ?? line.blankL_in,
    outerW_in: line.outerW_in ?? line.blankW_in,
    apertureW_in: line.apertureW_in,
    apertureStraightH_in: line.apertureStraightH_in,
    arcChord_in: line.arcChord_in,
    arcRise_in: line.arcRise_in,
    arcRadius_in: line.arcRadius_in,
    tabCount: line.tabCount,
    routeDepthIn: line.routeDepthIn,
    exteriorRatingRequested: line.exteriorRatingRequested,
    spline: line.spline,
    toolpath: line.toolpath,
    gcode: line.gcode,
    controller: line.controller
  });
  let status;
  if (!item || price.status === "UNRESOLVED" || cap.status === "UNRESOLVED") status = "UNRESOLVED";
  else if (cap.status === "REFUSED") status = "REFUSED";
  else if (stock.status === "NOT_ON_HAND" || stock.status === "ON_HAND_SHORT") status = "UNAVAILABLE";
  else status = "SUPPORTABLE";
  return {
    title: spec.title || "Sheet Mode-2 arched aperture",
    stage: 2,
    store: "Store Zero",
    jobType: "SHEET_MODE2_ARCHED_APERTURE_V0",
    status,
    capabilityId: S001_MODE2_ARCHED_ENVELOPE.capabilityId,
    evidenceClass: "REFERENCE",
    physicalStatus: "NOT_CLAIMED",
    measured: false,
    commissioned: false,
    geometryClass: cap.geometryClass,
    processClass: cap.processClass,
    referenceArchitecture: S001_MODE2_ARCHED_ENVELOPE.referenceArchitecture,
    controlsReference: S001_MODE2_ARCHED_ENVELOPE.controlsReference,
    basis: {
      materialSku: line.storeSku || null,
      materialForm: item?.form || null,
      materialThicknessIn: item?.actualT ?? null,
      parentW_in: item?.sheetW_in ?? null,
      parentL_in: item?.sheetL_in ?? null,
      observationId: item?.observationId || null,
      list_reference: item?.list_reference ?? null,
      mark_on: item?.mark_on ?? null,
      sellingPrice: item?.sellingPrice ?? null,
      sellingPriceBasis: item ? "CALCULATED" : null,
      capabilityId: S001_MODE2_ARCHED_ENVELOPE.capabilityId,
      envelope: S001_MODE2_ARCHED_ENVELOPE.id,
      geometryClass: cap.geometryClass,
      processClass: cap.processClass,
      retention: cap.retention,
      curve: cap.curve,
      evidenceClass: "REFERENCE",
      physicalStatus: "NOT_CLAIMED",
      processQ_status: "UNRESOLVED"
    },
    neutralOps: sheetMode2ArchedNeutralOps(line),
    line: {
      storeSku: line.storeSku,
      description: item?.description,
      qty: line.qty || 1,
      stock,
      price,
      capability: cap
    },
    estimate: spec.estimate || null,
    not_claimed: SHEET_NOT_CLAIMED
  };
}

function estimateSheetMode2Job(catalog, spec) {
  const line = spec.line || spec.lines?.[0] || {};
  const item = findSku(catalog, line.storeSku);
  const qty = line.qty || 1;
  if (!item || item.sellingPrice == null) {
    return { status: "UNRESOLVED", reason: "MISSING_PRICE", jobType: "SHEET_MODE2_STENCIL_V1" };
  }
  const material = Number((item.sellingPrice * qty).toFixed(2));
  return {
    status: "BUDGETARY_MATERIAL_ONLY",
    jobType: "SHEET_MODE2_STENCIL_V1",
    title: spec.title || "Sheet Mode-2 stencil",
    material,
    processQ: null,
    processQ_status: "UNRESOLVED",
    Q: material,
    Q_basis: "MATERIAL_FIXTURE_ONLY",
    note: "Budgetary material fixture only. Process time and fabrication Q are unresolved. Not a commercial quote."
  };
}

function estimateSheetMode2ArchedJob(catalog, spec) {
  const line = spec.line || spec.lines?.[0] || {};
  const item = findSku(catalog, line.storeSku);
  const qty = line.qty || 1;
  if (!item || item.sellingPrice == null) {
    return { status: "UNRESOLVED", reason: "MISSING_PRICE", jobType: "SHEET_MODE2_ARCHED_APERTURE_V0" };
  }
  const material = Number((item.sellingPrice * qty).toFixed(2));
  return {
    status: "BUDGETARY_MATERIAL_ONLY",
    jobType: "SHEET_MODE2_ARCHED_APERTURE_V0",
    title: spec.title || "Sheet Mode-2 arched aperture",
    material,
    processQ: null,
    processQ_status: "UNRESOLVED",
    Q: material,
    Q_basis: "MATERIAL_FIXTURE_ONLY",
    list_reference: item.list_reference,
    mark_on: item.mark_on,
    observationId: item.observationId || null,
    note: "Budgetary material fixture only. Process time and fabrication Q are unresolved. Not a commercial quote."
  };
}


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
