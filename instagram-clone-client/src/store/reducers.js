import { ActionTypes } from './';
import _orderBy from 'lodash/orderBy';
import queries from '../queries';

export default async (state, action, client) => {
  console.log('Reducing:', action);
  switch (action.type) {
    case ActionTypes.GET_USER:
      const {
        data: { me }
      } = await client.query({
        query: queries.query.me
      });
      return { user: me };

    case ActionTypes.CREATE_POST:
      const { file, desc, filter } = action.payload;
      const { data } = await client.mutate({
        mutation: queries.mutation.singleUpload,
        variables: { file }
      });
      const fileURL = data.singleUpload.path;
      const responsePost = await client.mutate({
        mutation: queries.mutation.createPost,
        variables: { post: { desc, photo: fileURL, effect: filter } }
      });

      // if (!responsePost.data.createPost.success) {
      return { error: 'Error al crear el post' };
      // }

      return null;

    case ActionTypes.ADD_POST:
      return { posts: [...state.posts, { id: 6, title: 'Post 6' }] };

    case ActionTypes.GET_POSTS:
      const responseFilms = await fetch(
        'https://swapi.co/api/films/?format=json'
      );
      const films = await responseFilms.json();

      return { posts: _orderBy(films.results, ['episode_id'], ['asc']) };

    default:
      return null;
  }
};
