import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getProductDetails, updateProduct } from "../../../utils/adminAPIs";
import CustomLoader from "../../../components/CustomLoader/CustomLoader";
import { baseUrl } from "../../../utils/constant";
import { useForm } from "react-hook-form";
import "./ProductInDetail.scss";
import toast from "react-hot-toast";

const ProductInDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [imgError, setImgError] = useState("");

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

  const { isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await getProductDetails(productId);
      const { data } = res;
      setProduct(data.product);
      setValue("name", data.product.name);
      setValue("description", data.product.description);
      setValue("category", data.product.category._id);
      setValue("quantityAndPrice", data.product.quantityAndPrice);
      const imagesList = data.product.images.map((img) => `${baseUrl}/${img}`);
      setSelectedImages(imagesList);
      setCategories(data.categories);
      return res;
    },
  });

  // handle images select
  const handleImagesSelect = (e) => {
    setFiles([]);
    setSelectedImages([]);
    const images = Array.from(e.target.files);
    if (images.length > 0 && images.length < 4) {
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
      if (images.length === 0) {
        toast.error("Select at least 1 image");
      }
      if (images.length > 3) {
        toast.error("Select maximum 3 images");
      }
    }
  };

  // handle form submit
  const handleFormSubmit = async (values) => {
    console.log(selectedImages);
    if (selectedImages.length > 0 && selectedImages.length < 4) {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }
      formData.append("productId", productId);
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append(
        "quantityAndPrice",
        JSON.stringify(values.quantityAndPrice)
      );
      try {
        const res = await updateProduct(formData);
        if (res.data.success) {
          setFiles([]);
          toast.success(res.data.message);
          //   reset();
        } else {
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
    <div className="product-in-detail">
      {isLoading && !error ? (
        <div className="h-40vh">
          <CustomLoader />
        </div>
      ) : (
        <div className="product-in-detail-container">
          <h1>Edit Product</h1>
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
                  <small className="error">{errors.description.message}</small>
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
              {selectedImages.length > 0 && (
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
              <button className="btn-secondary" type="button">
                Delete
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductInDetail;
