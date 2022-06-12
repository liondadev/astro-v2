/*
    Middleware for authentication management with JWT Tokens
*/

const jwt = require("jwt");
const BetterError = require("../utils/errorclass");
const UserModel = require("../models/UserModel");
const { JWTSecret } = require("../config/jsonwebtoken");
const { userHasPermission } = require("../utils/roles");

const jwtVerify = (jwtToken) => {
  // return good, decoded, err (optional)
  try {
    const decoded = jwt.verify(jwtToken, JWTSecret);
    return [true, decoded, null];
  } catch (e) {
    return [false, null, e];
  }
};

const getLoggedInUser = async (req, res, next) => {
  let userToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    userToken = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    userToken = req.cookies.jwt;
  }

  if (!userToken) {
    return next(new BetterError("User not logged in!", 403));
  }

  const [isVerified, decoded, verifyErr] = jwtVerify(userToken);
  if (!isVerified || verifyErr) {
    return next(new BetterError("Failed to verify JWT Token!", 403));
  }

  const foundUser = UserModel.findOne({ uuid: decoded.uuid });
  if (!foundUser) {
    return next(
      new BetterError(
        "User with uuid provided in JWT token was not found! Could be a signing error?"
      )
    );
  }

  // Set the req.user
  req.user = foundUser;
  next();
};

const protectedRoute = (permission) => (req, res, next) => {
  return userHasPermission(permission);
};

module.exports = {
  getLoggedInUser,
  protectedRoute,
};
