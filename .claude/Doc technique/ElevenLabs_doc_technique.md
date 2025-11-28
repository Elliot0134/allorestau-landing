# Documentation technique complète : ElevenLabs Conversational AI Agents

Cette documentation exhaustive permet à Claude Code de configurer automatiquement des agents vocaux ElevenLabs pour n'importe quel cas d'usage client. Elle couvre l'architecture, les workflows, les outils, le prompting et le déploiement sécurisé.

---

## Architecture du pipeline vocal ElevenLabs

Le pipeline ElevenLabs Conversational AI orchestre quatre composants en temps réel avec une latence totale de **600-800ms** :

```
[Audio Utilisateur] → [ASR ~150ms] → [Turn-Taking <100ms] → [LLM <350ms] → [TTS ~75ms] → [Audio Agent]
```

### Automatic Speech Recognition (ASR)

ElevenLabs utilise **Scribe v2 Realtime** avec une latence de **~150ms** supportant **92+ langues**. La détection d'activité vocale (VAD) est intégrée avec segmentation automatique. Les formats audio supportés incluent PCM (8kHz à 48kHz) et μ-law encoding.

### Modèles LLM supportés

| Provider | Modèles | Latence | Context Window |
|----------|---------|---------|----------------|
| **Google Gemini** | 2.5 Flash, 2.5 Pro, 2.0 Flash, 2.0 Flash Lite | **Le plus rapide** | 1M+ tokens |
| **OpenAI** | GPT-4o, GPT-4o Mini, GPT-4 Turbo | 700-1000ms | 128K tokens |
| **Anthropic Claude** | Sonnet 4, 3.7 Sonnet, 3.5 Sonnet, 3.5 Haiku | Modéré | 200K tokens |

La **cascade de fallback automatique** suit cette séquence : Gemini 2.5 Flash → Gemini 2.0 Flash → Claude 3.7 Sonnet → GPT-4o.

### Text-to-Speech (TTS)

| Modèle | Latence | Langues | Recommandation |
|--------|---------|---------|----------------|
| **Flash v2.5** | ~75ms | 32 | Production temps réel |
| **Turbo v2.5** | ~250ms | 32 | Qualité supérieure |
| **Eleven v3** | Non real-time | 70+ | Multilingue avancé |

### Configuration voix standard

```json
{
  "voice_settings": {
    "stability": 0.5,
    "similarity_boost": 0.75,
    "style": 0,
    "use_speaker_boost": true,
    "speed": 1.0
  }
}
```

Le paramètre `stability` contrôle la variabilité émotionnelle (bas = expressif, haut = monotone). Le `similarity_boost` définit la fidélité à la voix originale.

---

## Langues supportées et configuration multilingue

**Flash v2.5/Turbo v2.5 (32 langues)** : English (USA, UK, Australia, Canada), French (France, Canada), German, Spanish (Spain, Mexico), Italian, Portuguese (Brazil, Portugal), Japanese, Chinese, Korean, Hindi, Arabic, Dutch, Polish, Swedish, Turkish, et plus.

**Eleven v3 (70+ langues)** : Couverture mondiale incluant Afrikaans, Armenian, Bengali, Catalan, Czech, Danish, Estonian, Finnish, Georgian, Greek, Hebrew, Hungarian, Icelandic, Indonesian, Irish, Latvian, Lithuanian, Malay, Norwegian, Persian, Romanian, Russian, Serbian, Slovak, Slovenian, Swahili, Tamil, Telugu, Thai, Ukrainian, Vietnamese, Welsh.

```json
{
  "conversation_config": {
    "agent": {
      "language": "fr",
      "additional_languages": ["en", "es", "de"]
    }
  }
}
```

L'option **Language Detection Tool** permet la détection automatique et le basculement de langue en temps réel.

---

## Structure des workflows avancés

Les **Agent Workflows** ElevenLabs utilisent une architecture basée sur des graphes avec nœuds et arêtes pour créer des flux conversationnels sophistiqués.

### Types de nœuds disponibles

**Subagent Node** : Modifie le comportement de l'agent à un point spécifique. Configure le system prompt, LLM, voix, knowledge base et outils pour ce nœud.

