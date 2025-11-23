"""
Spoon OS Main Agent Loop with Gemini Fallback
This is the autonomous agent that runs NeoGuard's disaster detection and response system.
It continuously monitors drone feeds and reports incidents on the Neo blockchain.
Uses Spoon OS primarily with Gemini as fallback for collaborative reasoning.
"""

import asyncio
import json
import os
from datetime import datetime
from typing import Optional

# Import custom tools
from custom_tools.neo_actions import NeoReportTool, NeoWalletApprovalTool
from custom_tools.gemini_fallback import GeminiFallbackAgent, HybridAgent


class SpoonOSAgent:
    """
    Autonomous agent powered by Spoon OS.
    Monitors drone feeds and reports disasters on Neo blockchain.
    """
    
    def __init__(self, config_path: str = "config.json"):
        """Initialize the Spoon OS agent"""
        self.config = self._load_config(config_path)
        self.agent_name = self.config["agent"]["name"]
        self.role = self.config["agent"]["role"]
        self.confidence_threshold = self.config["monitoring"]["confidence_threshold"]
        self.check_interval = self.config["monitoring"]["check_interval_seconds"]
        
        # Initialize tools
        self.neo_report_tool = NeoReportTool()
        self.wallet_approval_tool = NeoWalletApprovalTool()
        
        # Initialize Gemini fallback agent
        gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.gemini_agent = None
        self.hybrid_agent = None
        
        if gemini_api_key:
            try:
                self.gemini_agent = GeminiFallbackAgent(api_key=gemini_api_key)
                self.hybrid_agent = HybridAgent(spoon_agent=self, gemini_api_key=gemini_api_key)
                print("✅ Gemini fallback agent initialized")
            except Exception as e:
                print(f"⚠️  Gemini initialization failed: {e}")
        else:
            print("⚠️  GEMINI_API_KEY not set - fallback disabled")
        
        # State tracking
        self.is_running = False
        self.incidents_detected = 0
        self.incidents_reported = 0
        self.last_check = None
        self.fallback_used = False
    
    def _load_config(self, config_path: str) -> dict:
        """Load configuration from JSON file"""
        try:
            with open(config_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"❌ Config file not found: {config_path}")
            raise
    
    async def start(self):
        """Start the autonomous monitoring loop"""
        self.is_running = True
        print(f"\n🥄 Spoon OS Agent Starting...")
        print(f"📋 Agent: {self.agent_name}")
        print(f"🎯 Role: {self.role}")
        print(f"⚙️  Confidence Threshold: {self.confidence_threshold * 100}%")
        print(f"⏱️  Check Interval: {self.check_interval}s")
        print(f"🔗 Network: {self.config['blockchain']['network']}")
        print(f"\n🚀 Starting autonomous patrol...\n")
    
    async def stop(self):
        """Stop the autonomous monitoring loop"""
        self.is_running = False
        print(f"\n⏹️  Spoon OS Agent Stopping...")
        print(f"📊 Session Summary:")
        print(f"   - Incidents Detected: {self.incidents_detected}")
        print(f"   - Incidents Reported: {self.incidents_reported}")
        print(f"   - Success Rate: {(self.incidents_reported / max(self.incidents_detected, 1)) * 100:.1f}%")
        if self.fallback_used:
            print(f"   - Fallback Mode: ACTIVE (Gemini used for reasoning)")
    
    async def monitor_drone_feed(self) -> Optional[dict]:
        """
        Monitor drone feed for anomalies.
        In production, this would call the MCP drone_feed server.
        For demo, we simulate detection.
        """
        import random
        
        # Simulate scanning a random sector
        sector_id = f"Sector-{random.randint(1, 4)}"
        
        # 25% chance of detecting something
        if random.random() < 0.25:
            disaster_scenarios = [
                {
                    "type": "wildfire",
                    "name": "Active Wildfire",
                    "confidence": 0.98,
                    "description": "Large fire detected with smoke plume"
                },
                {
                    "type": "flood",
                    "name": "Flash Flood",
                    "confidence": 0.92,
                    "description": "Water overflow in low-lying area"
                },
                {
                    "type": "accident",
                    "name": "Multi-Vehicle Collision",
                    "confidence": 0.88,
                    "description": "Major traffic incident detected"
                }
            ]
            
            scenario = random.choice(disaster_scenarios)
            
            return {
                "sector_id": sector_id,
                "disaster_type": scenario["type"],
                "name": scenario["name"],
                "confidence": scenario["confidence"],
                "description": scenario["description"],
                "coordinates": {
                    "lat": 37.3417 + random.uniform(-0.01, 0.01),
                    "lng": -121.9751 + random.uniform(-0.01, 0.01)
                },
                "video_proof_url": f"neofs://neoguard/incident_{sector_id}_{datetime.now().timestamp()}.mp4"
            }
        
        return None
    
    async def analyze_incident(self, incident: dict) -> bool:
        """
        Analyze detected incident using hybrid approach (Spoon OS + Gemini).
        Returns True if incident should be reported.
        """
        confidence = incident.get("confidence", 0)
        
        print(f"🔍 Analyzing Incident:")
        print(f"   - Type: {incident['name']}")
        print(f"   - Sector: {incident['sector_id']}")
        print(f"   - Confidence: {confidence * 100:.1f}%")
        print(f"   - Description: {incident['description']}")
        
        # Try hybrid analysis if available
        if self.hybrid_agent:
            try:
                print(f"   🤝 Using hybrid analysis (Spoon OS + Gemini)...")
                network_state = {
                    "total_drones": 3,
                    "active_drones": 2,
                    "average_battery": 75,
                    "network_status": "operational"
                }
                
                analysis_result = await self.hybrid_agent.process_incident(incident, network_state)
                
                if analysis_result.get("decision", {}).get("status") == "success":
                    decision = analysis_result["decision"].get("decision", {})
                    should_report = decision.get("should_report", confidence >= self.confidence_threshold)
                    decision_confidence = decision.get("confidence", confidence * 100)
                    
                    print(f"   🤖 Gemini Decision: {'REPORT' if should_report else 'HOLD'}")
                    print(f"   📊 Decision Confidence: {decision_confidence}%")
                    
                    if should_report:
                        print(f"   ✅ MEETS THRESHOLD - Proceeding to report")
                        return True
                    else:
                        print(f"   ⚠️  Below threshold - Escalating to human review")
                        return False
            except Exception as e:
                print(f"   ⚠️  Hybrid analysis failed: {e}")
                self.fallback_used = True
        
        # Fallback to simple threshold check
        if confidence >= self.confidence_threshold:
            print(f"   ✅ MEETS THRESHOLD - Proceeding to report")
            return True
        else:
            print(f"   ⚠️  Below threshold - Escalating to human review")
            return False
    
    async def request_approval(self, incident: dict) -> bool:
        """
        Request user approval via NeoLine wallet before reporting.
        Returns True if user approves.
        """
        print(f"\n🔐 Requesting Wallet Approval...")
        print(f"   Action: Report {incident['name']} to Neo Blockchain")
        print(f"   Evidence: {incident['video_proof_url']}")
        print(f"   Coordinates: {incident['coordinates']}")
        
        # In production, this would trigger NeoLine popup
        # For demo, we auto-approve
        approval = await self.wallet_approval_tool.run(
            action_description=f"Report {incident['name']} incident",
            action_data=incident
        )
        
        print(f"   ✅ User approved action")
        return True
    
    async def report_incident(self, incident: dict) -> bool:
        """
        Report incident to Neo blockchain.
        Returns True if successful.
        """
        print(f"\n📡 Reporting to Neo N3 Blockchain...")
        
        result = self.neo_report_tool.run(
            disaster_type=incident["disaster_type"],
            evidence_link=incident["video_proof_url"],
            sector_id=incident["sector_id"],
            confidence=incident["confidence"],
            coordinates=incident["coordinates"]
        )
        
        if result["status"] == "success":
            print(f"   ✅ Incident Reported Successfully!")
            print(f"   📦 Transaction Hash: {result['transaction_hash']}")
            self.incidents_reported += 1
            return True
        else:
            print(f"   ❌ Failed to report: {result['message']}")
            return False
    
    async def run_patrol_cycle(self):
        """Execute one patrol cycle"""
        self.last_check = datetime.now()
        
        print(f"\n[{self.last_check.strftime('%H:%M:%S')}] 🛡️  Patrol Cycle Starting...")
        
        # Step 1: Monitor drone feed
        incident = await self.monitor_drone_feed()
        
        if incident is None:
            print(f"   ✅ All sectors clear - No anomalies detected")
            return
        
        # Step 2: Analyze incident
        self.incidents_detected += 1
        print(f"\n⚠️  INCIDENT DETECTED (#{self.incidents_detected})")
        
        should_report = await self.analyze_incident(incident)
        
        if not should_report:
            print(f"   📋 Incident logged for human review")
            return
        
        # Step 3: Request approval
        approved = await self.request_approval(incident)
        
        if not approved:
            print(f"   ❌ User rejected action")
            return
        
        # Step 4: Report to blockchain
        await self.report_incident(incident)
    
    async def run_continuous(self, duration_seconds: int = 60):
        """
        Run the agent in continuous monitoring mode.
        
        Args:
            duration_seconds: How long to run (for demo purposes)
        """
        await self.start()
        
        start_time = datetime.now()
        cycle_count = 0
        
        try:
            while self.is_running:
                elapsed = (datetime.now() - start_time).total_seconds()
                
                if elapsed > duration_seconds:
                    print(f"\n⏱️  Demo duration reached ({duration_seconds}s)")
                    break
                
                cycle_count += 1
                await self.run_patrol_cycle()
                
                # Wait before next cycle
                await asyncio.sleep(self.check_interval)
        
        except KeyboardInterrupt:
            print(f"\n⚠️  Interrupted by user")
        
        finally:
            await self.stop()
    
    async def run_single_patrol(self):
        """Run a single patrol cycle (for testing)"""
        await self.start()
        await self.run_patrol_cycle()
        await self.stop()


async def main():
    """Main entry point for the Spoon OS agent"""
    
    print("\n" + "="*60)
    print("🥄 SPOON OS - NeoGuard Autonomous Sentinel")
    print("="*60)
    
    # Initialize agent
    agent = SpoonOSAgent(config_path="config.json")
    
    # Run continuous monitoring for 120 seconds (demo)
    await agent.run_continuous(duration_seconds=120)
    
    print("\n" + "="*60)
    print("✅ Spoon OS Session Complete")
    print("="*60 + "\n")


if __name__ == "__main__":
    asyncio.run(main())
