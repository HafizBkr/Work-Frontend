"use client";

import React, { useState } from "react";

const ProfileSettings: React.FC = () => {
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
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profil</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Avatar */}
        <div className="flex flex-col items-start mb-2">
          <div
            className="w-16 h-16 rounded-full bg-[#F6EEDD] flex items-center justify-center text-xl font-bold text-gray-800 mb-4 border border-gray-200 select-none"
            style={{ fontFamily: "inherit" }}
          >
            Hafiz.
          </div>
        </div>
        {/* Nom complet */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Nom complet
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="block w-full px-4 py-3 text-gray-900 border-0 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
          />
        </div>
        {/* Poste */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Poste
          </label>
          <input
            type="text"
            placeholder="Tapez votre poste"
            value={formData.jobTitle}
            onChange={(e) => handleChange("jobTitle", e.target.value)}
            className="block w-full px-4 py-3 text-gray-700 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
          />
        </div>
        {/* E-mail */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            E-mail
          </label>
          <input
            type="email"
            value={formData.email}
            disabled
            className="block w-full px-4 py-3 text-gray-700 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 cursor-not-allowed"
          />
        </div>
        {/* Numéro de téléphone */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Numéro de téléphone
          </label>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold select-none">
              N/A
            </span>
            <input
              type="text"
              placeholder="5 - 55 - 55 - 55 - 55"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="flex-1 px-3 py-3 text-gray-700 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
            />
          </div>
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-base font-semibold text-white bg-purple-600 rounded-2xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
