"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <div className="text-2xl font-bold text-black select-none">Work</div>
      </header>
      {/* Main Content */}
      <div className="flex-1 flex mb-[100px] items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Title */}
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-2 select-none">
              Mot de passe oublié
            </div>
            <div className="text-gray-600 select-none">
              Entrez votre e-mail pour recevoir un code de réinitialisation.
            </div>
          </div>
          {/* Forgot Password Form */}
          <form className="mt-8 space-y-6">
            <Input
              id="email"
              name="email"
              type="email"
              label="E-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Entrez votre e-mail"
              autoComplete="email"
            />
            <Button type="submit" fullWidth>
              Envoyer le code
            </Button>
          </form>
          {/* Back to login */}
          <div className="text-center">
            <Link
              href="/signin"
              className="text-blue-600 hover:text-blue-500 select-none"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
