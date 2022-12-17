import UsersService from "../services/users_service.js";

const USERID_KEY = "userId";
const usersService = UsersService();

const AuthMiddleware = (server) => ({
  register: () => {
    const auth = async (req, res, next) => {
      const userId = req.query[USERID_KEY];

      const user = await usersService.authenticate(userId);
      if (invalidUser(user)) {
        res.status(401).send("User not found!");
        return;
      }

      req.user = user;
      next();
    };

    server.use('/residence', auth);
  },
});

function invalidUser(user) {
  return user === null || user === undefined;
}

export default AuthMiddleware;
