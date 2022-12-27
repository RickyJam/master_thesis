import UsersService from "../services/users_service.js";
import { ResidenceOwner } from "../utils/roles.js";

const USERID_KEY = "userId";
const usersService = UsersService();

const AuthMiddleware = (server) => ({
  register: () => {
    const auth = async (req, res, next) => {
      const userId = req.query[USERID_KEY];

      const user = await usersService.authenticate(userId);
      if (invalidUser(user)) {
        res.status(404).send("User not found!");
        return;
      }

      req.user = user;
      next();
    };

    server.use("/residence", auth);
  },
});

export const homeRestriction = async (req, res, next) => {
  const user = req.user;

  if (user.role === ResidenceOwner) {
    res.status(401).send("Unauthorized");
    return;
  }
  
  next();
};

function invalidUser(user) {
  return user === null || user === undefined;
}

export default AuthMiddleware;
