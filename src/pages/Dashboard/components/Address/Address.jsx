import { useState } from "react";
import "./Address.scss";
import { useForm } from "react-hook-form";
import { deleteAddress, updateAddress } from "../../../../apiCall";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../../../StateProvider";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export const Address = ({
  address,
  setAddAddressStatus,
  setEditStatus,
  selectedAddress,
  selectAddress,
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const [, dispatch] = useStateValue();
  const [city, setCity] = useState(address.city);
  const [state, setState] = useState(address.state);
  const [pincode, setPincode] = useState(address.pin_code);
  const [pincodeErr, setPincodeErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [stateErr, setStateErr] = useState("");
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  const handleEditOpen = () => {
    setEditOpen(true);
    setEditStatus(true);
    setAddAddressStatus(false);
  };

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: address.name,
      phone_number: address.phone_number,
      email: address.email,
      address: address.address,
    },
  });

  // update address
  const doUpdate = async (values) => {
    if (!pincode || !city || !state) {
      if (!pincode) {
        setPincodeErr("Pincode is required");
      }
      if (!state) {
        setStateErr("State is required");
      }
      if (!city) {
        setCityErr("City is required");
      }
    } else {
      values = {
        ...values,
        state: state,
        city: city,
        pin_code: pincode.toString(),
        phone_number: values.phone_number.toString(),
        address_id: address.id,
      };
      try {
        const response = await updateAddress(values);
        console.log(response, "response");
        if (response.data?.status[0].Error === "False") {
          toast.success("Address updated successfully");
          queryClient.invalidateQueries(["addresses"]);
          setEditOpen(false);
          setEditStatus(false);
        } else {
          toast.error(response.data?.status[0].ResponseMessage);
        }
      } catch (err) {
        console.log(err);
        if (err.message) {
          toast.error(err.message);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  // cancel update address
  const cancelAddAddress = () => {
    reset();
    setCity(address.city);
    setState(address.state);
    setPincode(address.pin_code);
    setPincodeErr("");
    setStateErr("");
    setCityErr("");
    setEditStatus(false);
    setEditOpen(false);
  };

  // delete address
  const doDelete = async () => {
    try {
      const response = await deleteAddress(address.id);
      if (response.data?.status[0]?.Error === "False") {
        toast.success(response.data?.status[0]?.ResponseMessage);
        dispatch({ type: "DELETE_USER_ADDRESS", id: address.id });
      } else {
        toast.error(response.data?.status[0].ResponseMessage);
      }
    } catch (err) {
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // pincode handler
  const checkPincode = async (e) => {
    if (e.target.value.length === 0) {
      return setPincodeErr("Pincode is required");
    } else {
      setPincodeErr("");
    }
    if (!/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/.test(e.target.value)) {
      setCity("");
      setState("");
      return setPincodeErr("Pincode is invalid");
    } else {
      setPincodeErr("");
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${e.target.value}`
        );
        if (response.data[0].Status === "Success") {
          setPincode(e.target.value);
          setCity(response.data[0].PostOffice[0].Name);
          setState(response.data[0].PostOffice[0].State);
          setPincodeErr("");
          setCityErr("");
          setStateErr("");
        } else {
          setCity("");
          setState("");
          setPincodeErr("Pincode is invalid");
        }
      } catch (err) {}
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    if (!e.target.value.length) {
      return setCityErr("City is required");
    }
    setCityErr("");
  };

  const handleStateChange = (e) => {
    setState(e.target.value);
    if (!e.target.value.length) {
      return setStateErr("State is required");
    }
    setStateErr("");
  };

  const checkRequiredFields = () => {
    if (!pincode) {
      setPincodeErr("Pincode is required");
    }
    if (!state) {
      setStateErr("State is required");
    }
    if (!city) {
      setCityErr("City is required");
    }
  };
  return (
    <div className="address-div">
      <div className="address-side">
        <>
          {editOpen ? (
            <form onSubmit={handleSubmit(doUpdate)}>
              <h4>Edit Address</h4>
              <div className="inputs">
                <div className="input-box">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    defaultValue={getValues("name")}
                    {...register("name", {
                      required: "Name is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_\s-]+$/,
                        message: "Special characters are not allowed",
                      },
                    })}
                  />
                  <small className="error">{errors.name?.message}</small>
                </div>
                <div className="input-box">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    type="tel"
                    defaultValue={getValues("phone_number")}
                    {...register("phone_number", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[6-9]\d{9}$/i,
                        message: "Enter a valid phone number",
                      },
                    })}
                  />
                  <small className="error">
                    {errors.phone_number?.message}
                  </small>
                </div>
                <div className="input-box">
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    defaultValue={getValues("email")}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  <small className="error">{errors.email?.message}</small>
                </div>
                <div className="input-box">
                  <label htmlFor="">Pincode</label>
                  <input
                    type="tel"
                    defaultValue={pincode}
                    onChange={checkPincode}
                  />
                  <small className="error">{pincodeErr}</small>
                </div>
                <div className="input-box">
                  <label htmlFor="">City</label>
                  <input type="text" value={city} onChange={handleCityChange} />
                  <small className="error">{cityErr}</small>
                </div>
                <div className="input-box">
                  <label htmlFor="">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={handleStateChange}
                  />
                  <small className="error">{stateErr}</small>
                </div>

                <div className="input-box">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    defaultValue={getValues("address")}
                    {...register("address", {
                      required: "Address is required",
                      minLength: {
                        value: 10,
                        message: "Minimum 10 characters required",
                      },
                    })}
                  />
                  <small className="error">{errors.address?.message}</small>
                </div>
              </div>
              <div className="buttons">
                <button type="submit" className="btn-primary" onClick={checkRequiredFields}>
                  save
                </button>
                <button className="btn-secondary" onClick={cancelAddAddress}>
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <div
              className={`delivery-info ${
                selectedAddress === address.id && "selected"
              }`}
            >
              <div
                className="details"
                onClick={() =>
                  pathname !== "/dashboard/shipping" &&
                  selectAddress(address.id)
                }
              >
                <h1>{address.name}</h1>
                <p className="uppercase">
                  {address.city}, {address.pin_code} {address.state}
                </p>
                <p>{address.email}</p>
                <p>{address.phone_number}</p>
              </div>
              <div className="address-options">
                <span onClick={handleEditOpen}>Edit</span>
                <span onClick={doDelete}>Delete</span>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};
