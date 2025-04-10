import React from "react";

import Modal from "@/components/client/Modal";
import LoginForm from "@/components/user/LoginForm";

function page() {
  return (
    <Modal title="Login" route="/">
      <LoginForm />
    </Modal>
  );
}

export default page;
