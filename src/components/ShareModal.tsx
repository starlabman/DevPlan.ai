import React, { useState, useEffect } from 'react';
import { X, Share2, Copy, Check, Eye, Edit, Trash2, Clock, Users } from 'lucide-react';
import { collaborationService, SharedPlan } from '../services/collaborationService';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ideaId: string;
  ideaTitle: string;
}

export default function ShareModal({ isOpen, onClose, ideaId, ideaTitle }: ShareModalProps) {
  const [shares, setShares] = useState<SharedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [selectedPermission, setSelectedPermission] = useState<'view' | 'edit'>('view');
  const [expiresInDays, setExpiresInDays] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (isOpen && ideaId) {
      loadShares();
    }
  }, [isOpen, ideaId]);

  const loadShares = async () => {
    setLoading(true);
    try {
      const data = await collaborationService.getShareLinks(ideaId);
      setShares(data);
    } catch (error) {
      console.error('Error loading shares:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShare = async () => {
    setCreating(true);
    try {
      await collaborationService.createShareLink(ideaId, selectedPermission, expiresInDays);
      await loadShares();
      setSelectedPermission('view');
      setExpiresInDays(undefined);
    } catch (error) {
      console.error('Error creating share:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleCopyLink = (shareToken: string) => {
    const url = `${window.location.origin}/shared/${shareToken}`;
    navigator.clipboard.writeText(url);
    setCopiedToken(shareToken);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleRevoke = async (shareId: string) => {
    try {
      await collaborationService.revokeShareLink(shareId);
      await loadShares();
    } catch (error) {
      console.error('Error revoking share:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const isExpired = (expiresAt: string | null) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <Share2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Share Plan</h2>
              <p className="text-sm text-gray-600">{ideaTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Share Link</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permission Level
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPermission('view')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedPermission === 'view'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Eye className="w-5 h-5" />
                    <span className="font-medium">View Only</span>
                  </button>
                  <button
                    onClick={() => setSelectedPermission('edit')}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      selectedPermission === 'edit'
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Edit className="w-5 h-5" />
                    <span className="font-medium">Can Edit</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration (Optional)
                </label>
                <select
                  value={expiresInDays || ''}
                  onChange={(e) => setExpiresInDays(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Never expires</option>
                  <option value="1">1 day</option>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                </select>
              </div>

              <button
                onClick={handleCreateShare}
                disabled={creating}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {creating ? 'Creating...' : 'Generate Share Link'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" />
              Active Share Links ({shares.length})
            </h3>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : shares.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl">
                <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No share links created yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {shares.map((share) => (
                  <div
                    key={share.id}
                    className={`bg-white border rounded-xl p-4 ${
                      isExpired(share.expires_at) ? 'border-red-200 bg-red-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {share.permission === 'view' ? (
                          <Eye className="w-5 h-5 text-gray-600" />
                        ) : (
                          <Edit className="w-5 h-5 text-blue-600" />
                        )}
                        <span className="font-medium text-gray-900">
                          {share.permission === 'view' ? 'View Only' : 'Can Edit'}
                        </span>
                        {isExpired(share.expires_at) && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                            Expired
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRevoke(share.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                        title="Revoke access"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-3 font-mono text-sm text-gray-700 break-all">
                      {`${window.location.origin}/shared/${share.share_token}`}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {share.access_count} views
                        </span>
                        {share.expires_at && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Expires {formatDate(share.expires_at)}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleCopyLink(share.share_token)}
                        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        {copiedToken === share.share_token ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy Link
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
