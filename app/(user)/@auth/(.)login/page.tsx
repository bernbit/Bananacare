import React from "react";

import Modal from "@/components/client/Modal";
import LoginForm from "@/components/user/LoginForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

async function page() {
  const session = await auth();
  if (session?.user) redirect("/");

  return (
    <Modal title="Login" route="/">
      <LoginForm type="modal" />
    </Modal>
  );
}

export default page;
