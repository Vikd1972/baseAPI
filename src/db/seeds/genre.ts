import { genreRepo } from '..';
import { connect } from '../data-source';

const genres = [
  'Fiction',
  'Non—fiction',
  'Light fiction',
  'Science-fiction',
  'Fantasy',
  'Business & Finance',
  'Politics',
  'Travel books',
  'Autobiography',
  'History',
  'Thriller',
  'Mystery',
  'Romance',
  'Satire',
  'Horror',
  'Health',
  'Children`s books',
  'Encyclopedia',
];

(async () => {
  await connect();
  
  for (let i = 0; i < genres.length; i++) {
      const genre = genreRepo.create({ name: genres[i] });
      await genreRepo.save(genre);
    }
})();