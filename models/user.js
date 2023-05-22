import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// vazi za serverless princip
// The models object is provided by the mongoose library and stores all the registered models
// This prevents redefining the model and ensures that the existing model is reused
// If a model named User does not exist in the models Object, the model function from mongoose is called to create new model
// The newly created model is then assigned to the User variable

const User = models.User || model("User", UserSchema);

// u slucaju klasicnog servera ( ne serverlessa) ovako bi islo definisanje modela, nebi se proveravalo da li u listi modela postoji model User jer se samo jednom to radi
// const User = model("User", UserSchema);

export default User;
