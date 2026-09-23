# Explore the bounded cell trial

## Is there a useful middle beside the wood already in stock?

A 2026 study in France reports an eighteen-month investigation involving 171 trees and four projects, examining how fabrication can adapt to locally available, irregular timber.[1] Its relevance here is the question it makes tangible: how might the relationship among material, design, and fabrication change when the material already at hand becomes a starting point?

This proposal examines a different, narrower setting: dimensional wood, a limited set of operations, and a small manufacturing cell associated with an existing source of material. The purpose is to determine whether there is a useful middle between supplying stock and operating a much broader fabrication service—and what equipment, information, and human effort that middle would require.

The application introduces the proposed journey from a customer’s definition to an evaluated job and eventual handoff. The experimental cell would investigate the physical assumptions beneath that journey. Together, they offer a way to ask a bounded question with evidence rather than expanding a demonstration until it appears to answer everything.

[Return to the demonstration’s closing explanation](01-From-Definition-to-Handoff.md).

## The starting point: what exists and what remains to be established

The existing repository work provides a digital starting point: project definitions, declared capability envelopes, Store evaluation, operation descriptions, and machine-build planning. Its machine-cell and engineering references identify a staged development path and candidate control technologies.[2] These are useful assets because they make the proposed behavior inspectable before physical equipment is assembled.

The digital baseline and physical baseline must remain distinct. A declared operation is not a measured machining result. A modeled time is not an observed cycle. A supportable Store answer establishes fit with the declared reference envelope; it does not establish that a built machine has achieved it.

The immediate task is to connect those definitions to a small physical experiment without losing their meaning. The experiment needs enough detail to be reproducible: identified hardware, a declared configuration, a defined workpiece, an operation sequence, a measurement method, and criteria agreed before the result is known.

The repository snapshots reviewed for this document are listed in the sources. They provide a documentary baseline, not a claim that every current public application route or later repository revision has been verified.

## Begin with one board and two saw locations

The first digital experiment should describe one manipulating roller mechanism moving one piece of wood back and forth between two fixed saw locations to bring it to the defined size. “Fixed” refers to the stations’ locations along the feed path; the saws still require their intended cutting and clearance motions.

This is small enough to expose the central questions. Can the board be referenced, moved, restrained, cut, and checked with repeatable results? Can the controller distinguish an intended position from a position the wood actually reached? What happens when movement or seating disagrees with the plan?

The job definition should preserve the relationship among the purchased stock, the workpiece being manipulated, the finished parts, and the remainder. A longer board need not be shortened before useful work begins unless the declared process requires it. Every cut must have a stated purpose, and every additional handling step must have a reason.

The digital study should first make the intended sequence explicit. It can then support a guarded physical trial through the machine-build program. Calling this a first digital experiment does not imply that a corresponding physical build has already been commissioned or proven.

## Define the proposed middle without assuming its success

The **candidate bounded cell** is **two manipulating rotors, two saws, three routers, and two spot-drill stations**. This is the configuration to develop and examine. The first trial need not contain all of it.

| Element | Proposed role | What the experimental definition must settle |
|---|---|---|
| Two manipulating rotors | Position and transfer dimensional stock through the cell | Geometry, engagement, traction, restraint, coordination, usable stock range, and observation of actual stock movement |
| Two saws | Perform the declared saw operations at defined stations | Tool and actuator selection, cutting envelope, clearance, restraint, kerf, and measurement of the result |
| Three routers | Provide the routing functions admitted to the bounded envelope | The particular role of each station, tools, axes, access, support, extraction, and verified operation limits |
| Two spot-drill stations | Locate and perform the declared spotting operations | Tool geometry, depth reference, placement, restraint, and evidence for the operation’s time and capability |
| Shared control and observation | Coordinate the sequence and detect departures from it | Axis and I/O inventory, references, sensor uncertainty, permitted responses, and recorded evidence |

Counts alone do not constitute a machine definition. The reviewed material does not yet fully specify this entire arrangement as one experimentally validated cell. The work ahead is to resolve those functions and interfaces without inventing capabilities merely to complete a diagram.

Spotting illustrates the required precision of definition. If the requirement is 3/16 inch of full-diameter penetration beyond the tool’s pointed portion, the tool diameter alone cannot establish total tip travel. The actual point geometry and the chosen surface reference are also needed. The trial should carry that requirement explicitly until a selected tool and measured setup resolve it; it should not substitute an assumed drill angle or an inherited cycle time.

## Mechanics, sensing, and control belong in the same design

Servo control is part of the positioning system. It is not, by itself, a complete observation of the workpiece. Feedback from the motor can agree with the commanded movement while the contact between roller and wood behaves differently.

