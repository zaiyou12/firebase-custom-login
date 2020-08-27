# Firebase custom login with Kakao & Naver

This sample shows how to Sign in Firebase using Kakao/Naver Login with firebase function. Inspired by [custom-auth-samples/kakao](https://github.com/FirebaseExtended/custom-auth-samples/tree/master/kakao). In above example, it uses kakao api v1, I changed it to v2 and rewritten in typescript.

## Set up

Basic setup

- Set up a Kakao/Naver developer account and your application.
- Create firebase project. (To deploy, you need to choose Blaze pricing plan)
- Install firebase CLI. `npm install -g firebase-tools`

Project setup

- Download service account json file from firebase console.
- Specify the values in `functions/constant.ts`
  - databaseURL: firebase url. ex) `https://example.firebaseio.com`
  - region: firebase region. ex) `asia-northeast-3`
  - defaultProfileImg: Default image to set if the user's profile image does not exist

## Run

```bash
cd functions
sh credentials.sh
npm run serve # run in local
npm run deploy # deploy to your firebase
```

Sending a kakao/naver token to the function, it will returns a firebase custom token.

### Request

```json
{
  "token": "USER_TOKEN"
}
```

### Return

```json
{
  "data": {
    "firebaseToken": "WHAT_WE_WANT"
    // ...
  }
}
```

## Dependency

- Axios
- Cors
- Firebase-function
- Firebase-admin
