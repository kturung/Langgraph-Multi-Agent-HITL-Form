"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { XIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

type HotelBookingFormProps = {
  defaultValues?: {
    fullName?: string;
    surname?: string;
    age?: number;
    address?: string;
  };
  onSubmit: (data: { 
    fullName: string;
    surname: string;
    age: number;
    address: string;
  }) => void;
  onCancel: () => void;
};

export function HotelBookingForm({
  defaultValues,
  onSubmit,
  onCancel,
}: HotelBookingFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const surname = formData.get("surname") as string;
    const ageValue = formData.get("age") as string;
    const age = parseInt(ageValue, 10);
    const address = formData.get("address") as string;
    
    if (fullName && surname && !isNaN(age) && address) {
      onSubmit({ 
        fullName,
        surname,
        age,
        address
      });
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Hotel Booking</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue={defaultValues?.fullName}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              name="surname"
              defaultValue={defaultValues?.surname}
              required
              placeholder="Enter your surname"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              name="age"
              type="number"
              defaultValue={defaultValues?.age}
              required
              min={0}
              max={120}
              placeholder="Enter your age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              defaultValue={defaultValues?.address}
              required
              placeholder="Enter your address"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <XIcon className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button type="submit">
            <CheckIcon className="mr-2 h-4 w-4" />
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
} 