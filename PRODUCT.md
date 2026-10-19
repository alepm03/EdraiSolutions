# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro (static pages per route, islands where interaction is needed) + GSAP. Chosen with Ricardo on 2026-10-13 to move edraisolutions.es from a single React SPA landing to a multi-page site that indexes well. The current production site lives in `../EdraiSolutions-web` (React 19 + Vite + Tailwind v4 + GSAP) and stays untouched until this concept is approved; reusable components there (HeroFlowConsole, ChatbotDemo, RealChatDemo, ClientTestimonials) can be ported.

## Users

Primary: the owner or manager of a Spanish service SMB (5 to 50 people: hospitality, clinics, leisure and sport, professional firms, real estate). Arrives through a referral, a WhatsApp link or an ad, most often on a phone. Not technical. Job: understand in seconds whether AI can take repetitive work off their team (answering customers, bookings, admin, reporting) and whether these people can be trusted to build it.

Desired action: request the free 15-minute diagnosis (form or WhatsApp).

## Product Purpose

Edrai Solutions is an AI agency (Madrid) that builds and runs, for each client:
1. AI agents that answer customers on WhatsApp, web chat and phone (voice), book appointments, send reminders and hand off to a person when needed.
2. Custom software: from small AI-assisted apps (expense/document digitisation) to full operating platforms (bookings, cash, finance, customers, real-time dashboards).
3. Automation and integrations between the tools the business already uses (agenda, CRM, invoicing, email, spreadsheets; e.g. lead qualification, automatic Google review requests, weekly reports).
4. AI consulting and audit as the entry point: process review, prioritised plan with estimated cost, team training.

Success: SMB owners book the diagnosis; the site reads like a serious product company, not a template agency.

## Positioning

A small senior team that builds the agent, the software and the integrations end to end for one specific business, with a fixed-price proposal, 2 to 4 weeks to production and ongoing support. Proof is shown working, not described.

## Operating Context

Process: free 15-minute diagnosis, closed-price proposal, implementation in 2 to 4 weeks with client validation at each step, ongoing monitoring and support. Stack used in delivery: n8n, Vercel Edge, Supabase, VAPI, ElevenLabs, OpenAI/Anthropic, WhatsApp. Spanish only for now; informal "tú" with visitors.

## Capabilities and Constraints

- Web design for clients is a downsell and must NOT appear as a service.
- Google reviews are an example inside Automation, not a service.
- Never name clients in illustrative/demo content; use generic sectors. Exception: named client sections already approved (Mercado del Barranco, I Jump, a law firm testimonial).
- No invented business figures. The old stats bar ("80% reducción de tareas", "×3 retorno") was removed from production on 19 Oct 2026 (PR #20).
- Undecided: exact page list beyond home; which screen recordings the team can provide.

## Brand Commitments

- Logo: symbol "Corte" with exact geometry (`../marca-oficial/`, `../EdraiSolutions-web/components/Logo.tsx`), wordmark "EdrAI" with "SOLUTIONS" under a cyan rule. Not a rebrand.
- Accent cyan #22d3ee (deep variant #0ea5e9). Current site is dark; Ricardo allows freedom beyond that but no rebrand.
- Never use the em dash character in any copy.
- Footer domain: edraisolutions.es.
- Standing visual preference (2026-10-13): Ricardo chose the category standard executed at full craft (clean, restrained, product-led). Craft bar: linear.app, sierra.ai, decagon.ai.

## Evidence on Hand

- Mercado del Barranco (food market): AI agent on its website chat (channel `web` in Supabase `barranco-agent`, not WhatsApp) live since 24/06/2026. Figures are published per last full month and updated monthly; September 2026: 111 conversations, 197 customer messages, 63% in English, 94.6% resolved without escalation. Live demo (`RealChatDemo`) and testimonial on site.
- Since 19 Oct 2026 the site shows the last full month's exact figures instead of "+200" and "+90%". "−2 semanas / 5+ correos" is the client's own statement. "Respuesta en menos de 24 h" is already a public commitment on the current site.
- I Jump Skydive: custom operating software (bookings, manifest, finance, cash, CRM). Testimonial on site; no figures.
- Law firm testimonial on site.
- Founders: Ricardo Pichardo (CEO), Alejandro Pichardo (CTO); photos in `../EdraiSolutions-web/public/static/`.
- No real product videos yet. Demo footage authored for the concept must be labelled as illustrative and listed for replacement.

## Product Principles

1. Show the work happening, never just describe it.
2. Every number on the page has a source.
3. Speak the owner's language: their day, their customers, their time, not AI jargon.
4. One clear next step everywhere: the free diagnosis.

## Accessibility & Inclusion

Mobile-first reading; respect prefers-reduced-motion; video always muted, captioned or self-explanatory, never required to understand the offer.
