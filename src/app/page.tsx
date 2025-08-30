"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/storage";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = getUser();

    if (user) {
      router.replace("/dashboard"); 
    } else {
      router.replace("/login"); 
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Loading...</p>
    </div>
  );
}
