# AI Avatar Platform for Hospitals

## Overview

An AI-powered SaaS platform that enables hospitals, clinics, and healthcare providers to create and deploy their own customized AI Avatar Agents on their websites with a single integration script.

The AI avatar acts as a virtual healthcare assistant capable of natural voice conversations, video-based symptom assessment, appointment booking, knowledge retrieval, and seamless transfer to human representatives when required.

## One-Line Pitch

A Shopify-like platform for healthcare organizations that allows hospitals to create, customize, and deploy AI Avatar Agents capable of voice conversations, video-based symptom analysis, appointment booking, knowledge retrieval, and human handoff—all through a simple website widget.

## How It Works

Hospitals create and customize their AI agent by defining:
- Agent Name
- Agent Role
- Tone of Voice
- Personality
- Knowledge Base
- Human Transfer Number
- Google Calendar & Gmail Integration

Once configured, the platform generates a widget script that hospitals can simply copy and paste into their website. The AI avatar then appears as a floating widget and can instantly interact with visitors.

## Key Features

### 🤖 Custom AI Avatar Agent
- Fully customizable AI assistant
- Hospital-specific branding and personality
- Natural and human-like interactions

### 🎙️ Voice AI
- Real-time Speech-to-Text and Text-to-Speech
- Streaming conversations using WebRTC
- Powered by Sarvam AI

### 📹 Video-Based Symptom Assessment
- User can optionally grant camera access
- AI can analyze visible conditions such as:
  - Acne
  - Pigmentation
  - Skin irritation
  - Redness
- Provides possible causes, preventive measures, and treatment guidance while recommending professional consultation when needed

### 📚 Knowledge Base Integration
- Upload PDFs, FAQs, treatment documents, SOPs, and hospital information
- AI answers questions using hospital-specific data through RAG

### 📅 Smart Appointment Booking
- Checks doctor availability
- Books appointments directly into the hospital's Google Calendar
- Sends confirmation emails to patients automatically

### 📞 Human Handoff
- Transfer conversations to hospital staff
- Phone call escalation support
- Human chat takeover when required

### 🎥 Video & Content Sharing
- Share educational videos, treatment guides, and hospital resources during conversations

### 📊 Hospital Dashboard
- Manage AI agents
- View conversations and analytics
- Manage knowledge bases
- Monitor appointments and integrations

### 🔐 Secure Authentication
- Clerk-based authentication
- Multi-tenant architecture for hospitals
- Role-based access control

## Technology Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Python
- FastAPI

### AI Layer
- LangChain
- Gemini / Fine-Tuned Medical LLM
- RAG Architecture


### Database & Storage
- PostgreSQL
- Vector Database (Pinecone/Qdrant/Weaviate)

### Communication
- Sarvam AI (STT/TTS)
- WebRTC Streaming