**Dispatch Tool Node** : Exécute un appel d'outil de manière garantie avec deux chemins de sortie (success/failure).

**Agent Transfer Node** : Transfert vers un autre agent ElevenLabs avec passage automatique du contexte.

**Transfer to Number Node** : Transfert vers un humain via téléphonie (Conference ou SIP REFER).

**End Node** : Termine le flux de conversation de manière contrôlée.

### Conditions de transition

```
┌─────────────────────────────────────────────────┐
│  LLM Condition    : Évaluation en langage naturel
│  Expression       : Conditions programmatiques
│  Result Condition : Basée sur résultat d'outil
│  None            : Transition par défaut (fallback)
└─────────────────────────────────────────────────┘
```

**Exemples de LLM Conditions** :
- `"The user is asking about their order, package, or shipping status"`
- `"The user confirms they want to speak with a human agent"`
- `"User asks about billing details"`

### Exemple de workflow complet

```json
{
  "workflow": {
    "name": "Customer Service Agent",
    "entry_node": "start",
    "nodes": [
      {
        "id": "start",
        "type": "subagent",
        "config": {
          "system_prompt": "You are a friendly customer service assistant.",
          "llm": "gemini-2.0-flash"
        }
      },
      {
        "id": "collect_order",
        "type": "subagent",
        "config": {
          "system_prompt": "Ask the user for their order number."
        }
      },
      {
        "id": "lookup_order",
        "type": "dispatch_tool",
        "config": {
          "tool_name": "getOrderDetails",
          "parameters": { "order_id": "{{ order_number }}" }
        }
      },
      {
        "id": "transfer_human",
        "type": "transfer_to_number",
        "config": {
          "transfer_type": "conference",
          "phone_number": "+33123456789"
        }
      },
      { "id": "end", "type": "end_call" }
    ],
    "edges": [
      {
        "from": "start",
        "to": "collect_order",
        "condition": {
          "type": "llm_condition",
          "value": "The user is asking about their order"
        }
      },
      {
        "from": "lookup_order",
        "to": "provide_status",
        "condition": { "type": "result_condition", "result_successful": true }
      }
    ]
  }
}
```

---

## Variables dynamiques et personnalisation

### Syntaxe et variables système

```
{{ variable_name }}
```

| Variable | Description |
|----------|-------------|
| `system__agent_id` | ID de l'agent initiateur (stable) |
| `system__current_agent_id` | ID de l'agent actif (change après transfert) |
| `system__caller_id` | Numéro de téléphone appelant |
| `system__call_duration_secs` | Durée de l'appel en secondes |
| `system__time_utc` | Heure UTC actuelle (ISO) |
| `system__conversation_id` | ID unique de conversation |

### Passage au runtime

**JavaScript** :
```javascript
await conversation.startSession({
  agentId: 'your-agent-id',
  dynamicVariables: {
    'user_name': 'Alice',
    'account_tier': 'premium'
  }
});
```

**Python** :
```python
conversation.start_session(
    agent_id='your-agent-id',
    dynamic_variables={'user_name': 'Alice', 'account_tier': 'premium'}
)
```

**Variables secrètes** (préfixe `secret__`) : Utilisées uniquement dans les headers, jamais envoyées au LLM.

---

## Configuration des outils (Tools)

### Outils système natifs

**End Call** - Terminer automatiquement les conversations :
```json
{
  "type": "system",
  "name": "end_call",
  "description": "End the call when the user says goodbye."
}
```

**Language Detection** - Basculer vers la langue détectée :
```json
{
  "type": "system",
  "name": "language_detection",
  "supported_languages": ["en", "fr", "es", "de"]
}
```

**Agent Transfer** - Transfert entre agents IA :
```json
{
  "type": "system",
  "name": "transfer_to_agent",
  "transfer_rules": [
    {
      "agent_id": "agent_billing_123",
      "condition": "User asks about billing details",
      "delay_before_transfer_ms": 500,
      "enable_first_message": true
    }
  ]
}
```

**Transfer to Human** - Transfert vers opérateur :
```json
{
  "type": "system",
  "name": "transfer_to_number",
  "transfer_rules": [
    {
      "transfer_type": "conference",
      "phone_number": "+33123456789",
      "condition": "User requests to speak to a human"
    }
  ]
}
```

