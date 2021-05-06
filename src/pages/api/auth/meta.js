import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import bent from 'bent';
import { query as q } from 'faunadb';
import getClient from '../../../lib/fauna';
import getServerToken from './__utils/getServerToken';

async function UserMeta(req, res) {
  const session = getSession(req, res);
  const fauna = getClient();
  const clients = await fauna.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection('Pilots'))),
      q.Lambda(
        'pilotRef',
        q.Let(
          {
            pilotDoc: q.Get(q.Var('pilotRef')),
          },
          {
            id: q.Select(['ref', 'id'], q.Var('pilotDoc')),
            name: q.Select(['data', 'name'], q.Var('pilotDoc')),
          }
        )
      )
    )
  );
  console.log(clients);
  const { token, type } = await getServerToken();
  const manegerApi = bent(
    'https://cherry-dev.eu.auth0.com/api/v2/users/',
    'json'
  );
  const response = await manegerApi(
    `${encodeURI(session.user.sub)}/roles`,
    'GET',
    {
      Authorization: `${type} ${token}`,
    }
  );
  res.status(200).json({
      meta: 'META',
     user: session.user.sub,
        response,
  });
}

export default withApiAuthRequired(UserMeta);
