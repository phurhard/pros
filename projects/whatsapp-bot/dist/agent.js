import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();
export class PhurhardAgent {
    model;
    chatSession;
    constructor(apiKey) {
        if (!apiKey) {
            console.warn("GEMINI_API_KEY is not defined. AI functionality will be disabled.");
        }
        const genAI = new GoogleGenerativeAI(apiKey || 'dummy_key');
        this.model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            // System instruction for personal assistant
            systemInstruction: "You are PhurhardAgent, a highly capable AI assistant for phurhard. You have many privileges to help across personal and other sites. Be concise, expert, and proactive. If you need to perform an action, ask for it."
        });
        this.chatSession = this.model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });
    }
    async processMessage(prompt) {
        try {
            const result = await this.chatSession.sendMessage(prompt);
            const response = await result.response;
            return response.text();
        }
        catch (error) {
            console.error('Agent Error:', error);
            return "I encountered an error trying to process that.";
        }
    }
}
