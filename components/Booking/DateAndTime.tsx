import React, { useEffect, useState } from "react";

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
  setSelectedTime,
}) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    if (branch && selectedDate) {
      console.log(
        "Generating time slots for branch:",
        branch,
        "and date:",
        selectedDate
      );
      generateTimeSlots(branch.openingTime, branch.closingTime);
    }
  }, [branch, selectedDate]);

  const parseTime = (timeStr: string): string => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    hours = String(
      modifier === "PM" && hours !== "12"
        ? parseInt(hours, 10) + 12
        : modifier === "AM" && hours === "12"
        ? 0
        : hours
    );
    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  const getPeriod = (time: string): string => {
    const hour = parseInt(time.split(":")[0], 10);
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  };

  const generateTimeSlots = (
    openingTime: string,
    closingTime: string
  ): void => {
    const slots: { time: string; period: string }[] = [];
    let startTime = new Date(`1970-01-01T${parseTime(openingTime)}:00Z`);
    let endTime = new Date(`1970-01-01T${parseTime(closingTime)}:00Z`);

    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }

    while (startTime < endTime) {
      const time = startTime.toISOString().split("T")[1].slice(0, 5);
      slots.push({ time, period: getPeriod(time) });
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    console.log("Generated time slots:", slots);
    setTimeSlots(slots);
  };

  const isPastTime = (time: string): boolean => {
    const now = new Date();
    const selectedDateTime = new Date(`${selectedDate}T${time}`);
    return (
      now.toDateString() === selectedDateTime.toDateString() &&
      selectedDateTime < now
    );
  };

  const renderTimeSlots = (period: string) => {
    console.log(
      "Rendering time slots for period:",
      period,
      "Time slots:",
      timeSlots
    );
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
          <h3 className="text-lg font-bold mb-2 mt-4">
            Available slots for {new Date(selectedDate).toLocaleDateString()}
          </h3>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2">Morning</h4>
            <div className="flex flex-wrap">{renderTimeSlots("Morning")}</div>
          </div>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2">Afternoon</h4>
            <div className="flex flex-wrap">{renderTimeSlots("Afternoon")}</div>
          </div>
          <div className="flex flex-col mb-4">
            <h4 className="font-bold mb-2">Evening</h4>
            <div className="flex flex-wrap">{renderTimeSlots("Evening")}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default DateAndTimeSelection;
