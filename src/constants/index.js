const REQUEST_LIMIT = 5;
const EVICT_CACHE_AFTER = 1000 * 60;
const ROLES = {
  user: "user",
  moderator: "moderator",
  admin: "admin",
};

module.exports = { REQUEST_LIMIT, EVICT_CACHE_AFTER, ROLES };
