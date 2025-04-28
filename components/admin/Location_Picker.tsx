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
import { barangay } from "@/lib/constant";

function Location_Picker() {
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
