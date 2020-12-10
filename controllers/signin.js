const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;  
  if (!email || !password) {
    return res.status(400).json("incorrect sign in form submission");
  }
  db.select("email", "hash")
    .from("login")
    .where("email", req.body.email)
    .then((data) => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db
          .select()
          .table("users")
          .where("email", req.body.email)
          .then((user) => {
            res.json(user[0]);
          });
      }
      res.status(400).json("wrong credentials");
    })
    .catch((err) => res.status(400).json("wrong credential"));
};

module.exports = {
  handleSignin: handleSignin,
};
