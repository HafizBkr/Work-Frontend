// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input, Button, AuthLayout } from "../components";

// interface ResetPasswordFormData {
//   otp: string[];
//   newPassword: string;
//   confirmPassword: string;
// }

// interface ResetPasswordFormErrors {
//   otp?: string;
//   newPassword?: string;
//   confirmPassword?: string;
// }

// type Step = "otp" | "password";

// const ResetPasswordPage: React.FC = () => {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState<Step>("otp");
//   const [formData, setFormData] = useState<ResetPasswordFormData>({
//     otp: ["", "", "", "", "", ""],
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState<ResetPasswordFormErrors>({});
//   const [countdown, setCountdown] = useState(0);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [countdown]);

//   const validateOtp = (): boolean => {
//     const otpString = formData.otp.join("");
//     const newErrors: ResetPasswordFormErrors = {};

//     if (otpString.length !== 6) {
//       newErrors.otp = "Le code OTP doit contenir 6 chiffres";
//     } else if (!/^\d{6}$/.test(otpString)) {
//       newErrors.otp = "Le code OTP ne doit contenir que des chiffres";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validatePassword = (): boolean => {
//     const newErrors: ResetPasswordFormErrors = {};

//     if (!formData.newPassword) {
//       newErrors.newPassword = "Le nouveau mot de passe est requis";
//     } else if (formData.newPassword.length < 8) {
//       newErrors.newPassword =
//         "Le mot de passe doit contenir au moins 8 caractères";
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
//       newErrors.newPassword =
//         "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
//     } else if (formData.newPassword !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     // Only allow digits
//     if (value && !/^\d$/.test(value)) return;

//     const newOtp = [...formData.otp];
//     newOtp[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       otp: newOtp,
//     }));

//     // Clear errors when user starts typing
//     if (errors.otp) {
//       setErrors((prev) => ({ ...prev, otp: undefined }));
//     }

//     // Auto-focus next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
//     if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pastedText = e.clipboardData.getData("text");
//     const digits = pastedText.replace(/\D/g, "").slice(0, 6);

//     if (digits.length === 6) {
//       const newOtp = digits.split("");
//       setFormData((prev) => ({
//         ...prev,
//         otp: newOtp,
//       }));
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name as keyof ResetPasswordFormErrors]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: undefined,
//       }));
//     }
//   };

//   const handleOtpSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateOtp()) {
//       return;
//     }

//     // TODO: Integration will be handled by custom hooks
//     console.log("OTP verification:", formData.otp.join(""));

//     // Move to password reset step
//     setCurrentStep("password");
//   };

//   const handlePasswordSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validatePassword()) {
//       return;
//     }

//     // TODO: Integration will be handled by custom hooks
//     console.log("Password reset:", {
//       otp: formData.otp.join(""),
//       newPassword: formData.newPassword,
//     });

//     // Redirect to login with success message
//     router.push("/feature/auth/login?message=password-reset-success");
//   };

//   const handleResendOtp = () => {
//     // TODO: Integration will be handled by custom hooks
//     console.log("Resend OTP requested");

//     setCountdown(60); // Start 60 second countdown
//     // Clear current OTP
//     setFormData((prev) => ({
//       ...prev,
//       otp: ["", "", "", "", "", ""],
//     }));
//     inputRefs.current[0]?.focus();
//   };

//   if (currentStep === "otp") {
//     return (
//       <AuthLayout
//         title="Vérification de sécurité"
//         subtitle="Un code de vérification a été envoyé à votre email"
//       >
//         <form onSubmit={handleOtpSubmit} className="space-y-6">
//           <div className="space-y-4">
//             <label className="block text-sm font-medium text-gray-700 text-center">
//               Entrez le code de vérification à 6 chiffres
//             </label>

//             <div className="flex justify-center space-x-3">
//               {formData.otp.map((digit, index) => (
//                 <input
//                   key={index}
//                   ref={(el) => {
//                     inputRefs.current[index] = el;
//                   }}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleOtpChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onPaste={index === 0 ? handlePaste : undefined}
//                   className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                     errors.otp ? "border-red-300" : "border-gray-300"
//                   }`}
//                   autoComplete="off"
//                 />
//               ))}
//             </div>

//             {errors.otp && (
//               <p className="text-sm text-red-600 text-center">{errors.otp}</p>
//             )}
//           </div>

//           <Button
//             type="submit"
//             fullWidth
//             disabled={formData.otp.join("").length !== 6}
//           >
//             Vérifier le code
//           </Button>

//           <div className="text-center space-y-4">
//             <p className="text-sm text-gray-600">
//               Vous n avez pas reçu le code ?
//             </p>

//             {countdown > 0 ? (
//               <p className="text-sm text-gray-500">
//                 Renvoyer dans {countdown} secondes
//               </p>
//             ) : (
//               <Button type="button" variant="ghost" onClick={handleResendOtp}>
//                 Renvoyer le code
//               </Button>
//             )}
//           </div>

//           <div className="text-center">
//             <Link
//               href="/feature/auth/login"
//               className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
//             >
//               Retour à la connexion
//             </Link>
//           </div>
//         </form>
//       </AuthLayout>
//     );
//   }

//   return (
//     <AuthLayout
//       title="Nouveau mot de passe"
//       subtitle="Choisissez un nouveau mot de passe sécurisé"
//     >
//       <form onSubmit={handlePasswordSubmit} className="space-y-6">
//         <div className="text-center mb-6">
//           <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
//             <svg
//               className="w-8 h-8 text-green-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M5 13l4 4L19 7"
//               />
//             </svg>
//           </div>
//           <p className="text-sm text-gray-600">
//             Code vérifié avec succès ! Vous pouvez maintenant définir votre
//             nouveau mot de passe.
//           </p>
//         </div>

//         <Input
//           label="Nouveau mot de passe"
//           type="password"
//           name="newPassword"
//           value={formData.newPassword}
//           onChange={handlePasswordChange}
//           error={errors.newPassword}
//           placeholder="••••••••"
//           helperText="Au moins 8 caractères avec une majuscule, une minuscule et un chiffre"
//           required
//           autoFocus
//         />

//         <Input
//           label="Confirmer le nouveau mot de passe"
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handlePasswordChange}
//           error={errors.confirmPassword}
//           placeholder="••••••••"
//           required
//         />

//         <Button type="submit" fullWidth>
//           Réinitialiser le mot de passe
//         </Button>

//         <div className="text-center space-y-2">
//           <button
//             type="button"
//             onClick={() => setCurrentStep("otp")}
//             className="text-sm text-gray-600 hover:text-gray-500 hover:underline"
//           >
//             Retour à la vérification
//           </button>

//           <div>
//             <Link
//               href="/feature/auth/login"
//               className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
//             >
//               Retour à la connexion
//             </Link>
//           </div>
//         </div>
//       </form>
//     </AuthLayout>
//   );
// };

// export default ResetPasswordPage;
