import { User } from "@/types/user";

const USER_KEY = "user";

export function saveUser(user: User) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export function clearUser() {
  localStorage.removeItem(USER_KEY);
}