import axios from "axios";
import { User, KakaoUser } from "./User";
import { defaultProfileImg, kakaoApiUrl, kakaoProvider } from "./constant";

/**
 * Get user profile from Kakao API
 * @param token token from client
 */
export async function getKakaoUser(token: string): Promise<User> {
  const kakaoUser: KakaoUser = await axios.get(kakaoApiUrl, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const user: User = {
    uid: `kakao:${kakaoUser.data.kakao_account.email}`,
    email: kakaoUser.data.kakao_account.email || "",
    displayName: kakaoUser.data.properties.nickname || "",
    photoURL: kakaoUser.data.properties.profile_image || defaultProfileImg,
    provider: kakaoProvider,
  };
  return user;
}
