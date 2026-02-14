import {
  Request, Response, NextFunction,
} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import NotFoundError from '../errors/not-found-error';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';
import config from '../config';

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById((req as any).user._id)
  .then((user: any) => {
    res.send({
      user: {
        email: user.email,
        name: user.name,
      },
      success: true,
    });
  })
  .catch((error) => {
    next(error);
  });

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user: any) => {
      const accessToken = jwt.sign(
        { _id: user._id },
        config.ACCESS_KEY,
        { expiresIn: '10m' },
      );
      const refreshToken = jwt.sign(
        { _id: user._id },
        config.REFRESH_KEY,
        { expiresIn: '7d' },
      );

      res.cookie('REFRESH_TOKEN', refreshToken, {
        sameSite: 'lax',
        secure: true,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
      return res.send({
        user: {
          email: user.email,
          name: user.name,
        },
        success: true,
        accessToken,
      });
    })
    .catch((error) => {
      next(error);
    });
};

export const register = (
  req: Request,
  res: Response,
  next: NextFunction,
) => bcrypt.hash(req.body.password, 10)
  .then((hash) => User.create({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  }))
  .then((user) => {
    const accessToken = jwt.sign(
      { _id: user._id },
      config.ACCESS_KEY,
      { expiresIn: '10m' },
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      config.REFRESH_KEY,
      { expiresIn: '7d' },
    );

    res.cookie('REFRESH_TOKEN', refreshToken, {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return res.send({
      user: {
        email: user.email,
        name: user.name,
      },
      success: true,
      accessToken,
    });
  })
  .catch((error) => {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Пользователь с таким email уже существует'));
    }
    return next(error);
  });

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { REFRESH_TOKEN } = req.cookies;

    if (!REFRESH_TOKEN) {
      return next(new BadRequestError('Refresh токен отсутствует'));
    }
    let payload;
    try {
      payload = jwt.verify(REFRESH_TOKEN, config.REFRESH_KEY) as any;
    } catch (error) {
      return next(new BadRequestError('Невалидный токен'));
    }

    const user = await User.findById(payload._id);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }

    res.clearCookie('REFRESH_TOKEN', {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
    });

    return res.send({ success: true });
  } catch (error) {
    next(error);
    return undefined;
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { REFRESH_TOKEN } = req.cookies;
    if (!REFRESH_TOKEN) {
      return next(new BadRequestError('Refresh токен отсутствует'));
    }
    let payload;
    try {
      payload = jwt.verify(REFRESH_TOKEN, config.REFRESH_KEY) as any;
    } catch (error) {
      return next(new BadRequestError('Невалидный токен'));
    }
    const user = await User.findById(payload._id);
    if (!user) {
      return next(new NotFoundError('Пользователь не найден'));
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      config.ACCESS_KEY,
      { expiresIn: '10m' },
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      config.REFRESH_KEY,
      { expiresIn: '7d' },
    );

    res.cookie('REFRESH_TOKEN', refreshToken, {
      sameSite: 'lax',
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });
    return res.send({
      user: {
        email: user.email,
        name: user.name,
      },
      success: true,
      accessToken,
    });
  } catch (error) {
    next(error);
    return undefined;
  }
};
