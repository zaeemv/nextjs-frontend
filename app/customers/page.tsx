
// customers/page.tsx
// This page displays a list of customers and is protected by authentication.
// If the user is not authenticated, they are redirected to the login page.
"use client";


import { useState, useEffect } from "react"; // For state and lifecycle
import { getCustomers } from "@/lib/api"; // For fetching customers
import { useAuth } from '@/components/AuthProvider'; // For auth state
import { useRouter } from 'next/navigation'; // For navigation
// Type definition for a customer
interface Customer {
    id: string;
    name: string;
    contact_info: string;
}

export default function CustomersPage() {
    // State for customers and loading
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
    // Get user and loading state from AuthProvider
    const { user, isLoading } = useAuth();
    // Router for navigation
    const router = useRouter();

    // Protects the page: if not authenticated (no JWT token), redirect to login
    useEffect(() => {
        if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
            console.log("No token found, redirecting to login");
            router.replace('/login');
            return;
        }
        // Only redirect if we've finished checking auth AND user is not logged in
        if (user === null && !isLoading) {
            console.log("User:", user, " isLoading:", isLoading);
            console.log("User not authenticated, redirecting to login");
            router.replace('/login');
        }
        
    }, [user, isLoading, router]);

    // Fetches customers from the backend on mount
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                // Always send Authorization header with Bearer token
                const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
                const data = await getCustomers(token);
                setCustomers(data);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setIsLoadingCustomers(false);
            }
        };
        fetchCustomers();
    }, []);

    // Show loading state while fetching
    if (isLoadingCustomers) {
        return <div className="p-8 text-center text-foreground">Loading...</div>;
    }

    // Render the customers table
    return (
        <div className="min-h-screen bg-background text-foreground p-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-foreground">Customers</h1>
                    <p className="text-muted-foreground mt-2">Manage and view your customer information</p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-sm">
                    <table className="min-w-full text-left text-base divide-y divide-border">
                        <thead className="bg-muted/10">
                            <tr>
                                <th className="px-4 py-3 font-semibold text-muted-foreground">Name</th>
                                <th className="px-4 py-3 font-semibold text-muted-foreground">ID</th>
                                <th className="px-4 py-3 font-semibold text-muted-foreground">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {customers.map((customer) => (
                                <tr key={customer.id} className="hover:bg-muted/20 transition-colors cursor-pointer">
                                    <td className="px-4 py-3">{customer.name}</td>
                                    <td className="px-4 py-3">{customer.id}</td>
                                    <td className="px-4 py-3">{customer.contact_info}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
                    