import React from "react";

import { DashboardHeading } from "@/components/dashboard/Heading";

import { Client } from "./_components/client";

const CMSNews = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between">
        <DashboardHeading heading="News" text="Manage your page news here" />
        <Client.Action />
      </div>
      <>
        <Client.Body />
      </>
    </>
  );
};

export default CMSNews;
