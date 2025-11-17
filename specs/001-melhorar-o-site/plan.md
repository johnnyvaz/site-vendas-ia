
# Implementation Plan: Enhanced AI Business Solutions Website

**Branch**: `001-melhorar-o-site` | **Date**: 2025-09-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/home/johnny/Documentos/VENDAS.IA/site-vendas-ia/specs/001-melhorar-o-site/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from file system structure or context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Fill the Constitution Check section based on the content of the constitution document.
4. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
5. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
6. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, `GEMINI.md` for Gemini CLI, `QWEN.md` for Qwen Code or `AGENTS.md` for opencode).
7. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
8. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
9. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Enhance the Vendas.IA website to showcase an expanded portfolio of AI business solutions including Disparo Rápido WhatsApp automation tool, while integrating Johnny's contact information and emphasizing custom AI solutions availability. The enhancement maintains Brazilian market focus, conversion optimization, and mobile-first responsive design while adding new product showcases and contact integration.

## Technical Context
**Language/Version**: TypeScript 5.8.3, React 18.3.1
**Primary Dependencies**: React, Vite, TailwindCSS, shadcn/ui, Lucide React
**Backend Integration**: n8n workflow automation for email and WhatsApp messaging
**Storage**: Static website, no database required (n8n handles data processing)
**Testing**: Component testing with existing setup, webhook integration testing, end-to-end testing for conversion paths
**Target Platform**: Web browsers (desktop and mobile)
**Project Type**: Web - Single page application with n8n webhook integration
**Performance Goals**: <3 second page load on 3G networks, Lighthouse score >90
**Constraints**: LGPD compliance, Brazilian Portuguese content, mobile-first design, n8n webhook security
**Scale/Scope**: Landing page enhancement, ~10-15 new/modified components, n8n webhook integration
**Integration Architecture**: Frontend → n8n webhook → Email/WhatsApp services
**Agent Strategy**: Using marketing-lead-generator for conversion optimization and react-frontend-developer for technical implementation

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**I. Performance-First Frontend**: ✅ PASS - Planning for <3s load times, image optimization, code splitting with Vite
**II. Brazilian Market Focus**: ✅ PASS - All new content in Portuguese, Brazilian business terminology, LGPD compliance
**III. Conversion-Optimized Design**: ✅ PASS - Strategic CTA placement, contact integration, portfolio showcase for lead generation
**IV. LGPD Compliance**: ✅ PASS - No new data collection, existing cookie banner maintained, privacy policy compliance
**V. Mobile-First Responsive Design**: ✅ PASS - TailwindCSS responsive design, touch-friendly interactions, mobile-first approach

**Marketing Constraints**: ✅ PASS - Enhanced lead capture with Johnny's contact info, brand consistency maintained
**Quality Standards**: ✅ PASS - TypeScript with strict typing, component reusability, accessibility compliance

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
src/
├── components/
│   ├── Header.tsx           # Update with Johnny's contact info
│   ├── Footer.tsx           # Update with Johnny's contact info
│   ├── Hero.tsx             # Enhance with expanded portfolio
│   ├── Solutions.tsx        # Add Disparo Rápido and custom solutions
│   ├── About.tsx            # Update messaging
│   ├── Contact.tsx          # Update with Johnny's details
│   ├── DisparoRapido.tsx    # New component for WhatsApp tool
│   ├── Portfolio.tsx        # New expanded solutions showcase
│   └── ui/                  # Existing shadcn/ui components
├── assets/
│   └── disparo-rapido/      # New images for Disparo Rápido
├── pages/
│   └── Index.tsx            # Main landing page updates
└── lib/
    └── utils.ts             # Existing utilities

docs/
└── disparo-rapido.md        # Source content for new product

public/
└── [images and assets]
```

**Structure Decision**: React single-page application structure is maintained. New components will be added to showcase Disparo Rápido and enhanced portfolio. Existing components will be updated with Johnny's contact information and improved conversion elements.

## Phase 0: Outline & Research
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `.specify/scripts/bash/update-agent-context.sh claude`
     **IMPORTANT**: Execute it exactly as specified above. Do not add or remove any arguments.
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `.specify/templates/tasks-template.md` as base
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Component enhancement tasks from existing codebase analysis
- New component creation for Disparo Rápido and Portfolio
- Contact integration across existing components
- Performance optimization implementation
- LGPD compliance verification tasks

**Ordering Strategy**:
- **Setup Phase**: TypeScript interface definitions, utility functions
- **Component Phase**: New components (DisparoRapido, Portfolio), then existing component updates
- **Integration Phase**: WhatsApp API, contact form routing, analytics
- **Optimization Phase**: Performance, accessibility, SEO
- **Testing Phase**: Component tests, integration tests, E2E validation
- Mark [P] for parallel execution (independent components)

**Estimated Output**: 35-40 numbered, ordered tasks covering:
- 8-10 setup and infrastructure tasks
- 15-20 component development tasks
- 8-10 integration and optimization tasks
- 5-8 testing and validation tasks

**Key Task Categories**:
1. **Type Definition Tasks**: Contact interfaces, product models, WhatsApp types
2. **Component Tasks**: DisparoRapido, enhanced Hero/Solutions/Contact components
3. **Integration Tasks**: WhatsApp link generation, form routing, analytics
4. **Performance Tasks**: Image optimization, code splitting, bundle analysis
5. **Accessibility Tasks**: WCAG compliance, focus management, ARIA implementation
6. **Testing Tasks**: Component tests, integration validation, quickstart execution

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (none required)

**Artifacts Generated**:
- [x] research.md - Marketing and technical research findings (updated for n8n)
- [x] data-model.md - Contact, product, and integration data models
- [x] contracts/contact-form.json - Contact form API specification
- [x] contracts/n8n-webhook.json - n8n webhook integration specification
- [x] quickstart.md - User journey validation and testing guide
- [x] CLAUDE.md - Updated agent context file

**Constitutional Compliance Verified**:
- [x] Performance-First Frontend: <3s load time targets, optimization strategies defined
- [x] Brazilian Market Focus: Portuguese content, LGPD compliance, cultural adaptation
- [x] Conversion-Optimized Design: Strategic CTAs, progressive forms, trust signals
- [x] LGPD Compliance: Explicit consent mechanisms, data handling procedures
- [x] Mobile-First Responsive Design: Touch optimization, responsive patterns

---
*Based on Constitution v1.0.0 - See `.specify/memory/constitution.md`*
