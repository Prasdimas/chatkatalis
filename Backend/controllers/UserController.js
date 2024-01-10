import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from 'sequelize';

export const Register = async (req, res) => {
  const { name, email, password, confPassword, whatsapp } = req.body;

  try {
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ msg: 'Email sudah terdaftar. Silakan klik login dibawah ini.' });
    }

    if (password !== confPassword) {
      return res.status(400).json({ msg: 'Password dan Confirm Password tidak cocok' });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await Users.create({
      name,
      email,
      whatsapp,
      password: hashPassword,
      click: 5,
      role: 'pengguna',
    });

    res.json({ msg: 'Register Berhasil' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ msg: "Password anda salah" });
    }

    const { id, name, email: userEmail } = user;
    const accessToken = jwt.sign({ userId: id, name, email: userEmail }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '20s',
    });

    const refreshToken = jwt.sign({ userId: id, name, email: userEmail }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '1d',
    });

    await Users.update(
      { refresh_token: refreshToken },
      {
        where: {
          id,
        },
      }
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  try {
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) return res.sendStatus(204);

    await Users.update(
      { refresh_token: null },
      {
        where: {
          id: user.id,
        },
      }
    );

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const click = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await Users.findOne({ where: { name } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const updatedUser = await Users.update(
      { click: Sequelize.literal(`CASE WHEN click > 0 THEN click - 1 ELSE 0 END`) },
      {
        where: {
          id: user.id,
        },
        returning: true,
        plain: true,
      }
    );

    const newValue = updatedUser[1].click;
    res.json({ success: true, message: 'Click berhasil diperbarui!', click: newValue });
  } catch (error) {
    console.error('Terjadi kesalahan saat memperbarui click:', error);
    res.status(500).json({ success: false, message: 'Terjadi kesalahan saat memperbarui click.' });
  }
};

export const editUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, click } = req.body;

  try {
    const existingUser = await Users.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
    }

    await existingUser.update({
      name: name || existingUser.name,
      email: email || existingUser.email,
      click: click || existingUser.click,
    });

    res.json({ msg: "Pengguna berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const existingUser = await Users.findByPk(userId);
      if (!existingUser) {
        return res.status(404).json({ msg: "Pengguna tidak ditemukan" });
      }
  
      await existingUser.destroy();
  
      res.json({ msg: "Pengguna berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
  export const getUsers = async (req, res) => {
    try {
      const users = await Users.findAll({
        attributes: ['id', 'name', 'email','click'],
      });
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
