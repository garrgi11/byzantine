"""
Gemini Fallback Agent
Provides fallback reasoning and decision-making when Spoon OS fails.
Uses Google's Gemini API for collaborative reasoning about network requirements.
"""

import os
import json
from typing import Optional, Dict, Any
import google.generativeai as genai
from datetime import datetime


class GeminiFallbackAgent:
    """
    Fallback agent using Gemini API for reasoning and collaboration.
    Handles incident analysis, network reasoning, and decision-making.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize Gemini fallback agent"""
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel("gemini-pro")
        self.name = "Gemini Fallback Agent"
        self.is_active = False
    
    async def analyze_incident(self, incident_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Analyze incident using Gemini reasoning.
        
        Args:
            incident_data: Incident information from drone feed
        
        Returns:
            Analysis with recommendations
        """
        prompt = f"""
You are an emergency response AI assistant for NeoGuard, a drone-based disaster response system.

Analyze this incident and provide recommendations:

Incident Data:
- Type: {incident_data.get('disaster_type', 'unknown')}
- Sector: {incident_data.get('sector_id', 'unknown')}
- Confidence: {incident_data.get('confidence', 0) * 100:.1f}%
- Description: {incident_data.get('description', 'No description')}
- Coordinates: {incident_data.get('coordinates', {})}
- Evidence: {incident_data.get('video_proof_url', 'No URL')}

Please provide:
1. Severity assessment (Critical/High/Medium/Low)
2. Recommended actions (list 3-5 specific actions)
3. Risk factors to consider
4. Whether this should be reported to blockchain (yes/no with reasoning)
5. Additional resources needed

Format your response as JSON.
"""
        
        try:
            response = self.model.generate_content(prompt)
            analysis_text = response.text
            
            # Try to parse as JSON
            try:
                analysis = json.loads(analysis_text)
            except json.JSONDecodeError:
                # If not JSON, structure the response
                analysis = {
                    "raw_analysis": analysis_text,
                    "severity": "High",
                    "should_report": True,
                    "timestamp": datetime.now().isoformat()
                }
            
            return {
                "status": "success",
                "analysis": analysis,
                "model": "gemini-pro",
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                "status": "error",
                "message": f"Gemini analysis failed: {str(e)}",
                "error": str(e)
            }
    
    async def reason_about_network(self, network_state: Dict[str, Any]) -> Dict[str, Any]:
        """
        Use Gemini to reason about network requirements and state.
        
        Args:
            network_state: Current state of the drone network
        
        Returns:
            Network analysis and recommendations
        """
        prompt = f"""
You are a network optimization AI for NeoGuard's drone swarm.

Current Network State:
{json.dumps(network_state, indent=2)}

Please analyze and provide:
1. Network health assessment
2. Drone deployment recommendations
3. Resource allocation suggestions
4. Potential bottlenecks or issues
5. Optimization opportunities

Consider:
- Battery levels and flight times
- Signal strength and coverage
- Sector coverage gaps
- Response time requirements
- Blockchain transaction costs

Format your response as JSON with actionable insights.
"""
        
        try:
            response = self.model.generate_content(prompt)
            reasoning_text = response.text
            
            try:
                reasoning = json.loads(reasoning_text)
            except json.JSONDecodeError:
                reasoning = {
                    "raw_reasoning": reasoning_text,
                    "timestamp": datetime.now().isoformat()
                }
            
            return {
                "status": "success",
                "reasoning": reasoning,
                "model": "gemini-pro",
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                "status": "error",
                "message": f"Network reasoning failed: {str(e)}",
                "error": str(e)
            }
    
    async def collaborate_on_decision(
        self,
        incident: Dict[str, Any],
        network_state: Dict[str, Any],
        spoon_recommendation: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Collaborate with Spoon OS (or provide independent reasoning if Spoon failed).
        
        Args:
            incident: Incident data
            network_state: Current network state
            spoon_recommendation: Optional recommendation from Spoon OS
        
        Returns:
            Collaborative decision
        """
        spoon_context = f"\nSpoon OS Recommendation: {spoon_recommendation}" if spoon_recommendation else "\nSpoon OS: No recommendation available (fallback mode)"
        
        prompt = f"""
You are part of a collaborative AI system for NeoGuard emergency response.

Incident:
{json.dumps(incident, indent=2)}

Network State:
{json.dumps(network_state, indent=2)}

{spoon_context}

Based on this information, provide a final decision:
1. Should this incident be reported to the blockchain? (yes/no)
2. Confidence level in this decision (0-100%)
3. Reasoning for the decision
4. Alternative actions to consider
5. Risk assessment

Format as JSON with clear decision logic.
"""
        
        try:
            response = self.model.generate_content(prompt)
            decision_text = response.text
            
            try:
                decision = json.loads(decision_text)
            except json.JSONDecodeError:
                decision = {
                    "raw_decision": decision_text,
                    "should_report": True,
                    "confidence": 0.85
                }
            
            return {
                "status": "success",
                "decision": decision,
                "model": "gemini-pro",
                "collaboration_mode": "fallback" if not spoon_recommendation else "hybrid",
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                "status": "error",
                "message": f"Collaborative decision failed: {str(e)}",
                "error": str(e)
            }
    
    async def generate_incident_report(self, incident: Dict[str, Any]) -> str:
        """
        Generate a human-readable incident report.
        
        Args:
            incident: Incident data
        
        Returns:
            Formatted incident report
        """
        prompt = f"""
Generate a professional incident report for emergency responders:

Incident Details:
{json.dumps(incident, indent=2)}

Include:
- Executive Summary
- Incident Classification
- Location and Coordinates
- Severity Assessment
- Recommended Response
- Evidence Links
- Timestamp

Make it concise but comprehensive.
"""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating report: {str(e)}"
    
    async def query_network_requirements(self, query: str) -> Dict[str, Any]:
        """
        Query Gemini about network requirements and best practices.
        
        Args:
            query: Question about network requirements
        
        Returns:
            Answer with reasoning
        """
        prompt = f"""
You are an expert in drone swarm networks and emergency response systems.

Question: {query}

Provide a detailed answer considering:
- NeoGuard's architecture
- Neo blockchain integration
- Drone coordination
- Real-time response requirements
- Scalability and reliability

Format your response clearly with actionable insights.
"""
        
        try:
            response = self.model.generate_content(prompt)
            return {
                "status": "success",
                "answer": response.text,
                "model": "gemini-pro",
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {
                "status": "error",
                "message": f"Query failed: {str(e)}",
                "error": str(e)
            }


class HybridAgent:
    """
    Hybrid agent that uses Spoon OS primarily with Gemini fallback.
    Enables collaboration between both systems for better reasoning.
    """
    
    def __init__(self, spoon_agent=None, gemini_api_key: Optional[str] = None):
        """Initialize hybrid agent"""
        self.spoon_agent = spoon_agent
        self.gemini_agent = GeminiFallbackAgent(api_key=gemini_api_key)
        self.name = "NeoGuard Hybrid Agent"
        self.fallback_active = False
    
    async def process_incident(
        self,
        incident: Dict[str, Any],
        network_state: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Process incident using hybrid approach.
        Try Spoon OS first, fall back to Gemini if needed.
        
        Args:
            incident: Incident data
            network_state: Network state
        
        Returns:
            Processing result with decision
        """
        result = {
            "incident": incident,
            "timestamp": datetime.now().isoformat(),
            "agents_used": []
        }
        
        # Try Spoon OS first
        spoon_recommendation = None
        if self.spoon_agent:
            try:
                print("🥄 Attempting Spoon OS analysis...")
                # Spoon OS would analyze here
                spoon_recommendation = "Spoon OS analysis pending"
                result["agents_used"].append("spoon_os")
            except Exception as e:
                print(f"⚠️  Spoon OS failed: {e}")
                self.fallback_active = True
        
        # Use Gemini for analysis
        try:
            print("🤖 Gemini analysis starting...")
            gemini_analysis = await self.gemini_agent.analyze_incident(incident)
            result["gemini_analysis"] = gemini_analysis
            result["agents_used"].append("gemini")
        except Exception as e:
            print(f"❌ Gemini analysis failed: {e}")
            result["gemini_error"] = str(e)
        
        # Collaborative decision
        try:
            print("🤝 Collaborative decision making...")
            decision = await self.gemini_agent.collaborate_on_decision(
                incident=incident,
                network_state=network_state,
                spoon_recommendation=spoon_recommendation
            )
            result["decision"] = decision
        except Exception as e:
            print(f"❌ Decision making failed: {e}")
            result["decision_error"] = str(e)
        
        result["fallback_active"] = self.fallback_active
        return result
