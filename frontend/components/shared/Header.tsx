import { Button } from "../ui/button";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import SignOutButton from "./SignOutButton";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <h1 className="text-2xl font-bold">TrainBook</h1>
          </Link>
          <div className="hidden md:flex space-x-4">
     
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {session ? (
            <>
              {session.user?.role?.id === 1 && (
                <Link href="/admin">
                  <Button variant="ghost">Admin Dashboard</Button>
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
          </Button>
        </div>
      </div>
    </nav>
  );
}