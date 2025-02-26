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

type UserDetailsFormProps = {
  defaultValues?: {
    name?: string;
    age?: number;
  };
  onSubmit: (data: { name: string; age: number }) => void;
  onCancel: () => void;
};

export function UserDetailsForm({
  defaultValues,
  onSubmit,
  onCancel,
}: UserDetailsFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    
    if (name && !isNaN(age)) {
      onSubmit({ name, age });
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Details</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={defaultValues?.name}
              required
              placeholder="Enter your name"
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
              max={150}
              placeholder="Enter your age"
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