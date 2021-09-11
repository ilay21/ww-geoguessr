const mongoose = require("mongoose");
const { Schema, Model } = mongoose;

const userSchema = new Schema({
  email: String,
  ggCredentials: {
    email: String,
    password: String,
  },
  username: String,
});

class UserClass extends Model {
  static getUserByEmail(email) {
    return this.findOne({ email }).lean();
  }

  static getUsersByEmails(emails) {
    return this.where("email").in(emails).lean();
  }

  static addUser(email) {
    return this.create({ email });
  }
}
userSchema.loadClass(UserClass);

module.exports = mongoose.model("User", userSchema, "users");
