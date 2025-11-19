"use client";

export const SignUpIllustration: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center p-12">
      <div className="max-w-md">
        <svg viewBox="0 0 400 400" className="w-full h-auto">
          <circle cx="200" cy="200" r="150" fill="#dbeafe" opacity="0.5" />
          <rect x="140" y="180" width="120" height="80" rx="8" fill="#3b82f6" />
          <rect
            x="155"
            y="200"
            width="60"
            height="8"
            rx="4"
            fill="white"
            opacity="0.8"
          />
          <circle cx="165" cy="230" r="3" fill="white" />
          <circle cx="175" cy="230" r="3" fill="white" />
          <circle cx="185" cy="230" r="3" fill="white" />
          <circle cx="195" cy="230" r="3" fill="white" />
          <circle cx="110" cy="220" r="20" fill="#1e40af" />
          <path
            d="M110 240 L110 280 L90 310 M110 280 L130 310 M110 260 L85 270 M110 260 L135 270"
            stroke="#1e40af"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="200" cy="140" r="18" fill="#60a5fa" />
          <ellipse cx="200" cy="140" rx="6" ry="8" fill="#1e293b" />
          <path
            d="M200 158 L200 190 M200 170 L180 180 M200 170 L220 180"
            stroke="#60a5fa"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="290" cy="220" r="20" fill="#60a5fa" />
          <path
            d="M290 240 L290 280 L270 310 M290 280 L310 310 M290 260 L265 270 M290 260 L315 270"
            stroke="#60a5fa"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="80" cy="150" r="8" fill="#93c5fd" opacity="0.6" />
          <circle cx="320" cy="160" r="10" fill="#93c5fd" opacity="0.6" />
          <path
            d="M60 320 Q65 310 70 320 T80 320"
            stroke="#86efac"
            strokeWidth="3"
            fill="none"
          />
          <rect x="50" y="325" width="15" height="25" rx="2" fill="#86efac" />
        </svg>
      </div>
    </div>
  );
};

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./common/InputField";
import { Button } from "./common/Button";
import { authClient } from "../lib/auth-client";
import { useSignUp } from "../hooks/User/Mutation";

export type SignUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type ConfirmPasswordForm = SignUp & {
  confirm_password: string;
};

// Validation patterns
const NAME_PATTERN = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PASSWORD_MIN_LENGTH = 8;

export const SignUpForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ConfirmPasswordForm>({
    mode: "onChange",
  });
  const { mutate: signup, data: signdata, error } = useSignUp();

  const password = watch("password");

  const onSubmit = async (data: ConfirmPasswordForm) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const signUpData: SignUp = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };

    console.log("Form data:", signUpData);
    alert("Account created successfully!");

    // e.preventDefault();
    // setLoading(true);

    try {
      signup(signUpData);
      console.log(signdata, "signup");
      console.log(error, "error");
      console.log(signdata, "signup");
      console.log(signdata, "signup");

      // Redirect or show success message
      //   window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
      //   setLoading(false);
    }
  };

  //   const handleSignup = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       // Option 1: Use Better-auth's built-in signup
  //       await authClient.signUp.email({
  //         email,
  //         password,
  //         name,
  //       });

  //       // Option 2: Call your custom API directly then sign in
  //       // const response = await fetch('/api/users/signup/', {
  //       //   method: 'POST',
  //       //   headers: { 'Content-Type': 'application/json' },
  //       //   body: JSON.stringify({ email, password, name }),
  //       // });
  //       // if (response.ok) {
  //       //   await authClient.signIn.email({ email, password });
  //       // }

  //       // Redirect or show success message
  //       window.location.href = "/dashboard";
  //     } catch (error) {
  //       console.error("Signup failed:", error);
  //       alert("Signup failed. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create your account
          </h1>
          <p className="text-gray-600">Start managing your tasks efficiently</p>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              register={register}
              error={errors.first_name}
              {...register("first_name", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Must not exceed 50 characters",
                },
                pattern: {
                  value: NAME_PATTERN,
                  message: "Please enter a valid name format.",
                },
              })}
            />
            <InputField
              label="Last Name"
              register={register}
              error={errors.last_name}
              {...register("last_name", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Must not exceed 50 characters",
                },
                pattern: {
                  value: NAME_PATTERN,
                  message: "Please enter a valid name format.",
                },
              })}
            />
          </div>

          <InputField
            label="Email"
            type="email"
            register={register}
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please enter a valid email address",
              },
              validate: {
                noSpaces: (value) =>
                  !/\s/.test(value) || "Email cannot contain spaces",
              },
            })}
          />

          <InputField
            label="Password"
            type="password"
            showPasswordToggle={true}
            register={register}
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: PASSWORD_MIN_LENGTH,
                message: `${PASSWORD_MIN_LENGTH} characters minimum.`,
              },
              maxLength: {
                value: 100,
                message: "Password must not exceed 100 characters",
              },
            })}
          />

          <InputField
            label="Confirm Password"
            type="password"
            showPasswordToggle={true}
            register={register}
            error={errors.confirm_password}
            {...register("confirm_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Sign Up
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};
