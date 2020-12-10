const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        return res.json(user[0]);
      }
      res.status(400).json("Not found");
    })
    .catch((err) => res.status(400).json("Error getting user"));
};

module.exports = {
    handleProfile: handleProfile
}