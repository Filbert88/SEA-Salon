"use client";
import React, { useState, useEffect } from "react";
import ServicesMenu from "@/components/Booking/service";
import DateAndTimeSelection from "./DateAndTime";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Modal from "../Modal";
import Toast from "../Toast";
import { ToastState } from "../Toast";
import Loading from "../Loading";

interface Stylist {
  id: string;
  name: string;
  price: string;
  specialty: string;
}

export interface Branch {
  name: string;
  openingTime: Date;
  closingTime: Date;
  location: string;
  phone: string;
}

interface BranchesProps {
  branches: Branch[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
}

export default function BookingPage({ branches }: BranchesProps) {
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const [isLoading, setIsLoading] = useState(false);
  const [branchName, setBranchName] = useState(branches[0]?.name || "");
  const [branch, setBranch] = useState<Branch | null>(branches[0] || null);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [stylist, setStylist] = useState<Stylist | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string | null>(
    null
  );
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "info",
  });

  useEffect(() => {
    const selectedBranch = branches.find((b) => b.name === branchName);
    setBranch(selectedBranch || null);

    async function fetchServices() {
      if (branchName) {
        console.log(`Fetching services for branch: ${branchName}`);
        const response = await fetch(
          `/api/booking/service?branch=${encodeURIComponent(branchName)}`
        );
        const data = await response.json();
        console.log(data);
        setServices(data);
      }
    }

    async function fetchStylists() {
      if (branchName) {
        console.log(`Fetching stylists for branch: ${branchName}`);
        const response = await fetch(
          `/api/stylists?branch=${encodeURIComponent(branchName)}`
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(
            `Failed to fetch stylists: ${data.error || "Server error"}`
          );
        }
        if (Array.isArray(data)) {
          console.log(data);
          setStylists(data);
        } else {
          console.error("Expected an array of stylists, received:", data);
          setStylists([]);
        }
      }
    }

    fetchServices();
    fetchStylists();
  }, [branchName]);

  const convertUTCToLocalTime = (utcTime: Date): string => {
    const localTime = new Date(utcTime.getTime());

    localTime.setUTCHours(localTime.getUTCHours() + 7);

    const formattedTime =
      localTime.getUTCHours().toString().padStart(2, "0") +
      ":" +
      localTime.getUTCMinutes().toString().padStart(2, "0");

    return formattedTime;
  };

  const handleServiceSelectionChange = (services: Service[]) => {
    setSelectedServices(services);
  };

  console.log("selected services", selectedServices);
  const handleStylistChange = (selectedStylist: Stylist) => {
    console.log("Selected stylist data:", selectedStylist);
    setStylist(selectedStylist);
    setSelectedStylistId(selectedStylist.id);
  };

  const handleBranchSelect = (branch: Branch) => {
    setBranchName(branch.name);
    setIsModalOpen(false);
  };

  const submitReservation = async () => {
    if (selectedServices.length === 0) {
      setToast({
        isOpen: true,
        message: "Please select a service to complete your reservation",
        type: "error",
      });
      return;
    }
    if (!isLoggedIn) {
      setToast({
        isOpen: true,
        message: "Please log in to complete your reservation",
        type: "error",
      });
      redirect("/signin");
      return;
    }

    if (!branchName) {
      setToast({
        isOpen: true,
        message: "Please select a branch to complete your reservation",
        type: "error",
      });
      return;
    }

    if (!stylist) {
      setToast({
        isOpen: true,
        message: "Please select a stylist to complete your reservation",
        type: "error",
      });
      return;
    }

    if (!date || !time) {
      setToast({
        isOpen: true,
        message: "Please select date and time to complete your reservation",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    const totalDuration = selectedServices.reduce(
      (total, service) => total + Number(service.duration),
      0
    );

    const startTime = new Date(`${date} ${time}:00`);
    const endTime = new Date(startTime.getTime() + totalDuration * 60000);
    const endTimeIso = endTime.toISOString();
    const servicesTotalPrice = selectedServices.reduce(
      (total, service) => total + Number(service.price),
      0
    );
    const totalPrice = BigInt(servicesTotalPrice) + BigInt(stylist.price);

    const reservationData = {
      branchName,
      services: selectedServices.map((service) => ({
        serviceId: Number(service.id),
        duration: service.duration,
        price: service.price,
      })),
      stylistId: stylist.id,
      date,
      time,
      endTime: endTimeIso,
      userId: session.user.id,
      totalPrice: totalPrice.toString(),
    };

    console.log("Reservation Data:", reservationData);

    try {
      const response = await fetch("/api/booking/stylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stylistId: stylist.id, startTime, endTime }),
      });

      const availability = await response.json();
      console.log("Is Available:", availability);

      if (!availability.isAvailable) {
        setToast({
          isOpen: true,
          message:
            "The selected stylist is not available for the chosen time. Please select a different time or stylist",
          type: "error",
        });
        return;
      }

      const createResponse = await fetch("/api/booking/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error("Failed to create reservation:", errorText);
        setToast({
          isOpen: true,
          message: "Failed to create reservation" + errorText,
          type: "error",
        });
        return;
      }

      const result = await createResponse.json();
      console.log(result);

      setToast({
        isOpen: true,
        message: "Reservation created successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      console.log(error);
      setToast({
        isOpen: true,
        message: "Failed to create reservation",
        type: "error",
      });
    } finally {
      setSelectedServices([]);
      setStylist(null);
      setDate("");
      setTime("");
      setSelectedStylistId(null);
      setIsLoading(false);
    }
  };

  const renderDateInput = () => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
      <input
        type="date"
        value={date}
        min={today.toISOString().split("T")[0]}
        max={maxDate.toISOString().split("T")[0]}
        onChange={(e) => setDate(e.target.value)}
        className="p-3 rounded text-white hover:cursor-pointer bg-red"
      />
    );
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  useEffect(() => {
    const serviceTotal = selectedServices.reduce(
      (total, service) => total + Number(service.price),
      0
    );
    const stylistPrice = stylist ? Number(stylist.price) : 0;
    const tax = (serviceTotal + stylistPrice) * 0.1;
    const total = serviceTotal + stylistPrice + tax;

    setTotalPrice(total);
  }, [selectedServices, stylist]);

  const isSummaryReady = selectedServices.length > 0 && date && time && stylist;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center pt-32 w-full px-10 md:px-20">
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl mb-4 text-white">Select a Branch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg cursor-pointer"
              onClick={() => handleBranchSelect(branch)}
            >
              <h3 className="text-xl font-bold text-white">{branch.name}</h3>
              <p className="text-gray-400">{branch.location}</p>
              <p className="text-gray-400">{branch.phone}</p>
              <p className="text-gray-400">
                Opening Time: {convertUTCToLocalTime(branch.openingTime)}
              </p>
              <p className="text-gray-400">
                Closing Time: {convertUTCToLocalTime(branch.closingTime)}
              </p>
            </div>
          ))}
        </div>
      </Modal>
      <div className="max-w-6xl w-full flex flex-col justify-center items-center space-y-4">
        <div className="w-full">
          <div>
            <div className="text-3xl font-bold mb-3 text-white">Branch</div>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="text-3xl text-white">{branchName}</div>
              <select
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                className="bg-white text-black p-3 border-2 border-custom-green rounded-lg"
              >
                <option value="">Select a branch</option>
                {branches.map((branch, index) => (
                  <option key={index} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-4 mt-4 text-white">
              Select the Service
            </div>
            <ServicesMenu
              serviceData={services}
              onSelectionChange={handleServiceSelectionChange}
            />
          </div>
          <div>
            <div className="text-3xl font-bold mt-8 mb-4 text-white">
              Select Date
            </div>
            {renderDateInput()}
          </div>
          <DateAndTimeSelection
            branch={branch}
            selectedDate={date}
            selectedTime={time}
            setSelectedTime={setTime}
          />
          <div>
            <div className="text-3xl font-bold mt-8 mb-3 text-white">
              Stylist
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {stylists.map((stylist) => (
                <div
                  key={stylist.id}
                  className={`p-4 rounded-lg cursor-pointer ${
                    availability[stylist.id] === false
                      ? "bg-gray-400"
                      : "bg-gray-800"
                  } ${
                    stylist.id === selectedStylistId
                      ? "border-4 border-red"
                      : ""
                  }`}
                  onClick={() => {
                    if (availability[stylist.id] !== false) {
                      handleStylistChange(stylist);
                    }
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div className="rounded-full bg-gray-200 text-black w-12 h-12 flex items-center justify-center">
                      {stylist.name[0].toUpperCase()}
                    </div>
                    <div className="ml-2">
                      <h3 className="text-lg font-bold text-white">
                        {stylist.name}
                      </h3>
                      <p className="text-white">
                        {formatRupiah(Number(stylist.price))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isSummaryReady && (
            <div className="w-full bg-gray-800 p-4 mt-8 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Summary</h3>
              <p>
                {new Date(date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                @ {time} with {stylist?.name}
              </p>
              <div className="flex flex-col md:flex-row justify-between text-white">
                <div>
                  <div className="mt-4">
                    <p className="text-white">Description</p>
                    <p className="text-white">Stylist Rates</p>
                    {selectedServices.map((service, index) => (
                      <p key={index}>{service.name}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="mt-4">
                    <p className="text-white">Amount</p>
                    {selectedServices.map((service, index) => (
                      <p key={index}>{formatRupiah(Number(service.price))}</p>
                    ))}
                    {stylist && <p>{formatRupiah(Number(stylist.price))}</p>}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row justify-between text-white mt-4">
                <p>Tax</p>
                <p>{formatRupiah(totalPrice * 0.1)}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-between text-white mt-4">
                <p>Total</p>
                <p>{formatRupiah(totalPrice)}</p>
              </div>
            </div>
          )}

          <button
            onClick={submitReservation}
            className="p-3 mt-4 bg-gray-800 text-white rounded-lg"
          >
            Book Reservation
          </button>
        </div>
      </div>
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        closeToast={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
}
