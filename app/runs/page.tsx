import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GitBranch, ExternalLink, Clock, Eye, CheckCircle, AlertCircle, Loader, Plus } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function RunsPage() {
  const session = await getServerSession(options);
  if (!session) {
    return redirect("/signin");
  }

  try {
    // Fetch workflow runs
    const runs = await prisma.workflowRuns.findMany({
      where: {
        workflow: {
          userId: session.user.id,
        },
      },
      include: {
        workflow: {
          select: {
            id: true,
            Repo: true,
            Branch: true,
            docsRepo: true,
            hostingType: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'COMPLETED':
        case 'FINISHED':
          return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'ERROR':
          return <AlertCircle className="w-5 h-5 text-red-500" />;
        case 'PROCESSING_WEBHOOK':
        case 'FETCHING_FILES':
        case 'UPDATING_CONTENT':
        case 'CREATING_PR':
          return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
        default:
          return <Clock className="w-5 h-5 text-gray-500" />;
      }
    };

    const getStatusColor = (status: string) => {
      switch (status) {
        case 'COMPLETED':
        case 'FINISHED':
          return 'bg-green-100 text-green-800';
        case 'ERROR':
          return 'bg-red-100 text-red-800';
        case 'PROCESSING_WEBHOOK':
        case 'FETCHING_FILES':
        case 'UPDATING_CONTENT':
        case 'CREATING_PR':
          return 'bg-blue-100 text-blue-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    const getHostingTypeLabel = (hostingType: string | null) => {
      switch (hostingType) {
        case 'GITHUB':
          return { label: 'Repo', color: 'bg-blue-100 text-blue-700' };
        case 'HOSTED':
          return { label: 'Self-Hosted', color: 'bg-purple-100 text-purple-700' };
        default:
          return { label: 'Unknown', color: 'bg-gray-100 text-gray-700' };
      }
    };

    if (runs.length === 0) {
      return (
        <div className="min-h-screen relative overflow-hidden">
          {/* Green hue background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-green-100"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.05),transparent_70%)]"></div>
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(62, 207, 142, 0.3) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}></div>
          </div>

          <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-12 max-w-lg text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-changelog-primary/10 to-changelog-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-changelog-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-changelog-dark">
                No Workflow Runs Yet
              </h2>
              <p className="text-changelog-neutral mb-8 leading-relaxed">
                You don't have any workflow runs yet. Create a workflow and make changes to your repository to see runs appear here.
              </p>
              <div className="space-y-3">
                <Link href="/workflows">
                  <button className="inline-block w-full px-6 py-3 bg-gradient-to-r from-changelog-primary to-changelog-secondary hover:from-changelog-primary/90 hover:to-changelog-secondary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
                    <GitBranch className="w-5 h-5 mr-2 inline" />
                    View Workflows
                  </button>
                </Link>
                <Link href="/configuration">
                  <button className="inline-block w-full px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200">
                    <Plus className="w-5 h-5 mr-2 inline" />
                    Create Workflow
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Green hue background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white via-green-50 to-green-100"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(62,207,142,0.05),transparent_70%)]"></div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(62, 207, 142, 0.3) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}></div>
        </div>

        <div className="relative z-10 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] font-display text-black mb-4">
                    Workflow Runs
                  </h1>
                  <p className="text-xl text-changelog-neutral max-w-2xl leading-relaxed font-medium">
                    Track your documentation generation runs and view their status
                  </p>
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/workflows">
                    <button className="px-6 py-3 bg-gradient-to-r from-changelog-primary to-changelog-secondary hover:from-changelog-primary/90 hover:to-changelog-secondary/90 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-lg">
                      <GitBranch className="w-5 h-5 mr-2 inline" />
                      View Workflows
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Runs Table */}
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-changelog-primary/5 to-changelog-secondary/5 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-changelog-dark uppercase tracking-wider">
                        Repository
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-changelog-dark uppercase tracking-wider">
                        Branch
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-changelog-dark uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-changelog-dark uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-changelog-dark uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-changelog-dark uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {runs.map((run) => {
                      const displayRepo = run.Repo || run.workflow?.Repo;
                      const displayBranch = run.Branch || run.workflow?.Branch;
                      const hostingType = getHostingTypeLabel(run.hostingType);

                      return (
                        <tr key={run.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-changelog-primary to-changelog-secondary rounded-lg flex items-center justify-center mr-3">
                                <GitBranch className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <a
                                  href={`https://github.com/${displayRepo}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-changelog-primary hover:text-changelog-secondary hover:underline transition-colors"
                                >
                                  {displayRepo}
                                </a>
                                <div className="text-xs text-changelog-neutral">
                                  Run ID: {run.id.slice(0, 8)}...
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-changelog-dark">
                              {displayBranch}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${hostingType.color}`}>
                              {hostingType.label}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(run.status)}
                              <div>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(run.status)}`}>
                                  {run.status === 'CREATING_PR' ? 'CREATING DOCS' : run.status.replace('_', ' ')}
                                </span>
                                {(run.status === 'PROCESSING_WEBHOOK' || 
                                  run.status === 'FETCHING_FILES' || 
                                  run.status === 'UPDATING_CONTENT' || 
                                  run.status === 'CREATING_PR') && (
                                  <div className="text-xs text-gray-600 mt-1">
                                    Processing...
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-changelog-dark">
                              {new Date(run.createdAt).toLocaleDateString()}
                            </div>
                            <div className="text-xs text-changelog-neutral">
                              {new Date(run.createdAt).toLocaleTimeString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              {run.prUrl ? (
                                <>
                                  {/* View PR Button */}
                                  <a
                                    href={run.prUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-changelog-primary to-changelog-secondary hover:from-changelog-primary/90 hover:to-changelog-secondary/90 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                                  >
                                    <Eye className="w-4 h-4" />
                                    <span>View PR</span>
                                  </a>
                                </>
                              ) : run.gcsUrl && run.hostingType === 'HOSTED' ? (
                                <a
                                  href="/workflows"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-changelog-primary to-changelog-secondary hover:from-changelog-primary/90 hover:to-changelog-secondary/90 text-white text-sm font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
                                >
                                  {/* <ExternalLink className="w-4 h-4" /> */}
                                  <span>View Docs</span>
                                </a>
                              ) : (
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg">
                                  {['PROCESSING_WEBHOOK', 'FETCHING_FILES', 'UPDATING_CONTENT', 'CREATING_PR'].includes(run.status) 
                                    ? 'Processing...' 
                                    : 'No Output'}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching runs:", error);
    return redirect("/workflows");
  }
}