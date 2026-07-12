import * as oauth from "oauth4webapi";

export async function createPKCE() {
  const codeVerifier = oauth.generateRandomCodeVerifier();

  const codeChallenge = await oauth.calculatePKCECodeChallenge(codeVerifier);

  return {
    codeVerifier,
    codeChallenge,
  };
}