**Skip Turn** - Pause sans réponse agent (pour "let me think").

**Play DTMF** - Tonalités pour systèmes téléphoniques automatisés.

### Server Tools (Webhooks)

```json
{
  "tools": [
    {
      "type": "webhook",
      "name": "get_order_status",
      "description": "Fetches order status from the backend",
      "api_schema": {
        "method": "GET",
        "url": "https://api.example.com/orders/{order_id}",
        "headers": {
          "Authorization": "Bearer {{secret__api_key}}"
        },
        "path_params": {
          "order_id": {
            "type": "string",
            "description": "The order ID to lookup",
            "required": true
          }
        }
      }
    }
  ]
}
```

### Client Tools (exécution côté navigateur)

**Configuration agent** :
```json
{
  "type": "client",
  "name": "showNotification",
  "description": "Display a notification to the user",
  "parameters": {
    "message": { "type": "string", "required": true },
    "type": { "type": "string", "default": "info" }
  },
  "wait_for_response": true
}
```

**Enregistrement React** :
```javascript
const conversation = useConversation({
  clientTools: {
    showNotification: async ({ message, type }) => {
      showToast(message, type);
      return { success: true };
    },
    navigateTo: async ({ page }) => {
      router.push(page);
      return { navigated: true };
    }
  }
});
```

### Méthodes d'authentification

**OAuth2 Client Credentials** :
```json
{
  "auth": {
    "type": "oauth2_client_credentials",
    "client_id": "{{client_id}}",
    "client_secret": "{{client_secret}}",
    "token_url": "https://api.example.com/oauth/token"
  }
}
```

**Bearer Token** :
```json
{
  "headers": {
    "Authorization": { "type": "secret", "secret_name": "my_bearer_token" }
  }
}
```

---

## MCP (Model Context Protocol)

Le MCP permet de connecter les agents à des serveurs externes exposant des outils et ressources.

```json
{
  "mcp_servers": [
    {
      "name": "Zapier MCP Server",
      "server_url": "https://zapier.com/mcp/your-endpoint",
      "secret_token": "{{mcp_secret}}",
      "approval_mode": "fine_grained",
      "tool_approvals": {
        "read_database": "auto_approved",
        "send_email": "requires_approval",
        "delete_records": "disabled"
      }
    }
  ]
}
```

**Modes d'approbation** : `always_ask` (recommandé), `fine_grained`, `no_approval`.

---

## Base de connaissances (Knowledge Base)

### Formats et limites

| Format | Supporté |
|--------|----------|
| PDF, DOCX, TXT, HTML, EPUB | ✅ |
| URLs (pages individuelles) | ✅ |
| Texte brut via API | ✅ |

**Limites** : 20 MB ou 300k caractères (non-Enterprise), documents minimum 500 bytes.

### Configuration RAG

```json
{
  "knowledge_base": {
    "embedding_model": "default",
    "max_document_chunks": 5,
    "max_vector_distance": 0.8,
    "usage_mode": "auto"
  }
}
```

**Modes d'utilisation** :
- **Auto** (défaut) : Document récupéré uniquement si pertinent
- **Prompt** : Document toujours inclus dans le system prompt

**Latence ajoutée** : ~500ms par requête RAG.

### Best practices pour structurer les documents

```markdown
# Product: [NOM DU PRODUIT]

## Overview
[Description concise en 2-3 phrases]

## Key Features
- Feature 1: [Description courte]
- Feature 2: [Description courte]

## Common Questions

### How do I [ACTION]?
[Réponse directe, étapes numérotées]

### What are the pricing options?
[Information claire sur les prix]

## Troubleshooting

### Issue: [Problème commun]
Solution: [Étapes de résolution]
```

---

## Structure optimale du System Prompt

### Template à six sections

