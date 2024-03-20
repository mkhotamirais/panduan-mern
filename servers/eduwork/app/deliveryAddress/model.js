const mongoose = require("mongoose");

const deliveryAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Nama alamat harus diisi"], maxLength: [255, "Maksimal 255 karakter"] },
    kelurahan: { type: String, required: [true, "Kelurahan harus diisi"], maxLength: [255, "Maksimal 255 karakter"] },
    kecamatan: { type: String, required: [true, "Kecamatan harus diisi"], maxLength: [255, "Maksimal 255 karakter"] },
    kabupaten: { type: String, required: [true, "Kabupaten harus diisi"], maxLength: [255, "Maksimal 255 karakter"] },
    provinsi: { type: String, required: [true, "Provinsi harus diisi"], maxLength: [255, "Maksimal 255 karakter"] },
    detail: { type: String, required: [true, "Detail alamat harus diisi"], maxLength: [255, "Maksimal 255 karakter"] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("deliveryAddress", deliveryAddressSchema);
