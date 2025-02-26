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
/* Comment out calendar imports
import { Calendar } from "@/components/ui/calendar";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
*/
import { cn } from "@/lib/utils";
import { useState } from "react";

type DeploymentTicketFormProps = {
  defaultValues?: {
    applicationName?: string;
    version?: string;
    gitRepository?: string;
    // deploymentTime?: Date;
  };
  onSubmit: (data: { 
    applicationName: string;
    version: string;
    gitRepository: string;
    // deploymentTime: Date;
  }) => void;
  onCancel: () => void;
};

export function DeploymentTicketForm({
  defaultValues,
  onSubmit,
  onCancel,
}: DeploymentTicketFormProps) {
  // const [date, setDate] = useState<Date | undefined>(defaultValues?.deploymentTime);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const applicationName = formData.get("applicationName") as string;
    const version = formData.get("version") as string;
    const gitRepository = formData.get("gitRepository") as string;
    
    if (applicationName && version && gitRepository) { // removed date check
      onSubmit({ 
        applicationName, 
        version, 
        gitRepository,
        // deploymentTime: date
      });
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Create Deployment Ticket</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="applicationName">Application Name</Label>
            <Input
              id="applicationName"
              name="applicationName"
              defaultValue={defaultValues?.applicationName}
              required
              placeholder="Enter application name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="version">Version</Label>
            <Input
              id="version"
              name="version"
              defaultValue={defaultValues?.version}
              required
              placeholder="Enter version (e.g., 1.0.0)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gitRepository">Git Repository</Label>
            <Input
              id="gitRepository"
              name="gitRepository"
              defaultValue={defaultValues?.gitRepository}
              required
              placeholder="Enter Git repository URL"
            />
          </div>
          {/* Comment out deploymentTime field
          <div className="space-y-2">
            <Label htmlFor="deploymentTime">Deployment Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="deploymentTime"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select deployment date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          */}
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