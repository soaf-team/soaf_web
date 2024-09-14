import { axiosBase } from "@/apis";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useMatchedUserQuery = () => {
  const fetchUser = async () => {
    const response = await axiosBase.get("/soaf-explore");
    return response.data;
  };

  const { data: matchedUsers = [] as User[] } = useQuery({
    queryKey: ["matchedUser"],
    queryFn: fetchUser,
  });

  return { matchedUsers };
};
