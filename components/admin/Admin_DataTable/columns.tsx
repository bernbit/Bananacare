"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
// import ResultModal from "@/components/modals/ResultModal";
import {
  AlertDialogTrigger,
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { MdClose } from "react-icons/md";
import { BananaDiseaseType } from "@/lib/constant";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ResultItem = {
  id: string;
  name: string;
  color?: string; // optional if some entries don't have it (like "not-banana")
  textColor?: string; // optional for the same reason
  percentage: number;
  recommendations: string[];
};

export type ScanResultType = {
  name: string;
  email: string;
  address: string;
  age: string;
  phoneNumber: string;
  percentage: number; // or string, depending on your data
  result: string;
  imgUrl: string;
  resultArr?: ResultItem[];
};

const diseaseKeyMap: Record<string, { name: string; color: string }> = {
  moko: { name: "Moko", color: "text-moko" },
  bmv: { name: "Bract Mosaic Virus", color: "text-bmv" },
  "black-sigatoka": { name: "Black Sigatoka", color: "text-black-sigatoka" },
  cordana: { name: "Cordana", color: "text-cordana" },
  panama: { name: "Panama", color: "text-panama" },
  weevil: { name: "Weevil", color: "text-weevil" },
  healthy: { name: "Healthy", color: "text-healthy" },
};

function formatDate(dateString: string): string {
  const date: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}

export const columns: ColumnDef<ScanResultType>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const url = row.original.imgUrl as string;
      return (
        <img
          src={url}
          alt="Uploaded Image"
          className="h-12 w-12 rounded object-cover"
        />
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      const value = row.getValue("createdAt") as string;
      return formatDate(value);
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
  },

  {
    accessorKey: "age",
    header: "Age",
  },

  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },

  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: ({ row }) => {
      const value = row.original.percentage as number;
      return value != null ? `${value}%` : "N/A";
    },
  },

  {
    accessorKey: "result",
    header: "Result",
    cell: ({ row }) => {
      const resultID = row.getValue("result") as string;
      return (
        <p className={`${diseaseKeyMap[resultID].color} font-medium`}>
          {diseaseKeyMap[resultID].name ?? resultID}
        </p>
      ); // fallback to original if not mapped
    },
  },

  {
    id: "summary",
    header: "Summary",
    cell: ({ row }) => {
      const rankedResults = row.original.resultArr;
      const previewImg = row.original.imgUrl;

      return (
        <AlertDialog>
          <AlertDialogTrigger className="bg-primary text-light rounded-md px-2 py-1 hover:cursor-pointer hover:opacity-70">
            View
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[48vw] md:px-10">
            <AlertDialogHeader className="h-fit text-left">
              <AlertDialogTitle className="flex items-center">
                <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
                  Result and Recommendation
                </p>
                <AlertDialogCancel className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70">
                  <MdClose className="size-6" />
                </AlertDialogCancel>
              </AlertDialogTitle>
            </AlertDialogHeader>

            {/* Body */}
            <div className="border-primary bg-primary/20 flex-1 rounded-md p-4">
              {/* Banana Image */}
              <div className="bg-primary/20 relative flex aspect-square max-h-[400px] w-full flex-col overflow-hidden rounded-t-md px-4 py-4">
                {previewImg && (
                  <img
                    src={previewImg}
                    alt="Banana Image"
                    className="h-full object-center"
                  />
                )}

                <div className="bg-dark/70 absolute inset-0 flex h-full w-full items-center justify-center">
                  <div className="bg-primary rounded-md p-2 hover:opacity-70">
                    <p className="text-light font-bold">
                      {rankedResults?.[0]?.name}
                    </p>
                  </div>
                </div>
              </div>

              {/* Result and Recommendation */}
              <div className="border-primary bg-light flex flex-col gap-2 rounded-b-md px-2 py-4">
                {/* Result */}
                <div className="flex flex-col gap-1 rounded-md">
                  <p className="text-dark rounded-md text-sm font-bold">
                    Result
                  </p>
                  {rankedResults
                    ?.filter((item) => item.name.toLowerCase() !== "not banana")
                    .map((result, index) => (
                      <div
                        className="text-light flex items-center justify-center gap-2 rounded-md px-2 py-2"
                        style={{
                          backgroundColor: result?.color,
                          color: result?.textColor,
                        }}
                        key={index}
                      >
                        <p className="bg-dark/40 text-light border-light/20 basis-2/12 rounded-sm border px-2 py-1.5 text-center text-sm">
                          {`${result?.percentage}%`}
                        </p>
                        <div className="flex flex-1 flex-col justify-center gap-0.5">
                          <Progress value={result?.percentage} />
                          <p className="text-sm">{result?.name}</p>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Recommendation */}
                <div className="flex flex-col gap-1 rounded-md">
                  <p className="text-dark rounded-md text-sm font-bold">
                    Recommendation
                  </p>
                  <div className="flex flex-col gap-1">
                    {rankedResults?.[0]?.recommendations?.map(
                      (recommend, index) => (
                        <div
                          className="bg-primary flex items-center gap-1 rounded-md px-2 py-2"
                          key={index}
                        >
                          <p className="text-light rounded-md text-sm">
                            {recommend}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
