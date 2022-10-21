import { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

import { cartRepo } from "../../db";

const changeQuantity: Handler = async (req, res, next) => {
  try {
    const {userId, id, count} = req.body;

    const cart = await cartRepo.findOneBy({
      id: id,
    })

    if (cart) {
      cart.count = count;
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