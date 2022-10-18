import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import Cart from '../../db/entity/Cart';

import { booksRepo, usersRepo, cartRepo } from "../../db";

const addBookToCart: Handler = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    
    const newCart = new Cart();

    const book = await booksRepo.findOne({
      relations: {
        cart: true
      },
      where: {
        id: bookId
      }
    });

    const user = await usersRepo.findOne({
      relations: {
        cart: true
      },
      where: {
        id: userId
      }
    });    
    
    newCart.count = 1;
    if (user) newCart.user = user;
    if (book) newCart.book = book;    
    
    await cartRepo.save(newCart);
    
    const userCart = await cartRepo.find({
      where: {
        user: {
          id: userId,
        },
      },
    })    

    return res.status(StatusCodes.OK).json({
      userCart
    });

  } catch (err) {
    next(err)
  };
};

export default addBookToCart;