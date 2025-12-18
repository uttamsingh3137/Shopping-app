import type { User } from "../types/User";

const USER_KEY = "currentUser";
const USERS_KEY = "users";

export const saveCurrentUser = (user: User) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const removeCurrentUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
