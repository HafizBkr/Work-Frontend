"use client";

import React, { useState } from "react";
import UserSettingsLayout from "@/app/components/layouts/UserSettingsLayout";

export default function GeneralSettingsPage() {
  const [formData, setFormData] = useState({
    fullName: "Hafiz BOUKARI",
    jobTitle: "",
    email: "hafizinovus@gmail.com",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique de sauvegarde ici
    console.log("Form data:", formData);
  };

  return (
    <UserSettingsLayout>
      <div className="max-w-md ">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Profil</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar */}
          <div className="flex flex-col mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700 mb-4 border">
              Hafiz.
            </div>
          </div>
          {/* Nom complet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="block w-full px-3 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
            />
          </div>
          {/* Poste */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Poste
            </label>
            <input
              type="text"
              placeholder="Tapez votre poste"
              value={formData.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              className="block w-full px-3 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-gray-50 placeholder-gray-400"
            />
          </div>
          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="block w-full px-3 py-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-400 cursor-not-allowed"
            />
          </div>
          {/* Numéro de téléphone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Numéro de téléphone
            </label>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-semibold select-none">
                N/A
              </span>
              <input
                type="text"
                placeholder="5 - 55 - 55 - 55 - 55"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="flex-1 px-3 py-2.5 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-gray-50 placeholder-gray-400"
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-60 px-4 py-2.5 text-sm font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </UserSettingsLayout>
  );
}