The design should therefore consider what must be held mechanically, what must be observed independently, and what decisions the controller may make from those observations. This is an opportunity to evaluate commercially available sensing before compensating for every uncertainty with more elaborate mechanics.

That opportunity needs a fair cost comparison. Sensors introduce mounting, calibration, integration, cleaning, diagnostics, and maintenance. Mechanical refinements also carry cost and operating consequences. The useful comparison is the total burden of reaching the required result, including failures and operator attention.

| Question | Candidate observation | Limitation to investigate |
|---|---|---|
| Did the board move as expected? | A measuring wheel and encoder independent of the drive; alternatively, noncontact surface-motion sensing | Wheel slip, contact condition, surface variation, low-speed behavior, reversal, and measurement uncertainty |
| Where is the board relative to the station? | An end or datum observation appropriate to the workpiece and operation | Edge condition, reference consistency, contamination, and repeatability |
| Is the stock seated and restrained? | Position or contact observations combined with relevant actuator-state information | A pressure indication alone does not establish correct seating or adequate restraint |
| Does the stock match the admitted size range? | Appropriate dimensional or profile measurement | Surface irregularity, alignment, field of view, calibration, and whether the measured feature governs the operation |
| Did the operation produce the required result? | An inspection method independent of the command used to make the part | Measurement uncertainty and the risk of confirming the same error with the same reference |

For each proposed observation, the definition should state what is measured, under which conditions it is trustworthy, what decision it supports, and what happens if it is absent or disagrees with another observation.

The first sensing trial should record and compare. It should establish how commanded travel, motor feedback, independent stock-motion observations, and final measurements relate. Automatic correction should follow only where the evidence supports a bounded response. In particular, repositioning before tool engagement and attempting recovery during cutting are different problems and must not be treated as interchangeable.

Sensing can inform control and inspection. Safety functions require their own design and validation; ordinary application logic, a general-purpose sensor, or a software comparison should not be assumed to supply them.

## Candidate components and an open control path

The existing control direction can be developed into a practical candidate stack: a suitable computer running LinuxCNC, an appropriate motion interface, selected drives and motors, and explicit connections to the cell’s actuators and observations. LinuxCNC provides a documented RS274/NGC-based G-code interface and a Hardware Abstraction Layer for connecting control functions to hardware.[3]

This identifies a starting point, not a completed bill of materials. The following products illustrate purchasable component classes to assess. Inclusion does not establish fitness for the machine, and none should become a silent default.

| Layer | Candidate or reference | Selection work still required |
|---|---|---|
| Local control | LinuxCNC on a compatible real-time Linux computer | Computer and interface suitability, timing, configuration, recovery behavior, and maintainability |
| Motion interface | Mesa 7I96S, documented with five step/direction channels[4] | Complete axis and I/O count, signal compatibility, feedback needs, and any required expansion |
| Motor and drive | Teknic ClearPath-SD integrated servo products[5] | Torque, speed, transmission, supply, duty, loading, and interface compatibility |
| Independent contact measurement | Encoder Products Company measuring-wheel assemblies[6] | Wheel material and diameter, contact force, mounting, resolution, wear, and slip under trial conditions |
| Independent noncontact measurement | SICK surface-motion measurement products[7] | Suitability for the actual wood surfaces, directions, speeds, environment, and uncertainty requirement |
| Dimensional observation | Micro-Epsilon optical measurement applications for wood dimensions[8] | Required geometry, sensor placement, calibration, surface effects, and integration |
| Manipulation and workholding | Roller assemblies, bearings, supports, and actuators selected for the admitted stock | Geometry, stiffness, traction, restraint, access, and serviceability |
| Tool stations | Saw, router, and spotting equipment selected for the declared operations | Tooling, actuation, extraction, guarding, clearance, and achievable results |

The initial roller trial and the candidate bounded cell may need different numbers of axes and signals. A five-channel interface cannot be assumed sufficient simply because it is a convenient example. The completed inventory must drive selection.

The software path should remain understandable. A project supplies part and operation definitions. Store evaluates those definitions against the declared cell and material rules. A machine-specific planning and translation step resolves the accepted operations into validated local motion and tool instructions. LinuxCNC, its configuration, and the selected hardware carry out the permitted sequence under the local operating arrangement.

G-code expresses machine instructions; it does not replace the project definition, capability evaluation, or safety design. HAL connects control functions and hardware. Where ordinary sequencing calls for it, LinuxCNC’s documented ladder facilities can be considered. These layers should each have an explicit responsibility, with no hidden pricing engine or project-specific manufacturing answer embedded in the browser.

## Preserve the work already done, and make the next evidence stronger

