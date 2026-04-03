
// login/page.tsx
// This page renders the login form and handles user authentication.
// On successful login, the user is redirected to the customers page.
"use client";


import { useState } from "react"; // For managing form state
import { useAuth } from '@/components/AuthProvider'; // For accessing login function
import { useRouter } from 'next/navigation'; // For navigation after login
import Link from "next/link"; // For navigation links
import { Button } from "@/components/ui/button"; // UI button
import { Input } from "@/components/ui/input"; // UI input
import { Label } from "@/components/ui/label"; // UI label
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // UI card


const LoginPage = () => {
    // State for form fields
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // State for error and loading
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // Get login function from AuthProvider
    const { login } = useAuth();
    // Router for navigation
    const router = useRouter();

    // Handles form submission for login
    // Calls login from AuthProvider and redirects to customers on success
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await login({ username, password });
            router.push('/customers');
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8 text-base">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-foreground">Sign In</h1>
                    <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                </div>
                <Card className="w-full bg-card border border-border">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <Link href="/signup" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;