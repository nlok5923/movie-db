const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "can't be blank"],
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  token: {
    type: String,
  },
  favourites: [String]
});

UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({
    email: email,
  });
  if (!user) throw new Error("No One Found");

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new Error("No One Found");

  return user;
};

module.exports = mongoose.model("User", UserSchema);
