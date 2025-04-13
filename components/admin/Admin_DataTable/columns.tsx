"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  name: string;
  email: string;
  address: string;
  age: string;
  phone: string;
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "phone",
    header: "Phone",
  },
];
