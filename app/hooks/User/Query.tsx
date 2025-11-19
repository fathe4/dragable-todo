import Api from "@/app/services/Api";
import { useQuery } from "@tanstack/react-query";
import { USER_PROFILE } from "./Constants";

export const useUserProfile = () =>
  useQuery({ queryKey: [USER_PROFILE], queryFn: () => Api.user.getProfile() });
