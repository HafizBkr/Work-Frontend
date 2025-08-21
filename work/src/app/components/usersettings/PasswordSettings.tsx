"use client";

import React from "react";

const PasswordSettings: React.FC = () => {
  return (
    <div className="max-w-md">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mot de passe</h1>
      <p className="text-base text-gray-600 mb-8">
        Vous n&aposavez pas de mot de passe enregistré. Voulez-vous définir
        votre mot de passe ici ? Vous serez d&aposabord déconnecté de votre
        session actuelle.
      </p>
      <button
        type="button"
        className="w-60 px-4 py-3 text-base font-semibold text-white bg-black rounded-2xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition"
      >
        Définir le mot de passe
      </button>
    </div>
  );
};

export default PasswordSettings;
