"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidIranianPhone } from "@/lib/validation";
import { saveUser } from "@/lib/storage";
import { User } from "@/types/user";

export default function LoginPage() {
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleLogin() {
    if (!isValidIranianPhone(phone)) {
      setError("The phone number is not valid");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res: Response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us"
      );
      const data: { results: any[] } = await res.json();
      const { name, email, picture } = data.results[0];
      const user: User = { name, email, picture };
      saveUser(user);
      router.push("/dashboard");
    } catch (err) {
      setError("A problem occurred. Please try again ");
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    handleLogin();
  };
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-5 rounded-xl shadow flex flex-col gap-3 bg-white"
      >
        <h2 className="text-md font-semibold">Login to your account</h2>
        <h4 className="text-sm -mt-2 mb-3">
          {" "}
          Enter your phone number below to login to your account
        </h4>
        <label htmlFor="phone" className="block text-sm font-medium">
          phone number{" "}
        </label>
        <Input
          id="phone"
          type="tel"
          placeholder="09xxxxxxxxx"
          value={phone}
          onChange={handlePhoneChange}
          disabled={loading}
        />
        {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
        <Button type="submit" disabled={loading}>
          {loading ? "Loading ..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
