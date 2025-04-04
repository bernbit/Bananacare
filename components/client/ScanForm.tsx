"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { MdCloudUpload } from "react-icons/md";

const formSchema = z.object({
  file: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: "File is required.",
  }),
  name: z.string().min(2, {
    message: "Provide Full Name",
  }),
  address: z.string().min(1, {
    message: "Adrress is required.",
  }),
  age: z.coerce
    .number()
    .min(1, {
      message: "Age must be at least 1",
    })
    .max(120, {
      message: "Age must be less than 120",
    }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number is too long" })
    .regex(/^\+?[0-9]+$/, { message: "Invalid phone number format" }),
});

export function ScanForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file: undefined, // Default value for file input
      //   address: "Select Bansud Baranagay Address",
      //   age: 18, // Default age
      email: "",
      phoneNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 pt-4"
      >
        {/* Image Input Field */}
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-primary flex flex-col font-semibold hover:cursor-pointer hover:opacity-70">
                <p className="w-full">Upload File</p>
                <div className="bg-primary/10 border-primary flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed py-6">
                  <MdCloudUpload className="text-8xl" />
                  <p className="text-dark text-lg font-semibold">
                    Click to Upload Image
                  </p>
                  <p className="text-primary">SVG, PNG, JPG or GIF</p>
                </div>
              </FormLabel>

              <FormControl className="border-primary flex cursor-pointer">
                <Input
                  className="hidden"
                  type="file"
                  onChange={(event) => field.onChange(event.target.files)}
                />
              </FormControl>

              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Name Input Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="text-dark flex flex-col gap-1">
              <FormLabel className="text-primary font-semibold">Name</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                  placeholder="Enter your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Email Input Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-dark flex flex-col gap-1">
              <FormLabel className="text-primary font-semibold">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Address Selection */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-semibold">
                Address
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="">
                  <SelectTrigger className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder:text-dark/60 w-full rounded-sm text-base font-medium focus-visible:ring-1">
                    <SelectValue
                      className=""
                      placeholder="Select Barangay in Bansud"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-light">
                  <SelectItem
                    value="m@example.com"
                    className="group text-dark hover:bg-primary hover:text-light cursor-pointer px-3 py-3 text-base"
                  >
                    Conrazon
                  </SelectItem>
                  <SelectItem
                    value="m@google.com"
                    className="group text-dark hover:bg-primary hover:text-light cursor-pointer px-3 py-3 text-base"
                  >
                    Pag-asa
                  </SelectItem>
                  <SelectItem
                    value="m@support.com"
                    className="group text-dark hover:bg-primary hover:text-light cursor-pointer px-3 py-3 text-base"
                  >
                    Proper
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Age Input Field */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem className="text-dark flex flex-col gap-1">
              <FormLabel className="text-primary font-semibold">Age</FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                  placeholder="Enter your age"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* Email Input Field */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="text-dark flex flex-col gap-1">
              <FormLabel className="text-primary font-semibold">
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark placeholder:text-dark/60 rounded-sm font-medium focus-visible:ring-1"
                  placeholder="Enter your phone number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />

        {/* <Select>
          <SelectTrigger className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder: text-dark w-full rounded-sm font-medium focus-visible:ring-1">
            <SelectValue placeholder="Select Barangay" />
          </SelectTrigger>
          <SelectContent className="bg-light">
            <SelectGroup>
              <SelectLabel>Bansud Barangay</SelectLabel>
              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
              <SelectItem value="cst">Central Standard Time (CST)</SelectItem>
              <SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
              <SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
              <SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> */}

        <Button
          type="submit"
          className="text-light text-base hover:cursor-pointer"
        >
          Scan
        </Button>
      </form>
    </Form>
  );
}
