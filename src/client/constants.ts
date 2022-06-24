export const apiUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://r-reddit-c-clone.herokuapp.com'
    : `http://localhost:8080`;
