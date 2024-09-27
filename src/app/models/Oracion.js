import mongoose from "mongoose";

const OracionSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    telefono: {
      type: Number,
      required: true,
    },

    motivo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Oracion ||
  mongoose.model("Oracion", OracionSchema);
