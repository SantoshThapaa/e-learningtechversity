'use client';

import AdminTopNavbar from "@/components/custom/navbar/AdminTopNavbar";
import ProfilePage from "@/components/custom/profile/Profile";

export default function AdminProfilePage() {
    return (
        <>
            <AdminTopNavbar />
            <main className="mt-20">
                <ProfilePage />
            </main>
        </>
    );
}
