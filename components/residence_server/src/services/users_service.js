import { getUser, getAuthorizationsFor } from "../dao/user_authorization.js";

const UsersService = () => ({
  authenticate: async (userId) => {
    const user = await getUser(userId);
    
    return user;
  },
  getAuthorizations: async (user) => {
    const authorizations = await getAuthorizationsFor(user);

    return authorizations;
  }
});

export default UsersService;
