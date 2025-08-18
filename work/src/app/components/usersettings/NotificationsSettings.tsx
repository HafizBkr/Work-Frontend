"use client";

import React, { useState } from "react";

const NotificationsSettings: React.FC = () => {
  const [formData, setFormData] = useState({
    suspend: "jamais",
    app: true,
    push: true,
    email: true,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implémenter la logique de sauvegarde ici
    console.log("Notifications settings:", formData);
  };

  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notifications</h1>
      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Suspendre les notifications */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-semibold text-gray-900">
              Suspendre les notifications
            </span>
            <div className="relative">
              <select
                value={formData.suspend}
                onChange={(e) => handleChange("suspend", e.target.value)}
                className="block w-32 px-4 py-2 text-gray-900 border-0 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-purple-400 focus:bg-white transition appearance-none"
              >
                <option value="jamais">Jamais</option>
                <option value="1h">1 heure</option>
                <option value="aujourdhui">Aujourdhui</option>
                <option value="toujours">Toujours</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-2">
            Suspendez toutes vos notifications dans l&aposapplication et sur le
            bureau en une fois.
          </div>
        </div>
        <hr className="my-2 border-gray-200" />
        {/* Notifications de l'application */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">
              Notifications de l’application
            </div>
            <div className="text-gray-600 text-sm">
              Recevez toutes vos notifications via l’application web Cynoia
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={formData.app}
              onChange={(e) => handleChange("app", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-purple-600 transition relative">
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  formData.app ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
        <hr className="my-2 border-gray-200" />
        {/* Notifications push */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">
              Notifications push
            </div>
            <div className="text-gray-600 text-sm">
              Recevez toutes vos notifications sur le bureau
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={formData.push}
              onChange={(e) => handleChange("push", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-purple-600 transition relative">
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  formData.push ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
        <hr className="my-2 border-gray-200" />
        {/* Notifications par e-mail */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold text-gray-900 mb-1">
              Notifications par e-mail
            </div>
            <div className="text-gray-600 text-sm">
              Recevez toutes vos notifications par e-mail
            </div>
          </div>
          <label className="inline-flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              checked={formData.email}
              onChange={(e) => handleChange("email", e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-purple-600 transition relative">
              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
                  formData.email ? "translate-x-4" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
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

export default NotificationsSettings;
