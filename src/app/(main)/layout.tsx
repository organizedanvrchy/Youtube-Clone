import Sidebar from "@/components/ui/Sidebar";
import React from "react";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <main className="md:pl-60 pt-36">
                <div>{children}</div>
            </main>
            <Sidebar className="translate-x-0" />
        </>
    );
}