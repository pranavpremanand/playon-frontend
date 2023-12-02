import React, { useState } from "react";
import { Table } from "react-bootstrap";

const Users = () => {
  return (
    <div className="users-container">
      <div className="table-container">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              {/* <th>Delete</th> */}
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

export default Users;

const TableItem = () => {
  // const [editName, setEditName] = useState(false);
  return (
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Email</td>
      {/* <td className="edit" onClick={() => setEditName(!editName)}>
        {!editName ? "Edit" : "Cancel"}
      </td> */}
      {/* <td className="dlt">Delete</td> */}
    </tr>
  );
};
