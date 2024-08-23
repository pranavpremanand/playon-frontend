import React, { useState } from "react";
import "./Products.scss";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createProduct, getProductsData } from "../../../utils/adminAPIs";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../../utils/constant";
import { Link } from "react-router-dom";

const Products = () => {
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [imgError, setImgError] = useState("");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
      description: "",
      category: "",
      quantityAndPrice: {
        xs: {
          quantity: 0,
          price: 0,
        },
        sm: {
          quantity: 0,
          price: 0,
        },
        md: {
          quantity: 0,
          price: 0,
        },
        lg: {
          quantity: 0,
          price: 0,
        },
        xl: {
          quantity: 0,
          price: 0,
        },
      },
    },
  });

  // get all categories
  useQuery(["products"], async () => {
    const res = await getProductsData();
    if (res.data.success) {
      setCategories(res.data.categories);
      setProducts(res.data.products);
      setValue("category", res.data.categories[0]._id);
      return res.data;
    }
  });

  // handle images select
  const handleImagesSelect = (e) => {
    setFiles([]);
    setSelectedImages([]);
    const images = Array.from(e.target.files);
    if (images.length === 3) {
      setFiles(e.target.files);
      images.forEach((file) => {
        if (
          file.type === "image/x-png" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
        ) {
          setImgError("");
          setSelectedImages((prev) => [...prev, URL.createObjectURL(file)]);
        } else {
          setSelectedImages([]);
          return toast("Select image files");
        }
      });
    } else {
      toast.error("Select 3 images");
    }
  };

  // handle form submit
  const handleFormSubmit = async (values) => {
    if (selectedImages.length === 3) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append(
        "quantityAndPrice",
        JSON.stringify(values.quantityAndPrice)
      );
      try {
        const res = await createProduct(formData);
        if (res.data.success) {
          setSelectedImages([]);
          setFiles([]);
          toast.success(res.data.message);
          reset();
        }else{
          toast.error(res.data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  // check if images exist
  const checkImagesExist = () => {
    if (selectedImages.length === 0) {
      setImgError("Please select 3 images");
    }
  };

  return (
    <div className="products-container">
      <div className="add-product-section">
        {!showAddBtn && (
          <button onClick={() => setShowAddBtn(true)} className="btn-primary">
            Add Product
          </button>
        )}
        {showAddBtn && (
          <div className="form-container">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="input-box">
                <label>Product Name</label>
                <div className="">
                  <input
                    type="text"
                    placeholder="Enter product name"
                    {...register("name", {
                      required: "Name is required",
                      validate: (value) => {
                        if (value.trim() === "") {
                          return "Name is required";
                        }
                      },
                    })}
                  />
                  {errors.name?.message && (
                    <small className="error">{errors.name.message}</small>
                  )}
                </div>
              </div>
              <div className="input-box">
                <label>Description</label>
                <div className="">
                  <textarea
                    rows="5"
                    placeholder="Enter product description"
                    {...register("description", {
                      required: "Description is required",
                      validate: (value) => {
                        if (value.trim() === "") {
                          return "Description is required";
                        }
                      },
                    })}
                  />
                  {errors.description?.message && (
                    <small className="error">
                      {errors.description.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="input-box">
                <label>Category</label>
                <select name="category" {...register("category")}>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="input-box">
                <label>Available Sizes</label>
                <div className="checkboxes">
                  <div className="labels">
                    <label>Sizes</label>
                    <label>Quantity</label>
                    <label>Prices</label>
                  </div>
                  <div className="item">
                    <label>XS</label>
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.xs.quantity")}
                    />
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.xs.price")}
                    />
                  </div>
                  <div className="item">
                    <label>S</label>
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.sm.quantity")}
                    />
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.sm.price")}
                    />
                  </div>
                  <div className="item">
                    <label>M</label>
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.md.quantity")}
                    />
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.md.price")}
                    />
                  </div>
                  <div className="item">
                    <label>L</label>
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.lg.quantity")}
                    />
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.lg.price")}
                    />
                  </div>
                  <div className="item">
                    <label>XL</label>
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.xl.quantity")}
                    />
                    <input
                      type="number"
                      id=""
                      min="0"
                      {...register("quantityAndPrice.xl.price")}
                    />
                  </div>
                </div>
              </div>
              <div className="images">
                <div className="item">
                  <label>Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImagesSelect}
                    name="images"
                    id="files"
                    accept="image/x-png,image/jpeg,image/jpg"
                  />
                  {imgError && <small className="error">{imgError}</small>}
                </div>
                {selectedImages.length === 3 && (
                  <div className="selected-imgs">
                    {selectedImages.map((img) => (
                      <img src={img} alt="" key={img} />
                    ))}
                  </div>
                )}
              </div>
              <div className="buttons">
                <button
                  className="btn-primary"
                  type="submit"
                  onClick={checkImagesExist}
                >
                  Submit
                </button>
                <button
                  className="btn-secondary"
                  type="button"
                  onClick={() => setShowAddBtn(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="products-container">
        {products.length > 0 &&
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;

const ProductItem = ({ product }) => {
  const [editName, setEditName] = useState(false);
  console.log(product);
  return (
    <Link to={`/admin/product/${product._id}`} className="product-item underline-none">
      <div>
        <img src={`${baseUrl}/${product.images[0]}`} alt="" />
        <div className="product-item-details">
          <h4>{product.name}</h4>
          <span>Category: {product.category.name}</span>
          <p>{product.description}</p>
          {/* <p>₹{product.price}</p> */}
        </div>
      </div>
    </Link>
  );
};
