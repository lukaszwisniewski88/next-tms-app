import { query as q } from 'faunadb';

const {
  Collection,
  Create,
  Exists,
  Match,
  Index,
} = q;

const userQuery = (sub) => {
  const document = Match(Index('userByAuth'), sub);
  const create = Create(Collection('users'), {
    data: {
      auth0ID: sub,
      role: 'nobody',
    },
  });
  const isExisting = Exists(document);
  return {
    create,
    isExisting,
    document,
  };
};

export { userQuery };
