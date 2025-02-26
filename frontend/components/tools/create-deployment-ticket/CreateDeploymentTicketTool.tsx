"use client";

import { makeAssistantToolUI } from "@assistant-ui/react";
import { DeploymentTicketForm } from "./deployment-ticket-form";

type CreateDeploymentTicketArgs = {
  applicationName?: string;
  version?: string;
  gitRepository?: string;
  //deploymentTime?: Date;
};

type CreateDeploymentTicketResult = {
  submitted?: boolean;
  cancelled?: boolean;
  error?: string;
  applicationName?: string;
  version?: string;
  gitRepository?: string;
  //deploymentTime?: string;
};

export const CreateDeploymentTicketTool = makeAssistantToolUI<CreateDeploymentTicketArgs, string>(
  {
    toolName: "create_deployment_ticket",
    render: function CreateDeploymentTicketUI({ args, result, addResult }) {
      let resultObj: CreateDeploymentTicketResult;
      try {
        resultObj = result ? JSON.parse(result) : {};
      } catch (e) {
        resultObj = { error: result! };
      }

      const handleSubmit = async (data: { 
        applicationName: string; 
        version: string; 
        gitRepository: string; 
        //deploymentTime: Date;
      }) => {
        addResult({
          submitted: true,
          applicationName: data.applicationName,
          version: data.version,
          gitRepository: data.gitRepository,
          //deploymentTime: data.deploymentTime.toISOString()
        });
      };

      const handleCancel = () => {
        addResult({ 
            cancelled: true,
            reason: "User cancelled the deployment ticket form"
         });
      };

      return (
        <div className="mb-4 flex flex-col items-center gap-2">
          <div>
            <pre className="whitespace-pre-wrap break-all text-center">
              create_deployment_ticket({JSON.stringify(args)})
            </pre>
          </div>
          {!result && (
            <DeploymentTicketForm
              defaultValues={args}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          )}
          {resultObj.submitted && (
            <div className="text-center">
              <pre className="font-bold text-green-600">Deployment ticket created successfully</pre>
              <div className="mt-2 rounded-md bg-gray-100 p-4 text-left">
                <p><strong>Application Name:</strong> {resultObj.applicationName}</p>
                <p><strong>Version:</strong> {resultObj.version}</p>
                <p><strong>Git Repository:</strong> {resultObj.gitRepository}</p>
                {/*<p><strong>Deployment Time:</strong> {resultObj.deploymentTime && new Date(resultObj.deploymentTime).toLocaleString()}</p>*/}
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