import {
  changePassword,
  login,
  signUp,
  updateProfile,
} from "@/app/Types/User.type";
import Api from ".";

const User = (api: typeof Api) => ({
  signup: ({ first_name, last_name, email, password }: signUp) =>
    api.post(
      "/api/users/signup/",
      {},
      {
        first_name,
        last_name,
        email,
        password,
      }
    ),

  login: ({ email, password }: login) =>
    api.post("/api/auth/login/", {}, { email, password }),

  changePassword: ({ old_password, new_password }: changePassword) =>
    api.post("/api/users/change-password/", {}, { old_password, new_password }),

  getProfile: () => api.get("/api/users/me/", {}, {}),

  updateProfile: ({
    first_name,
    last_name,
    address,
    contact_number,
    birthday,
    bio,
    profile_image,
  }: updateProfile) => {
    const formData = new FormData();
    if (first_name) formData.append("first_name", first_name);
    if (last_name) formData.append("last_name", last_name);
    if (address) formData.append("address", address);
    if (contact_number) formData.append("contact_number", contact_number);
    if (birthday) formData.append("birthday", birthday);
    if (bio) formData.append("bio", bio);
    if (profile_image) formData.append("profile_image", profile_image);

    return api.patch("/api/users/me/", {}, formData);
  },
});

export default User;
