"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Toast from "./Toast";
import { ToastState } from "./Toast";
import Loading from "./Loading";

const SignUp: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    isOpen: false,
    message: "",
    type: "error",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const validateFullName = (fullName: string): string => {
    if (fullName.length < 3) {
      return "fullName must be at least 3 characters long.";
    }
    return "";
  };

  const validateEmail = (email: string): string => {
    if (!email.includes("@")) {
      return "Please enter a valid email.";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    return "";
  };

  const validatePhone = (phone: string): string => {
    if (!/^\d+$/.test(phone)) {
      return "Phone number must contain only digits";
    }
    if (phone.length < 10) {
      return "Phone number must be valid (> 10 characters)";
    }
    return "";
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullNameError = validateFullName(fullName);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    if (fullNameError || emailError || passwordError || phoneError) {
      setToast({
        isOpen: true,
        message: fullNameError || emailError || passwordError || phoneError,
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullName, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setToast({
            isOpen: true,
            message: "Signup successful!",
            type: "success",
          });
        router.push("/signin");
      } else {
        const errorMessage = data.errors
          ? data.errors.map((error: any) => error.message).join(", ")
          : data.message || "An error occurred";
        setToast({ isOpen: true, message: errorMessage, type: "error" });
      }
    } catch (err) {
      setToast({ isOpen: true, message: "An error occurred", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex w-full max-w-[350px] flex-col gap-5 xl:gap-7">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="text-4xl mb-6 font-bold text-white">Sign Up</div>
        <div className="flex flex-col space-y-6 font-normal w-full">
          <input
            placeholder="fullName"
            className="py-4 px-5 w-full sm:w-[350px] text-black rounded-md"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            placeholder="Email"
            className="py-4 px-5 w-full sm:w-[350px] text-black rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Phone Number"
            className="py-4 px-5 w-full sm:w-[350px] text-black rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div className="relative w-full sm:w-[350px]">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="py-4 px-5 w-full text-black rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password && (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <Image
                  src="/visible.svg"
                  alt="visible"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 rounded-lg py-3 px-5 w-full sm:w-[350px] text-white bg-red"
        >
          Submit
        </button>
        <div className="flex flex-row space-x-2 mt-2">
          <div className="text-gray-300">Already have an account?</div>
          <div
            className="hover:underline hover:cursor-pointer text-white"
            onClick={() => router.push("/signin")}
          >
            Sign In.
          </div>
        </div>
      </form>
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        closeToast={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
};

export default SignUp;
