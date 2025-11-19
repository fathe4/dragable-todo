import Image from "next/image";
import { LoginForm } from "../components/LoginForm";
import { SignUpForm, SignUpIllustration } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
        <div className="hidden lg:flex lg:w-1/2 bg-[#E2ECF8] items-center justify-center p-12">
          <div className="max-w-md w-full">
            <Image
              src="/login.png"
              alt="Sign Up Illustration"
              width={750}
              height={750}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      <LoginForm />
    </div>
  );
}
