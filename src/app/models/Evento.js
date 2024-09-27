import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema(
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

export default mongoose?.models?.Evento ||
  mongoose.model("Evento", EventoSchema);



