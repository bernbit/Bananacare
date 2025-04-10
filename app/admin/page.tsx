import React from "react";
import Admin_Header from "@/components/admin/Admin_Header";
import { FaUsers } from "react-icons/fa";

function AdminHome() {
  return (
    <>
      <Admin_Header title="Home" />
      <div className="bg-primary/10 h-full flex-1 rounded-2xl">
        <div className="bg-light flex w-fit gap-2 rounded-md p-2">
          <div className="bg-primary/20 rounded- full w-fit p-3">
            <FaUsers className="text-primary size-5" />
          </div>
          <div>
            <p className="font-bold">23</p>
            <p className="text-sm">Total Users</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
