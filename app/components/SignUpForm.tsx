"use client";

import Image from "next/image";

export const SignUpIllustration: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-[#E2ECF8] items-center justify-center p-12">
      <div className="max-w-md w-full">
        <Image
          src="/register.png"
          alt="Sign Up Illustration"
          width={750}
          height={750}
          className="w-full h-auto object-contain"
          priority
        />
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
import Link from "next/link";

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

    const signUpData: SignUp = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };

    try {
      signup(signUpData);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    } finally {
    }
  };

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
        <Link href="/login" className="ext-blue-600 font-medium hover:text-blue-700">
            Log in
        </Link>
        </p>
      </div>
    </div>
  );
};