The trial should extend the existing definitions and Store contract. It should not create a second evaluator to make one demonstration pass. A new job within the same vocabulary should change the submitted facts, not require a new Store implementation.

Likewise, experimental measurements should be introduced as evidence with an identified source and scope. If a measured operation time replaces a provisional assumption, that change should identify the tool, material, operation, conditions, and model version to which it applies. A result from one trial must not become a universal rate for unrelated work.

Before testing, define an error budget covering the relevant references, stock motion, restraint, station calibration, tool behavior, and inspection uncertainty. Select tolerances from the intended work and its assembly requirements. Then choose measurement methods capable of distinguishing acceptable from unacceptable results. Numerical limits should be agreed before the trial rather than fitted to the result afterward.

| Step | Evidence sought | Decision it supports |
|---|---|---|
| Digital sequence | Explicit stock, parts, cuts, remainder, references, and tool-clearance sequence | Whether the proposed operation is coherent enough to attempt |
| Control integration without cutting | Recorded commands, feedback, state transitions, and controlled fault responses | Whether the local arrangement behaves as specified before machining |
| Guarded physical trial | Independent movement observations and inspection of the resulting parts | Whether the mechanism and selected observations achieve the declared result |
| Repetition and variation | Results across the admitted material and operating conditions, including interruptions | Whether the envelope is reproducible and where it must be narrowed |
| Operating review | Loading, setup, cutting, inspection, recovery, maintenance, waste, and human attention | Whether the useful output warrants expanding the trial |

### Economic acceptance should be measured with the same discipline

A technically successful cell still has to justify the space, equipment, maintenance, and human attention it consumes. The first trials do not need to set universal thresholds, but they should collect enough evidence to compare one capability increment with the next.

| Dimension | Evidence to collect | Decision it supports |
|---|---|---|
| Footprint | Cell, loading, service, and staging space actually required | Whether useful project coverage warrants the occupied area |
| Capital burden | Installed cost of the shared cell and each added station | What additional demand or value an increment would have to earn |
| Operator attention | Loading, setup, inspection, recovery, clearing, labeling, and staging minutes per job | Whether automation reduces total labor or merely moves it |
| Occupied-cell time | Observed time from admitted load through release, separated from modeled time | Whether throughput assumptions survive physical use |
| Project coverage | Representative demands completed, refused, or deferred by the admitted envelope | Which added capability actually unlocks useful work |
| Maintenance and calibration | Scheduled service, adjustment, cleaning, diagnostics, and unplanned intervention | Whether added capability creates an operating burden larger than its benefit |
| Yield and recovery | Usable parts, remnants, scrap, rejected attempts, and reruns | Whether the process improves material use and recovery in practice |
| Store value added | Material plus purchased processing and services, compared with the burden of providing them | Whether the bounded service warrants expansion |

These measures are evidence for a decision, not a promise of viability. The demand study and physical trial should establish which thresholds matter before another station, sensor, or service is treated as justified.

A test should be able to fail for a reason that matters. An out-of-envelope demand, a missing observation, a stale definition, or a discrepancy between intended and measured movement should produce its specified result. Software tests should exercise the governing implementation; physical acceptance should use measurements capable of exposing its errors. Neither should merely repeat an assumption and call the agreement proof.

Expansion follows the evidence. If the one-board trial succeeds, the next addition should address a stated need and carry its own acceptance criteria. If it fails, the result should identify whether the limitation lies in manipulation, observation, tooling, sequencing, economics, or the usefulness of the task itself.

## The patent foundation and the freedom to improve implementation

U.S. Patents 9,720,401 and 10,768,609 document the integrated project-to-fabrication concept and aspects of its implementation.[9] They provide provenance for this investigation. They do not establish the performance of the proposed equipment or answer the experimental questions.

The technical investigation should consider available sensing and control methods on their engineering merits. The candidate bounded cell must be described in its own terms; the earlier illustrative arrangements should not be presented as an exact specification of it. Any separate question about patent scope requires its own analysis.

This leaves room to develop the mechanism and its observations together while keeping the research claim modest: a specified arrangement, performing specified operations, under specified conditions, with results that another person can examine.

## A parallel question for the proposed fall study

The engineering trial asks whether the cell can perform useful bounded work. The proposed fall 2026 study asks whether that capability has a useful place in practice.

The proposed University of North Carolina at Charlotte student-project framing concerns demand, adoption, workforce, community value, and sustainability. It should examine who needs the work, how they obtain it now, which quantities and turnaround times matter, and what responsibilities a supplier or operator would accept. Institutional participation remains subject to agreement.

Those questions should inform the engineering envelope. A repeatable operation with little demand may not justify a service. A frequently requested operation with excessive setup or recovery may require a narrower offer. Potential benefits from local processing or better material use should be evaluated alongside labor, transport, energy, waste, and equipment burden.

