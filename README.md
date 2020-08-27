# Firebase custom login with Kakao

This sample shows how to Sign in Firebase using Kakao Login with firebase function. Inspired by [custom-auth-samples/kakao](https://github.com/FirebaseExtended/custom-auth-samples/tree/master/kakao). In above example, it uses kakao api v1, I changed it to v2 and rewritten in typescript.

## Before start

Basic setup

- Set up a Kakao developer account and your application.
- Create firebase project. (To deploy, you need to choose Blaze pricing plan)
- Install firebase CLI. `npm install -g firebase-tools`

Project setup

- Download service account json file from firebase console.
- Specify the path of the json file in the `functions/credential.sh` file.
  - `export GOOGLE_APPLICATION_CREDENTIALS="./YOUR_SERVERVICE_ACCOUNT.json"`
- Specify firebase region in `functions/index.ts` file. (ex. `"asia-northeast3"`)
- Specify database URL in `functions/index.ts` file. (ex. `https://example.firebaseio.com`)

## Run

```bash
cd functions
sh credentials.sh
npm run serve # run in local
npm run deploy # deploy to your firebase
```

Sending a kakao token to the function, it will returns a firebase custom token.

### Request

```json
{
  "token": "USER_KAKAO_TOKEN"
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
