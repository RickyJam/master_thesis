import UsersService from "../services/users_service.js";

const usersService = UsersService();

const USERS_PATH = "/residence/users";
const LOGIN_PATH = USERS_PATH + "/login";
const AUTHORIZATIONS_PATH = USERS_PATH + "/authorizations";

//test routes
const UsersApi = (server) => ({
  register: () => {
    server.get(USERS_PATH, async (req, res) => {
        const authorizations = await usersService.getAllUsers();
  
        res.send({ data: authorizations });
      });

    server.get(LOGIN_PATH, async (req, res) => {
      const authorizations = await usersService.getAuthorizations(req.user);

      res.send({ data: authorizations });
    });

    server.get(AUTHORIZATIONS_PATH, async (req, res) => {
      const authorizations = await usersService.getAllAuthorizations();

      res.send({ data: authorizations });
    });
  },
});


export const getUsersPaths = [USERS_PATH, LOGIN_PATH, AUTHORIZATIONS_PATH];
export default UsersApi;
