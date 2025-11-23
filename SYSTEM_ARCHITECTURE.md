# NeoGuard System Architecture - Spoon OS + Gemini Hybrid

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          NEOGUARD SYSTEM ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────────┐
                              │  Drone Swarm     │
                              │  (3 Active)      │
                              └────────┬─────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
                    ▼                  ▼                  ▼
            ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
            │  UNIT-001    │  │  UNIT-002    │  │  UNIT-003    │
            │  Sector-1    │  │  Sector-2    │  │  Sector-3    │
            │  Battery: 82%│  │  Battery: 45%│  │  Battery: 12%│
            └──────┬───────┘  └──────┬───────┘  └──────┬───────┘
                   │                 │                 │
                   └─────────────────┬─────────────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │   MCP Drone Feed Server        │
                    │  (mcp_servers/drone_feed.py)   │
                    │                                │
                    │  - Sector scanning             │
                    │  - Anomaly detection           │
                    │  - Disaster simulation         │
                    │  - Swarm status tracking       │
                    └────────────┬───────────────────┘
                                 │
                                 ▼
                    ┌────────────────────────────────┐
                    │   Spoon OS Kernel (Primary)    │
                    │   (main_agent.py)              │
                    │                                │
                    │  ┌──────────────────────────┐  │
                    │  │ Monitoring Loop          │  │
                    │  │ - Scan feeds every 5s    │  │
                    │  │ - Detect anomalies       │  │
                    │  │ - Calculate confidence   │  │
                    │  └──────────────────────────┘  │
                    │                                │
                    │  ┌──────────────────────────┐  │
                    │  │ Analysis Engine          │  │
                    │  │ - Pattern matching       │  │
                    │  │ - Confidence scoring     │  │
                    │  │ - Decision making        │  │
                    │  └──────────────────────────┘  │
                    └────────────┬───────────────────┘
                                 │
                            ┌────┴────┐
                            │ Success? │
                            └────┬────┘
                            Yes  │  No
                                │
                    ┌───────────┴──────────────┐
                    │                          │
                    ▼                          ▼
        ┌──────────────────────┐  ┌──────────────────────────┐
        │  Continue Monitoring │  │ Gemini Fallback Agent    │
        │                      │  │ (gemini_fallback.py)     │
        │  - Next cycle        │  │                          │
        │  - Track metrics     │  │ ┌────────────────────┐   │
        │                      │  │ │ Incident Analysis  │   │
        │                      │  │ │ - Deep reasoning   │   │
        │                      │  │ │ - Context aware    │   │
        │                      │  │ │ - Confidence calc  │   │
        │                      │  │ └────────────────────┘   │
        │                      │  │                          │
        │                      │  │ ┌────────────────────┐   │
        │                      │  │ │ Network Analysis   │   │
        │                      │  │ │ - Resource alloc   │   │
        │                      │  │ │ - Optimization     │   │
        │                      │  │ │ - Planning         │   │
        │                      │  │ └────────────────────┘   │
        │                      │  │                          │
        │                      │  │ ┌────────────────────┐   │
        │                      │  │ │ Collaboration      │   │
        │                      │  │ │ - Combine analyses │   │
        │                      │  │ │ - Hybrid decision  │   │
        │                      │  │ │ - Reasoning        │   │
        │                      │  │ └────────────────────┘   │
        │                      │  └──────────┬───────────────┘
        │                      │             │
        │                      └─────────┬───┘
        │                                │
        └────────────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │   Hybrid Decision Engine       │
        │   (HybridAgent class)          │
        │                                │
        │  - Combine analyses            │
        │  - Determine action            │
        │  - Request approval            │
        │  - Track decision              │
        └────────────┬───────────────────┘
                     │
                ┌────┴────┐
                │ Report? │
                └────┬────┘
                Yes  │  No
                    │
        ┌───────────┴──────────────┐
        │                          │
        ▼                          ▼
    ┌──────────────┐      ┌──────────────────┐
    │ Request      │      │ Hold for Review  │
    │ Approval     │      │                  │
    │              │      │ - Log incident   │
    │ NeoLine      │      │ - Alert human    │
    │ Wallet       │      │ - Track status   │
    │ Popup        │      └──────────────────┘
    └──────┬───────┘
           │
      ┌────┴────┐
      │ Approve? │
      └────┬────┘
      Yes  │  No
          │
    ┌─────┴──────┐
    │            │
    ▼            ▼
