import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

function Location_Picker() {
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

  return (
    <>
      <Select>
        <SelectTrigger className="border-dark/40 placeholder:text-dark/60 min-w-44 rounded-sm text-base font-medium focus-visible:ring-1">
          <SelectValue placeholder="Select Barangay" />
        </SelectTrigger>
        <SelectContent className="bg-light border-dark/40 max-h-96">
          <SelectGroup>
            <SelectLabel>Bansud</SelectLabel>
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
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}

export default Location_Picker;
