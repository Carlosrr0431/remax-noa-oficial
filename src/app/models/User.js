import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    permisoChat: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.User ||
  mongoose.model("User", UserSchema);