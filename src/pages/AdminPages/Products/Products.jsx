import React, { useState } from 'react'
import './Products.scss'
import { Table } from 'react-bootstrap';

const Products = () => {
  const [showAddBtn, setShowAddBtn] = useState(false);
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
  )
}

export default Products

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