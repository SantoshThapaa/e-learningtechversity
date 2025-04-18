import CoursePerformance from "@/components/custom/CoursePerformance";
import InstructorCard from "@/components/custom/instructorcard";
import StudentNavbar from "@/components/custom/navbar/StudentNavbar";


export default function CoursePage() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <StudentNavbar/>
      <InstructorCard />
      <CoursePerformance />
    </div>
  );
}
