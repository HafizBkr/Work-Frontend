"use client";
import React from "react";
import DashboardLayout from "../components/layouts/DashboardLayout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8 mt-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenue BOUKARI HAFIZ !
        </h1>
        <p className="text-gray-600 mt-4">
          Voici ce que nous avons pour vous aujourd`&apos;`hui.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
