# Phurhard Platform

Welcome to the Phurhard Platform, a series of little projects and AI agents designed to assist me across personal and other sites.

## Projects
- `projects/whatsapp-bot`: AI Assistant/Agent interface via WhatsApp. 
- `projects/platform-core`: Shared types, models, and utilities.

## Getting Started
To get started with the WhatsApp bot, see the [Architecture Overview](docs/architecture/overview.md) and the [Implementation Plan](docs/implementation_plan.md).

### Quick Setup (for WhatsApp Bot)
1. `npm install` (in root to install all dependencies for workspaces).
2. Create `projects/whatsapp-bot/.env` from `.env.example`.
3. Add your `GEMINI_API_KEY`.
4. Run `npm run bot:dev` from the root.
5. Scan the QR code with your WhatsApp.

## Documentation
- [Architecture Overview](docs/architecture/overview.md)
- [System Design (AI Agent)](docs/design/system_design.md)
- [Implementation Plan](docs/implementation_plan.md)
