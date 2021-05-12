import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { query as q } from 'faunadb';
import getClient from '../../../lib/fauna/fauna';
import { getValue, setExpValue } from '../../../lib/redis';

const faunaTokensCacheKey = 'FaunaToken';

async function getFaunaToken(req, res) {
  const { user } = getSession(req, res);
  const {
    Collection,
    Create,
    Get,
    Exists,
    If,
    Match,
    Index,
    Tokens,
    Select,
    TimeAdd,
    Now,
  } = q;
  const userDoc = Match(Index('userByAuth'), user.sub);
  let token;
  const createToken = (userDocument) =>
    Create(Tokens(), {
      instance: Select(['ref'], Get(userDocument)),
      ttl: TimeAdd(Now(), 1, 'day'),
    });
  const createUser = Create(Collection('users'), {
    data: {
      auth0ID: user.sub,
      role: 'nobody',
    },
  });
  const cacheKey = `${faunaTokensCacheKey}${user.sub}`;
  token = await getValue(cacheKey);
  if (!token) {
    const serverClient = getClient();
    const { secret, ttl } = await serverClient.query(
      If(
        Exists(userDoc),
        createToken(userDoc),
        createToken(Select(['ref'], createUser))
      )
    );
    await setExpValue(
      cacheKey,
      Math.floor((Date.parse(ttl.value) - Date.now()) / 1000),
      secret
    );
    token = secret;
  }
  res.status(200);
  res.send({ token });
}

export default withApiAuthRequired(getFaunaToken);
