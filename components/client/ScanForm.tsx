"use client";

import NextImage from "next/image";
import { useState, useEffect, useRef } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { MdCloudUpload } from "react-icons/md";
import { MdClose } from "react-icons/md";

import * as tf from "@tensorflow/tfjs";

// Register the L2 regularizer
class L2 {
  static className = "L2";
  constructor(config: any) {
    return tf.regularizers.l1l2(config);
  }
}
tf.serialization.registerClass(L2);

const labels = [
  "Banana Black Sigatoka Disease",
  "Banana Bract Mosaic Virus Disease",
  "Banana Cordana Disease",
  "Banana Healthy Leaf",
  "Banana Moko Disease",
  "Banana Panama Disease",
  "Not Banana",
  "Banana Weevil Disease",
];

const bananaDiseases = [
  {
    name: "Banana Black Sigatoka Disease (Mycosphaerella fijiensis)",
    recommendations: [
      "Use resistant cultivars if available.",
      "Prune and remove infected leaves to reduce spore load.",
      "Improve air circulation by maintaining proper spacing.",
      "Apply fungicides like mancozeb, propiconazole, or chlorothalonil based on local agricultural guidelines.",
    ],
  },
  {
    name: "Banana Bract Mosaic Virus Disease (BBMV)",
    recommendations: [
      "Use virus-free planting materials.",
      "Control vector insects like aphids and thrips using insecticides.",
      "Regularly inspect and remove infected plants.",
      "Avoid intercropping with susceptible hosts (e.g., sugarcane).",
    ],
  },
  {
    name: "Banana Cordana Disease (Cordana musae)",
    recommendations: [
      "Improve drainage and reduce excess humidity.",
      "Remove and destroy infected leaves.",
      "Apply fungicides (like copper-based ones) as needed.",
      "Avoid mechanical damage to plants.",
    ],
  },
  {
    name: "Banana Healthy",
    recommendations: [
      "Continue good agricultural practices.",
      "Use disease-free planting materials.",
      "Apply organic mulch and compost.",
      "Regularly monitor for pests and diseases.",
      "Maintain proper irrigation and fertilization schedules.",
    ],
  },
  {
    name: "Banana Moko Disease (Ralstonia solanacearum)",
    recommendations: [
      "Remove and destroy infected plants immediately.",
      "Use clean, disinfected tools.",
      "Avoid movement of soil and water from infected areas.",
      "Use resistant varieties where available.",
      "Implement strict quarantine measures in affected areas.",
    ],
  },
  {
    name: "Banana Panama Disease (Fusarium oxysporum f. sp. cubense)",
    recommendations: [
      "Use Fusarium-resistant banana cultivars (e.g., GCTCV-218 or FHIA varieties).",
      "Avoid planting in contaminated soil.",
      "Improve soil health with organic amendments and biofungicides.",
      "Rotate crops with non-host species (e.g., legumes).",
    ],
  },
  {
    name: "Not Banana",
    recommendations: [],
  },
  {
    name: "Banana Weevil Disease (Cosmopolites sordidus)",
    recommendations: [
      "Use clean planting material.",
      "Apply pseudostem traps to monitor and control adult weevils.",
      "Use entomopathogenic fungi or insecticides if infestation is severe.",
      "Remove plant residues that attract weevils.",
    ],
  },
];

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

const barangay = [
  { title: "Alcadesma" },
  { title: "Bato" },
  { title: "Conrazon" },
  { title: "Malo" },
  { title: "Manihala" },
  { title: "Pag-asa" },
  { title: "Poblacion" },
  { title: "Proper Bansud" },
  { title: "Rosacara" },
  { title: "Salcedo" },
  { title: "Sumagui" },
  { title: "Proper Tiguisan" },
  { title: "Villa Pag-asa" },
];

export function ScanForm() {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [disease, setDisease] = useState<{
    name: string;
    recommendations: string[];
  }>({
    name: "",
    recommendations: [],
  });
  const [percentage, setPercentage] = useState<string | null>(null);

  const imageRef = useRef<HTMLImageElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",

      address: "",
      age: 0, // Default age
      email: "",
      phoneNumber: "",
    },
  });

  const handleImagePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const loadImage = (file: File): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.src = URL.createObjectURL(file);
    });
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!model) return;
    // setLoading(true);
    const file = values.file[0];
    handleImagePreview(file);

    const image = await loadImage(file);
    const tensor = tf.browser
      .fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims();

    const prediction = model.predict(tensor) as tf.Tensor;
    const predictionArray = Array.from(await prediction.data());

    const maxVal = Math.max(...predictionArray);
    const maxIdx = predictionArray.indexOf(maxVal);
    // setPredictedLabel(`${labels[maxIdx]} (${(maxVal * 100).toFixed(2)}%)`);
    setDisease(bananaDiseases[maxIdx]);
    setPercentage(`${(maxVal * 100).toFixed(2)}%)`);
    setShowResult(true);
  };

  const resetForm = () => {
    setPreview("");
    form.reset();
    setShowResult(false);
  };

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("/model/model.json");
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-4"
        >
          {/* Image Input Field */}

          {!preview ? (
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel className="text-primary flex flex-col font-semibold hover:cursor-pointer hover:opacity-70">
                    <p className="w-full">Upload File</p>
                    <div className="bg-primary/10 border-primary flex min-h-[250px] w-full flex-col items-center justify-center rounded-md border-2 border-dashed py-6">
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
                      accept="image/*"
                      onChange={(event) => {
                        if (event.target.files && event.target.files[0]) {
                          field.onChange(event.target.files); // Correct file input handling
                          handleImagePreview(event.target.files[0]);
                        }
                      }}
                    />
                  </FormControl>

                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          ) : (
            <div className="relative h-[250px]">
              <NextImage
                ref={imageRef}
                src={preview || ""}
                fill
                className="h-full rounded-md"
                alt="sample"
                unoptimized
              />
            </div>
          )}

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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="">
                    <SelectTrigger className="focus-visible:ring-primary focus-within:border-primary border-dark placeholder:text-dark/60 w-full rounded-sm text-base font-medium focus-visible:ring-1">
                      <SelectValue
                        className=""
                        placeholder="Select Barangay in Bansud"
                      />
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

          <div className="flex-1">
            <div className="relative h-[70%]">
              <NextImage
                ref={imageRef}
                src={preview || ""}
                fill
                className="h-full rounded-md"
                alt="sample"
                unoptimized
              />
            </div>
            <div className="py-4">
              <p className="">Result</p>
              <p className="text-lg font-bold">
                {disease.name} <span>{percentage}</span>
              </p>
              <p className="pt-2">Recomendation</p>
              {disease.recommendations.map((recommend, index) => (
                <p key={index} className="font-bold">
                  {recommend}
                </p>
              ))}
            </div>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
