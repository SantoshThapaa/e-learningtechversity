'use client';

import StudentNavbar from "@/components/custom/navbar/StudentNavbar";
import ProfilePage from "@/components/custom/profile/Profile";

export default function StudentProfilePage() {
  return (
    <>
      <StudentNavbar />
      <main className="mt-20">
        <ProfilePage />
      </main>
    </>
  );
}
