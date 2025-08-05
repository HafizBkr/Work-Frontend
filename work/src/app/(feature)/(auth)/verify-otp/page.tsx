"use client";

import React, { useState } from "react";
import Link from "next/link";
import Button from "../../../components/ui/Button";
import OtpInput from "../../../components/ui/OtpInput";

const OTP_LENGTH = 6;

const VerifyOtpPage: React.FC = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex justify-between items-center px-6 py-4 bg-white">
        <div className="text-2xl font-bold text-purple-600 select-none">
          Work
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-2 select-none">
              Vérification du code
            </div>
            <div className="text-gray-600 select-none">
              Saisissez le code à 6 chiffres reçu par e-mail.
            </div>
          </div>
          {/* OTP Form */}
          <form className="mt-8 space-y-6">
            <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} />
            <Button type="submit" fullWidth>
              Vérifier
            </Button>
          </form>
          <div className="text-center">
            <Link
              href="/signin"
              className="text-purple-600 hover:text-purple-500 select-none"
            >
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