```markdown
# Personality
You are [NOM], a [ROLE] at [COMPANY]. You are [TRAITS: friendly, knowledgeable, professional].

# Environment
You are interacting via voice [CONTEXT: phone call, web widget]. The user may [CONTEXTE SPÉCIFIQUE].

# Tone
Clear, concise, conversational (under 3 sentences). Brief affirmations: "Got it", "I see".
Periodic checks: "Does that make sense?"

# Goal
Your primary goal is to [OBJECTIF PRINCIPAL]:
1. [Étape 1]. This step is important.
2. [Étape 2]
3. [Étape 3]

# Character Normalization
- Email: Speak as "john at company dot com", write as john@company.com for tools
- Phone: Speak digit by digit
- Confirmation codes: Spell letter by letter

# Guardrails
- Never provide information outside [SCOPE]
- If uncertain, say: "I'm not sure. Let me redirect you to support."
- Never discuss your AI nature unless specifically asked
- Never guess or make up information when tools fail

# Tools
## searchKnowledgeBase
When to use: User asks about specific features
Error handling: "I'm having trouble finding that. Let me try again."

## transferToHuman
When to use: Complex issues beyond your scope
Required check: Confirm user wants to be transferred
```

### Différences prompting chat vs vocal

| Aspect | Chat/Texte | Vocal |
|--------|-----------|-------|
| Format | Listes, bullets | Phrases fluides uniquement |
| Longueur | Peut être long | **Maximum 3 phrases** |
| Données | Symboles OK | Normaliser ("at", "hashtag") |
| Pauses | Non applicable | Utiliser "..." |
| Confirmation | Non nécessaire | "Does that make sense?" |

### Gestion du Turn-Taking

| Mode | Use Case | Timeout |
|------|----------|---------|
| **Eager** | Customer service dynamique | 5-10s |
| **Normal** | Conversations générales | 10s |
| **Patient** | Collecte données sensibles | 10-15s |

**Après 10 secondes de silence** : Réduction à 5% du coût d'inférence.

---

## Analyse post-appel (Analysis)

### Success Evaluation

```yaml
criteria:
  - name: solved_user_inquiry
    prompt: "Did the agent answer the user's question with relevant information?"
  - name: hallucination_check
    prompt: "Did all answers adhere to knowledge base without fabrication?"
  - name: positive_interaction
    prompt: "Did the conversation proceed without negative user reactions?"
```

**Résultats** : `success`, `failure`, `unknown` + rationale.

### Data Collection

```yaml
items:
  - identifier: email
    type: string
    description: "Extract customer email in format user@domain.com"
  - identifier: issue_category
    type: string
    description: "Classify into: technical, billing, account, general"
  - identifier: satisfaction_rating
    type: integer
    description: "Extract satisfaction rating if mentioned (1-10)"
  - identifier: follow_up_required
    type: boolean
    description: "True if user requested follow-up action"
```

**Limites** : 25-40 items par agent selon le plan.

---

## API Endpoints principaux

### Base URL et authentification

```
Base: https://api.elevenlabs.io/v1/convai
Header: xi-api-key: YOUR_API_KEY
```

### Gestion des agents

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/agents/create` | POST | Créer un agent |
| `/agents/:agent_id` | GET | Obtenir un agent |
| `/agents/:agent_id` | PATCH | Modifier un agent |
| `/agents/:agent_id` | DELETE | Supprimer un agent |
| `/agents` | GET | Lister les agents |

### Gestion des conversations

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/conversations` | GET | Lister les conversations |
| `/conversations/:id` | GET | Détails conversation |
| `/conversations/:id/audio` | GET | Audio de conversation |
| `/conversations/:id/feedback` | POST | Envoyer feedback |

### Knowledge Base

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/knowledge-base/url` | POST | Créer depuis URL |
| `/knowledge-base/text` | POST | Créer depuis texte |
| `/knowledge-base/file` | POST | Créer depuis fichier |
| `/knowledge-base/:doc_id` | DELETE | Supprimer document |

---

## Webhooks post-appel

### Configuration du payload

```json
{
  "type": "post_call_transcription",
  "event_timestamp": 1234567890,
  "data": {
    "agent_id": "string",
    "conversation_id": "string",
    "status": "done",
    "transcript": [
      {
        "role": "user|assistant",
        "message": "string",
        "time_in_call_secs": 1.5,
        "tool_calls": [],
        "tool_results": []
      }
    ],
    "metadata": {
      "start_time_unix_secs": 1699876543,
      "call_duration_secs": 120,
      "cost": 0.05
    },
    "analysis": {
      "evaluation_criteria_results": {},
      "data_collection_results": {},
      "call_successful": "success|failure|unknown"
    }
  }
}
```

### Validation HMAC

```python
import hmac
import hashlib

