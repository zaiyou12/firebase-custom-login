interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  provider: string;
}

// ===== Kakao =====
interface KakaoProperties {
  nickname: string;
  profile_image: string;
  thumbnail_image: string;
}
interface KaKaoAccount {
  profile_needs_agreement: boolean;
  profile: object;
  has_email: boolean;
  email_needs_agreement: boolean;
  is_email_valid: boolean;
  is_email_verified: boolean;
  email: string;
  has_age_range: boolean;
  age_range_needs_agreement: boolean;
  age_range:
    | "1~9"
    | "10~14"
    | "15~19"
    | "20~29"
    | "30~39"
    | "40~49"
    | "50~59"
    | "60~69";
  has_birthday: boolean;
  birthday_needs_agreement: boolean;
  birthday: string; // 0701
  birthday_type: string; // "SOLAR"
  has_gender: boolean;
  gender_needs_agreement: boolean;
  gender: "male" | "female";
}
interface KakaoUser {
  data: {
    id: number;
    connected_at: Date;
    properties: KakaoProperties;
    kakao_account: KaKaoAccount;
  };
}

// ===== Naver =====
interface NaverAccount {
  nickname: string;
  name: string;
  email: string;
  gender: "F" | "M" | "U";
  age: string;
  birthday: string; // MM-DD
  profile_image: string;
}

interface NaverUser {
  data: {
    resultcode: string;
    message: string;
    response: NaverAccount;
  };
}

export { User, KakaoUser, NaverUser };
