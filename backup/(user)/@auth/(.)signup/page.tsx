import React from "react";

import Modal from "@/components/client/Modal";
import SignupForm from "@/components/user/SignupForm";

function page() {
  return (
    <Modal title="Signup" route="/">
      <SignupForm />
    </Modal>
  );
}

export default page;
