import { useState } from "react";
import "./Shipping.scss";
import EmptyImg from "../../../../assets/images/empty-cart.png";
import { Address } from "../Address/Address";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "../../../../apiCall";
import { toast } from "react-hot-toast";

export const Shipping = ({
  addresses,
  isLoading,
  selectAddress,
  selectedAddress,
}) => {
  const queryClient = useQueryClient();
  const [openAdd, setOpenAdd] = useState(false);
  const [editStatus, setEditStatus] = useState(false);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [pincodeErr, setPincodeErr] = useState("");
  const [cityErr, setCityErr] = useState("");
  const [stateErr, setStateErr] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  const addAddressMutation = useMutation(addAddress, {
    onSuccess: (data) => {
      if (data.data?.status[0]?.Error === "False") {
        toast.success("Added address");
        console.log("add address response", data.data);
        queryClient.invalidateQueries(["addresses"]);
        setOpenAdd(false);
        reset();
        setCity("");
        setState("");
        setPincode("");
      }
    },
    onError: (err) => {
      console.log(err, "error");
      if (err.message) {
        toast.error(err.message);
      } else {
        toast.error("Something went wrong");
      }
    },
  });

  // add address
  const handleFormSubmit = (values) => {
    if (!pincode || !city || !state) {
      console.log("hello");
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
      values = { ...values, city: city, state: state, pin_code: pincode };
      addAddressMutation.mutate(values);
    }
  };

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

  const cancelAddAddress = () => {
    reset();
    setPincodeErr("");
    setStateErr("");
    setCityErr("");
    setPincode("");
    setState("");
    setCity("");
    setOpenAdd(false);
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
    <div data-aos="fade-up" className="shipping">
      {!openAdd && !editStatus ? (
        <div className="add-button">
          <button className="btn-primary" onClick={() => setOpenAdd(!openAdd)}>
            add address
          </button>
        </div>
      ) : null}
      {openAdd ? (
        <div className="main-div">
          <div className="form-side">
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <h4>Add Address</h4>
              <div className="inputs">
                <div className="input-box">
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
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
                  <input type="tel" onChange={checkPincode} />
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
                <button
                  type="submit"
                  className="btn-primary"
                  onClick={checkRequiredFields}
                >
                  save
                </button>
                <button className="btn-secondary" onClick={cancelAddAddress}>
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      {addresses.length !== 0 &&
        addresses.map((address) => (
          <Address
            address={address}
            key={address.id}
            addAddressStatus={openAdd}
            setEditStatus={setEditStatus}
            setAddAddressStatus={setOpenAdd}
            selectAddress={selectAddress}
            selectedAddress={selectedAddress}
          />
        ))}
      {!addresses.length && !openAdd && !isLoading ? (
        <div className="empty-addresses">
          <img src={EmptyImg} alt="empty-addresses" className="empty-img" />
        </div>
      ) : null}
    </div>
  );
};
