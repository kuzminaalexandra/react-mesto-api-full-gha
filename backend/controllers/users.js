const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../middlewares/errorHandler');

const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getUserId = (req, res, next) => {
  const userId = req.params.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new CustomError('Такого пользователя нет', StatusCodes.NOT_FOUND);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt.hash(password, 15)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const { password: hashedPassword, ...userData } = user.toObject();
      res.send({ data: userData });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new CustomError('пользователь уже зарегистрирован', StatusCodes.CONFLICT));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new CustomError('Такого пользователя нет', StatusCodes.NOT_FOUND));
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new CustomError('Пользователь не найден', StatusCodes.NOT_FOUND));
      }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new CustomError('Неверный email или пароль', StatusCodes.UNAUTHORIZED);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError('Неверный email или пароль', StatusCodes.UNAUTHORIZED);
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'prod' ? JWT_SECRET : 'secret111',
      { expiresIn: '7d' },
    );

    res.cookie('jwt', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    // sameSite: true
    res.status(200).send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports.getCurrentUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new CustomError('Такого пользователя нет', StatusCodes.NOT_FOUND);
    }
    res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
};
