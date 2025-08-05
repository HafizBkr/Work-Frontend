"use client";

import React, { useState } from "react";
import Link from "next/link";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import OtpInput from "../../../components/ui/OtpInput";
import { Eye, EyeOff } from "lucide-react";

const OTP_LENGTH = 6;

const ResetPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  // // Gestion OTP UI
  // const handleOtpChange = (index: number, value: string) => {
  //   if (!/^\d*$/.test(value)) return;
  //   const newOtp = [...otp];
  //   newOtp[index] = value.slice(-1);
  //   setOtp(newOtp);
  //   if (value && index < OTP_LENGTH - 1) {
  //     otpRefs.current[index + 1]?.focus();
  //   }
  // };
  // const handleOtpKeyDown = (
  //   index: number,
  //   e: React.KeyboardEvent<HTMLInputElement>,
  // ) => {
  //   if (e.key === "Backspace" && !otp[index] && index > 0) {
  //     otpRefs.current[index - 1]?.focus();
  //   }
  //   if (e.key === "ArrowLeft" && index > 0) {
  //     otpRefs.current[index - 1]?.focus();
  //   }
  //   if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
  //     otpRefs.current[index + 1]?.focus();
  //   }
  // };

  // Validation simple pour l’UI
  const isOtpComplete = otp.every((digit) => digit.length === 1);

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
              Réinitialiser le mot de passe
            </div>
            <div className="text-gray-600 select-none">
              {step === 1
                ? "Saisissez le code OTP reçu par e-mail."
                : "Définissez votre nouveau mot de passe."}
            </div>
          </div>
          {step === 1 && (
            <form
              className="mt-8 space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (isOtpComplete) setStep(2);
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                  Code OTP
                </label>
                <OtpInput value={otp} onChange={setOtp} length={OTP_LENGTH} />
              </div>
              <Button type="submit" fullWidth disabled={!isOtpComplete}>
                Continuer
              </Button>
            </form>
          )}
          {step === 2 && (
            <form className="mt-8 space-y-6">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Nouveau mot de passe"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre nouveau mot de passe"
                autoComplete="new-password"
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Eye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                }
              />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirmez le mot de passe"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmez votre nouveau mot de passe"
                autoComplete="new-password"
                rightIcon={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                }
              />
              <Button type="submit" fullWidth>
                Réinitialiser
              </Button>
            </form>
          )}
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

export default ResetPasswordPage;
