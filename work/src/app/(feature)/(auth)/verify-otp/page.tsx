// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button, AuthLayout } from "../components";

// interface OtpFormErrors {
//   otp?: string;
// }

// const VerifyOtpPage: React.FC = () => {
//   const router = useRouter();
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [errors, setErrors] = useState<OtpFormErrors>({});
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
//     const otpString = otp.join("");
//     const newErrors: OtpFormErrors = {};

//     if (otpString.length !== 6) {
//       newErrors.otp = "Le code OTP doit contenir 6 chiffres";
//     } else if (!/^\d{6}$/.test(otpString)) {
//       newErrors.otp = "Le code OTP ne doit contenir que des chiffres";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleOtpChange = (index: number, value: string) => {
//     // Only allow digits
//     if (value && !/^\d$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

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
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent) => {
//     e.preventDefault();
//     const pastedText = e.clipboardData.getData("text");
//     const digits = pastedText.replace(/\D/g, "").slice(0, 6);

//     if (digits.length === 6) {
//       const newOtp = digits.split("");
//       setOtp(newOtp);
//       inputRefs.current[5]?.focus();
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateOtp()) {
//       return;
//     }

//     // TODO: Integration will be handled by custom hooks
//     console.log("OTP verification:", otp.join(""));

//     // For now, just navigate to dashboard
//     router.push("/dashboard");
//   };

//   const handleResendOtp = () => {
//     // TODO: Integration will be handled by custom hooks
//     console.log("Resend OTP requested");

//     setCountdown(60); // Start 60 second countdown
//     // Clear current OTP
//     setOtp(["", "", "", "", "", ""]);
//     inputRefs.current[0]?.focus();
//   };

//   return (
//     <AuthLayout
//       title="Vérification du compte"
//       subtitle="Un code de vérification a été envoyé à votre email"
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="space-y-4">
//           <label className="block text-sm font-medium text-gray-700 text-center">
//             Entrez le code de vérification à 6 chiffres
//           </label>

//           <div className="flex justify-center space-x-3">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => {
//                   inputRefs.current[index] = el;
//                 }}
//                 type="text"
//                 inputMode="numeric"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleOtpChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 onPaste={index === 0 ? handlePaste : undefined}
//                 className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                   errors.otp ? "border-red-300" : "border-gray-300"
//                 }`}
//                 autoComplete="off"
//               />
//             ))}
//           </div>

//           {errors.otp && (
//             <p className="text-sm text-red-600 text-center">{errors.otp}</p>
//           )}
//         </div>

//         <Button type="submit" fullWidth disabled={otp.join("").length !== 6}>
//           Vérifier le code
//         </Button>

//         <div className="text-center space-y-4">
//           <p className="text-sm text-gray-600">
//             Vous n avez pas reçu le code ?
//           </p>

//           {countdown > 0 ? (
//             <p className="text-sm text-gray-500">
//               Renvoyer dans {countdown} secondes
//             </p>
//           ) : (
//             <Button type="button" variant="ghost" onClick={handleResendOtp}>
//               Renvoyer le code
//             </Button>
//           )}
//         </div>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300" />
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">Ou</span>
//           </div>
//         </div>

//         <div className="text-center">
//           <Link
//             href="/feature/auth/login"
//             className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
//           >
//             Retour à la connexion
//           </Link>
//         </div>
//       </form>
//     </AuthLayout>
//   );
// };

// export default VerifyOtpPage;
