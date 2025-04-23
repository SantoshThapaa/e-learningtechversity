import TeacherNavbar from "@/components/custom/navbar/TeacherNavbar";
import NotificationListPage from "@/components/custom/NotificationListPage";


export default function CoursePage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <TeacherNavbar/>
      <div className="mt-20">
      <NotificationListPage/>
      </div>
    </div>
  );
}
