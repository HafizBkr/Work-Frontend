// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input, Button, AuthLayout } from "../components";

// interface ForgotPasswordFormData {
//   email: string;
// }

// interface ForgotPasswordFormErrors {
//   email?: string;
// }

// const ForgotPasswordPage: React.FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<ForgotPasswordFormData>({
//     email: "",
//   });
//   const [errors, setErrors] = useState<ForgotPasswordFormErrors>({});
//   const [isSuccess, setIsSuccess] = useState(false);

//   const validateForm = (): boolean => {
//     const newErrors: ForgotPasswordFormErrors = {};

//     if (!formData.email) {
//       newErrors.email = "L'email est requis";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "L'email n'est pas valide";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (errors[name as keyof ForgotPasswordFormErrors]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: undefined,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     // TODO: Integration will be handled by custom hooks
//     console.log("Forgot password form data:", formData);

//     // For now, just show success state
//     setIsSuccess(true);
//   };

//   const handleContinueToReset = () => {
//     router.push("/feature/auth/reset-password");
//   };

//   if (isSuccess) {
//     return (
//       <AuthLayout
//         title="Email envoyé"
//         subtitle="Vérifiez votre boîte de réception"
//       >
//         <div className="text-center space-y-6">
//           <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
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
//                 d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//               />
//             </svg>
//           </div>

//           <div className="space-y-2">
//             <p className="text-gray-600">
//               Un email de réinitialisation a été envoyé à :
//             </p>
//             <p className="font-semibold text-gray-900">{formData.email}</p>
//           </div>

//           <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm">
//             <p>
//               Suivez les instructions dans l email pour réinitialiser votre mot
//               de passe. Si vous ne voyez pas l email, vérifiez votre dossier
//               spam.
//             </p>
//           </div>

//           <div className="space-y-4">
//             <Button fullWidth onClick={handleContinueToReset}>
//               Continuer vers la réinitialisation
//             </Button>

//             <Button
//               variant="ghost"
//               fullWidth
//               onClick={() => setIsSuccess(false)}
//             >
//               Renvoyer l email
//             </Button>
//           </div>

//           <div className="text-center">
//             <Link
//               href="/feature/auth/login"
//               className="text-sm text-blue-600 hover:text-blue-500 hover:underline"
//             >
//               Retour à la connexion
//             </Link>
//           </div>
//         </div>
//       </AuthLayout>
//     );
//   }

//   return (
//     <AuthLayout
//       title="Mot de passe oublié"
//       subtitle="Entrez votre email pour réinitialiser votre mot de passe"
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="text-center mb-6">
//           <div className="mx-auto flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//             <svg
//               className="w-8 h-8 text-blue-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
//               />
//             </svg>
//           </div>
//           <p className="text-sm text-gray-600">
//             Pas de souci ! Entrez votre adresse email et nous vous enverrons un
//             lien pour réinitialiser votre mot de passe.
//           </p>
//         </div>

//         <Input
//           label="Adresse email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           error={errors.email}
//           placeholder="exemple@email.com"
//           required
//           autoFocus
//         />

//         <Button type="submit" fullWidth>
//           Envoyer le lien de réinitialisation
//         </Button>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300" />
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">Ou</span>
//           </div>
//         </div>

//         <div className="text-center space-y-2">
//           <Link
//             href="/feature/auth/login"
//             className="text-sm text-blue-600 hover:text-blue-500 hover:underline block"
//           >
//             Retour à la connexion
//           </Link>

//           <div className="text-sm text-gray-600">
//             Vous n avez pas de compte ?{" "}
//             <Link
//               href="/feature/auth/register"
//               className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
//             >
//               Créer un compte
//             </Link>
//           </div>
//         </div>
//       </form>
//     </AuthLayout>
//   );
// };

// export default ForgotPasswordPage;
