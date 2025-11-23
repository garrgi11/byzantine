"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from "lucide-react"

interface WalletApprovalProps {
  isOpen: boolean
  actionDescription: string
  actionData: {
    disaster_type?: string
    sector_id?: string
    confidence?: number
    coordinates?: { lat: number; lng: number }
    video_proof_url?: string
  }
  onApprove: () => void
  onReject: () => void
  isProcessing?: boolean
}

export function SpoonWalletApproval({
  isOpen,
  actionDescription,
  actionData,
  onApprove,
  onReject,
  isProcessing = false,
}: WalletApprovalProps) {
  const [approved, setApproved] = useState(false)
  const [rejected, setRejected] = useState(false)

  if (!isOpen) return null

  const handleApprove = () => {
    setApproved(true)
    setTimeout(() => {
      onApprove()
      setApproved(false)
    }, 1000)
  }

  const handleReject = () => {
    setRejected(true)
    setTimeout(() => {
      onReject()
      setRejected(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500/50 rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 px-6 py-4 border-b border-orange-500/30 flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-white">Spoon OS Action Required</h2>
            <p className="text-xs text-gray-400">Autonomous agent requesting approval</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Action Description */}
          <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
            <p className="text-sm text-gray-300 mb-2">
              <span className="font-semibold text-white">Action:</span> {actionDescription}
            </p>
          </div>

          {/* Incident Details */}
          {actionData.disaster_type && (
            <div className="space-y-3 bg-gray-900/50 rounded-lg p-4 border border-gray-700">
              <div className="flex justify-between items-start">
                <span className="text-xs text-gray-400">Disaster Type</span>
                <span className="text-sm font-semibold text-red-400 capitalize">
                  {actionData.disaster_type.replace("_", " ")}
                </span>
              </div>

              {actionData.sector_id && (
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400">Sector</span>
                  <span className="text-sm font-semibold text-white">{actionData.sector_id}</span>
                </div>
              )}

              {actionData.confidence !== undefined && (
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400">Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-red-500"
                        style={{ width: `${actionData.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-white">
                      {(actionData.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )}

              {actionData.coordinates && (
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400">Location</span>
                  <span className="text-xs font-mono text-gray-300">
                    {actionData.coordinates.lat.toFixed(4)}, {actionData.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              )}

              {actionData.video_proof_url && (
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-400">Evidence</span>
                  <span className="text-xs font-mono text-blue-400 truncate max-w-xs">
                    {actionData.video_proof_url}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Warning */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-xs text-red-300">
              ⚠️ This action will report the incident to the Neo N3 blockchain. This is an irreversible action.
            </p>
          </div>

          {/* Status Messages */}
          {approved && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              <p className="text-xs text-green-300">Action approved. Processing...</p>
            </div>
          )}

          {rejected && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <p className="text-xs text-red-300">Action rejected.</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="bg-gray-900/50 px-6 py-4 border-t border-gray-700 flex gap-3">
          <button
            onClick={handleReject}
            disabled={isProcessing || approved || rejected}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:opacity-50 text-white rounded-lg transition-colors font-medium text-sm"
          >
            Reject
          </button>
          <button
            onClick={handleApprove}
            disabled={isProcessing || approved || rejected}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:opacity-50 text-white rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
          >
            {isProcessing || approved ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Approve & Report"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
