import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from "../../db";

const getCart: Handler = async (req, res, next) => {
  try {
    const id = req.body.id;

    const userCart = await cartRepo.find({
      relations: {
        book: true,
      },
      where: {
        user: {
          id: id,
        },
      },
    })

    return res.status(StatusCodes.OK).json(
      userCart
    );

  } catch (err) {
    next(err)
  };
};

export default getCart;