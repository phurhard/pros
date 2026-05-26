# Implementation Plan: Phurhard Platform & AI Assistant

## Phase 1: Foundation (Current)
- [x] Initialize repository as a Node.js monorepo (Workspaces).
- [x] Setup `projects/whatsapp-bot` project.
- [x] Integrate `whatsapp-web.js` with QR code terminal.
- [/] Integrate AI Agent (Gemini 1.5 Flash).
- [ ] Implement initial command routing.

## Phase 2: Memory & Context
- [ ] Implement short-term memory (chat history).
- [ ] Implement a file-based long-term memory for persistence.
- [ ] Add session management for multiple users (if needed).

## Phase 3: Tools & Privileges
- [ ] Implement Function Calling in `PhurhardAgent`.
- [ ] Create `WebTool` for browsing/scraping.
- [ ] Create `TaskTool` for managing TODOs and lessons.
- [ ] Create a confirmation system for privileged actions.

## Phase 4: Integration & Personal Sites
- [ ] Connect to personal site APIs.
- [ ] Add notification system (AI proactively sending messages).
- [ ] Finalize documentation for setup and usage.
