import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from "../../db";

const changeQuantity: Handler = async (req, res, next) => {
  try {
    const userId = req.body.userId;

    const cart = await cartRepo.findOneBy({
      id: req.body.id,
    })

    if (cart) {
      cart.count = req.body.count;
      await cartRepo.save(cart);
    }

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

export default changeQuantity;