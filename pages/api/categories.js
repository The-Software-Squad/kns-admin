import { Category } from "@/models/Category";
import { mongooseConnect } from "@/lib/mongooseConnect"; 
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    res.json( await Category.find().populate("parent") );
    }

  if (method === "POST") {
    let { name, parent, Properties } = req.body;
    if(parent === "") parent = null;
    Category.create({ name, parent, Properties });
    res.status(200).json({ message: "Category created" });
  }

  if (method === "PUT") {
    let {name, parent,Properties, id} = req.body;
    if(parent === "") parent = null;
    const doc = await Category.updateOne({_id: id}, {name, parent, Properties} );
    res.json(doc);
  }

  if(method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({_id});
    res.status(200).json({ message: "Category deleted" });
  }
}
