import mongoose from "mongoose";

const EventoEspecialSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },

    fecha: {
      type: Date,
      required: true,
    },

    imagenUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.EventoEspecial ||
  mongoose.model("EventoEspecial", EventoEspecialSchema);