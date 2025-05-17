import { hashPassword, comparePassword } from "../auth/pwdManager.js";
import { createJWT } from "../auth/token.js";
import prisma from "../db.js";

export const createNewUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token });
};

export const signIn = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePassword(req.body.username, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: "Invalid password!" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
