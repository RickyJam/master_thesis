import {
  getUser,
  getAuthorizationsFor,
  getAllAuthorizations,
  getAllUsers,
} from "../dao/user_authorization.js";

const UsersService = () => ({
  authenticate: async (userId) => {
    const user = await getUser(userId);

    return user;
  },
  getAuthorizations: async (user) => {
    const authorizations = await getAuthorizationsFor(user);

    return authorizations;
  },
  
  // used for test
  getAllAuthorizations: async () => {
    const authorizations = await getAllAuthorizations();

    return authorizations;
  },

  // used for test
  getAllUsers: async () => {
    const users = await getAllUsers();

    return users;
  }
});

export default UsersService;
