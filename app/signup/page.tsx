
// signup/page.tsx
// This page renders the signup form and handles user registration.
// On successful signup, the user is redirected to the login page.
'use client';


import { useState } from 'react'; // For managing form state
import { useAuth } from '@/components/AuthProvider'; // For accessing signup function
import { useRouter } from 'next/navigation'; // For navigation after signup
import Link from 'next/link'; // For navigation links

const SignupPage = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        full_name: '',
        username: '',
        email: '',
        password: '',
    });
    // State for error and loading
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    // Get signup function from AuthProvider
    const { signup } = useAuth();
    // Router for navigation
    const router = useRouter();


    // Handles input changes for all form fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    // Handles form submission for signup
    // Calls signup from AuthProvider and redirects to login on success
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await signup({
                username: formData.username,
                email: formData.email,
                full_name: formData.full_name,
                password: formData.password
            });
            router.push('/login');
        } catch (err: any) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 border border-border">
                <h2 className="text-center text-3xl font-extrabold text-foreground mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="full_name" className="block text-sm font-medium text-muted-foreground">
                            Full Name
                        </label>
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
                            required
                            value={formData.full_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-popover text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary placeholder:text-muted-foreground"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-muted-foreground">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-popover text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary placeholder:text-muted-foreground"
                            placeholder="johndoe"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-popover text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary placeholder:text-muted-foreground"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-muted-foreground">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-popover text-foreground border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary placeholder:text-muted-foreground"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground font-semibold py-2 px-4 rounded-md hover:bg-primary/90 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary hover:text-primary/90 font-medium">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default SignupPage;