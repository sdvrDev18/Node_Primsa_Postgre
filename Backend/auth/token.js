import jwt from "jsonwebtoken";

export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;

  console.log("BEARER", req.headers.authorization);

  // If there is no bearer token send
  if (!bearer) {
    res.status(401);
    res.json({ message: "No token present!" });
    return;
  }

  const [, token] = bearer.split(" ");

  // If bearer is send in header but there is no token
  if (!token) {
    res.status(401);
    res.json({ message: "No token present!" });
    return;
  }

  try {
    console.log("Im in TRY");
    console.log("JWT_SECRET", process.env.JWT_SECRET);
    console.log("TOKEN", token);
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log("USER AFTER verfiy", user);
    req.user = user;
    next();
  } catch (e) {
    console.log("entered catch loop");
    console.log("JWT error", e);
    res.status(401);
    res.json({ message: "Invalid token!" });
    return;
  }
};
