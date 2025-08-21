"use client";

import React, { useState } from "react";

const countries = [
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "us", label: "États-Unis", flag: "🇺🇸" },
  { value: "ma", label: "Maroc", flag: "🇲🇦" },
  { value: "de", label: "Allemagne", flag: "🇩🇪" },
  { value: "es", label: "Espagne", flag: "🇪🇸" },
];

const languages = [
  { value: "fr", label: "Français" },
  { value: "en", label: "Anglais" },
  { value: "es", label: "Espagnol" },
  { value: "de", label: "Allemand" },
];

const GeneralSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    country: "fr",
    timezone: "",
    detectTimezone: true,
    language: "fr",
    theme: "dark",
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique de sauvegarde ici
    console.log("General settings:", formData);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Paramètres</h1>
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Heure et région */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Heure et région
          </h2>
          {/* Pays */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              Pays
            </label>
            <div className="relative">
              <select
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="block w-full px-4 py-3 text-gray-900 border-0 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:bg-white transition appearance-none"
              >
                {countries.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.flag} {c.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </span>
            </div>
          </div>
          {/* Fuseau horaire */}
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-900 mb-2">
              Fuseau horaire
            </label>
            <select
              value={formData.timezone}
              disabled
              className="block w-full px-4 py-3 text-gray-400 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white transition appearance-none cursor-not-allowed"
            >
              <option value="">(UTC) Monrovia, Reykjavik</option>
            </select>
          </div>
          {/* Toggle détection fuseau */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700 text-base">
              Détecter le fuseau horaire à partir de ma position actuelle
            </span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.detectTimezone}
                onChange={(e) =>
                  handleChange("detectTimezone", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black rounded-full peer peer-checked:bg-black transition relative">
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${formData.detectTimezone ? "translate-x-4" : ""}`}
                ></div>
              </div>
            </label>
          </div>
        </div>
        <hr className="my-8 border-gray-200" />
        {/* Préférences du compte */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Préférences du compte
          </h2>
          {/* Langue */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              Langue
            </label>
            <div className="relative">
              <select
                value={formData.language}
                onChange={(e) => handleChange("language", e.target.value)}
                className="block w-full px-4 py-3 text-gray-900 border-0 rounded-2xl bg-white shadow-sm focus:ring-2 focus:ring-black focus:bg-white transition appearance-none"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </span>
            </div>
          </div>
          {/* Thème */}
          <div className="mb-6">
            <label className="block text-base font-medium text-gray-900 mb-2">
              Thème
            </label>
            <select
              value={formData.theme}
              disabled
              className="block w-full px-4 py-3 text-gray-400 border-0 rounded-2xl bg-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-black focus:bg-white transition appearance-none cursor-not-allowed"
            >
              <option value="dark">Mode sombre</option>
            </select>
          </div>
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-3 text-base font-semibold text-white bg-black rounded-2xl hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
