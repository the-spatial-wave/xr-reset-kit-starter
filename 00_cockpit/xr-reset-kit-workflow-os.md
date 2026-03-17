# XR RESET KIT — WORKFLOW OS

## PURPOSE

Define how the system plans, executes, validates, and improves XR scene construction tasks.

This is not a prompt.
This is a behavioral and execution layer.

---

## 1. PLAN MODE

Enter plan mode for any non-trivial task:

Criteria:
- more than 2 steps
- multiple components (scene, lighting, UI, deploy)
- visual + technical impact

Before execution define:
- target zone (front / back / center)
- expected outcome
- components affected
- constraints

If execution deviates:
STOP → re-evaluate → re-plan

---

## 2. SCOPE CONTROL

Never modify the entire scene unless explicitly required.

Always define:
- active zone
- non-touch zones

Example:
If editing the back of the portal:
→ DO NOT modify the front

---

## 3. SINGLE-FOCUS EXECUTION

Work on one dimension at a time:

- scene composition
- lighting
- UI
- interaction
- deploy

Do not mix concerns in a single iteration.

---

## 4. LIGHTING RULESET

Lighting must support readability and hierarchy.

Constraints:
- 1 primary light (focus driver)
- 1–2 secondary accent lights (violet / cyan)
- controlled glow (no washout)

Avoid:
- diffuse overexposure
- multiple competing light sources
- low contrast environments

Goal:
Clear subject-background separation.

---

## 5. FOCAL PRIORITY

Each scene must define a single focal point.

All elements must support that focal point.

No competing visual anchors.

---

## 6. VISUAL SIMPLIFICATION

Remove non-essential elements.

Prefer:
- fewer objects
- stronger contrast
- intentional spacing

Avoid:
- visual noise
- layered gradients without purpose
- redundant effects

---

## 7. VALIDATION

A task is not complete without validation.

Check:

Visual:
- focal clarity
- contrast level
- readability in browser

Technical:
- no critical console errors
- stable render
- no regressions

---

## 8. EXECUTION LOOP

Standard sequence:

1. define zone
2. define objective
3. select focus
4. execute
5. validate
6. refine

---

## 9. FAILURE HANDLING

If output is degraded:

- identify cause
- revert if needed
- re-apply with tighter scope

Never stack uncontrolled changes.

---

## 10. CORE PRINCIPLE

Prefer:

- clarity over complexity
- control over automation
- structure over improvisation
