"use client";

import { Button } from "@/app/components/common/Button";
import { InputField } from "@/app/components/common/InputField";
import Title from "@/app/components/common/Title";
import { useUpdateProfile } from "@/app/hooks/User/Mutation";
import { Camera, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contactNumber: string;
  birthday: string;
}

export default function AccountPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountFormData>();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProfile } = useUpdateProfile();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: AccountFormData) => {
    const submitData = {
      first_name: data.firstName,
      last_name: data.lastName,
      address: data.address,
      contact_number: data.contactNumber,
      birthday: data.birthday,
      ...(imageFile && { profile_image: imageFile }),
    };

    updateProfile(submitData);
  };

  return (
    <div className=" bg-white p-4 md:p-8 rounded-4xl">
      <div className="">
        <div className="pb-8">
          <Title size="h3" title={"Account Information"} />
        </div>

        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-1/3 p-6 border-2 border-gray-200 rounded-2xl">
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-full bg-gray-300">
              <div className="w-full h-full rounded-full overflow-hidden">
                {profileImage ? (
                  <Image
                    src={profileImage}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="profile-image-input"
                className="hidden"
              />

              <Button
                className="absolute bottom-0 right-0 z-20 p-1.5 md:p-2"
                type="button"
                onClick={() => fileInputRef.current?.click()}
              >
                <Camera className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </div>

            <Button
              onClick={() => fileInputRef.current?.click()}
              color="blue"
              className="flex items-center justify-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload New Photo
            </Button>
          </div>

          {imageFile && (
            <div className="mt-2 text-sm text-gray-600">
              Selected: {imageFile.name} ({(imageFile.size / 1024).toFixed(1)}{" "}
              KB)
            </div>
          )}
        </div>

        <div className="border-gray-200 border-2 p-6 rounded-2xl">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <InputField
                label="First Name"
                name="firstName"
                register={register}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                register={register}
                error={errors.lastName}
              />
            </div>

            <InputField
              label="Email"
              name="email"
              type="email"
              register={register}
              error={errors.email}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <InputField
                label="Address"
                name="address"
                register={register}
                error={errors.address}
              />
              <InputField
                label="Contact Number"
                name="contactNumber"
                register={register}
                error={errors.contactNumber}
              />
            </div>

            <InputField
              label="Birthday"
              name="birthday"
              type="date"
              register={register}
              error={errors.birthday}
            />

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 justify-center">
              <Button onClick={handleSubmit(onSubmit)}>Save Changes</Button>
              <Button color="gray">Cancel</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
