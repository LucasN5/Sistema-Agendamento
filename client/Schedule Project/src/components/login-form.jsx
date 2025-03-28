"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LockIcon,
  MailIcon,
  ShieldIcon,
  UserIcon,
  UserPlusIcon,
} from "lucide-react";

export default function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event, userType) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);

      if (userType === "admin") {
        const adminCodeInput = document.getElementById("admin-special-code");
        const adminCode = adminCodeInput?.value;

        // Check if admin code is valid (in a real app, this would be server-side)
        if (adminCode) {
          navigate("/admin/dashboard");
        } else {
          // Handle invalid admin code
          alert("Invalid admin security key");
        }
      } else {
        // Client login
        navigate("/client/dashboard");
      }
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Choose your account type to continue
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="client" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 mx-4">
          <TabsTrigger
            value="client"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <UserIcon className="h-4 w-4 mr-2" />
            Client
          </TabsTrigger>
          <TabsTrigger
            value="admin"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <ShieldIcon className="h-4 w-4 mr-2" />
            Admin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="client">
          <form onSubmit={(e) => handleSubmit(e, "client")}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="client-email">Email</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="client-email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="client-password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="client-password"
                    type="password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in to Client Portal"}
              </Button>
              <div className="flex items-center justify-center w-full">
                <div className="border-t border-gray-200 flex-grow mr-4"></div>
                <span className="text-xs text-muted-foreground">OR</span>
                <div className="border-t border-gray-200 flex-grow ml-4"></div>
              </div>
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => navigate("/register")}
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Create New Account
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        <TabsContent value="admin">
          <form onSubmit={(e) => handleSubmit(e, "admin")}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Username</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-username"
                    type="text"
                    placeholder="admin"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="admin-password">Password</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-special-code">Admin Security Key</Label>
                <div className="relative">
                  <ShieldIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-special-code"
                    type="password"
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the special admin security key
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in to Admin Panel"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Admin access is restricted to authorized personnel only
              </p>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>

      <div className="px-8 py-4 text-center">
        <p className="text-sm text-muted-foreground">
          Dont have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline"
          >
            Create a new account
          </Link>
        </p>
      </div>
    </Card>
  );
}
