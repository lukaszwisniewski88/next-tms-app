import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { query as q } from 'faunadb';
import getClient from '@lib/fauna/fauna';
import { getValue, setExpValue } from '@lib/redis';
import { userQuery } from '@lib/fauna/queries/users';

const faunaTokensCacheKey = 'FaunaToken';

async function getFaunaToken(req, res) {
  const { user } = getSession(req, res);

  let token;
  const faunaUser = userQuery(user.sub);
  const cacheKey = `${faunaTokensCacheKey}${user.sub}`;
  token = await getValue(cacheKey);
  if (!token) {
    const serverClient = getClient();
    const createToken = (userRef) =>
      q.Create(q.Tokens(), {
        instance: q.Select(['ref'], q.Get(userRef)),
        ttl: q.TimeAdd(q.Now(), 1, 'day'),
      });
    const { secret, ttl } = await serverClient.query(
      q.If(
        faunaUser.isExisting,
        createToken(faunaUser.document),
        createToken(q.Select(['ref'], faunaUser.create))
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
