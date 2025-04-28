import React from "react";
import { augmentationSteps } from "@/lib/constant";

function Stepper({ currentStep = 0 }) {
  return (
    <div className="mb-6 flex items-center justify-center py-4">
      {augmentationSteps.map((step, index) => {
        const isActive = index <= currentStep;
        const isLineFilled = index < currentStep;

        return (
          <div
            key={index}
            className={`flex items-center ${index !== augmentationSteps.length - 1 ? "flex-1" : ""}`}
          >
            {/* Step circle */}
            <div
              className={`${
                isActive
                  ? "border-primary bg-primary text-light"
                  : "border-dark/20 bg-light text-dark"
              } relative flex h-[35px] w-[35px] items-center justify-center rounded-full border transition-all duration-300`}
            >
              <step.icon className="text-lg" />

              {index === currentStep && (
                <div className="border-primary/45 absolute h-[42px] w-[42px] rounded-full border-2"></div>
              )}

              <p className="text-dark absolute top-full mt-1 text-center text-[10px]">
                {step.title}
              </p>
            </div>

            {/* Animated line */}
            {index !== augmentationSteps.length - 1 && (
              <div className="flex flex-1 items-center">
                <div className="bg-dark/20 relative h-1 w-full overflow-hidden">
                  <div
                    className={`bg-primary absolute top-0 left-0 h-full transition-all duration-300 ease-in-out`}
                    style={{
                      width: isLineFilled ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Stepper;
