import React from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";

import { Client } from "./_components/client";

const CMSProducts = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <DashboardHeading
          heading="Products"
          text="Manage your page products here"
        />
        <Client.Action />
      </div>
      <>
        <Client.Body />
      </>
    </>
  );
};

export default CMSProducts;
