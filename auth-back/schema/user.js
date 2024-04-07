const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require("../Auth/generateTokens");
const getUserInfo = require("../lib/getUserInfo");
const Token = require("../schema/token")


const UserSchema = new mongoose.Schema({
  id: { type: Object },
  nombre: { type: String, required: true },
  rut: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  contraseña: { type: String, required: true },

})

UserSchema.pre('save', function (next) {
  if (this.isModified('contraseña') || this.isNew) {
    const document = this;

    bcrypt.hash(document.contraseña, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.contraseña = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.rutExist = async function (rut) {
  const result = await mongoose.model("User").findOne({ rut: rut });

  return !!result;
};

UserSchema.methods.comparePassword = async function (contraseña, hash) {
  const same = await bcrypt.compare(contraseña, hash);
  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this))
  try {
    await new Token({ token: refreshToken }).save();
    console.log("token saved", refreshToken)
    return refreshToken;
  } catch (error) {
    console.log(error);
  }
};


module.exports = mongoose.model("User", UserSchema);

