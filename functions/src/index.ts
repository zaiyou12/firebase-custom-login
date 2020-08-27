const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

import axios from "axios";
import { KakaoUser } from "./KakaoUser";

const firebaseRegion = "YOUR_REGION";
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "YOUR_DATABASE_URL",
});
const kakaoRequestMeUrl =
  "https://kapi.kakao.com/v2/user/me?secure_resource=true";

/**
 * Update Firebase user with the given email, create if none exists
 * @param userId user id per app
 * @param email user's email address
 * @param displayName user
 * @param photoURL profile photo url
 */
async function upudateOrCreateUser(
  userId: string,
  email: string,
  displayName: string,
  photoURL: string
) {
  const updateParams = {
    uid: userId,
    provider: "KAKAO",
    displayName: displayName || email,
    photoURL: photoURL || "",
    email: email || "",
  };
  try {
    await admin.auth().updateUser(userId, updateParams);
  } catch (error) {
    console.log("Error updating user:", error);
    if (error.code === "auth/user-not-found") {
      return admin.auth().createUser(updateParams);
    }
    throw error;
  }
}

exports.kakaoCustomAuth = functions
  .region(firebaseRegion)
  .https.onRequest((req: any, response: any) => {
    return cors(req, response, async () => {
      const token = req.body.token;
      if (!token) {
        return response.status(403).send("Forbidden");
      }

      try {
        // Get user profile from Kakao API
        const kakaoUser: KakaoUser = await axios.get(kakaoRequestMeUrl, {
          headers: { Authorization: `Bearer ${token}` },
          url: kakaoRequestMeUrl,
        });
        const userId = `kakao:${kakaoUser.data.kakao_account.email}`;
        // console.log("kakaoUser", kakaoUser.data);
        // console.log("kakaoAccount", kakaoUser.data.kakao_account);

        // Update for create firebase user with userId
        await upudateOrCreateUser(
          userId,
          kakaoUser.data.kakao_account.email || "",
          kakaoUser.data.properties.nickname || "",
          kakaoUser.data.properties.profile_image || ""
        );

        // Generate custom firebase token and return to client
        const firebaseToken = await admin
          .auth()
          .createCustomToken(userId, { provider: "KAKAO" });
        response.send({ firebaseToken });
      } catch (err) {
        console.log("Error: kakaoCustomAuthSeoul", err);
        response.status(500).send("Internal Server Error");
      }
    });
  });
