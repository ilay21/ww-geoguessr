const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const userSchema = new Schema({
  email: String,
  ggUsername: String,
  ggPassword: String,
});

class UserClass extends Model {
  static getUserByEmail(email) {
    return this.findOne({ email }).lean();
  }

  static addUser(email) {
    return this.create({ email });
  }
}
userSchema.loadClass(UserClass);

module.exports = mongoose.model("User", userSchema, "users");