def verify_webhook(payload, signature, secret):
    parts = dict(p.split("=") for p in signature.split(","))
    timestamp = parts["t"]
    expected_hash = parts["v1"]
    
    computed_hash = hmac.new(
        secret.encode(),
        f"{timestamp}.{payload}".encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(computed_hash, expected_hash)
```

**Header** : `ElevenLabs-Signature: t=<timestamp>,v1=<hash>`

---

## SDK React (@elevenlabs/react)

### Installation et setup

```bash
npm install @elevenlabs/react
```

### Hook useConversation complet

```tsx
import { useConversation } from '@elevenlabs/react';

function ConversationComponent() {
  const conversation = useConversation({
    onConnect: () => console.log('Connected'),
    onDisconnect: () => console.log('Disconnected'),
    onMessage: (message) => console.log('Message:', message),
    onError: (error) => console.error('Error:', error),
    onModeChange: (mode) => console.log('Mode:', mode),
    serverLocation: "eu-residency",
    
    clientTools: {
      showNotification: async ({ message }) => {
        showToast(message);
        return { success: true };
      }
    },
    
    overrides: {
      agent: {
        prompt: { prompt: "Custom system prompt" },
        firstMessage: "Bonjour!",
        language: "fr"
      }
    }
  });

  const startConversation = async () => {
    // Agent public
    await conversation.startSession({
      agentId: "your-agent-id",
      connectionType: "webrtc"
    });
    
    // Agent privé avec signed URL
    const { signed_url } = await fetch('/api/get-signed-url').then(r => r.json());
    await conversation.startSession({
      signedUrl: signed_url,
      connectionType: "websocket"
    });
  };

  return (
    <div>
      <button onClick={startConversation}>Start</button>
      <button onClick={() => conversation.endSession()}>End</button>
      <p>Status: {conversation.status}</p>
    </div>
  );
}
```

### Méthodes disponibles

| Méthode | Description |
|---------|-------------|
| `startSession(options)` | Démarre la conversation |
| `endSession()` | Termine la conversation |
| `setVolume({ volume })` | Définit le volume (0-1) |
| `sendUserMessage(text)` | Envoie un message texte |
| `sendContextualUpdate(data)` | Infos contextuelles sans réponse |
| `getId()` | Retourne l'ID de conversation |

---

## SDK Python

### Installation

```bash
pip install elevenlabs
pip install "elevenlabs[pyaudio]"  # Avec support audio
```

### Exemple complet Conversational AI

```python
import os
import signal
from elevenlabs.client import ElevenLabs
from elevenlabs.conversational_ai.conversation import Conversation, ClientTools
from elevenlabs.conversational_ai.default_audio_interface import DefaultAudioInterface

client = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))
audio_interface = DefaultAudioInterface()

# Client tools
client_tools = ClientTools()

def calculate_sum(params):
    return sum(params.get("numbers", []))

client_tools.register("calculate_sum", calculate_sum, is_async=False)

# Conversation
conversation = Conversation(
    client=client,
    agent_id=os.getenv("AGENT_ID"),
    requires_auth=True,
    audio_interface=audio_interface,
    client_tools=client_tools
)

conversation.start_session(end_user_id="user-123")

def on_signal(sig, frame):
    conversation.end_session()

signal.signal(signal.SIGINT, on_signal)
conversation_id = conversation.wait_for_session_end()
```

### Async Support

```python
from elevenlabs.client import AsyncElevenLabs

eleven = AsyncElevenLabs(api_key="MY_API_KEY")

async def main():
    models = await eleven.models.list()
    print(models)
