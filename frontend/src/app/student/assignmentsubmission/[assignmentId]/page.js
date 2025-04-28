import AssignmentInstructorCard from "@/components/custom/assignmentInstructorCard";
import StudentNavbar from "@/components/custom/navbar/StudentNavbar";
import AssignmentSubmissionTab from "@/components/custom/tabs/AssignmentSubmissionTab";

export default function TaskPage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <StudentNavbar />
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <AssignmentInstructorCard/>
        <AssignmentSubmissionTab/>
      </div>
    </div>
  );
}

