import React, { useEffect, useState } from 'react';

interface TimeSlot {
  time: string;
  period: string;
}

interface Branch {
  name: string;
  openingTime: string;
  closingTime: string;
}

interface DateAndTimeSelectionProps {
  branch: Branch | null;
  selectedDate: string;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
}

const DateAndTimeSelection: React.FC<DateAndTimeSelectionProps> = ({
  branch,
  selectedDate,
  selectedTime,
  setSelectedTime
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (branch && selectedDate) {
      console.log('Generating time slots for branch:', branch, 'and date:', selectedDate);
      generateTimeSlots(branch.openingTime, branch.closingTime);
    }
  }, [branch, selectedDate]);

  const generateTimeSlots = (openingTime: string, closingTime: string) => {
    const slots = [];
    let startTime = new Date(`1970-01-01T${openingTime}:00`);
    const endTime = new Date(`1970-01-01T${closingTime}:00`);
    endTime.setHours(endTime.getHours() - 1);

    while (startTime <= endTime) {
      const time = startTime.toTimeString().slice(0, 5);
      const [hour] = time.split(':').map(Number);
      let period = '';

      if (hour < 12) {
        period = 'Morning';
      } else if (hour < 17) {
        period = 'Afternoon';
      } else {
        period = 'Evening';
      }

      slots.push({ time, period });
      startTime = new Date(startTime.getTime() + 30 * 60000); 
    }

    console.log('Generated time slots:', slots);
    setTimeSlots(slots);
  };


  const isPastTime = (time: string): boolean => {
    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${time}`);
    return now.toDateString() === selectedDateTime.toDateString() && selectedDateTime < now;
  };

  const renderTimeSlots = (period: string) => {
    console.log('Rendering time slots for period:', period, 'Time slots:', timeSlots);
    return timeSlots
      .filter(slot => slot.period === period)
      .map((slot, index) => {
        const isPast = isPastTime(slot.time);
        return (
          <button
            key={index}
            className={`p-2 m-1 rounded ${isPast ? 'bg-gray-500 text-white' : selectedTime === slot.time ? 'bg-red text-white' : 'bg-white text-black'}`}
            onClick={() => !isPast && setSelectedTime(slot.time)}
            disabled={isPast}
          >
            {slot.time}
          </button>
        );
      });
  };

  return (
    <div className="w-full">
      {branch && selectedDate && (
        <>
          <h3 className="text-lg font-bold mb-2 mt-4">Available slots for {new Date(selectedDate).toLocaleDateString()}</h3>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2">Morning</h4>
            <div className="flex flex-wrap">
              {renderTimeSlots('Morning')}
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2">Afternoon</h4>
            <div className="flex flex-wrap">
              {renderTimeSlots('Afternoon')}
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2">Evening</h4>
            <div className="flex flex-wrap">
              {renderTimeSlots('Evening')}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateAndTimeSelection;
