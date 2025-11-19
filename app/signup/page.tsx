import { SignUpForm, SignUpIllustration } from "../components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <SignUpIllustration />
      <SignUpForm />
    </div>
  );
}
