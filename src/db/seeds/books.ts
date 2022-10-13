import { bookRepo, genreRepo } from '..';
import { connect } from '../data-source';

type BookType = {
  name: string;
  author: string;
  pathToCover: string
  description: string;
  releasedAt: Date;
  paperbackPrice: number;
  paperbackQuantity: number;
  hardcoverPrice: number;
  hardcoverQuantity: number;
  isNew: boolean;
  isBestseller: boolean;
  genres: string[];
};

const books: BookType[] = [
  {
    name: 'The Chronicles of Narnia',
    author: 'C. S. Lewis',
    pathToCover: '',
    description: `Lorem ipsum dolor sit amet consectetur, 
      adipisicing elit. Dignissimos rerum autem quasi dolore eos a nemo, 
      fugiat tenetur exercitationem quia nesciunt distinctio excepturi 
      in quaerat doloremque aliquid aspernatur dolorum hic!`,
      releasedAt: new Date(1995, 11, 17),
    paperbackPrice: 1399,
    paperbackQuantity: 0,
    hardcoverPrice: 1699,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Science-fiction', 'Satire'],
  },
];

(async () => {
  await connect();
  const genres = await genreRepo.find();

  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const genre = book.genres.map((genre) => {
      return genres.find((g) => g.name === genre);
    }) || null;

    const newBook = bookRepo.create({
      ...book,
      genres: genre
    });

    await bookRepo.save(newBook);
  }
})();