import React, { useState, useEffect, useRef } from 'react';

interface Guest {
  name: string;
  phone: string;
}

const defaultGuest: Guest = {
  name: "",
  phone: "",
};

interface GuestsProps {
  isLoggedIn: boolean;
  user: Guest;
  onGuestsChange: (guests: Guest[]) => void;
  guestNumber: string;
  setGuestNumber: (guestNumber: string) => void;
}

export default function Guests({
  isLoggedIn,
  user,
  onGuestsChange,
  guestNumber,
  setGuestNumber
}: GuestsProps) {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [activeGuestIndex, setActiveGuestIndex] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    if (guestNumber === "2-6") {
      const initialGuests = isLoggedIn ? [user, defaultGuest] : [defaultGuest, defaultGuest];
      // Only update if different to prevent infinite loop
      if (JSON.stringify(guests) !== JSON.stringify(initialGuests)) {
        setGuests(initialGuests);
      }
    } else if (guestNumber === "justMe") {
      setGuests([]);
    }
  }, [isLoggedIn, user, guestNumber]); 

  useEffect(() => {
    // Skip the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      onGuestsChange(guests);
    }
  }, [guests]);

  const handleGuestChange = (
    index: number,
    field: keyof Guest,
    value: string
  ) => {
    const updatedGuests = [...guests];
    updatedGuests[index] = { ...updatedGuests[index], [field]: value };
    setGuests(updatedGuests);
  };

  const handleGuestNumberChange = (value: string) => {
    setGuestNumber(value);
    if (value === "justMe") {
      setGuests([]);
    } else {
      setGuests(isLoggedIn ? [user, defaultGuest] : [defaultGuest, defaultGuest]);
      setActiveGuestIndex(0);
    }
  };

  const addGuest = () => {
    if (guests.length < 6) {
      setGuests([...guests, defaultGuest]);
      setActiveGuestIndex(guests.length);
    }
  };

  const removeGuest = (index: number) => {
    if (guests.length > 2) {
      const updatedGuests = guests.filter((_, idx) => idx !== index);
      setGuests(updatedGuests);
      if (index === activeGuestIndex && index > 0) {
        setActiveGuestIndex(index - 1); 
      } else {
        setActiveGuestIndex(0);
      }
    }
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 items-center mb-8 mt-8'>
      <div className="text-xl text-white">I would like to book an appointment for</div>
      <select
        onChange={(e) => handleGuestNumberChange(e.target.value)}
        className="p-2 border text-black rounded"
        value={guestNumber}
      >
        <option value="justMe">Just Me</option>
        <option value="2-6">2-6 Guests</option>
      </select>
      {guestNumber === "2-6" && (
        <div className="flex flex-col items-center justify-center p-5">
          <div className="flex space-x-2 mb-4">
            {guests.map((_, index) => (
              <button
                key={index}
                className={`py-2 px-4 ${
                  activeGuestIndex === index ? "bg-red" : "bg-gray-400"
                } text-white`}
                onClick={() => setActiveGuestIndex(index)}
              >
                Guest {index + 1}
              </button>
            ))}
            {guests.length < 6 && (
              <button
                onClick={addGuest}
                className="py-2 px-4 bg-green-500 text-white"
              >
                +
              </button>
            )}
            {guests.length > 2 && (
              <button
                onClick={() => removeGuest(activeGuestIndex)}
                className="py-2 px-4 bg-red text-white"
              >
                -
              </button>
            )}
          </div>
          <div className="space-y-4 w-full max-w-md">
            {activeGuestIndex === 0 && isLoggedIn ? (
              <div>{user.name}</div>
            ) : activeGuestIndex === 0 ? (
              <div>Information will be overridden by logged-in guest details</div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Name*"
                  value={guests[activeGuestIndex].name}
                  onChange={(e) =>
                    handleGuestChange(activeGuestIndex, "name", e.target.value)
                  }
                  className="p-2 border border-gray-300 w-full"
                />
                <input
                  type="text"
                  placeholder="Phone Number*"
                  value={guests[activeGuestIndex].phone}
                  onChange={(e) =>
                    handleGuestChange(activeGuestIndex, "phone", e.target.value)
                  }
                  className="p-2 border border-gray-300 w-full"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
