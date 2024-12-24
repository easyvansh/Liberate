import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <div>Loading...</div>;
  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
