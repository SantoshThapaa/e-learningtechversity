'use client';
import TeacherNavbar from "@/components/custom/navbar/TeacherNavbar";
import ProfilePage from "@/components/custom/profile/Profile";

export default function StudentProfilePage() {
  return (
    <>
      <TeacherNavbar />
      <main className="mt-20">
        <ProfilePage />
      </main>
    </>
  );
}
