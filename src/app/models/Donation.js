import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    tipo: {
      type: String,
      required: true,
    },

    titulo: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    monto: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Donation ||
  mongoose.model("Donation", DonationSchema);
