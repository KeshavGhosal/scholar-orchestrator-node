Since your exams are near and you're aiming for an internship, this README is designed to make you look like a Backend Engineer who understands AI Orchestration.

It removes all the "Google AI Studio" branding and replaces it with professional documentation.

🧠 Scholar-Orchestrator
Autonomous Academic Agent & Resource Manager
Scholar-Orchestrator is a Node.js-based autonomous agent designed to handle the "grunt work" of academic planning. Instead of a standard chatbot, this system utilizes an agentic reasoning loop to interact with specific tools, allowing it to calculate deadlines, track exam dates, and generate optimized study schedules.

🚀 Key Features
Agentic Reasoning: Uses Gemini 1.5 Flash to decide which tool to call based on user intent.

Tool-Calling Logic: Integrated functions for calculating days-to-exams and parsing course registries.

Async Performance: Built on Node.js to handle non-blocking I/O during LLM stream processing.

Context Management: Structured system prompting to prevent hallucination during resource allocation.

🛠 Tech Stack
Runtime: Node.js (v20+)

Language: JavaScript (ES6+)

Model: Google Gemini 1.5 Flash

API Management: @google/generative-ai

Security: Dotenv (Environment Variable isolation)

📂 Project Structure
.
├── agent.js          # Core agent logic & Tool definitions
├── config.js         # API & Model configurations
├── .env              # Private API Keys (Excluded via .gitignore)
├── .env.example      # Template for environment variables
├── package.json      # Dependencies & Project Metadata
└── README.md         # Documentation
