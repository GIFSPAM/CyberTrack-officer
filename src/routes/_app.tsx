import { createFileRoute, redirect } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";

export const Route = createFileRoute("/_app")({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("auth") !== "true") {
        throw redirect({ to: "/login" });
      }
    }
  },
  component: AppShell,
});
