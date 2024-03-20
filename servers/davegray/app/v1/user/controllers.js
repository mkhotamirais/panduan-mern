const { ok } = require("../../utils");

const data = {
  users: require("./user.json"),
  setUsers(data) {
    this.users = data;
  },
};

const getUsers = async (req, res) => {
  const result = data.users.map((user) => ({ username: user.username, roles: user.roles, refreshToken: user.refreshToken }));
  ok(res, "get users", result);
};

module.exports = { getUsers };
