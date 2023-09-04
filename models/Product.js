const { Schema, model, models, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
    title: {type: String, required: true},
    category: {type: mongoose.Types.ObjectId, ref:'Category' , required: true},
    properties: {type: Object},
    description: String,
    price: {type: Number, required: true},
    heroImg: {type: String, required: true},
    images: [
        {type: String}
    ],
})

export const Product = models.Product || model("Product", ProductSchema);