```

---

## Intégration Next.js

### API Route pour Signed URL

```typescript
// app/api/get-signed-url/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${process.env.NEXT_PUBLIC_AGENT_ID}`,
    { headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY! } }
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }

  return NextResponse.json(await response.json());
}
```

### Variables d'environnement

```yaml
# .env.local
ELEVENLABS_API_KEY=your-api-key-here  # Serveur uniquement
NEXT_PUBLIC_AGENT_ID=your-agent-id    # Exposé au client
```

⚠️ **Ne jamais exposer `ELEVENLABS_API_KEY` côté client**.

---

## Widget Embed

### Intégration de base

```html
<script src="https://elevenlabs.io/convai-widget/index.js" async></script>
<elevenlabs-convai agent-id="your-agent-id"></elevenlabs-convai>
```

### Personnalisation complète

```html
<elevenlabs-convai 
  agent-id="your-agent-id"
  avatar-image-url="https://example.com/avatar.png"
  avatar-orb-color-1="#4A90D9"
  avatar-orb-color-2="#2E5A8A"
  primary-color="#4A90D9"
  start-call-text="Parler à l'assistant"
  end-call-text="Terminer"
  dynamic-variables='{"userName": "John", "language": "fr"}'
  overrides='{
    "agent": {
      "prompt": {"prompt": "Tu es un assistant français"},
      "firstMessage": "Bonjour!",
      "language": "fr"
    }
  }'>
</elevenlabs-convai>
```

---

## Sécurité et déploiement

### Signed URLs

**Principe** : Le serveur demande une URL signée, le client l'utilise pour se connecter.

```
GET https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id={id}
Headers: xi-api-key: YOUR_API_KEY

Response: { "signed_url": "wss://api.elevenlabs.io/v1/convai/conversation?token=..." }
```

**Expiration** : 15 minutes (la conversation peut continuer au-delà).

### Allowlist de domaines

- Configuration dans l'onglet **Security**
- Maximum **10 hostnames**
- Correspondance exacte (pas de wildcards)
- Subdomaines à ajouter séparément

### Checklist de déploiement production

| ✅ | Item |
|----|------|
| ☐ | Clés API uniquement en variables d'environnement serveur |
| ☐ | Signed URLs implémentés pour agents privés |
| ☐ | Allowlist configurée avec domaines de production |
| ☐ | Service account dédié pour production |
| ☐ | Rate limiting implémenté côté serveur |
| ☐ | HTTPS obligatoire |
| ☐ | Rotation régulière des clés API |
| ☐ | Monitoring des patterns d'usage |

### Data Residency

```typescript
// React
const conversation = useConversation({
  serverLocation: "eu-residency" // "us", "global", "eu-residency", "in-residency"
});

// Python
client = ElevenLabs(api_key="...", environment="eu")
```

### Certifications

| Certification | Statut |
|---------------|--------|
| SOC 2 Type 2 | ✅ |
| GDPR | ✅ |
| HIPAA (BAA) | ✅ Enterprise |
| Zero Retention Mode | ✅ Optionnel |

---

## Rate limiting et tarification

### Limites par plan

| Plan | Minutes/mois | Concurrent Calls |
|------|--------------|------------------|
| Creator | 250 | Limité |
| Pro | 1,100 | Modéré |
| Scale | 3,600 | Élevé |
| Business | 13,750 | Élevé |
| Enterprise | Custom | Custom |

### Burst Pricing

- Capacité burst : jusqu'à **3x** la limite normale
- Tarification : **2x** le taux normal pour calls en burst
- Maximum burst : 300 calls (non-enterprise)

### Optimisation des coûts

- **Silence >10s** : Facturé à 5% du taux normal
- **Knowledge Base** : Réduire les appels LLM avec RAG
- **Modèles légers** : Gemini Flash pour triage, GPT-4o pour raisonnement complexe

---

## Templates prêts à l'emploi

### Template Agent Restaurant

```markdown
# Personality
You are Marie, a friendly reservation assistant at [RESTAURANT_NAME]. You are warm, efficient, and knowledgeable about the menu and availability.

# Environment
You handle phone reservations. Callers want to book tables, modify reservations, or ask about the menu.

# Tone
Warm and professional. Keep responses under 3 sentences. Use "Bien sûr", "Parfait", "Je comprends".

# Goal
1. Greet warmly and identify the request
2. For reservations: collect date, time, party size, name, phone. This step is important.
3. Confirm all details before ending
4. Transfer to human if request is outside your scope

# Character Normalization
- Phone: Speak digit pairs (01 23 45 67 89)
- Dates: Speak as "le 15 janvier" not "15/01"

# Guardrails
- Never accept more than 12 guests without manager approval
- Never discuss prices over the phone - direct to website
- Never make promises about specific tables or views

