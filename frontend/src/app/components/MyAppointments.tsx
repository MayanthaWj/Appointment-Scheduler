/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { fetchAppointmentsByEmail } from "../lib/api";
import Link from "next/link";

export default function MyAppointments({ email }: { email: string }) {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const data = await fetchAppointmentsByEmail(email);
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [email]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-500">Loading your appointments...</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-600 mb-2">
          No Appointments Found
        </h3>
        <p className="text-gray-500 mb-4">
          We could not find any appointments for{" "}
          <span className="font-medium">{email}</span>
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Book New Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Found {appointments.length} appointment
          {appointments.length !== 1 ? "s" : ""}
        </p>
      </div>

      {appointments.map((appointment) => {
        const date = new Date(appointment.slot.dateTime);
        const dateStr = date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const timeStr = date.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        const isPast = date < new Date();

        return (
          <div
            key={appointment.id}
            className={`p-6 rounded-lg border-2 ${
              isPast
                ? "border-gray-200 bg-gray-50"
                : "border-blue-200 bg-blue-50"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-full ${
                      isPast ? "bg-gray-200" : "bg-blue-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        isPast ? "text-gray-500" : "text-blue-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p
                      className={`font-semibold ${
                        isPast ? "text-gray-600" : "text-gray-900"
                      }`}
                    >
                      {dateStr}
                    </p>
                    <p
                      className={`text-lg font-bold ${
                        isPast ? "text-gray-500" : "text-blue-600"
                      }`}
                    >
                      {timeStr}
                    </p>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <p className={isPast ? "text-gray-500" : "text-gray-700"}>
                    <span className="font-medium">Name:</span>{" "}
                    {appointment.name}
                  </p>
                  <p className={isPast ? "text-gray-500" : "text-gray-700"}>
                    <span className="font-medium">Email:</span>{" "}
                    {appointment.email}
                  </p>
                </div>

                {isPast && (
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full">
                      Past Appointment
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Book Another Appointment
        </Link>
      </div>
    </div>
  );
}
