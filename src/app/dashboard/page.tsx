"use client";

import { Button } from "@/components/ui/button";
import { clearUser, getUser } from "@/lib/storage";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const userData = getUser();
        if (!userData) {
          router.replace("/login");
        } else {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = (): void => {
    try {
      clearUser();
      router.push("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-gray-300 h-16 w-16 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-500 mb-4">No user data found</p>
          <Button onClick={() => router.push("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg flex flex-col items-center gap-6 transition-all duration-300 hover:shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800 animate-bounce">
          Welcome {user.name.first} 👋
        </h1>
        <img 
          src={user.picture.large} 
          alt={`${user.name.first} ${user.name.last}`}
          className="rounded-full border-4 border-indigo-200 shadow-md w-32 h-32 object-cover"
        />
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            {user.name.first} {user.name.last}
          </p>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <Button 
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 transition-colors duration-200"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
