"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { HotelBookingForm } from "./hotel-booking-form";

type BookHotelArgs = {
  hotel_id?: string;
  fullName?: string;
  surname?: string;
  age?: number;
  address?: string;
};

type BookHotelResult = {
  submitted?: boolean;
  cancelled?: boolean;
  error?: string;
  hotel_id?: string;
  fullName?: string;
  surname?: string;
  age?: number;
  address?: string;
};

export const BookHotelTool = makeAssistantToolUI<BookHotelArgs, string>(
  {
    toolName: "book_hotel",
    render: function BookHotelUI({ args, result, addResult }) {
      let resultObj: BookHotelResult;
      try {
        resultObj = result ? JSON.parse(result) : {};
      } catch (e) {
        resultObj = { error: result! };
      }

      const handleSubmit = async (data: { 
        fullName: string; 
        surname: string; 
        age: number; 
        address: string;
      }) => {
        addResult({
          submitted: true,
          hotel_id: args.hotel_id,
          fullName: data.fullName,
          surname: data.surname,
          age: data.age,
          address: data.address
        });
      };

      const handleCancel = () => {
        addResult({ 
            cancelled: true,
            reason: "User cancelled the hotel booking form"
         });
      };

      return (
        <div className="mb-4 flex flex-col items-center gap-2">
          <div>
            <pre className="whitespace-pre-wrap break-all text-center">
              book_hotel({JSON.stringify(args)})
            </pre>
          </div>
          {args.hotel_id && !result && (
            <HotelBookingForm
              defaultValues={{
                fullName: args.fullName,
                surname: args.surname,
                age: args.age,
                address: args.address
              }}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
          {!args.hotel_id && !result && (
            <div className="text-red-600 font-medium">
              Hotel ID is required to book a hotel
            </div>
          )}
          {resultObj.submitted && (
            <div className="text-center">
              <pre className="font-bold text-green-600">Successfully booked hotel</pre>
              <div className="mt-2 rounded-md bg-gray-100 p-4 text-left">
                <p><strong>Hotel ID:</strong> {resultObj.hotel_id}</p>
                <p><strong>Full Name:</strong> {resultObj.fullName}</p>
                <p><strong>Surname:</strong> {resultObj.surname}</p>
                <p><strong>Age:</strong> {resultObj.age}</p>
                <p><strong>Address:</strong> {resultObj.address}</p>
              </div>
            </div>
          )}
          {resultObj.cancelled && (
            <pre className="font-bold text-red-600">Cancelled</pre>
          )}
          {resultObj.error && (
            <pre className="font-bold text-red-600">{resultObj.error}</pre>
          )}
        </div>
      );
    },
  }
); 