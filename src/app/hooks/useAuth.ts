import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth-check");
        if (!response.ok) {
          router.push("/login");
        }
      } catch (error) {
        console.log("Auth check error", error);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);
}
