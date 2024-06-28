import React, { useEffect, useState } from "react";
import { Branch } from "./booking";
interface TimeSlot {
  time: string;
  period: string;
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
  setSelectedTime,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (branch && selectedDate) {
      generateTimeSlots(branch.openingTime, branch.closingTime);
    }
  }, [branch, selectedDate]);

  const parseTime = (timeStr: string): Date => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = String(
      modifier === "PM" && hours !== "12"
        ? parseInt(hours, 10) + 12
        : modifier === "AM" && hours === "12"
        ? 0
        : parseInt(hours)
    );
  
    return new Date(`1970-01-01T${hours.padStart(2, "0")}:${minutes}:00Z`);
  };

  const generateTimeSlots = (openingTime: Date, closingTime: Date): void => {
    const slots: TimeSlot[] = [];
  
    let startTime = new Date(openingTime); 
    let endTime = new Date(closingTime);

    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1); 
    }

    while (startTime < endTime) {
      const formattedTime = formatTime(startTime);
      const period = getPeriod(new Date(startTime)); 
      slots.push({ time: formattedTime, period });
      startTime.setMinutes(startTime.getMinutes() + 30); 
    }

    setTimeSlots(slots);
  };

  const formatTime = (date: Date): string => {
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };
  const getPeriod = (date: Date): string => {
    const hour = date.getHours(); 
    if (hour < 12) return "Morning";
    if (hour >= 12 && hour < 17) return "Afternoon";
    return "Evening";
  };

  const isPastTime = (time: string): boolean => {
    const now = new Date();
    const selectedDateTime =
      new Date(`${selectedDate}T${time}:00Z`).getTime() + 7 * 60 * 60 * 1000;
    return selectedDateTime < now.getTime();
  };

  const renderTimeSlots = (period: string) => {
    return timeSlots
      .filter((slot) => slot.period === period)
      .map((slot, index) => {
        const isPast = isPastTime(slot.time);
        return (
          <button
            key={index}
            className={`p-2 m-1 rounded ${
              isPast
                ? "bg-gray-500 text-white"
                : selectedTime === slot.time
                ? "bg-red text-white"
                : "bg-white text-black"
            }`}
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
          <h3 className="text-lg font-bold mb-2 mt-4 text-white">
            Available slots for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2 text-white">Morning</h4>
            <div className="flex flex-wrap">{renderTimeSlots("Morning")}</div>
          </div>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2 text-white">Afternoon</h4>
            <div className="flex flex-wrap">{renderTimeSlots("Afternoon")}</div>
          </div>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2 text-white">Evening</h4>
            <div className="flex flex-wrap">{renderTimeSlots("Evening")}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateAndTimeSelection;
