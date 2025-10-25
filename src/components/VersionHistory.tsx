import React, { useState, useEffect } from 'react';
import { X, Clock, ChevronDown, ChevronUp, GitBranch } from 'lucide-react';
import { versionService, IdeaVersion, VersionDiff } from '../services/versionService';

interface VersionHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  ideaId: string;
  onLoadVersion: (version: IdeaVersion) => void;
}

export default function VersionHistory({ isOpen, onClose, ideaId, onLoadVersion }: VersionHistoryProps) {
  const [versions, setVersions] = useState<IdeaVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedVersion, setExpandedVersion] = useState<string | null>(null);
  const [comparing, setComparing] = useState<{ v1: IdeaVersion; v2: IdeaVersion; diffs: VersionDiff[] } | null>(null);

  useEffect(() => {
    if (isOpen && ideaId) {
      loadVersions();
    }
  }, [isOpen, ideaId]);

  const loadVersions = async () => {
    setLoading(true);
    try {
      const data = await versionService.getVersions(ideaId);
      setVersions(data);
    } catch (error) {
      console.error('Error loading versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompare = (version: IdeaVersion) => {
    if (version.version_number === 1) return;

    const previousVersion = versions.find(v => v.version_number === version.version_number - 1);
    if (previousVersion) {
      const diffs = versionService.compareVersions(previousVersion, version);
      setComparing({ v1: previousVersion, v2: version, diffs });
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <GitBranch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Version History</h2>
              <p className="text-sm text-gray-600">{versions.length} versions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {comparing ? (
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mb-4">
              <button
                onClick={() => setComparing(null)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ← Back to versions
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Comparing Version {comparing.v1.version_number} → Version {comparing.v2.version_number}
              </h3>
              <div className="space-y-3">
                {comparing.diffs.length === 0 ? (
                  <p className="text-gray-600">No significant changes detected</p>
                ) : (
                  comparing.diffs.map((diff, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        diff.type === 'added'
                          ? 'bg-green-50 border border-green-200'
                          : diff.type === 'removed'
                          ? 'bg-red-50 border border-red-200'
                          : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            diff.type === 'added'
                              ? 'bg-green-200 text-green-800'
                              : diff.type === 'removed'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-blue-200 text-blue-800'
                          }`}
                        >
                          {diff.type.toUpperCase()}
                        </span>
                        <span className="font-semibold text-gray-900">{diff.field}</span>
                      </div>
                      {diff.oldValue && (
                        <div className="text-sm text-red-700 line-through mb-1">
                          {diff.oldValue}
                        </div>
                      )}
                      {diff.newValue && (
                        <div className="text-sm text-green-700 font-medium">
                          {diff.newValue}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : versions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No versions found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {versions.map((version) => (
                  <div
                    key={version.id}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                            v{version.version_number}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            {formatDate(version.created_at)}
                          </div>
                        </div>
                        {version.changes_summary && (
                          <p className="text-sm text-gray-700 mb-2">{version.changes_summary}</p>
                        )}
                        <button
                          onClick={() =>
                            setExpandedVersion(expandedVersion === version.id ? null : version.id)
                          }
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                        >
                          {expandedVersion === version.id ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide details
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Show details
                            </>
                          )}
                        </button>
                        {expandedVersion === version.id && (
                          <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                            <p className="text-sm text-gray-700 mb-3">{version.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {version.tech_stack.slice(0, 5).map((tech: any, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                >
                                  {tech.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-4">
                        {version.version_number > 1 && (
                          <button
                            onClick={() => handleCompare(version)}
                            className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                          >
                            Compare
                          </button>
                        )}
                        <button
                          onClick={() => onLoadVersion(version)}
                          className="px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          Load
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
