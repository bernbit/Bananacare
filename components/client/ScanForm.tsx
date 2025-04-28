"use client";
//React
import { useState, useEffect, useRef, useCallback } from "react";
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
//Constant
import {
  bananaDiseases,
  BananaDiseaseType,
  barangay,
  augmentationSteps,
} from "@/lib/constant";
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
import {
  AlertDialogHeader,
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
//Custom Component
import Stepper from "../user/Stepper";

//* Register the L2 Regularizer
class L2 {
  static className = "L2";
  constructor(config: any) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2 as any);

export function ScanForm() {
  //useState
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [rankedResults, setRankedResults] = useState<BananaDiseaseType[]>([]);

  //useEffect
  // Load Model useEffect
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("/model/model.json");
      setModel(loadedModel);
    };
    loadModel();
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
            return prev;
          }
        });
      }, 5000);
    }

    return () => clearInterval(interval); // Clean up when showLoader changes or unmounts
  }, [showLoader]);

  //Functions
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

  // const handleImagepreviewImg = (file: File) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => setPreviewImg(reader.result as string);
  //   reader.readAsDataURL(file);
  // };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(file);
    });
  };

  const onSubmit = async (values: z.infer<typeof scanSchema>) => {
    setShowLoader(true);
    if (!model) return;

    const file = values.file[0];

    const image = await loadImage(file);
    const tensor = tf.browser
      .fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const prediction = model.predict(tensor) as tf.Tensor;
    const predictionArray = Array.from(await prediction.data());
    const diseasesWithPercentage = bananaDiseases
      .map((disease, index) => ({
        ...disease,
        percentage: parseFloat((predictionArray[index] * 100).toFixed(2)),
      }))
      .filter((disease) => disease.id !== "not" && disease.id !== "healthy") // exclude unwanted
      .sort((a, b) => b.percentage - a.percentage); // sort descending
    setRankedResults(diseasesWithPercentage);
  };

  const resetForm = () => {
    setPreviewImg("");
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
                  <FormLabel className="text-primary font-semibold">
                    Upload Image
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
          >
            Scan
          </Button>
        </form>
      </Form>

      {/* Result Modal */}
      <AlertDialog open={showResult} onOpenChange={setShowResult}>
        <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[48vw] md:px-10">
          <AlertDialogHeader className="h-fit text-left">
            <AlertDialogTitle className="flex items-center">
              <p className="text-dark font-clash-grotesk flex-1 text-xl font-semibold">
                Result and Recommendation
              </p>
              <AlertDialogCancel
                className="border-none text-right shadow-none hover:cursor-pointer hover:opacity-70"
                onClick={resetForm}
              >
                <MdClose className="size-6" />
              </AlertDialogCancel>
            </AlertDialogTitle>
          </AlertDialogHeader>

          {/* Body */}
          <div className="border-primary bg-primary/20 flex-1 rounded-md p-4">
            {/* Banana Image */}
            <div className="bg-primary/20 relative flex aspect-square max-h-[400px] w-full flex-col overflow-hidden rounded-t-md px-4 py-4">
              {previewImg && (
                <NextImage
                  src={previewImg}
                  fill
                  className="object-center"
                  alt="Banana Image"
                  unoptimized
                />
              )}

              <div className="bg-dark/70 absolute inset-0 flex h-full w-full items-center justify-center">
                <div className="bg-primary rounded-md p-2 hover:opacity-70">
                  <p className="text-light font-bold">
                    {rankedResults[0]?.name}
                  </p>
                </div>
              </div>
            </div>
            {/* Result and Recommendation */}
            <div className="border-primary bg-light flex flex-col gap-2 rounded-b-md px-2 py-4">
              {/* Result */}
              <div className="flex flex-col gap-1 rounded-md">
                <p className="text-dark rounded-md text-sm font-bold">Result</p>
                {rankedResults.map((result, index) => (
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
                  {rankedResults[0]?.recommendations?.map(
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

      {/* Loader Modal */}
      <AlertDialog open={showLoader} onOpenChange={setShowLoader}>
        <AlertDialogContent className="bg-light flex h-[95vh] flex-col overflow-y-auto border-none md:min-w-[48vw] md:px-10">
          <AlertDialogHeader className="hidden h-fit text-left">
            <AlertDialogTitle className="flex items-center"></AlertDialogTitle>
          </AlertDialogHeader>

          <div className="flex h-full flex-col">
            <div
              className={`bg-primary/20 border-primary flex w-full flex-1 flex-col items-center justify-center rounded-md px-4 py-4`}
            >
              <div className="relative aspect-square max-h-[500px] w-full flex-1 overflow-hidden rounded-md">
                {previewImg && (
                  <NextImage
                    src={previewImg}
                    fill
                    className={`${augmentationSteps[currentStep]?.animation} animate-steps object-center`}
                    alt="Banana Image"
                    unoptimized
                  />
                )}
              </div>
            </div>
            {/* Stepper */}
            <Stepper currentStep={currentStep} />
            <div className="text-center">
              <p className="text-lg font-bold">{`${augmentationSteps[currentStep]?.subtitle}...`}</p>
              <p className="text-sm">{`${augmentationSteps[currentStep]?.description}`}</p>
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