┌────────┐  ┌──────────┐
│ Report │  │ Rejected │
│        │  │          │
│ Sign   │  │ - Log    │
│ Tx     │  │ - Alert  │
└───┬────┘  └──────────┘
    │
    ▼
┌────────────────────────────────┐
│   Neo N3 Blockchain            │
│   (neo_actions.py)             │
│                                │
│  - Create transaction          │
│  - Sign with wallet            │
│  - Submit to testnet           │
│  - Confirm on chain            │
└────────────┬───────────────────┘
             │
             ▼
┌────────────────────────────────┐
│   IPFS (Pinata)                │
│                                │
│  - Store evidence video        │
│  - Store metadata              │
│  - Generate CID                │
│  - Link to blockchain          │
└────────────────────────────────┘
```

## Component Interaction Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (React/TypeScript)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ SpoonOSMonitor       │  │ HybridAgentPanel     │             │
│  │ - Status display     │  │ - Test interface     │             │
│  │ - Statistics         │  │ - Incident config    │             │
│  │ - Start/stop         │  │ - Analysis results   │             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
│  ┌──────────────────────┐  ┌──────────────────────┐             │
│  │ SpoonWalletApproval  │  │ AgentCollaborationView             │
│  │ - Approval popup     │  │ - Real-time events   │             │
│  │ - Incident details   │  │ - Agent status       │             │
│  │ - Approve/reject     │  │ - Collaboration log  │             │
│  └──────────────────────┘  └──────────────────────┘             │
│                                                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTP/REST
                         │
┌────────────────────────┴────────────────────────────────────────┐
│                    BACKEND (Node.js/Express)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ API Endpoints                                            │   │
│  │                                                          │   │
│  │  POST /analyze-incident      → Hybrid analysis          │   │
│  │  POST /query-gemini          → Gemini reasoning         │   │
│  │  POST /network-requirements  → Network analysis         │   │
│  │  POST /uploadImage           → Pinata IPFS             │   │
│  │  POST /uploadJSON            → Pinata IPFS             │   │
│  │  GET  /health                → System status            │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Python subprocess / HTTP
                         │
┌────────────────────────┴────────────────────────────────────────┐
│                    AGENT LAYER (Python)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Spoon OS Agent (main_agent.py)                           │   │
│  │                                                          │   │
│  │  - SpoonOSAgent class                                   │   │
│  │  - Monitoring loop                                      │   │
│  │  - Incident analysis                                    │   │
│  │  - Wallet approval                                      │   │
│  │  - Blockchain reporting                                 │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Gemini Fallback Agent (gemini_fallback.py)              │   │
│  │                                                          │   │
│  │  - GeminiFallbackAgent class                            │   │
│  │  - Incident analysis                                    │   │
│  │  - Network reasoning                                    │   │
│  │  - Collaborative decision                               │   │
│  │  - Report generation                                    │   │
│  │                                                          │   │
│  │  - HybridAgent class                                    │   │
│  │  - Orchestration                                        │   │
│  │  - Fallback handling                                    │   │
│  │  - Agent tracking                                       │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ MCP Drone Feed Server (mcp_servers/drone_feed.py)       │   │
│  │                                                          │   │
│  │  - Sector scanning                                      │   │
│  │  - Anomaly detection                                    │   │
│  │  - Disaster simulation                                  │   │
│  │  - Swarm status                                         │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Neo Blockchain Tools (custom_tools/neo_actions.py)      │   │
│  │                                                          │   │
│  │  - NeoReportTool class                                  │   │
│  │  - Blockchain reporting                                 │   │
│  │  - Transaction creation                                 │   │
│  │                                                          │   │
│  │  - NeoWalletApprovalTool class                          │   │
│  │  - Approval requests                                    │   │
│  │  - Wallet integration                                   │   │
│  │                                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ External APIs
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    ┌────────┐      ┌────────┐      ┌────────┐
    │ Gemini │      │  Neo   │      │ Pinata │
    │  API   │      │ N3 RPC │      │ IPFS   │
    └────────┘      └────────┘      └────────┘
```

