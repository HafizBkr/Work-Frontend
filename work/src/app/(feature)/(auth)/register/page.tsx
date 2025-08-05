// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Input, Button, AuthLayout } from "../components";

// interface RegisterFormData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// interface RegisterFormErrors {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   password?: string;
//   confirmPassword?: string;
// }

// const RegisterPage: React.FC = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<RegisterFormData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState<RegisterFormErrors>({});

//   const validateForm = (): boolean => {
//     const newErrors: RegisterFormErrors = {};

//     if (!formData.firstName.trim()) {
//       newErrors.firstName = "Le prénom est requis";
//     }

//     if (!formData.lastName.trim()) {
//       newErrors.lastName = "Le nom est requis";
//     }

//     if (!formData.email) {
//       newErrors.email = "L'email est requis";
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = "L'email n'est pas valide";
//     }

//     if (!formData.password) {
//       newErrors.password = "Le mot de passe est requis";
//     } else if (formData.password.length < 8) {
//       newErrors.password =
//         "Le mot de passe doit contenir au moins 8 caractères";
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
//       newErrors.password =
//         "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre";
//     }

//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
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
//     if (errors[name as keyof RegisterFormErrors]) {
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
//     console.log("Register form data:", {
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       email: formData.email,
//       password: formData.password,
//     });

//     // For now, just navigate to OTP verification
//     router.push("/feature/auth/verify-otp");
//   };

//   return (
//     <AuthLayout
//       title="Créer un compte"
//       subtitle="Rejoignez-nous dès aujourd'hui"
//     >
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//           <Input
//             label="Prénom"
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleInputChange}
//             error={errors.firstName}
//             placeholder="Jean"
//             required
//           />

//           <Input
//             label="Nom"
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleInputChange}
//             error={errors.lastName}
//             placeholder="Dupont"
//             required
//           />
//         </div>

//         <Input
//           label="Adresse email"
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleInputChange}
//           error={errors.email}
//           placeholder="jean.dupont@email.com"
//           required
//         />

//         <Input
//           label="Mot de passe"
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleInputChange}
//           error={errors.password}
//           placeholder="••••••••"
//           helperText="Au moins 8 caractères avec une majuscule, une minuscule et un chiffre"
//           required
//         />

//         <Input
//           label="Confirmer le mot de passe"
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleInputChange}
//           error={errors.confirmPassword}
//           placeholder="••••••••"
//           required
//         />

//         <div className="flex items-start">
//           <div className="flex items-center h-5">
//             <input
//               id="terms"
//               name="terms"
//               type="checkbox"
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//               required
//             />
//           </div>
//           <div className="ml-3 text-sm">
//             <label htmlFor="terms" className="text-gray-600">
//               J accepte les{" "}
//               <Link
//                 href="/terms"
//                 className="text-blue-600 hover:text-blue-500 hover:underline"
//               >
//                 conditions d utilisation
//               </Link>{" "}
//               et la{" "}
//               <Link
//                 href="/privacy"
//                 className="text-blue-600 hover:text-blue-500 hover:underline"
//               >
//                 politique de confidentialité
//               </Link>
//             </label>
//           </div>
//         </div>

//         <Button type="submit" fullWidth>
//           Créer mon compte
//         </Button>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <div className="w-full border-t border-gray-300" />
//           </div>
//           <div className="relative flex justify-center text-sm">
//             <span className="px-2 bg-white text-gray-500">Ou</span>
//           </div>
//         </div>

//         <div className="text-center">
//           <span className="text-sm text-gray-600">
//             Vous avez déjà un compte ?{" "}
//             <Link
//               href="/feature/auth/login"
//               className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
//             >
//               Se connecter
//             </Link>
//           </span>
//         </div>
//       </form>
//     </AuthLayout>
//   );
// };

// export default RegisterPage;
