"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface RegisterFormData {
  email: string;
  fullname: string;
  avatar: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormErrors {
  email?: string;
  password?: string;
  fullname?: string;
  confirmPassword?: string;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    fullname: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Le nom complet est requis";
    }

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "La confirmation du mot de passe est requise";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof RegisterFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!acceptedTerms) {
      alert(
        "Vous devez accepter la politique de confidentialité et les conditions de service",
      );
      return;
    }

    console.log("Register form data:", formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 bg-white flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-black select-none">
              Work
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="text-gray-700 select-none">Français</div>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </header>

        {/* Form Content */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="max-w-md w-full space-y-8">
            {/* Title */}
            <div>
              <div className="text-3xl font-semibold text-gray-900 mb-2 select-none">
                S&apos;inscrire
              </div>
              <div className="text-gray-600 select-none">
                Préparez votre compte pour rejoindre vos coéquipiers !
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                id="fullname"
                name="fullname"
                type="text"
                label="Nom complet"
                required
                value={formData.fullname}
                onChange={handleInputChange}
                error={errors.fullname}
                placeholder="Entrez votre nom complet"
                autoComplete="name"
              />
              <Input
                id="email"
                name="email"
                type="email"
                label="E-mail"
                required
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                placeholder="Entrez votre e-mail"
                autoComplete="email"
              />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                label="Mot de passe"
                required
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                placeholder="Entrez votre mot de passe"
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
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                placeholder="Saisissez à nouveau votre mot de passe"
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

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 text-black focus:ring-white border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  J&apos;ai lu et j&apos;accepte la{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    politique de confidentialité
                  </Link>{" "}
                  et les{" "}
                  <Link
                    href="/terms-of-service"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    conditions de service
                  </Link>
                  .
                </label>
              </div>

              <Button type="submit" fullWidth>
                S&apos;inscrire
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <span className="text-gray-600 text-sm select-none">
                Vous avez déjà un compte ?{" "}
                <Link
                  href="/signin"
                  className="text-blue-600 hover:text-blue-500 select-none"
                >
                  Se connecter
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Purple Background */}
      <div className="w-1/2 bg-gradient-to-br from-black to-black">
        {/* Espace pour votre capture d'écran */}
      </div>
    </div>
  );
};

export default RegisterPage;
