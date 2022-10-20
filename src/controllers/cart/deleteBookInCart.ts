import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import {cartRepo} from "../../db";
import customError from '../../customError/customError';
import nameError from '../../utils/utils';

const deleteBookInCart: Handler = async (req, res, next) => {  
  try {    
    const id = req.body.id;
    const userId = req.body.userId;

    
    const bookInCart = await cartRepo.find({
      where: {
        user: {
          id: userId,
        },
        id: id,
      },
    });

    if (!bookInCart) {
      throw customError(StatusCodes.NOT_FOUND, nameError.bookNotFound, req.body.id);
    }

    await cartRepo.remove(bookInCart);

    const userCart = await cartRepo.find({
      relations: {
        book: true,
      },
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

export default deleteBookInCart;