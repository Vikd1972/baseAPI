import { booksRepo, genreRepo } from '..';
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
    name: 'It Starts with Us',
    author: 'Colleen Hoover',
    pathToCover: 'http://localhost:3001/covers/ItStartsWithUs.jpg',
    description: `Lily and her ex-husband, Ryle, have just 
    settled into a civil coparenting rhythm when she suddenly 
    bumps into her first love, Atlas, again. After nearly 
    two years separated, she is elated that for once, time is 
    on their side, and she immediately says yes when Atlas asks 
    her on a date.`,
    releasedAt: new Date(2022, 10, 18),
    paperbackPrice: 1299,
    paperbackQuantity: 5,
    hardcoverPrice: 1599,
    hardcoverQuantity: 5,
    isNew: true,
    isBestseller: false,
    genres: ['Romance', 'Fiction'],
  },
  {
    name: 'It Ends with Us',
    author: 'Colleen Hoover',
    pathToCover: 'http://localhost:3001/covers/ItEndsWithUs.jpg',
    description: `Lily hasn’t always had it easy, but that’s 
    never stopped her from working hard for the life she
    wants. She’s come a long way from the small town where
    she grew up—she graduated from college, moved to Boston,
    and started her own business. And when she feels a spark
    with a gorgeous neurosurgeon named Ryle Kincaid, everything
    in Lily’s life seems too good to be true.`,
    releasedAt: new Date(2016, 1, 1),
    paperbackPrice: 599,
    paperbackQuantity: 5,
    hardcoverPrice: 799,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: true,
    genres: ['Romance', 'Fiction'],
  },
  {
    name: 'Harry Potter and the Order of the Phoenix',
    author: 'J. K. Rowling',
    pathToCover: 'http://localhost:3001/covers/HarryPotterAndTheOrderOfThePhoenix.jpg',
    description: `There is a door at the end of a silent 
    corridor. And it's haunting Harry Potter's dreams. Why
    else would he be waking in the middle of the night,
    screaming in terror? It's not just the upcoming O.W.L.
    exams; a new teacher with a personality like poisoned
    honey; a venomous, disgruntled house-elf; or even the
    growing threat of He-Who-Must-Not-Be-Named. Now Harry
    Potter is faced with the unreliability of the very
    government of the magical world and the impotence of
    the authorities at Hogwarts. Despite this (or perhaps
    because of it), he finds depth and strength in his
    friends, beyond what even he knew; boundless loyalty;
    and unbearable sacrifice.`,
    releasedAt: new Date(2022, 10, 11),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 3676,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: true,
    genres: ['Light fiction', 'Mystery', 'Children`s books'],
  },
  {
    name: 'The Complete Cookbook for Young Chefs',
    author: `America’s Test Kitchen`,
    pathToCover: 'http://localhost:3001/covers/TheCompleteCookbookForYoungChefs.jpg',
    description: `For the first time ever, America's Test 
    Kitchen is bringing their scientific know-how, rigorous 
    testing, and hands-on learning to KIDS in the kitchen! 
    Using kid-tested and approved recipes, America's Test
    Kitchen has created THE cookbook every kid chef needs
    on their shelf. Whether you're cooking for yourself,
    your friends, or your family, The Complete Cookbook for
    Young Chefs has delicious recipes that will wow!`,
    releasedAt: new Date(2018, 10, 16),
    paperbackPrice: 371,
    paperbackQuantity: 5,
    hardcoverPrice: 571,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Non—fiction', 'Encyclopedia', 'Children`s books'],
  },
  {
    name: `Radio's Greatest of All Time`,
    author: 'Rush Limbaugh',
    pathToCover: 'http://localhost:3001/covers/RadiosGreatestOfAllTime.jpg',
    description: `For more than thirty years, millions of 
    listeners tuned in to hear Rush Limbaugh’s voice. At its
    peak, The Rush Limbaugh Show aired on more than 650
    radio stations nationwide, and his inimitable commentary
    and distinctive sense of humor garnered a devoted audience
    that celebrated with him when he received the Presidential
    Medal of Freedom in 2020.`,
    releasedAt: new Date(2022, 10, 25),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 2674,
    hardcoverQuantity: 5,
    isNew: true,
    isBestseller: false,
    genres: ['Autobiography', 'Non—fiction'],
  },
  {
    name: 'Atomic Habits',
    author: 'James Clear',
    pathToCover: 'http://localhost:3001/covers/AtomicHabits.jpg',
    description: `No matter your goals, Atomic Habits offers 
    a proven framework for improving--every day. James Clear,
    one of the world's leading experts on habit formation,
    reveals practical strategies that will teach you exactly
    how to form good habits, break bad ones, and master the
    tiny behaviors that lead to remarkable results.`,
    releasedAt: new Date(2018, 10, 16),
    paperbackPrice: 820,
    paperbackQuantity: 5,
    hardcoverPrice: 920,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Business & Finance', 'Non—fiction'],
  },
  {
    name: 'Verity',
    author: 'Colleen Hoover',
    pathToCover: 'http://localhost:3001/covers/Verity.jpg',
    description: `Lowen Ashleigh is a struggling writer on 
    the brink of financial ruin when she accepts the job
    offer of a lifetime. Jeremy Crawford, husband of
    bestselling author Verity Crawford, has hired Lowen
    to complete the remaining books in a successful series
    his injured wife is unable to finish.`,
    releasedAt: new Date(2021, 10, 26),
    paperbackPrice: 668,
    paperbackQuantity: 5,
    hardcoverPrice: 0,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Romance'],
  },
  {
    name: 'The Disney Princess Cookbook',
    author: 'Disney Books',
    pathToCover: 'http://localhost:3001/covers/TheDisneyPrincessCookbook.jpg',
    description: `Make learning how to cook fun and 
    downright magical with inspiration from the Disney
    Princesses! Featuring simple step-by-step instructions
    and mouth-watering photos of each dish, this cookbook
    makes it easy to whip up enchanting treats, while
    njoying captivating illustrations of the princesses
    and their friends.`,
    releasedAt: new Date(2021, 9, 28),
    paperbackPrice: 749,
    paperbackQuantity: 5,
    hardcoverPrice: 949,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Non—fiction', 'Encyclopedia', 'Children`s books'],
  },
  {
    name: 'My First Learn-to-Write Workbook',
    author: 'Crystal Radke',
    pathToCover: 'http://localhost:3001/covers/MyFirstLearn-to-WriteWorkbook.jpg',
    description: `Set kids up to succeed in school with a learn 
    to write for kids guide that teaches them letters, shapes,
    and numbers―and makes it fun. My First Learn-to-Write
    Workbook introduces early writers to proper pen control,
    line tracing, and more with dozens of handwriting exercises
    that engage their minds and boost their reading and writing
    comprehension.`,
    releasedAt: new Date(2019, 8, 27),
    paperbackPrice: 125,
    paperbackQuantity: 5,
    hardcoverPrice: 0,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: false,
    genres: ['Non—fiction', 'Encyclopedia', 'Children`s books'],
  },
  {
    name: 'Luckiest Girl Alive',
    author: 'Jessica Knoll',
    pathToCover: 'http://localhost:3001/covers/LuckiestGirlAlive.jpg',
    description: `As a teenager at the prestigious Bradley 
    School, Ani FaNelli endured a shocking, public humiliation
    that left her desperate to reinvent herself. Now, with a
    glamorous job, expensive wardrobe, and handsome blue blood
    fiancé, she’s this close to living the perfect life she’s
    worked so hard to achieve.`,
    releasedAt: new Date(2016, 4, 5),
    paperbackPrice: 749,
    paperbackQuantity: 5,
    hardcoverPrice: 1149,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Light fiction', 'Romance'],
  },
  {
    name: 'Go-To Dinners',
    author: 'Ina Garten',
    pathToCover: 'http://localhost:3001/covers/Go-ToDinners.jpg',
    description: `Even Ina Garten, America's 
    most-trusted and beloved home cook, sometimes finds
    cooking stressful. To make life easy she relies on
    a repertoire of recipes that she knows will turn out
    perfectly every time. Cooking night after night during
    the pandemic inspired her to re-think the way she
    approached dinner, and the result is this collection
    of comforting and delicious recipes that you’ll love
    preparing and serving. You’ll find lots of freeze-ahead,
    make-ahead, prep-ahead, and simply assembled recipes so
    you, too, can make dinner a breeze.`,
    releasedAt: new Date(2022, 10, 25),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 2499,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: true,
    genres: ['Non—fiction', 'Encyclopedia'],
  },
  {
    name: 'Confidence Man',
    author: 'Maggie Haberman',
    pathToCover: 'http://localhost:3001/covers/ConfidenceMan.jpg',
    description: `From the Pulitzer-Prize-winning 
    New York Times reporter who has defined Donald J.
    Trump's presidency like no other journalist,
    Confidence Man is a magnificent and disturbing
    reckoning that chronicles his life and its meaning
    from his rise in New York City to his tortured
    post-presidency.`,
    releasedAt: new Date(2022, 10, 4),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 2104,
    hardcoverQuantity: 5,
    isNew: true,
    isBestseller: false,
    genres: ['Non—fiction', 'Autobiography'],
  },
  {
    name: 'Best Hidden Pictures Puzzles EVER',
    author: 'Highlights Press',
    pathToCover: 'http://localhost:3001/covers/BestHiddenPicturesPuzzlesEVER.jpg',
    description: `With more than 20 different types of 
    Hidden Pictures puzzles, as well as fun and silly
    facts about these unique creations, there's something
    for everyone in this "best of" collection. Created
    for puzzle-loving kids ages 6 to 106, this book is
    bursting with classic puzzles, photo puzzles, inverted
    puzzles, two-player puzzles, and more, all woven
    together with Highlights’ signature wholesome humor.
    It provides hours of puzzling fun for seek-and-find
    fans.`,
    releasedAt: new Date(2021, 8, 3),
    paperbackPrice: 499,
    paperbackQuantity: 5,
    hardcoverPrice: 0,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: true,
    genres: ['Non—fiction', 'Satire'],
  },
  {
    name: `The Bob's Burgers Burger Book`,
    author: 'Cole Bowden',
    pathToCover: 'http://localhost:3001/covers/TheBobsBurgersBurgerBook.jpg',
    description: `The Bob’s Burgers Burger Book gives 
    hungry fans their best chance to eat one of Bob
    Belcher’s beloved specialty Burgers of the Day
    in seventy-five original, practical recipes. With
    its warm, edgy humor, outstanding vocal cast, and
    signature musical numbers, Bob’s Burgers has become
    one of the most acclaimed and popular animated
    series on television, winning the 2014 Emmy Award
    for Outstanding Animated Program and inspiring a
    hit ongoing comic book and original sound track
    album.`,
    releasedAt: new Date(2021, 2, 2),
    paperbackPrice: 527,
    paperbackQuantity: 5,
    hardcoverPrice: 727,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: true,
    genres: ['Non—fiction', 'Encyclopedia'],
  },
  {
    name: `Hold the Line`,
    author: 'John Shiffman',
    pathToCover: 'http://localhost:3001/covers/HoldTheLine.jpg',
    description: `When Michael Fanone self-deployed to the 
    Capitol on January 6, 2021, he had no idea his life was
    about to change. When he got to the front of the line,
    he urged his fellow officers to hold it against the
    growing crowd of insurrectionists—until he found himself
    pulled into the mob, tased until he had a heart attack,
    and viciously beaten with a Blue Lives Matter flag as
    shouts to kill him rang out.`,
    releasedAt: new Date(2021, 2, 2),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 1859,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: true,
    genres: ['Non—fiction', 'Politics'],
  },
  {
    name: `The Seven Husbands of Evelyn Hugo`,
    author: 'Taylor Jenkins Reid',
    pathToCover: 'http://localhost:3001/covers/TheSevenHusbandsOfEvelynHugo.jpg',
    description: `Aging and reclusive Hollywood movie icon 
    Evelyn Hugo is finally ready to tell the truth about
    her glamorous and scandalous life. But when she chooses
    unknown magazine reporter Monique Grant for the job, no
    one is more astounded than Monique herself. Why her? Why
    now?`,
    releasedAt: new Date(2021, 2, 2),
    paperbackPrice: 430,
    paperbackQuantity: 5,
    hardcoverPrice: 0,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: true,
    genres: ['Non—fiction', 'Autobiography'],
  },
  {
    name: `Kalyna the Soothsayer`,
    author: 'Elijah Kinch Spector',
    pathToCover: 'http://localhost:3001/covers/KalynaTheSoothsayer.jpg',
    description: `Kalyna’s family has the Gift: the ability 
    to see the future. For generations, they traveled the
    four kingdoms of the Tetrarchia selling their services
    as soothsayers. Every child of their family is born with
    this Gift—everyone except Kalyna.`,
    releasedAt: new Date(2022, 10, 4),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 1918,
    hardcoverQuantity: 5,
    isNew: true,
    isBestseller: false,
    genres: ['Fiction', 'Fantasy'],
  },
  {
    name: `The Big Dark Sky`,
    author: 'Dean Koontz',
    pathToCover: 'http://localhost:3001/covers/TheBigDarkSky.jpg',
    description: `As a girl, Joanna Chase thrived on Rustling 
    Willows Ranch in Montana until tragedy upended her life.
    Now thirty-four and living in Santa Fe with only misty
    memories of the past, she begins to receive pleas—by
    phone, through her TV, in her dreams: I am in a dark
    place, Jojo. Please come and help me. Heeding the
    disturbing appeals, Joanna is compelled to return to
    Montana, and to a strange childhood companion she had l
    ong forgotten.`,
    releasedAt: new Date(2022, 7, 19),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 1489,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Science-fiction'],
  },
  {
    name: `Money`,
    author: 'Jacob Goldstein',
    pathToCover: 'http://localhost:3001/covers/Money.jpg',
    description: `Money only works because we all agree 
    to believe in it. In Money, Jacob Goldstein shows how
    money is a useful fiction that has shaped societies
    for thousands of years, from the rise of coins in
    ancient Greece to the first stock market in Amsterdam
    to the emergence of shadow banking in the 21st century`,
    releasedAt: new Date(2022, 10, 4),
    paperbackPrice: 1315,
    paperbackQuantity: 5,
    hardcoverPrice: 0,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: true,
    genres: ['Non—fiction', 'Business & Finance'],
  },
  {
    name: `The Earth Is Weeping`,
    author: 'Peter Cozzens',
    pathToCover: 'http://localhost:3001/covers/TheEarthIsWeeping.jpg',
    description: `Bringing together Custer, Sherman, 
    Grant, and other fascinating military and political
    figures, as well as great native leaders such as
    Crazy Horse, Sitting Bull, and Geronimo, this “sweeping
    work of narrative history” (San Francisco Chronicle) is
    the fullest account to date of how the West was won—and
    lost.`,
    releasedAt: new Date(2016, 10, 25),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 529,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Non—fiction', 'History'],
  },
  {
    name: `Fairy Tale`,
    author: 'Stephen King',
    pathToCover: 'http://localhost:3001/covers/FairyTale.jpg',
    description: `Legendary storyteller Stephen King goes 
    into the deepest well of his imagination in this
    spellbinding novel about a seventeen-year-old boy who
    inherits the keys to a parallel world where good and
    evil are at war, and the stakes could not be higher—for
    that world or ours.`,
    releasedAt: new Date(2021, 6, 9),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 1625,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Thriller'],
  },
  {
    name: `Mrs. March`,
    author: 'Virginia Feito',
    pathToCover: 'http://localhost:3001/covers/MrsMarch.jpg',
    description: `George March’s latest novel is a smash. 
    No one could be prouder than his dutiful wife, Mrs.
    March, who revels in his accolades. A careful creature
    of routine and decorum, she lives a precariously
    controlled existence on the Upper East Side until one
    morning, when the shopkeeper of her favorite patisserie
    suggests that her husband’s latest protagonist—a
    detestable character named Johanna—is based on Mrs.
    March herself. Clutching her ostrich leather pocketbook
    and mint-colored gloves, she flees the shop. What
    could have merited this humiliation?`,
    releasedAt: new Date(2021, 8, 10),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 195,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Satire'],
  },
  {
    name: `Hidden Pictures`,
    author: 'Jason Rekulak',
    pathToCover: 'http://localhost:3001/covers/HiddenPictures.jpg',
    description: `Mallory Quinn is fresh out of rehab 
    when she takes a job as a babysitter for Ted and
    Caroline Maxwell. She is to look after their
    five-year-old son, Teddy.`,
    releasedAt: new Date(2022, 5, 10),
    paperbackPrice: 0,
    paperbackQuantity: 0,
    hardcoverPrice: 1399,
    hardcoverQuantity: 5,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Horror'],
  },
  {
    name: `Parent Like a Pediatrician`,
    author: 'Rebekah Diamond',
    pathToCover: 'http://localhost:3001/covers/ParentLikeAPediatrician.jpg',
    description: `As an experienced pediatrician, Rebekah 
    Diamond is deeply grounded in a fact-based understanding
    of child healthcare. As a mother, she also understands
    that the accepted rules aren’t always the solution to
    the challenges of nurturing a healthy new baby. But
    neither is the overload of relatable but often
    dangerously misleading information bombarding parents.
    So how do you trust yourself to make the best decisions
    for your child?`,
    releasedAt: new Date(2022, 9, 27),
    paperbackPrice: 1307,
    paperbackQuantity: 5,
    hardcoverPrice: 0,
    hardcoverQuantity: 0,
    isNew: false,
    isBestseller: false,
    genres: ['Fiction', 'Health'],
  },
];

(async () => {
  await connect();
  const genres = await genreRepo.find();

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    const newBook = booksRepo.create({
      ...book,
      genres: book.genres.map((genre) => {
        return genres.find((g) => g.name === genre) || {};
      }),
      users: [],
      assessment: []
    });

    await booksRepo.save(newBook);
  }
})();