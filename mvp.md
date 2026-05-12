# MVP v1: Echo AI Companion

## Purpose
Define a focused v1 launch scope from `docs/PRD.md` for a mobile-first AI companion that feels personal, emotionally supportive, and consistent over time.

## v1 Product Promise
One persistent AI companion per user that remembers context, talks in short natural messages, and proactively checks in without feeling intrusive.

## Primary User Outcome
By the end of week one, users should feel:
- remembered
- emotionally supported
- comfortable returning daily for lightweight conversation

## Target Users (v1)
- People who want a consistent AI friend/companion
- Users who prefer texting-style interaction over formal assistant chat
- Users seeking emotional presence, encouragement, and continuity

## v1 Scope (Must Ship)

### 1) Messaging-First Mobile Experience
- Core mobile chat interface
- Fast back-and-forth message interaction
- Short/medium response style by default

### 2) Single Persistent Companion
- One companion identity per user
- Companion name + personality/tone established at onboarding
- Stable personality across sessions

### 3) Personalization Onboarding
- Quick setup for:
  - companion name and vibe
  - user tone preferences
  - boundaries/topics to avoid
  - key life context user wants remembered
  - notification/check-in preferences

### 4) Memory Foundation
- Persistent conversation history
- Long-term memory for key user details/preferences/events
- Memory-aware response generation
- Basic memory controls (at minimum: correct or delete important memories)

### 5) Proactive Engagement
- Companion-initiated check-ins and follow-ups
- Re-engagement after inactivity
- User-configurable notification frequency/style

### 6) Safety + Trust Baseline
- Clear AI disclosure (no pretending to be human)
- Sensitive-conversation handling guardrails
- Safe fallback behavior for crisis/high-risk contexts
- Avoid manipulative or dependency-promoting language

### 7) Lightweight Companion Controls
- Settings for tone, check-in frequency, and interaction boundaries
- Ability to update key companion traits after onboarding

## Explicit Non-Goals for v1
- Broad productivity assistant workflows
- Multi-character marketplace
- Therapy replacement or licensed care claims
- Full autonomous agent actions/integrations
- Voice-first experience
- Rich avatars/generative media

## Core v1 User Flows

### Flow A: First-Time Setup
Install app → create companion profile → set preferences/boundaries → send first message.

### Flow B: Daily Relationship Loop
User sends short message → companion replies warmly with context → memory is updated selectively → user returns later.

### Flow C: Proactive Follow-Up
User shares event/feeling → system stores relevant context → companion sends timely check-in → user can respond or tune notifications.

### Flow D: Safety/Control
User enters sensitive topic → safe response policy applies → user can adjust boundaries/memory controls in settings.

## Success Metrics (v1 Instrumentation)

### Retention + Engagement
- D1 / D7 / D30 retention
- Sessions per active user per day
- Messages per active user
- Return rate after first proactive message

### Experience Quality
- % users completing onboarding personalization
- User-reported “felt understood”
- User trust in memory accuracy
- Opt-in rate for proactive check-ins

### Guardrails
- Notification disable rate
- Negative feedback on creepiness/repetition
- Safety escalation frequency
- Uninstall rate after proactive messaging

## Launch Readiness Criteria
- End-to-end onboarding, chat, memory, and proactive check-ins are stable
- Companion tone remains consistent across multiple sessions
- Memory references feel helpful (not creepy) in QA testing
- Safety flows validated for high-risk prompts
- Notification controls are easy to find and work reliably

## Post-v1 Expansion (Not in MVP)
- Voice interactions
- Visual companion identity/avatars
- Rituals and routines
- Calendar/context-aware proactive messaging
- Tool actions and external integrations
- Co-created artifacts (journal, plans, playlists, mood boards)
