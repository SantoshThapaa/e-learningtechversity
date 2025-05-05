"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

const getLast10Days = () => {
  const today = new Date();
  let days = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    days.push(date.toISOString().split("T")[0]); 
  }
  return days;
};

const AttendancePage = () => {
  const [courseId, setCourseId] = useState(null); 
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("courseId");  
    if (id) {
      setCourseId(id); 
    }
  }, [searchParams]);

  const fetchAttendanceData = async () => {
    try {
      const res = await axios.get(`https://back.bishalpantha.com.np/api/attendance/student`); 
      setAttendance(res.data.attendance); 
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = (studentId, date, present) => {
    setAttendance((prevState) =>
      prevState.map((att) =>
        att.studentId === studentId && att.date === date
          ? { ...att, present }
          : att
      )
    );
  };

  const saveAttendance = async () => {
    try {
      const updatedAttendance = attendance.map((att) => ({
        studentId: att.studentId,
        date: att.date,
        present: att.present,
      }));

      await axios.post(`https://back.bishalpantha.com.np/api/attendance/${courseId}/save`, { updatedAttendance });
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  useEffect(() => {
    if (!courseId) return;
  
    setDates(getLast10Days());
  
    const fetchStudentsByCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://back.bishalpantha.com.np/api/courses/${courseId}/students`);
        setStudents(res.data.students);
      } catch (error) {
        console.error("Error fetching students by course:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStudentsByCourse();
    fetchAttendanceData();
  }, [courseId]);
  

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Mark Attendance</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-4 mb-4">
              <div className="col-span-1 sm:col-span-3 lg:col-span-3">
                <Label className="font-semibold">Student</Label>
              </div>
              {dates.map((date, index) => (
                <div key={index} className="text-center sm:text-left">
                  <Label className="font-semibold">{date}</Label>
                </div>
              ))}
            </div>

            {students.map((student) => (
              <div key={student.id} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-12 gap-4 items-center py-2 border-b">
                <div className="col-span-1 sm:col-span-3 lg:col-span-3">{student.name}</div>
                {dates.map((date, index) => {
                  const attendanceRecord = attendance.find(
                    (att) => att.studentId === student.id && att.date === date
                  );
                  return (
                    <div key={index} className="text-center sm:text-left">
                      <Checkbox
                        checked={attendanceRecord?.present || false}
                        onCheckedChange={(checked) =>
                          handleAttendanceChange(student.id, date, checked)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            ))}

            <Button
              onClick={saveAttendance}
              className="mt-4 bg-blue-500 text-white hover:bg-blue-600 w-full sm:w-auto"
            >
              Save Attendance
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendancePage;
