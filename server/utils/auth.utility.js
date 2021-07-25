const { OAuth2Client } = require("google-auth-library");

const { REACT_APP_GOOGLE_API_KEY } = process.env;

const client = new OAuth2Client(REACT_APP_GOOGLE_API_KEY);

module.exports.verify = async function verify(googleToken) {
  const ticket = await client.verifyIdToken({
    idToken: googleToken,
    audience: REACT_APP_GOOGLE_API_KEY,
  });

  return ticket.getPayload();
};
