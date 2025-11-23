"""
Spoon OS Custom Tool: Neo Blockchain Actions
This tool allows Spoon OS to report incidents on the Neo N3 blockchain.
"""

import os
import json
from datetime import datetime
from typing import Optional


class NeoReportTool:
    """
    Tool for Spoon OS to report incidents on Neo N3 blockchain.
    This is called autonomously when the agent detects a critical incident.
    """
    
    name = "neo_report_incident"
    description = "Report a confirmed disaster incident to the Neo N3 blockchain with proof of evidence"
    
    def __init__(self):
        self.network = "neo3-testnet"
        self.rpc_url = "https://testnet1.neo.coz.io:443"
        self.contract_hash = "0x8d35a57f8c01156527c92ebbb4d772fa9574cbf4"
        self.private_key = os.getenv("NEO_PRIVATE_KEY", "")
    
    def run(
        self,
        disaster_type: str,
        evidence_link: str,
        sector_id: str,
        confidence: float,
        coordinates: Optional[dict] = None
    ) -> dict:
        """
        Report an incident to the Neo blockchain.
        
        Args:
            disaster_type: Type of disaster (wildfire, flood, accident, mass_casualty)
            evidence_link: Link to video proof (IPFS/NeoFS URL)
            sector_id: Sector where incident was detected
            confidence: Confidence score (0-1)
            coordinates: GPS coordinates of incident
        
        Returns:
            Transaction result with hash and status
        """
        
        try:
            # In production, this would use neo3-py library
            # For hackathon demo, we simulate the blockchain call
            
            incident_data = {
                "disaster_type": disaster_type,
                "evidence_link": evidence_link,
                "sector_id": sector_id,
                "confidence": confidence,
                "coordinates": coordinates or {},
                "timestamp": datetime.now().isoformat(),
                "reporter": "NeoGuard Sentinel 01",
                "network": self.network
            }
            
            # Simulate blockchain transaction
            tx_hash = self._simulate_blockchain_report(incident_data)
            
            return {
                "status": "success",
                "message": f"Incident reported on Neo N3 blockchain",
                "transaction_hash": tx_hash,
                "incident_data": incident_data,
                "timestamp": datetime.now().isoformat()
            }
        
        except Exception as e:
            return {
                "status": "error",
                "message": f"Failed to report incident: {str(e)}",
                "error": str(e)
            }
    
    def _simulate_blockchain_report(self, incident_data: dict) -> str:
        """
        Simulate a blockchain transaction.
        In production, this would use neo3-py to create and sign a transaction.
        """
        import hashlib
        
        # Create a mock transaction hash
        data_str = json.dumps(incident_data, sort_keys=True)
        tx_hash = "0x" + hashlib.sha256(data_str.encode()).hexdigest()
        
        return tx_hash
    
    def get_schema(self) -> dict:
        """Return the tool schema for Spoon OS"""
        return {
            "name": self.name,
            "description": self.description,
            "parameters": {
                "type": "object",
                "properties": {
                    "disaster_type": {
                        "type": "string",
                        "description": "Type of disaster detected",
                        "enum": ["wildfire", "flood", "accident", "mass_casualty"]
                    },
                    "evidence_link": {
                        "type": "string",
                        "description": "URL to video proof (IPFS/NeoFS)"
                    },
                    "sector_id": {
                        "type": "string",
                        "description": "Sector where incident was detected"
                    },
                    "confidence": {
                        "type": "number",
                        "description": "Confidence score (0-1)"
                    },
                    "coordinates": {
                        "type": "object",
                        "description": "GPS coordinates",
                        "properties": {
                            "lat": {"type": "number"},
                            "lng": {"type": "number"}
                        }
                    }
                },
                "required": ["disaster_type", "evidence_link", "sector_id", "confidence"]
            }
        }


class NeoWalletApprovalTool:
    """
    Tool for requesting user approval via NeoLine wallet popup.
    Spoon OS calls this before executing any blockchain action.
    """
    
    name = "request_wallet_approval"
    description = "Request user approval via NeoLine wallet for blockchain action"
    
    def run(self, action_description: str, action_data: dict) -> dict:
        """
        Request wallet approval from user.
        In production, this would trigger a NeoLine popup.
        
        Args:
            action_description: Human-readable description of the action
            action_data: Data about the action to be approved
        
        Returns:
            Approval status
        """
        
        return {
            "status": "pending_approval",
            "message": f"User approval required for: {action_description}",
            "action_data": action_data,
            "approval_required": True,
            "timestamp": datetime.now().isoformat()
        }
