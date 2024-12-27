"use client";

import { auth } from ".././lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const [authLoading, setAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthLoading(false);
      if (!user) {
        // Not logged in
        setIsLoggedIn(false);
        if (pathname !== "/login" && pathname !== "/signup") {
          router.replace("/login");
        }
      } else {
        setIsLoggedIn(true);
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  if (authLoading) return <p className="p-4">Loading...</p>;
  if (!isLoggedIn) return null; // The user is being redirected to login

  return <>{children}</>;
}
