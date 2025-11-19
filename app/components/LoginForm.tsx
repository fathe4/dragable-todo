"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { InputField } from "./common/InputField";
import { Button } from "./common/Button";
import Api from "../services/Api";
import { redirect } from "next/navigation";
import Link from "next/link";

export type Login = {
  email: string;
  password: string;
  remember_me?: boolean;
};

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    mode: "onChange",
  });

  const onSubmit = async (data: Login) => {
    const loginData = await Api.login(data.email, data.password);
    if (loginData.access) {
      redirect("/dashboard");
    }
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Log in to your account
          </h1>
          <p className="text-gray-600">Start managing your tasks efficiently</p>
        </div>

        <div>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register}
            error={errors.email}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: EMAIL_PATTERN,
                message: "Please enter a valid email address",
              },
            })}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            showPasswordToggle={true}
            register={register}
            error={errors.password}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                {...register("remember_me")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot your password?
            </a>
          </div>

          <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
            Log In
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Dont have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};
