# AI Agent System Design: PhurhardAgent

## Goal
A WhatsApp AI Assistant with "many privileges" to help phurhard across personal and other sites.

## 1. Core Agent Model
- **Engine**: Gemini 1.5 Flash (via `@google/generative-ai`).
- **Memory**: 
  - **Short-term**: Session history (carried per chat/session).
  - **Long-term (TODO)**: Vector database or a simple file-based memory system for persistent knowledge.

## 2. Tools & Privileges
The AI can invoke specific "functions" to interact with the external world.

### Currently Planned Tools:
- `WebTool`: For real-time search and web scraping (Playwright/Cheerio).
- `FileSystemTool`: To manage local files (reading/writing notes).
- `ProjectManagerTool`: To manage its own `todo.md` and `lessons.md`.
- `PersonalSitesTool`: Hooks into specific personal site APIs.

### The Privilege Model:
- **L1 (Public/Read)**: Reading public URLs, answering basic questions.
- **L2 (Personal/Workspace)**: Managing `tasks/todo.md`, reading local logs, checking status.
- **L3 (Authorized/Execution)**: Interacting with phurhard's personal site APIs, executing approved system commands.

## 4. Proposed Capabilities
1. **Developer Assistant**: Helping with the platform's own development.
2. **Context Tracker**: Monitoring `tasks/lessons.md` to avoid repeating mistakes.
3. **Task Automator**: Bridging WhatsApp and the platform's other microservices (once added).
4. **Research Agent**: Scoping out libraries and tools for new projects.
