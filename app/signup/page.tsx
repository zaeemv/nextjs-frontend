'use client';

import { useState } from 'react';
import Link from 'next/link';


export default function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Add signup logic here
        console.log('Signup attempt:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 border border-border">
                <h2 className="text-center text-3xl font-extrabold text-foreground mb-6">
                    Create Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground">
                            Full Name
                        </label>
                        <input
                            id="fullName"
                            name="fullName"
                            type="text"
                            required
                            value={formData.fullName}
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