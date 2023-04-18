import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  token: string;
  isAuth: boolean;
  username: string;
  role: string;
};

type Actions = {
  setToken: (token: string) => void;
  logout: () => void;
  setUsername: (username: string) => void;
  setRole: (role: string) => void;
};

export const useAuthStore = create(
  persist<State & Actions>(
    (set) => ({
      token: " ",
      isAuth: false,
      username: "",
      role: "",
      setToken: (token: string) =>
        set((state) => ({
          token,
          isAuth: true,
        })),
      logout: () =>
        set((state) => ({
          token: " ",
          isAuth: false,
          username: "",
        })),
      setUsername: (username: string) =>
        set((state) => ({
          username,
        })),
      setRole: (role: string) =>
        set((state) => ({
          role,
        })),
    }),
    {
      name: "auth",
    }
  )
);
