import bent from 'bent';
import { getValue, setExpValue } from '../../../../lib/redis';

const options = {
  method: 'POST',
  url: 'https://cherry-dev.eu.auth0.com/oauth/token',
  body: {
    'content-type': 'application/json',
    'client_id': process.env.AUTH0_CLIENT_ID,
    'client_secret': process.env.AUTH0_CLIENT_SECRET,
    'audience': 'https://cherry-dev.eu.auth0.com/api/v2/',
    'grant_type': 'client_credentials',
  },
};

const { url, method, headers, body } = options;
const request = bent(url, method, 'json');
/**
 * Gets the server Auth0 Management Api token, cached in REDIS
 *
 * @return {Promise<{token:string,type:string}>}
 */
const getToken = async () => {
  const key = 'AUTH0Manager';
  let token = await getValue(key);
  if (token == null) {
    const { access_token: newToken, expires_in: expires } = await request(
      '',
      body,
      headers
    );
    token = newToken;
    await setExpValue(key, expires, token);
  }
  return {
    token,
    type: 'Bearer',
  };
};

export default getToken;