The two studies can therefore proceed in conversation. The physical trial produces evidence about capability and effort. The demand study tests whether that capability and effort address a worthwhile need. Each can change the other’s priorities.

## What participation would help establish

The next commitment is a defined trial with reviewable results. Mechanical and controls contributors can help resolve the roller, restraint, station, and sensing arrangement. Fabricators and material suppliers can help choose representative work and realistic operating conditions. Research participants can help establish whether the resulting service would be useful enough to pursue.

The first shared deliverable should be an experimental definition: the admitted work, selected components, control and observation responsibilities, measurement methods, acceptance criteria, and unresolved decisions. Its purpose is to make the trial executable and its result interpretable.

A useful outcome may be a justified next build. It may also be a smaller envelope, a different component choice, or a finding that the proposed middle does not yet warrant further investment. The value of the experiment is that the next decision can rest on observed work and an explicit operating burden.

---

### Sources and documentary baseline

[1] Mallegol, L., Rohart, N., and Champroy, N. (2026). [“The tree dictates the shape: reversing the industrial paradigm in rural areas.”](https://link.springer.com/article/10.1007/s41693-026-00188-y) *Construction Robotics*, 10, article 30. Published July 11, 2026. The opening summary uses the published abstract; the French setting is context, not evidence that this proposed cell will have the same outcomes.

[2] Existing project references, reviewed at fixed repository snapshots:

- System: `3fcb176d18421f51c79d9aff0ebb0d65c4177eed` — [machine-build program](https://github.com/georgeplattdemo/scan-to-build-system/blob/3fcb176d18421f51c79d9aff0ebb0d65c4177eed/work/machines/MACHINE-BUILD-PROGRAM-0.1.md), [dimensional-machine staging](https://github.com/georgeplattdemo/scan-to-build-system/blob/3fcb176d18421f51c79d9aff0ebb0d65c4177eed/work/machines/staging/DIMENSIONAL-MACHINE-STAGING-0.1.md), [cell reference](https://github.com/georgeplattdemo/scan-to-build-system/blob/3fcb176d18421f51c79d9aff0ebb0d65c4177eed/source-library/machine-cell/STB-CELL-0.1.md), and [engineering index](https://github.com/georgeplattdemo/scan-to-build-system/blob/3fcb176d18421f51c79d9aff0ebb0d65c4177eed/work/machines/engineering/README.md).
- System control references at the same snapshot: [neutral operations to machine](https://github.com/georgeplattdemo/scan-to-build-system/blob/3fcb176d18421f51c79d9aff0ebb0d65c4177eed/source-library/atlas-research/STB-ATLAS-04-NEUTRAL-OPS-TO-MACHINE-0.1.md) and [hardware research](https://github.com/georgeplattdemo/scan-to-build-system/blob/3fcb176d18421f51c79d9aff0ebb0d65c4177eed/source-library/atlas-research/STB-ATLAS-06-IRON-0.1.md).
- Store: `1f9f1a217d91686ef21848508b20e605e7cc6bc1` — [D-001 Stage-2 envelope](https://github.com/georgeplattdemo/scan-to-build-store/blob/1f9f1a217d91686ef21848508b20e605e7cc6bc1/d001-stage2-envelope.mjs).

[3] LinuxCNC: [G-code overview](https://linuxcnc.org/docs/html/gcode/overview.html), [HAL introduction](https://linuxcnc.org/docs/html/hal/intro.html), and [documentation](https://linuxcnc.org/docs/html/).

[4] Mesa Electronics: [7I96S manual](https://www.mesanet.com/pdf/parallel/7i96sman.pdf).

[5] Teknic: [ClearPath-SD integrated servo products](https://teknic.com/products/clearpath-brushless-dc-servo-motors/clearpath-sd-/).

[6] Encoder Products Company: [linear measurement solutions](https://www.encoder.com/linear-measurement-solutions).

[7] SICK: [noncontact speed and length measurement](https://www.sick.com/us/en/sick-launches-new-product-for-non-contact-measurement-of-speed-and-length/w/press-speetec).

[8] Micro-Epsilon: [dimensional checking of wood beams](https://www.micro-epsilon.com/applications/industries/wood-industry/dimensional-check-of-beams/?sLang=us).

[9] [U.S. Patent 9,720,401 B2](https://patents.google.com/patent/US9720401B2/en) and [U.S. Patent 10,768,609](https://patents.justia.com/patent/10768609). Their relationship to the customer journey is developed in the companion closing explanation.

*Prepared September 23, 2026. Component references identify candidates for investigation. This document defines a proposed research direction; it does not authorize physical operation or represent the proposed cell as commissioned.*