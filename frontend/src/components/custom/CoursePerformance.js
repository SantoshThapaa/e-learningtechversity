import { Progress } from "../ui/progress";

const CoursePerformance = () => {
  return (
    <div className="flex flex-col space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="w-full h-56 bg-gray-300 rounded-lg"></div> {/* Placeholder for the video */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">UI/UX Design</h2>
      <p className="text-sm text-gray-600">Embark on a transformative journey to enhance your English communication skills...</p>
      
      <div className="mt-6">
        <h3 className="font-medium text-lg">Performance</h3>
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600">Attendance</span>
            <Progress value={60} className="mt-2" />
          </div>
          <div>
            <span className="text-sm text-gray-600">Lessons Completed</span>
            <Progress value={60} className="mt-2" />
          </div>
          <div>
            <span className="text-sm text-gray-600">Assignments Completed</span>
            <Progress value={60} className="mt-2" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-lg">Course Duration</h3>
        <ul className="text-sm text-gray-600 list-disc pl-4">
          <li>Choose from flexible schedules: 8-week intensive course or 12-week standard.</li>
          <li>Classes conducted twice a week, with each session lasting 90 minutes.</li>
        </ul>
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-lg">Course Objectives</h3>
        <ul className="text-sm text-gray-600 list-disc pl-4">
          <li>Develop fluency in spoken English.</li>
          <li>Enhance pronunciation and articulation.</li>
          <li>Build a strong foundation in grammar and vocabulary.</li>
          <li>Improve listening and comprehension skills.</li>
          <li>Gain confidence in diverse communication scenarios.</li>
        </ul>
      </div>

      <p className="mt-4 text-sm text-gray-500">Instructor: Jeffrey E. Walton, UI/UX Designer</p>
    </div>
  );
};

export default CoursePerformance;
