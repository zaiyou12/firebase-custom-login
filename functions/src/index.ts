const admin = require("firebase-admin");
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

import { User } from "./User";
import { getKakaoUser } from "./kakao";
import { getNaverUser } from "./naver";
import { databaseURL, kakaoProvider, region, naverProvider } from "./constant";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: databaseURL,
});

/**
 * Update Firebase user with the given email, create if none exists
 * @param userModel
 */
async function upudateOrCreateUser(userModel: User) {
  const updateParams = {
    uid: userModel.uid,
    provider: userModel.provider,
    displayName: userModel.displayName,
    photoURL: userModel.photoURL,
    email: userModel.email,
  };
  try {
    await admin.auth().updateUser(userModel.uid, updateParams);
  } catch (error) {
    console.log("Error updating user:", error);
    if (error.code === "auth/user-not-found") {
      return admin.auth().createUser(updateParams);
    }
    throw error;
  }
}

function customAuthWrapper(fn: Function, provider: string) {
  return functions.region(region).https.onRequest((req: any, response: any) => {
    return cors(req, response, async () => {
      const token = req.body.token;
      if (!token) {
        return response.status(403).send("Forbidden");
      }

      try {
        const user: User = await fn(token);
        await upudateOrCreateUser(user);

        // Generate custom firebase token and return to client
        const firebaseToken = await admin
          .auth()
          .createCustomToken(user.uid, { provider });
        response.send({ firebaseToken });
      } catch (err) {
        console.log(`Error: ${provider}CustomAuth`, err);
        response.status(500).send("Internal Server Error");
      }
    });
  });
}

exports.kakaoCustomAuth = customAuthWrapper(getKakaoUser, kakaoProvider);
exports.naverCustomAuth = customAuthWrapper(getNaverUser, naverProvider);
