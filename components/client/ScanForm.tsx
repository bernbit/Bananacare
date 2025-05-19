"use client";

//React
import { useState, useEffect, useCallback } from "react";
//Next
import NextImage from "next/image";
//Zod
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { scanSchema } from "@/lib/zod";
//React Hook Form
import { useForm } from "react-hook-form";
// React Icons
import { MdCloudUpload, MdClose } from "react-icons/md";
//Tensorflow
import * as tf from "@tensorflow/tfjs";
import { loadModel, preprocessImage, makePrediction } from "@/lib/tensorflow";
//Constant
import { BananaDiseaseType, barangay, augmentationSteps } from "@/lib/constant";
//React Drop Zone
import { useDropzone } from "react-dropzone";
//Shadcn
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//Custom Component
import LoaderModal from "../modals/LoaderModal";
import ResultModal from "../modals/ResultModal";
import NotBananaModal from "../modals/NotBananaModal";

export function ScanForm() {
  //* useState
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showNotBanana, setShowNotBanana] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [rankedResults, setRankedResults] = useState<BananaDiseaseType[]>([]);

  //* useEffect
  // Load Model useEffect
  useEffect(() => {
    const load = async () => {
      const loadedModel = await loadModel("/model/model.json");
      setModel(loadedModel);
    };
    load();
  }, []);

  // Show Loader useEffect
  useEffect(() => {
    let interval: any;

    if (showLoader) {
      setCurrentStep(0); // Reset on new start
      setShowResult(false); // Hide result initially

      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < 7) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setShowResult(true);
            setShowLoader(false); // optional: stop loader once done
            setIsScanning(false);
            return prev;
          }
        });
      }, 5000);
    }

    return () => clearInterval(interval); // Clean up when showLoader changes or unmounts
  }, [showLoader]);

  //* Functions
  const form = useForm<z.infer<typeof scanSchema>>({
    resolver: zodResolver(scanSchema),
    defaultValues: {
      name: "",
      address: "",
      age: "" as unknown as number,
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof scanSchema>) => {
    if (!model) return;

    setIsScanning(true);

    const bananaImage = values.file[0];
    const tensor = await preprocessImage(bananaImage);
    const results = await makePrediction(model, tensor);

    // Check if top result is 'not'
    if (results.length > 0 && results[0].id === "not") {
      setShowNotBanana(true);
      setShowLoader(false);
      setRankedResults([]);
      setIsScanning(false);
      return;
    }

    setShowLoader(true);
    setRankedResults(results);
  };

  const resetForm = () => {
    setPreviewImg(null);
    form.reset();
    setShowResult(false);
    setRankedResults([]);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-4"
        >
          {/* Image Input Field */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => {
              //React Drop Zone
              const onDrop = useCallback(
                (acceptedFiles: File[]) => {
                  field.onChange(acceptedFiles);
                  if (acceptedFiles[0]) {
                    const imageFile = acceptedFiles[0];
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setPreviewImg(reader.result as string);
                    reader.readAsDataURL(imageFile);
                  }
                },
                [field],
              );

              const { getRootProps, getInputProps, isDragActive } = useDropzone(
                {
                  onDrop,
                  accept: { "image/*": [] },
                  multiple: false,
                },
              );

              return (
                <FormItem>
                  <FormLabel className="text-primary flex flex-col items-start font-semibold">
                    gfddf
                  </FormLabel>

                  {!previewImg ? (
                    // Upload/Drag Zone
                    <div
                      {...getRootProps()}
                      className="text-primary flex flex-col font-semibold hover:cursor-pointer hover:opacity-70"
                    >
                      <div
                        className={`bg-primary/20 border-primary flex aspect-square max-h-[400px] w-full flex-col items-center justify-center rounded-md border-2 border-dashed py-6 ${
                          isDragActive ? "bg-primary/30" : ""
                        }`}
                      >
                        <MdCloudUpload className="text-8xl" />
                        <p className="text-dark text-base font-semibold">
                          {isDragActive
                            ? "Drop the image here..."
                            : "Click or Drag to Upload Image"}
                        </p>
                        <p className="text-primary text-base">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>

                      <input {...getInputProps()} className="hidden" />
                    </div>
                  ) : (
                    // Image Preview
                    previewImg && (
                      <div
                        className={`bg-primary/20 border-primary flex aspect-square max-h-[400px] w-full flex-col rounded-md border-2 border-dashed px-4 py-4`}
                      >
                        <div className="relative flex-1 overflow-hidden rounded-md">
                          <NextImage
                            src={previewImg}
                            fill
                            className="object-center"
                            alt="sample"
                            unoptimized
                          />

                          <div
                            className="bg-dark absolute top-0 right-0 z-50 m-2 aspect-square rounded-full p-1 hover:cursor-pointer hover:opacity-70"
                            onClick={() => {
                              setPreviewImg(null);
                              field.onChange([]);
                            }}
                          >
                            <MdClose className="text-light text-lg" />
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  <FormMessage className="text-red-600" />
                </FormItem>
              );
            }}
          />

          {/* Name Input Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="text-dark flex flex-col gap-1">
                <FormLabel className="text-primary font-semibold">
                  Name
                </FormLabel>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl className="">
                    <SelectTrigger className="focus-visible:ring-primary focus-within:border-primary border-dark w-full rounded-sm text-base font-medium focus-visible:ring-1">
                      <SelectValue placeholder="Select Barangay in Bansud" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-light">
                    {barangay.map((brg, index) => (
                      <div key={index}>
                        <SelectItem
                          key={index}
                          className="group text-dark hover:bg-primary hover:text-light cursor-pointer px-3 py-3 text-base"
                          value={brg.title}
                        >
                          {brg.title}
                        </SelectItem>
                      </div>
                    ))}
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
                <FormLabel className="text-primary font-semibold">
                  Age
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
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

          <Button
            type="submit"
            className="text-light text-base hover:cursor-pointer"
            disabled={isScanning}
          >
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </form>
      </Form>

      {/* Loader Modal */}
      <LoaderModal
        open={showLoader}
        onClose={() => setShowLoader(false)}
        currentStep={currentStep}
        previewImg={previewImg}
        augmentationSteps={augmentationSteps}
      />

      {/* Result Modal */}
      <ResultModal
        open={showResult}
        onClose={() => setShowResult(false)}
        rankedResults={rankedResults}
        resetForm={resetForm}
        previewImg={previewImg}
      />

      <NotBananaModal
        open={showNotBanana}
        onClose={() => setShowNotBanana(false)}
      />
    </>
  );
}
