import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm({
  _id,
  title: existingTitle,
  category: assignedCategory,
  properties: assignedProperties,
  description: existingDescription,
  price: existingPrice,
  heroImg: existingHeroImg,
  images: existingImages,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [category, setCategory] = useState(assignedCategory || "");
  const [categories, setCategories] = useState([]);
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [heroImg, setHeroImg] = useState(existingHeroImg || "");
  const [images, setImages] = useState(existingImages || []);
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [gotoProducts, setGotoProducts] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await axios.get("/api/categories");
      setCategories(data);
    };
    getCategories();
  }, []);

  async function saveProduct(ev) {
    ev.preventDefault();
    const data = { title, category, properties: productProperties, description, price, heroImg, images };

    if (_id) {
      // update the product
      await axios.put("/api/products", { _id, ...data });
    } else {
      // create the product
      await axios.post("/api/products", data);
    }
    setGotoProducts(true);
  }
  if (gotoProducts) {
    router.push("/products");
  }

  const addImage = (ev) => {
    ev.preventDefault();
    setImages([...images, ""]);
  };

  const handleImageChange = (ev, i) => {
    const newImages = [...images];
    newImages[i] = ev.target.value;
    setImages(newImages);
  };

  const deleteImg = (ev, i) => {
    ev.preventDefault();
    const newImages = [...images];
    newImages.splice(i, 1);
    setImages(newImages);
  };

  const handleProductProperties = (e, propertyName) => {
    const newProductProperties = {...productProperties};
    newProductProperties[propertyName] = e.target.value;
    setProductProperties(newProductProperties);
  }

  const propertiesToFill = [];
  if(categories.length > 0 && category){
    let CatInfo = categories.find(({_id}) => _id === category );
    propertiesToFill.push(...CatInfo.Properties);
    while(CatInfo?.parent?._id){
      const parentCatInfo = categories.find(({_id}) => _id === CatInfo?.parent?._id);
      propertiesToFill.push(...parentCatInfo.Properties);
      CatInfo = parentCatInfo;
    }
  }

  return (
    <form onSubmit={saveProduct} className="flex flex-col w-full">
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        required
      />
      <label>Category name</label>
      <select
        value={category}
        onChange={(ev) => setCategory(ev.target.value)}

      >
        <option value="no">No category</option>
        {categories.length > 0 && categories.map((category) => (
          <option value={category._id} key={category._id}>{category.name}</option>
        ))}
      </select>

      {propertiesToFill.length > 0 && propertiesToFill.map((property, i) => (
        <div className="flex items-center gap-5" key={i}>
          <div>{property.name}</div>
          <select
            value={productProperties[property.name]}
            onChange={(e) => handleProductProperties(e, property.name)}
          >
            {property.value.map((value, i) => (
              <option value={value} key={i}>{value}</option>
            ))}
          </select>
        </div>
      ))}
      <label>Hero Image</label>
      <input
        type="text"
        placeholder="Image Url"
        value={heroImg}
        onChange={(ev) => setHeroImg(ev.target.value)}
        required
      />
      {heroImg && <img src={heroImg} alt={title} className="aspect-[4/4] object-cover w-20 rounded-md  mb-4 "/>}
      <label>Other Images</label>
      {images.map((img, i) => (
        <div className="flex items-center gap-6 pr-8" key={i}>
          <input
            type="text"
            placeholder="Image Url"
            value={img}
            onChange={(ev) => handleImageChange(ev, i)}
            onKeyDown={(ev) => {ev.key === "Enter" && ev.preventDefault()}}
          />
          <button
            className="text-white px-4 py-2 bg-red-500 rounded"
            onClick={(ev) => deleteImg(ev, i)}
          >
            delete
          </button>
        </div>
      ))}

      {images && 
      <div className="flex gap-3">
       {images.map((img, i) => (
        (img !== "") &&
        <img src={img} alt={title} key={i} className="aspect-[4/4] object-cover w-20 rounded-md  mb-4 "/>
      ))}
      </div>}
      <button type="button" className="btn-primary w-fit" onClick={addImage}>
        Add
      </button>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
        required
      ></textarea>
      <label>Price</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
        required
      />
      <button type="submit" className="btn-primary w-fit">
        Save
      </button>
    </form>
  );
}
