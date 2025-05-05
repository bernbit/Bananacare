import React from "react";

import Modal from "@/components/client/Modal";
import SignupForm from "@/components/user/SignupForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <Modal title="Signup" route="/">
      <SignupForm type="modal" />
    </Modal>
  );
}

export default page;
