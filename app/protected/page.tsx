import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <p className="mb-4">You must be logged in to view this page.</p>
          <a href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <h1>Welcome, {session.user?.name || "Researcher"}!</h1>
    </div>
  );
}
