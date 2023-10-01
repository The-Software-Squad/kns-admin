import Layout from "@/components/Layout";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [edit, setEdit] = useState(null);
  const [parent, setParent] = useState("");
  const [Properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();

    setLoading(false);
  }, []);

  const fetchCategories = async () => {
    await axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    const data = {
      name,
      image,
      parent,
      Properties: Properties.map((property) => ({
        name: property.name,
        value: property.value.split(","),
      })),
    };

    if (edit) {
      data.id = edit._id;
      await axios.put("/api/categories", data);
      setEdit(null);
    } else {
      await axios.post("/api/categories", data);
    }
    setName("");
    setParent("");
    setImage("");
    setProperties([]);
    fetchCategories();
  };

  const editCategory = (category) => {
    setEdit(category);
    setName(category.name);
    setImage(category.image);
    setProperties(
      category.Properties.map((property) => ({
        name: property.name,
        value: property.value.join(","),
      }))
    );
    if (category.parent?._id) setParent(category.parent?._id);
    else setParent("");
  };

  const deleteCategory = async (category) => {
    console.log(category);
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${category.name}?`,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Yes, delete",
      confirmButtonColor: "#d55",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete("/api/categories?_id=" + _id);
        fetchCategories();
      }
    });
  };

  const addProperty = () => {
    setProperties((prev) => [...prev, { name: "", value: "" }]);
  };

  const removeProperty = (index) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      newProperties.splice(index, 1);
      return newProperties;
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      newProperties[index].name = newName;
      return newProperties;
    });
  };

  const handlePropertyValueChange = (index, property, newValue) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      newProperties[index].value = newValue;
      return newProperties;
    });
  };

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col w-full gap-5">
          <h1> Categories </h1>
          <label>
            {edit ? `Edit category ${edit.name}` : "Create new category"}
          </label>
          <form onSubmit={saveCategory}>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={""}
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                className="mb-0"
              />
              <select
                className="mb-0"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
              >
                <option value="">No parent category</option>
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="py-4">
              <label>Image</label>
              <input
                type="text"
                placeholder={""}
                value={image}
                onChange={(ev) => setImage(ev.target.value)}
                className="mt-3"
              />
            </div>
            {image && (<img src={image} alt="image"/>)}
            <div className="mb-2">
              <label className="block">Properties</label>
              <button
                type="button"
                onClick={addProperty}
                className="btn-default w-fit text-sm mb-2"
              >
                Add new property
              </button>
              {Properties.length > 0 &&
                Properties.map((property, i) => (
                  <div className="flex items-center mb-2  gap-2" key={i}>
                    <input
                      type="text"
                      placeholder="Property name"
                      className="mb-0"
                      value={property.name}
                      onChange={(e) => {
                        handlePropertyNameChange(i, property, e.target.value);
                      }}
                    />

                    <input
                      type="text"
                      className="mb-0"
                      placeholder="Property value"
                      value={property.value}
                      onChange={(e) => {
                        handlePropertyValueChange(i, property, e.target.value);
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => {
                        removeProperty(i);
                      }}
                      className="text-white text-sm px-4 py-2 bg-red-500 rounded"
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEdit(null), setName(""),setImage("") ,setParent(""), setProperties([]);
                }}
                type="button"
                className="btn-default w-fit mr-1"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary w-fit">
                Save
              </button>
            </div>
          </form>
        </div>

        {!edit && (
          <table className="basic mt-4">
            <thead>
              <tr>
                <td>Category name</td>
                <td>Parent category</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    <div className="flex justify-center items-center h-32">
                      <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td className="flex gap-6 ">
                      {/* Edit button */}
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => editCategory(category)}
                      >
                        <span className="text-blue-500  hidden md:block hover:underline mr-2">
                          Edit
                        </span>
                        <span className="material-symbols-rounded text-blue-500">
                          edit_square
                        </span>
                      </div>
                      {/* Delete Button */}
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => deleteCategory(category)}
                      >
                        <span className="text-red-500  hidden md:block hover:underline mr-2">
                          Delete
                        </span>
                        <span className="material-symbols-rounded  text-red-500">
                          delete
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </Layout>
  );
}
