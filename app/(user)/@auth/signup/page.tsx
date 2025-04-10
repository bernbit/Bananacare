import React from "react";
import SignupForm from "@/components/user/SignupForm";

function page() {
  return (
    <div className="bg-primary/80 flex h-screen items-center justify-center">
      <div className="bg-light border-primary z-50 flex h-fit max-h-[95vh] w-[95vw] flex-col overflow-y-auto rounded-md border px-6 py-6 shadow-xl md:w-[45vw] md:px-10">
        <SignupForm />
      </div>
    </div>
  );
}

export default page;
