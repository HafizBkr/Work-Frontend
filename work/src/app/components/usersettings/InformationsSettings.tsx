"use client";

import React, { useState } from "react";

const InformationsSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    birthDate: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique de sauvegarde ici
    console.log("Informations personnelles :", formData);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Informations</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Bio */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Bio
          </label>
          <textarea
            placeholder="Parlez un peu de vous"
            value={formData.bio}
            onChange={(e) => handleChange("bio", e.target.value)}
            rows={5}
            className="block w-full px-4 py-3 text-gray-700 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
          />
        </div>
        {/* Sexe */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Sexe
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            className="block w-full px-4 py-3 text-gray-700 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:bg-white transition appearance-none"
          >
            <option value="">Choisir votre sexe</option>
            <option value="homme">Homme</option>
            <option value="femme">Femme</option>
            <option value="autre">Autre</option>
            <option value="na">Préférer ne pas dire</option>
          </select>
        </div>
        {/* Date de naissance */}
        <div>
          <label className="block text-base font-medium text-gray-900 mb-2">
            Date de naissance
          </label>
          <div className="relative">
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => handleChange("birthDate", e.target.value)}
              placeholder="DD - MM - YYYY"
              className="block w-full px-4 py-3 text-gray-700 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10m-13 8V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
                />
              </svg>
            </span>
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

export default InformationsSettings;
