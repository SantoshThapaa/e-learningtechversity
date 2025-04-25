import AssignmentInstructorCard from "@/components/custom/assignmentInstructorCard";
import StudentNavbar from "@/components/custom/navbar/StudentNavbar";
import AssignmentStatusTab from "@/components/custom/tabs/AssignmentStatusTab";


export default function CoursePage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <StudentNavbar />
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <AssignmentInstructorCard/>
        <AssignmentStatusTab/>
      </div>
    </div>
  );
}

