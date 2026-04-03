"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

// Logout button component - positioned at bottom left of the screen
export function LogoutButton() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  // Only show logout button if user is logged in
  if (!user) return null;

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="fixed top-4 right-4 z-50 flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
}