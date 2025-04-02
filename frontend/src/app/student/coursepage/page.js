import CoursePerformance from "@/components/custom/CoursePerformance";
import InstructorCard from "@/components/custom/instructorcard";


export default function CoursePage() {
  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <InstructorCard />
      <CoursePerformance />
    </div>
  );
}
