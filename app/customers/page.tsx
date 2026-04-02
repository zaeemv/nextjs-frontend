"use client";

import { useState, useEffect } from "react";
import { getCustomers } from "@/lib/api";

interface Customer {
    id: string;
    name: string;
    contact_info: string;
}

export default function CustomersPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const data = await getCustomers();
                setCustomers(data);
            } catch (error) {
                console.error("Failed to fetch customers:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCustomers();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center text-foreground">Loading...</div>;
    }

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