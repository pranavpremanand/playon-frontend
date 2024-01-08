import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Users.scss";
import { changeUserStatus, getUsers } from "../../../utils/adminAPIs";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../../StateProvider";
import { ConfirmToast } from "react-confirm-toast";

const Users = () => {
  const [{ users }, dispatch] = useStateValue();

  // get all users data
  const { data: response } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  useEffect(() => {
    dispatch({ type: "SET_USERS", data: response?.data.data });
  }, [response, dispatch]);

  return (
    <div className="users-container">
      <div className="table-container">
        <h4>Users</h4>
        <table>
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Created At</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, i) => (
                <TableItem user={user} key={user._id} no={i + 1} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

const TableItem = ({ user, no }) => {
  const [, dispatch] = useStateValue();

  // block or unblock user
  const changeIsBlockedStatus = async () => {
    try {
      const data = {
        userId: user._id,
        currentStatus: user.isBlocked,
      };
      const response = await changeUserStatus(data);
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch({
          type: "CHANGE_USER_STATUS",
          userId: user._id,
          updatedStatus: !user.isBlocked,
        });
      } else {
        toast(response.data.message, { icon: "⚠️" });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <tr>
      <td data-label="No.">{no}</td>
      <td data-label="Name">{user.name}</td>
      <td data-label="Email">{user.email}</td>
      <td data-label="Account created on">
        {new Date(user.createdAt).toLocaleString()}
      </td>
      <td data-label="Status">
        <ConfirmToast
          asModal={true}
          customCancel={"Cancel"}
          customConfirm={"Confirm"}
          customFunction={changeIsBlockedStatus}
          message={`Are you sure to ${
            user.isBlocked ? "unblock" : "block"
          } this user?`}
          position={"top-left"}
          showCloseIcon={false}
          theme={"snow"}
        >
          {user.isBlocked ? (
            <button className="btn-green">Unblock</button>
          ) : (
            <button className="btn-cancel">Block</button>
          )}
        </ConfirmToast>
      </td>
    </tr>
  );
};
