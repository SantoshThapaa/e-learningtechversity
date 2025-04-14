import InstructorCard from "@/components/custom/instructorcard";
import StudentNavbar from "@/components/custom/navbar/StudentNavbar";

export default function CoursePage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <StudentNavbar />
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <InstructorCard />
      </div>
    </div>
  );
}

