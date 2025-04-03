import IconRating from "react-icon-rating";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";

const InstructorCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
      <div className="flex flex-col">
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Instructor"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Introduction To Color Theory & Basic UI/UX</h2>
            <p className="text-sm text-gray-500">Design</p>
            <div className="flex items-center space-x-2">
              <IconRating value={4.8} readOnly />
              <span className="text-gray-600">4 Lessons | 24 weeks | English | Intermediate</span>
            </div>
            <p className="mt-4 text-sm text-gray-500">70 downloads (70 files)</p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <Avatar src="https://via.placeholder.com/100" alt="Instructor" className="w-16 h-16 rounded-full mb-4" />
        <h3 className="font-medium text-lg">Sofia Tim</h3>
        <p className="text-sm text-gray-500">UI/UX Teacher</p>
        <p className="text-sm text-gray-500">Exp. 6 years</p>
        <Button className="mt-4 bg-green-500 text-white">Join</Button>
        <p className="text-sm mt-2 text-gray-500">The class at 8:00 pm (Australian time)</p>
        <a href="https://meet.google.com" className="text-green-500 text-sm">meet.google.com</a>
      </div>
    </div>
  );
};

export default InstructorCard;
