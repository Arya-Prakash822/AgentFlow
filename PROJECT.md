# AgentFlow
AI-powered Multi-Agent Customer Support Platform

## Product Overview

AgentFlow is a multi-agent AI customer support platform. Customers can chat with AI assistants for support, billing, and technical issues. The system uses RAG to answer from company documents, supports human handoff with conversation memory, and provides an analytics dashboard for administrators.

## Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Frontend         | Next.js               |
| Backend          | FastAPI               |
| Database         | PostgreSQL + pgvector |
| Cache            | Redis                 |
| AI Orchestration | LangGraph             |
| LLM              | OpenAI / Gemini       |
| Deployment       | Docker                |

## Core Features

* Multi-agent routing (Support, Billing, Technical)
* Retrieval-Augmented Generation (RAG)
* Conversation memory
* Human handoff
* Real-time streaming chat
* Analytics dashboard
* Tool calling

## Folder Structure

frontend/
backend/
postgres/
redis/

## Environment Variables

Backend:

* OPENAI_API_KEY
* DATABASE_URL
* REDIS_URL
* JWT_SECRET

Frontend:

* NEXT_PUBLIC_API_URL
* NEXTAUTH_SECRET
