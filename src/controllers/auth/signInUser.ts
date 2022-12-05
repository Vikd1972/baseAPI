/* eslint-disable no-console */
import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as jwt from 'jsonwebtoken';
import { createHmac } from 'crypto';

import db from '../../db';
import type User from '../../db/entity/User';
import type Cart from '../../db/entity/Cart';
import type Book from '../../db/entity/Book';
import config from '../../config';
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

type ParamsType = Record<string, never>;

type BodyType = Record<string, never>;

type RequestType = {
  email: string;
  password: string;
};

type ResponseType = {
  user: User;
  favorites: Book[];
  userCart: Cart[];
  token: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, RequestType, BodyType>;

const secretWord = config.token.secretWord;

const signInUser: ControllerType = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await db.users
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.favorites', 'book')
      .leftJoinAndSelect('user.cart', 'cart')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();

    if (!user) {
      throw customError(StatusCodes.NOT_FOUND, nameError.userNotFound, email);
    }

    const hash = createHmac('sha256', password).update(config.token.salt || '').digest('hex');

    if (user.password !== hash) {
      throw customError(StatusCodes.UNAUTHORIZED, nameError.passwordIsWrong, user.fullname);
    }

    delete user.password;
    user.photoFilePath = `${config.pathToImage}${user.photoFilePath}`;

    let favoritesBook: Book[] = [];

    if (user?.favorites) {
      favoritesBook = user.favorites;
    }

    const favorites = favoritesBook.map((book) => {
      return {
        ...book,
        pathToCover: `${config.pathToCover}${book.pathToCover}`,
      };
    });

    const userCart = await db.cart.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id: user.id,
        },
      },
    });

    userCart.forEach((purchase) => {
      return Object.entries(purchase).map((item) => {
        if (item[0] === 'book') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, no-param-reassign
          item[1].pathToCover = `${config.pathToCover}${purchase.book.pathToCover}`;
        }
        return item;
      });
    });

    return res.status(StatusCodes.OK).json({
      user,
      favorites,
      userCart,
      token: jwt.sign({ id: user.id }, secretWord || ''),
    });
  } catch (err) {
    next(err);
  }
};

export default signInUser;
