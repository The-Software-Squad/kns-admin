import { mongooseConnect } from "@/lib/mongooseConnect";
import { Product } from "@/models/Product";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  // To list all products
  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({_id:req.query.id}));
    } else {
      res.json(await Product.find());
    }
  }

  // To create a product
  if (method === "POST") {
    const { title, category, description,properties, price, heroImg, images } = req.body;
    await Product.create({
      title,
      category,
      properties,
      description,
      price,
      heroImg,
      images,
    });
    res.json({ message: "Product created" });
  }

  // To update a product
  if (method === "PUT") {
    const { _id, title, category, properties, description, price, heroImg, images } = req.body;
    await Product.updateOne({_id}, {title, category, properties, description, price, heroImg, images});
    res.json(true);
  }

  // To delete a product
  if(method === "DELETE"){
    if (req.query?.id) {
    await Product.deleteOne({_id:req.query.id});
    res.json(true);
    }
  }
}
