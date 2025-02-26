"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { UserDetailsForm } from "./user-details-form";

type GetUserDetailsArgs = {
  name?: string;
  age?: number;
};

type GetUserDetailsResult = {
  submitted?: boolean;
  cancelled?: boolean;
  error?: string;
  name?: string;
  age?: number;
};

export const GetUserDetailsTool = makeAssistantToolUI<GetUserDetailsArgs, string>(
  {
    toolName: "get_user_details",
    render: function GetUserDetailsUI({ args, result, addResult }) {
      let resultObj: GetUserDetailsResult;
      try {
        resultObj = result ? JSON.parse(result) : {};
      } catch (e) {
        resultObj = { error: result! };
      }

      const handleSubmit = async (data: { name: string; age: number }) => {
        addResult({
          submitted: true,
          name: data.name,
          age: data.age
        });
      };

      const handleCancel = () => {
        addResult({ 
            cancelled: true,
            reason: "User cancelled the form"
         });
      };

      return (
        <div className="mb-4 flex flex-col items-center gap-2">
          <div>
            <pre className="whitespace-pre-wrap break-all text-center">
              get_user_details({JSON.stringify(args)})
            </pre>
          </div>
          {!result && (
            <UserDetailsForm
              defaultValues={args}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
          {resultObj.submitted && (
            <pre className="font-bold text-green-600">Form submitted successfully</pre>
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