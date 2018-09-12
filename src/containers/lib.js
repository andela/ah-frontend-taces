import http from 'axios';

export function fetchPost(slug = false) {
  return http
    .get(`https://authors-haven-tabs.herokuapp.com/api/articles/search?slug=${slug}`)
    .then((response) => {
      return response.data;
    });
}

export function sendRating(slug = false) {
  return http
    .post(`https://authors-haven-tabs.herokuapp.com/api/articles/${slug}/rate`)
    .then((response) => {
      return response.data;
    });
}

export default fetchPost();