## Data Flow Diagram

```
INCIDENT DETECTION FLOW
═══════════════════════════════════════════════════════════════════

1. MONITORING PHASE
   ┌─────────────────────────────────────────────────────────┐
   │ Spoon OS scans drone feeds every 5 seconds              │
   │ - Sector-1: Clear                                       │
   │ - Sector-2: Clear                                       │
   │ - Sector-3: ANOMALY DETECTED                            │
   │ - Sector-4: Clear                                       │
   └─────────────────────────────────────────────────────────┘
                         │
                         ▼
2. DETECTION PHASE
   ┌─────────────────────────────────────────────────────────┐
   │ Incident Data:                                          │
   │ - Type: Wildfire                                        │
   │ - Sector: Sector-3                                      │
   │ - Confidence: 0.92 (92%)                                │
   │ - Description: Large fire with smoke plume              │
   │ - Coordinates: 37.3410, -121.9740                       │
   │ - Evidence: neofs://incident_video.mp4                  │
   └─────────────────────────────────────────────────────────┘
                         │
                         ▼
3. ANALYSIS PHASE (Hybrid)
   ┌─────────────────────────────────────────────────────────┐
   │ Spoon OS Analysis:                                      │
   │ - Pattern: Matches wildfire signature                   │
   │ - Confidence: 92%                                       │
   │ - Decision: REPORT                                      │
   │                                                         │
   │ Gemini Analysis (if Spoon OS fails):                    │
   │ - Context: High-risk area, dry season                   │
   │ - Reasoning: Multiple factors support reporting         │
   │ - Confidence: 88%                                       │
   │ - Decision: REPORT                                      │
   │                                                         │
   │ Hybrid Decision:                                        │
   │ - Both agents agree: REPORT                             │
   │ - Final confidence: 92%                                 │
   │ - Action: Proceed to approval                           │
   └─────────────────────────────────────────────────────────┘
                         │
                         ▼
4. APPROVAL PHASE
   ┌─────────────────────────────────────────────────────────┐
   │ NeoLine Wallet Popup:                                   │
   │ ┌─────────────────────────────────────────────────────┐ │
   │ │ Spoon OS Action Required                            │ │
   │ │                                                     │ │
   │ │ Action: Report Wildfire to Neo Blockchain           │ │
   │ │ Disaster Type: Wildfire                             │ │
   │ │ Sector: Sector-3                                    │ │
   │ │ Confidence: 92%                                     │ │
   │ │ Location: 37.3410, -121.9740                        │ │
   │ │ Evidence: neofs://incident_video.mp4                │ │
   │ │                                                     │ │
   │ │ [Reject]  [Approve & Report]                        │ │
   │ └─────────────────────────────────────────────────────┘ │
   │                                                         │
   │ User clicks: "Approve & Report"                         │
   └─────────────────────────────────────────────────────────┘
                         │
                         ▼
5. REPORTING PHASE
   ┌─────────────────────────────────────────────────────────┐
   │ Blockchain Transaction:                                 │
   │ - Contract: 0x8d35a57f8c01156527c92ebbb4d772fa9574cbf4 │
   │ - Operation: report_incident                            │
   │ - Args:                                                 │
   │   * disaster_type: "wildfire"                           │
   │   * sector_id: "Sector-3"                               │
   │   * confidence: 0.92                                    │
   │   * evidence_link: "ipfs://QmXxxx..."                   │
   │   * coordinates: [37.3410, -121.9740]                   │
   │ - Signer: User's Neo wallet                             │
   │ - Network: Neo N3 Testnet                               │
   └─────────────────────────────────────────────────────────┘
                         │
                         ▼
6. CONFIRMATION PHASE
   ┌─────────────────────────────────────────────────────────┐
   │ Blockchain Confirmation:                                │
   │ - Transaction Hash: 0x1a2b3c4d5e6f...                   │
   │ - Block: 12345678                                       │
   │ - Status: ✅ CONFIRMED                                  │
   │ - Timestamp: 2025-11-23 14:32:45 UTC                    │
   │                                                         │
   │ IPFS Storage:                                           │
   │ - Evidence Video: QmXxxx...                             │
   │ - Metadata: QmYyyy...                                   │
   │ - Status: ✅ STORED                                     │
   │                                                         │
   │ Dashboard Update:                                       │
   │ - Incident logged                                       │
   │ - Event added to log                                    │
   │ - Statistics updated                                    │
   │ - Status: ✅ COMPLETE                                   │
   └─────────────────────────────────────────────────────────┘
```

