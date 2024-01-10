import React, { useEffect, useState } from "react";
import "./Categories.scss";
import Table from "react-bootstrap/Table";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { createCategory, getCategories } from "../../../utils/adminAPIs";
import { useQuery } from "@tanstack/react-query";
import { useStateValue } from "../../../StateProvider";

const Categories = () => {
  const [showAddBtn, setShowAddBtn] = useState(false);
  const [{ categories }, dispatch] = useStateValue();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues: { name: "" } });

  // get all categories
  const { data: response } = useQuery(["categories"], getCategories);

  useEffect(() => {
    dispatch({ type: "SET_CATEGORIES", data: response?.data.data });
  }, [response, dispatch]);

  console.log(response, "hello");

  // create category
  const addCategory = async (values) => {
    try {
      const response = await createCategory(values);
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch({
          type: "SET_CATEGORIES",
          data: [response.data.data, ...categories],
        });
      } else {
        toast(response.data.message, { icon: "⚠️" });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <div className="categories-container">
      <div className="add-category-section">
        {!showAddBtn && (
          <button onClick={() => setShowAddBtn(true)} className="btn-primary">
            Add Category
          </button>
        )}
        {showAddBtn && (
          <div className="form-container">
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit(addCategory)}>
              <div className="input-box">
                <label htmlFor="">Category Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter category name"
                  {...register("name", {
                    required: "Category name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Category name is not valid",
                    },
                    validate: (value) => {
                      if (value.trim() !== "") {
                        return true;
                      }
                      return "Category name is required";
                    },
                  })}
                />
                <small className="error">{errors.categoryName?.message}</small>
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
              <th>No.</th>
              <th>Category Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category, i) => (
                <TableItem no={i + 1} data={category} key={category._id} />
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Categories;

const TableItem = ({ no, data }) => {
  const [editName, setEditName] = useState(false);
  return (
    <tr>
      <td>{no}</td>
      <td>{!editName ? data.name : <input defaultValue={data.name} />}</td>
      <td className="edit" onClick={() => setEditName(!editName)}>
        {!editName ? "Edit" : "Cancel"}
      </td>
      <td className="dlt">Delete</td>
    </tr>
  );
};