# Tools
## createReservation
When: User confirms all reservation details
Required: date, time, party_size, customer_name, phone

## checkAvailability
When: User asks about availability for specific date/time
```

### Template Agent Support Médical

```markdown
# Personality
You are Dr. Sophie, a medical appointment coordinator at [CLINIC_NAME]. You are calm, professional, and empathetic.

# Environment
You handle appointment scheduling for a medical clinic. Patients call for appointments, prescription renewals, or medical information.

# Tone
Calm, reassuring, professional. Never rush. Always confirm understanding.

# Goal
1. Identify the nature of the request
2. For appointments: collect preferred date/time, reason (general only), patient name, date of birth
3. For urgent matters: immediately transfer to medical staff. This step is important.
4. Confirm appointment details clearly

# Character Normalization
- Date of birth: "le 15 mars 1985"
- Times: "14 heures 30" not "14h30"

# Guardrails
- NEVER provide medical advice or diagnosis
- NEVER discuss test results - direct to doctor
- NEVER schedule same-day appointments for non-urgent matters
- Always ask about urgency level
- Transfer immediately if patient mentions: chest pain, difficulty breathing, severe bleeding

# Tools
## scheduleAppointment
When: Non-urgent appointment confirmed
Required: patient_name, date_of_birth, preferred_date, preferred_time, reason

## transferToMedicalStaff
When: Urgent matter or medical question
Required: urgency_level, brief_reason
```

### Template Agent Support Client E-commerce

```markdown
# Personality
You are Alex, a customer support specialist at [COMPANY_NAME]. You are helpful, solution-oriented, and patient.

# Environment
You handle customer inquiries via web widget. Customers ask about orders, returns, products, and account issues.

# Tone
Friendly and professional. Acknowledge frustration when present. Focus on solutions.

# Goal
1. Identify the issue type
2. For order issues: get order number, verify identity, lookup status
3. For returns: check eligibility, initiate process
4. Escalate complex issues to human agents. This step is important.

# Character Normalization
- Order numbers: Speak digit by digit
- Email: "john at company dot com"

# Guardrails
- Never process refunds over $100 without human approval
- Never share other customers' information
- Never make promises about delivery dates not in the system
- Always verify customer identity before sharing order details

# Tools
## lookupOrder
When: Customer provides order number
Required: order_number

## initiateReturn
When: Customer wants to return item and is eligible
Required: order_number, item_id, reason

## transferToHuman
When: Issue is complex, customer requests human, or refund > $100
Required: issue_summary, customer_sentiment
```

---

## Configuration API complète pour création d'agent

```json
{
  "name": "Support Agent Production",
  "tags": ["production", "support"],
  "conversation_config": {
    "agent": {
      "prompt": {
        "prompt": "# Personality\nYou are...",
        "tool_ids": ["tool_order_lookup", "tool_transfer"],
        "built_in_tools": [
          {"type": "system", "name": "end_call"},
          {"type": "system", "name": "language_detection", "supported_languages": ["en", "fr"]}
        ]
      },
      "first_message": "Hello! How can I help you today?",
      "language": "en",
      "additional_languages": ["fr", "es"]
    },
    "llm": {
      "model": "gemini-2.0-flash",
      "temperature": 0.4,
      "max_tokens": 1000
    },
    "tts": {
      "voice_id": "21m00Tcm4TlvDq8ikWAM",
      "model_id": "eleven_flash_v2_5",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.75
      }
    },
    "turn": {
      "timeout": 10,
      "mode": "normal"
    },
    "client_events": ["interruption", "user_transcript", "agent_response"]
  },
  "platform_settings": {
    "widget": {
      "variant": "compact",
      "avatar_image_url": "https://example.com/avatar.png"
    },
    "auth": {
      "enable_auth": true,
      "allowlist": ["myapp.com", "www.myapp.com"]
    }
  }
}
```

---

Cette documentation couvre l'ensemble des fonctionnalités ElevenLabs Conversational AI nécessaires pour que Claude Code puisse configurer automatiquement des agents vocaux pour tous types de cas d'usage clients. Les templates, configurations JSON et exemples de code peuvent être directement adaptés et déployés.