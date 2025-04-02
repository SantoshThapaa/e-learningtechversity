import { Avatar } from "../../../../frontend/src/components/ui/avatar";
import { Button } from "../../../../frontend/src/components/ui/button";

export default function StudentTable() {
    const students = [
        { name: 'Jane Cooper', email: 'example1@mail.com', course: 'UI/UX', joinDate: '2024/2/3', status: 'In Progress', mentor: 'Teacher 1' },
        { name: 'Guy Hawkins', email: 'example2@mail.com', course: 'Mern Stack', joinDate: '2024/2/3', status: 'In Progress', mentor: 'Teacher 1' },
        { name: 'Dianne Russell', email: 'example3@mail.com', course: 'UI/UX', joinDate: '2024/2/3', status: 'In Progress', mentor: 'Teacher 2' },
        { name: 'Ronald Richards', email: 'example4@mail.com', course: 'Graphic', joinDate: '2024/2/3', status: 'Completed', mentor: 'Jane Cooper' },
        // Add more students...
    ];

    const statusColors = {
        'In Progress': 'bg-orange-300 text-orange-800',
        Completed: 'bg-green-300 text-green-800',
    };

    return (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-20 pl-50">
            <table className="min-w-full text-sm text-left text-gray-500">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                    <tr>
                        <th className="px-6 py-3">
                            <input type="checkbox" />
                        </th>
                        <th className="px-6 py-3">Students</th>
                        <th className="px-6 py-3">Email ID</th>
                        <th className="px-6 py-3">Courses</th>
                        <th className="px-6 py-3">Join Date</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Actions</th>
                        <th className="px-6 py-3">Mentor</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-6 py-4">
                                <input type="checkbox" />
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center space-x-3">
                                    <Avatar src="/path/to/avatar.png" alt={student.name} />
                                    <span>{student.name}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">{student.email}</td>
                            <td className="px-6 py-4">{student.course}</td>
                            <td className="px-6 py-4">{student.joinDate}</td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${statusColors[student.status]}`}>
                                    {student.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <Button variant="outline">View More</Button>
                            </td>
                            <td className="px-6 py-4">{student.mentor}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center p-4">
                <span className="text-sm text-gray-700">
                    Showing 1 to 10 of 12 entries
                </span>
                <div className="inline-flex items-center">
                    <Button variant="outline">1</Button>
                    <Button variant="outline">2</Button>
                    {/* Add more page buttons as needed */}
                </div>
            </div>
        </div>
    );
}
