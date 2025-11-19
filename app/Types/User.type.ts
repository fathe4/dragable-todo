export type signUp = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};
export type login = {
  email: string;
  password: string;
};
export type changePassword = {
  old_password: string;
  new_password: string;
};
export type updateProfile = {
  first_name?: string;
  last_name?: string;
  address?: string;
  contact_number?: string;
  birthday?: string;
  bio?: string;
  profile_image?: File;
};
