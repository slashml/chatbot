import { getServerSession } from "next-auth/next";
import { options } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
// import { getPlanLimits } from "@/lib/plans";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    // include: {
    //   subscription: true,
    // },
  });

  if (!user) {
    redirect("/signin");
  }

  // Get current month's token usage
  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);

  // const monthlyUsage = await prisma.tokenUsage.aggregate({
  //   where: {
  //     userId: user.id,
  //     createdAt: { gte: currentMonth },
  //   },
  //    _sum: { tokensUsed: true },
  // });

  // const tokensUsedThisMonth = monthlyUsage._sum.tokensUsed || 0;
  // const limits = getPlanLimits(user.planType);

  const { name, email, image } = session.user;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          {image && (
            <Image
              src={image}
              alt={name || "Avatar"}
              width={96}
              height={96}
              className="rounded-full mb-4"
            />
          )}
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Name:</span> {name || "—"}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {email || "—"}
            </div>
          </div>
        </div>

        {/* Plan Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Current Plan</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Plan:</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user.planType === 'FREE' ? 'bg-gray-100 text-gray-800' :
                user.planType === 'PRO' ? 'bg-blue-100 text-blue-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {user.planType}
              </span>
            </div>
            
            <div>
              <span className="font-semibold">Repository Access:</span>{" "}
              {/* {limits.allowPrivateRepos ? "Private & Public" : "Public Only"} */}
            </div>
            
            {/* <div>
              <span className="font-semibold">Commit Message Limit:</span>{" "}
              {limits.commitMessagesLimit}
            </div> */}

            {/* <div>
              <span className="font-semibold">Monthly Tokens:</span>{" "}
              {tokensUsedThisMonth.toLocaleString()} / {limits.tokensPerMonth.toLocaleString()}
            </div> */}

            {/* <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full"
                style={{ 
                  width: `${Math.min((tokensUsedThisMonth / limits.tokensPerMonth) * 100, 100)}%` 
                }}
              />
            </div> */}

            {user.planType === 'FREE' && (
              <div className="mt-4">
                <Link
                  href="https://calendly.com/faizank/15min"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Upgrade Plan
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Token Usage History */}
      {/* <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Token Usage</h2>
        <TokenUsageTable userId={user.id} />
      </div> */}
    </div>
  );
}

async function TokenUsageTable({ userId }: { userId: string }) {
  const recentUsage = await prisma.tokenUsage.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      workflow: {
        select: {
          Repo: true,
          docsRepo: true,
        },
      },
    },
  });

  if (recentUsage.length === 0) {
    return <p className="text-gray-500">No token usage recorded yet.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Operation</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tokens</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Repository</th>
          </tr>
        </thead>
        <tbody>
          {recentUsage.map((usage, idx) => (
            <tr key={usage.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-4 py-2 text-sm text-gray-600">
                {new Date(usage.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {usage.operation}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {usage.tokensUsed.toLocaleString()}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {usage.workflow?.Repo || "–"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}