# Phurhard Platform Architecture

## Overview
A personal ecosystem of small projects and AI-driven tools, managed as a monorepo.

## Project Structure (Monorepo)
- `projects/whatsapp-bot`: The primary AI Agent interface via WhatsApp.
- `projects/platform-core`: Shared types, models, and utilities.
- `docs/`: System design, architecture, and guides.

## WhatsApp AI Agent Design
The bot is structured into three layers:

1. **Bot Layer (`whatsapp-web.js`)**
   - Manages connection to WhatsApp.
   - Handles message routing and event listeners (QR, Ready, Message).
   - Local state management for authentication.

2. **Agent Layer (Gemini AI)**
   - Processes the natural language input.
   - Orchestrates reasoning and decision-making.
   - System prompt defines the persona: "Proactive Personal Assistant".

3. **Tool/Privilege Layer (Future Implementation)**
   - Enables the agent to perform actions like web searching, task scheduling, or executing shell commands (with permission).
   - Uses Function Calling for structured tool execution.

## Data Flow
1. User sends message on WhatsApp.
2. WhatsApp Client receives and forwards to PhurhardAgent.
3. Agent analyzes context and decides whether to reply or use a tool.
4. Response is sent back via WhatsApp.
