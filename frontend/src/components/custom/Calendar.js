"use client";
import { useState } from 'react';
import { Calendar as ShadcnCalendar } from '@/components/ui/calendar';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Select a Date</h3>

      <ShadcnCalendar
        selectedDate={selectedDate}
        onDateClick={handleDateClick} 
        className="text-center"
      />
      {selectedDate && (
        <div className="mt-4 text-lg font-semibold text-gray-800">
          Selected Date: {selectedDate.toDateString()}
        </div>
      )}
    </div>
  );
};

export default Calendar;
