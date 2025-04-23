
import StudentNavbar from "@/components/custom/navbar/StudentNavbar";
import NotificationListPage from "@/components/custom/NotificationListPage";


export default function CoursePage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <StudentNavbar/>
      <div className="mt-20">
      <NotificationListPage/>
      </div>
    </div>
  );
}
