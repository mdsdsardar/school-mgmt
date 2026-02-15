// const verifyToken = require("../utils/verifyToken");
// const isAuth = (model) => {
//   return async (req, res, next) => {
//     //get token frm header.
//     const headerObj = req.headers;
//     const token = headerObj?.authorization?.split(" ")[1];
//     const verifiedToken = verifyToken(token);
//     console.log(verifiedToken);
//     if (verifiedToken) {
//       //find the admin.
//       const user = await model
//         .findById(verifiedToken.id)
//         .select("name email role");
//       //save the user into req object.
//       req.userAuth = user;
//       next();
//     } else {
//       const err = new Error("Token Invalid/Expired");
//       next(err);
//     }
//   };
// };

const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");

//check if user is authenticated or not.
exports.isAuth = (model) => {
  return async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) {
        return next(
          new ErrorHandler("Login first to access this resource.", 401),
        );
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await model.findById(decoded.id).select("name email role");
      if (!user) {
        // Determine the model name for a clear error message
        const modelName = model.modelName || model.collection.name;
        return next(
          new ErrorHandler(
            `Access denied. This resource requires ${modelName} authentication.`,
            403,
          ),
        );
      }
      req.user = user;
      next();
    } catch {
      return next(new ErrorHandler("Token Invalid/Expired", 404));
    }
  };
};

exports.roleRestriction = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource.`,
          403,
        ),
      );
    }
    next();
  };
};
