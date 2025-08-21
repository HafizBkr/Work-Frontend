"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Eye, EyeOff } from "lucide-react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
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

    // Clear error when user starts typing
    if (errors[name as keyof LoginFormErrors]) {
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

    // TODO: Integration will be handled by custom hooks
    console.log("Login form data:", formData);

    // For now, just navigate to dashboard or wherever
    // router.push("/dashboard");
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white ">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-black select-none">Work</div>
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

      {/* Main Content */}
      <div className="flex-1 flex mb-[50px] items-center justify-center px-6 py-12 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Title */}
          <div className="text-center">
            <div className="text-3xl font-semibold text-gray-900 mb-2 select-none">
              Se connecter
            </div>
            <div className="text-gray-600 select-none">
              Entrez dans votre espace de travail et
              <br />
              rejoignez vos coéquipiers.
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email Field */}
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

              {/* Password Field */}
              <div>
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
                  autoComplete="current-password"
                  rightIcon={
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <Eye className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  }
                />
              </div>

              {/* Forgot Password Link */}
              <div className="text-left">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-500 text-sm select-none"
                >
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <Button type="submit" fullWidth>
                Se connecter
              </Button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="text-gray-600 text-sm select-none">
              Nouveau sur notre plateforme ?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-500 select-none"
              >
                Créer un compte
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
