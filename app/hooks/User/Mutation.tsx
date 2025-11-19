import Api from "@/app/services/Api";
import { QueryClient, useMutation } from "@tanstack/react-query";

import { USER_PROFILE } from "./Constants";
import {
  updateProfile,
  signUp,
  login,
  changePassword,
} from "@/app/Types/User.type";

export const useSignUp = () => {
  return useMutation({
    mutationFn: ({ first_name, last_name, email, password }: signUp) =>
      Api.user.signup({
        first_name,
        last_name,
        email,
        password,
      }),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: login) =>
      Api.user.login({ email, password }),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: ({ old_password, new_password }: changePassword) =>
      Api.user.changePassword({
        old_password,
        new_password,
      }),
  });
};

export const useUpdateProfile = () => {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: ({
      first_name,
      last_name,
      address,
      contact_number,
      birthday,
      bio,
      profile_image,
    }: updateProfile) =>
      Api.user.updateProfile({
        first_name,
        last_name,
        address,
        contact_number,
        birthday,
        bio,
        profile_image,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PROFILE] });
    },
  });
};
