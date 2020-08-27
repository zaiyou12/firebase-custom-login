import axios from "axios";
import { User, NaverUser } from "./User";
import { defaultProfileImg, naverApiUrl, naverProvider } from "./constant";

/**
 * Get user profile from Naver API
 * @param token token from client
 */
export async function getNaverUser(token: string): Promise<User> {
  const naverUser: NaverUser = await axios.get(naverApiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user: User = {
    uid: `naver:${naverUser.data.response.email}`,
    email: naverUser.data.response.email,
    displayName: naverUser.data.response.nickname || "",
    photoURL: naverUser.data.response.profile_image || defaultProfileImg,
    provider: naverProvider,
  };
  return user;
}