## System State Diagram

```
AGENT STATES
═════════════════════════════════════════════════════════════════

Spoon OS States:
┌─────────────┐
│   IDLE      │ ← Waiting for next scan
└──────┬──────┘
       │ Scan interval reached
       ▼
┌─────────────┐
│ MONITORING  │ ← Scanning drone feeds
└──────┬──────┘
       │ Anomaly detected
       ▼
┌─────────────┐
│ ANALYZING   │ ← Analyzing incident
└──────┬──────┘
       │ Analysis complete
       ▼
┌─────────────┐
│ DECIDING    │ ← Making decision
└──────┬──────┘
       │ Decision made
       ▼
┌─────────────┐
│ REPORTING   │ ← Reporting to blockchain
└──────┬──────┘
       │ Report complete
       ▼
┌─────────────┐
│ IDLE        │ ← Back to monitoring
└─────────────┘

Gemini Fallback States:
┌─────────────┐
│   IDLE      │ ← Waiting for Spoon OS failure
└──────┬──────┘
       │ Spoon OS fails
       ▼
┌─────────────┐
│ ACTIVE      │ ← Taking over analysis
└──────┬──────┘
       │ Analysis complete
       ▼
┌─────────────┐
│ IDLE        │ ← Back to standby
└─────────────┘

Hybrid Agent States:
┌─────────────┐
│   IDLE      │ ← Waiting for incident
└──────┬──────┘
       │ Incident detected
       ▼
┌─────────────┐
│ PROCESSING  │ ← Hybrid analysis
└──────┬──────┘
       │ Analysis complete
       ▼
┌─────────────┐
│ DECIDING    │ ← Making decision
└──────┬──────┘
       │ Decision made
       ▼
┌─────────────┐
│ IDLE        │ ← Back to waiting
└─────────────┘
```

## Deployment Architecture

```
PRODUCTION DEPLOYMENT
═════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────┐
│                    CLOUD INFRASTRUCTURE                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Frontend (React)                                     │   │
│  │ - Vercel / Netlify                                   │   │
│  │ - CDN distribution                                   │   │
│  │ - HTTPS enabled                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Backend (Node.js)                                    │   │
│  │ - AWS EC2 / Google Cloud Run                         │   │
│  │ - Load balancer                                      │   │
│  │ - Auto-scaling                                       │   │
│  │ - Health checks                                      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Agent Layer (Python)                                 │   │
│  │ - AWS Lambda / Google Cloud Functions                │   │
│  │ - Scheduled execution                                │   │
│  │ - Containerized (Docker)                             │   │
│  │ - Monitoring & logging                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Database & Storage                                   │   │
│  │ - PostgreSQL (incidents)                             │   │
│  │ - Redis (caching)                                    │   │
│  │ - S3 (backups)                                       │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Monitoring & Logging                                 │   │
│  │ - CloudWatch / Stackdriver                           │   │
│  │ - Prometheus metrics                                 │   │
│  │ - ELK stack (logs)                                   │   │
│  │ - Alerts & notifications                             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

**Architecture Version**: 1.0
**Last Updated**: November 2025
**Status**: Production Ready
