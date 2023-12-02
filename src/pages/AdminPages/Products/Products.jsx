import React, { useState } from "react";
import "./Products.scss";
import { Table } from "react-bootstrap";
import toast from "react-hot-toast";

const Products = () => {
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [files, setFiles] = useState([]);

  const handleImagesSelect = (e) => {
    setFiles(e.target.files);
    const files = Array.from(e.target.files);
    if (files.length === 3) {
      files.forEach((file) => {
        if (
          file.type === "image/x-png" ||
          file.type === "image/gif" ||
          file.type === "image/jpeg" ||
          file.type === "image/jpg"
        ) {
          setSelectedImages((prev) => [...prev, URL.createObjectURL(file)]);
        } else {
          setSelectedImages([]);
          return toast("Select an image file");
        }
      });
    } else {
      toast.error("Select 3 images");
    }
  };

  const handleFormSubmit = async () => {
    const formData = new FormData();
    Object.values(files).forEach((file) => {
      formData.append("images", file);
    });
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
            <form>
              <div className="input-box">
                <label htmlFor="">Product Name</label>
                <input type="text" name="" placeholder="Enter product name" />
              </div>
              <div className="input-box">
                <label htmlFor="">Category</label>
                <select name="category" id="">
                  <option value="International Jerseys">
                    International Jerseys
                  </option>
                  <option value="Club Jerseys">Club Jerseys</option>
                </select>
              </div>
              <div className="input-box">
                <label htmlFor="">Available Sizes</label>
                <div className="checkboxes">
                  <div className="item">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">XS</label>
                    <input type="number" name="" id="" min="0" />
                  </div>
                  <div className="item">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">S</label>
                    <input type="number" name="" id="" min="0" />
                  </div>
                  <div className="item">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">M</label>
                    <input type="number" name="" id="" min="0" />
                  </div>
                  <div className="item">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">L</label>
                    <input type="number" name="" id="" min="0" />
                  </div>
                  <div className="item">
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">XL</label>
                    <input type="number" name="" id="" min="0" />
                  </div>
                </div>
              </div>
              <div className="images">
                <div className="item">
                  <label htmlFor="">Images</label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImagesSelect}
                    name="images"
                    id="files"
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                </div>
                {selectedImages.length === 3 && (
                  <div className="selected-imgs">
                    {selectedImages.map((img) => (
                      <img src={img} alt="" />
                    ))}
                  </div>
                )}
              </div>
              <div className="buttons">
                <button className="btn-primary" type="submit">
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

      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <TableItem />
            <TableItem />
            <TableItem />
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Products;

const TableItem = () => {
  const [editName, setEditName] = useState(false);
  return (
    <tr>
      <td>1</td>
      <td>{!editName ? "Mark" : <input defaultValue="Mark" />}</td>
      <td className="edit" onClick={() => setEditName(!editName)}>
        {!editName ? "Edit" : "Cancel"}
      </td>
      <td className="dlt">Delete</td>
    </tr>
  );
};
