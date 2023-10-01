import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import "./Dashboard.scss";
import { AiOutlineMessage } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate, useParams } from "react-router";
import { Chat } from "./components/Chat/Chat";
import { Link } from "react-router-dom";
import { PiCaretRight } from "react-icons/pi";
import { FaRegCalendarCheck, FaUserEdit } from "react-icons/fa";
import { LiaHeart } from "react-icons/lia";
import { MdOutlineLocalShipping } from "react-icons/md";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import EmptyWishlistImg from "../../assets/images/empty-favorites.png";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { Shipping } from "./components/Shipping/Shipping";
import { useForm } from "react-hook-form";
import {
  cancelOrder,
  changeNotificationStatus,
  getAddresses,
  getNotificationDetails,
  getOrders,
  returnOrder,
  updateProfileImg,
  updateUser,
} from "../../apiCall";
import { toast } from "react-hot-toast";
import { domainName } from "../../Constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStateValue } from "../../StateProvider";
import { Modal } from "react-bootstrap";

const options = [
  { url: "dashboard", icon: LuLayoutDashboard, title: "Dashboard" },
  { url: "my-orders", icon: FaRegCalendarCheck, title: "My Orders" },
  { url: "favorites", icon: LiaHeart, title: "Favorites" },
  { url: "message", icon: AiOutlineMessage, title: "Message" },
  { url: "settings", icon: LuSettings, title: "Settings" },
  { url: "edit-profile", icon: FaUserEdit, title: "Edit Profile" },
  { url: "shipping", icon: MdOutlineLocalShipping, title: "Shipping" },
  { url: "support-ticket", title: "Support Ticket" },
];

export const Dashboard = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [page, setPage] = useState("support-ticket");
  const user = JSON.parse(sessionStorage.getItem("user_details"));
  const imgRef = useRef();
  const [profilePic, setProfilePic] = useState();
  const queryClient = useQueryClient();
  const [{ userAddresses, favorites }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancellingOrderId, setCancellingOrderId] = useState("");
  const [cancellingReason, setCancellingReason] = useState("");
  const [showReturnConfirm, setShowReturnConfirm] = useState(false);
  const [returningOrderId, setReturningOrderId] = useState("");
  const [returningReason, setReturningReason] = useState("");
  const [emailNotificationStatus, setEmailNotificationStatus] = useState(false);
  const [chatNotificationStatus, setChatNotificationStatus] = useState(false);
  const [enableEdit, setEnableEdit] = useState(false);

  useEffect(() => {
    setPage(params.page);
  }, [params.page]);

  const pageTitle = options.find((option) => option.url === page);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user.email || "",
      phoneNumber: user?.phone_number || "",
    },
  });

  // cancel edit profile
  const cancelEditProfile = () => {
    setValue("name", user?.name || "");
    setValue("email", user?.email || "");
    setValue("phoneNumber", user?.phone_number || "");
    setEnableEdit(false);
  };

  // update user details
  const handleFormUpdate = async (values) => {
    try {
      const response = await updateUser(values);
      if (response.data?.status[0].Message === "success") {
        queryClient.invalidateQueries("user-data");
        toast.success(response.data?.status[0].ResponseMessage);
        setEnableEdit(false);
      } else {
        toast(response.data?.status[0].ResponseMessage, { icon: "⚠️" });
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err, "error");
    }
  };

  // Selecting profile image
  const onImageSelect = async (e) => {
    const fData = new FormData();
    fData.append("profile_img", e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (
        file.type === "image/x-png" ||
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        try {
          const response = await updateProfileImg(fData);
          if (response.data?.status[0].Error === "False") {
            setProfilePic({ url: URL.createObjectURL(file) });
            queryClient.invalidateQueries("user-data");
            toast.success(response.data?.status[0].Message);
          } else {
            toast(response.data?.status[0].ResponseMessage, { icon: "⚠️" });
          }
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        return toast("Select an image file", {
          icon: "❌",
          position: "top-center",
          style: {
            borderRadius: "10px",
          },
        });
      }
    }
  };

  // get user addresses
  const { isLoading: addressesIsLoading } = useQuery(
    ["addresses"],
    getAddresses,
    {
      onSuccess: (data) => {
        if (data.data?.value) {
          dispatch({ type: "SET_USER_ADDRESSES", addresses: data.data.value });
          sessionStorage.setItem("addresses", JSON.stringify(data.data.value));
        }
      },
      onError: (err) => console.log(err),
    }
  );

  // get all orders
  const { isLoading: ordersLoading } = useQuery(["all-orders"], getOrders, {
    onSuccess: (data) => {
      if (data.data?.status[0].Error === "False") {
        setOrders(
          data.data.value.sort((order1, order2) => order2.id - order1.id)
        );
      }
    },
    onError: (err) => console.log(err, "orders error response"),
  });

  // cancel order mutation function
  const cancelMutation = useMutation(cancelOrder, {
    onSuccess: (data) => {
      if (data.data?.status[0].Error === "False") {
        setShowCancelConfirm(false);
        queryClient.invalidateQueries(["all-orders"]);
        toast.success("Order cancellation successful");
        setCancellingReason("");
        setCancellingOrderId("");
      }
    },
    onError: (err) => console.log(err, "error"),
  });

  // cancel order
  const doCancelOrderConfirm = () => {
    if (!cancellingReason) {
      return toast("Select reason to cancel order", { icon: "⚠️" });
    }
    cancelMutation.mutate({
      reason: cancellingReason,
      orderId: cancellingOrderId.toString(),
    });
  };

  // return order mutation function
  const returnMutation = useMutation(returnOrder, {
    onSuccess: (data) => {
      if (data.data?.status[0].Error === "False") {
        setShowReturnConfirm(false);
        queryClient.invalidateQueries(["all-orders"]);
        toast.success("Order returned successfully");
        setReturningReason("");
        setReturningOrderId("");
      }
    },
    onError: (err) => console.log(err, "error"),
  });

  // do return order
  const doReturnOrderConfirm = () => {
    if (!returningReason) {
      return toast("Select reason to return products", { icon: "⚠️" });
    }
    returnMutation.mutate({
      reason: returningReason,
      orderId: returningOrderId.toString(),
    });
  };

  // get notification details
  useQuery(["notification-details"], getNotificationDetails, {
    onSuccess: (response) => {
      if (response.data?.status[0].Message === "success") {
        console.log("NOTIFICATIONS", response.data);
        setEmailNotificationStatus(response.data.user.email_notification);
        setChatNotificationStatus(response.data.user.chat_notification);
      }
    },
    onError: (err) => {
      // handle error
    },
  });

  // change email notification status
  const changeEmailNotificationStatus = async () => {
    try {
      const data = {
        email_notification: !emailNotificationStatus,
        chat_notification: chatNotificationStatus,
      };
      setEmailNotificationStatus(!emailNotificationStatus);
      const response = await changeNotificationStatus(data);
      if (response.data?.status[0].Message === "success") {
        if (emailNotificationStatus) {
          toast.success("Email notifications turned off");
        } else {
          toast.success("Email notifications turned on");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // change chat notification status
  const changeChatNotificationStatus = async () => {
    try {
      const data = {
        email_notification: emailNotificationStatus,
        chat_notification: !chatNotificationStatus,
      };
      setChatNotificationStatus(!chatNotificationStatus);
      const response = await changeNotificationStatus(data);
      if (response.data?.status[0].Message === "success") {
        if (chatNotificationStatus) {
          toast.success("Chat notifications turned off");
        } else {
          toast.success("Chat notifications turned on");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // enable edit option
  const enableEditOption = () => {
    setEnableEdit(true);
  };
  return (
    <div className="dashboard-container">
      <div className="options" data-aos="fade-right">
        {options.map((option, i) => (
          <div
            onClick={() => {
              navigate(`/dashboard/${option.url}`);
              if (option.url !== "edit-profile") {
                setEnableEdit(false);
              }
            }}
            className={`option ${page === option.url && "active"}`}
            key={i}
          >
            {option.icon && <option.icon className="icon" />}
            {option.title}
          </div>
        ))}
      </div>
      <div className="right-side">
        {page !== "message" && (
          <div className="routes" data-aos="fade-up">
            <Link to={`/dashboard/${"dashboard"}`} className="underline-none">
              Dashboard
            </Link>
            <PiCaretRight className="icon" />
            <Link to={`/dashboard/${pageTitle.url}`} className="underline-none">
              {pageTitle.title}
            </Link>
          </div>
        )}
        {page === "dashboard" && (
          <div className="dashboard" data-aos="fade-up">
            <h1>Welcome!</h1>
            <div className="dashboard-content">
              <h3>Progress</h3>
              <div className="dashboard-content-box">
                <p>
                  Abstract Ocean Oil Painting On Canvas Original Beach Sea
                  Landscape Painting Palette Knife Painting Large Wall Art Sea
                  Sky Living room Decor
                </p>
                <div className="dates">
                  <span>Start Date : Tuesday, 06 May 2023</span>
                  <span>End Date : Tuesday, 25 May 2023</span>
                </div>
                <ProgressBar
                  variant="dark"
                  now={30}
                  className="bt-progress-bar"
                />
                <span>last update : Tuesday, 08 May 2023</span>
                <div className="started">
                  <input type="checkbox" name="" id="" />
                  <div>
                    <span>Work Started</span>
                    <div className="images">
                      <div className="image"></div>
                      <div className="image"></div>
                      <div className="image"></div>
                    </div>
                    <span>Tuesday, 06 May 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {page === "message" && (
          <div className="message-div">
            <Chat />
          </div>
        )}
        {page === "favorites" && (
          <div className="favorites" data-aos="fade-up">
            {favorites.length > 0 ? (
              <div className="favorites-list">
                {favorites.map((art) => {
                  return <ProductItem item={art} key={art.id} />;
                })}
              </div>
            ) : (
              <div className="empty-wishlist">
                <img
                  src={EmptyWishlistImg}
                  alt="empty-box"
                  className="empty-box-img"
                />
              </div>
            )}
          </div>
        )}
        {page === "my-orders" && (
          <div className="my-orders" data-aos="fade-up">
            {orders.length > 0
              ? orders.map((order) => (
                  <OrderDetails
                    order={order}
                    setShowCancelConfirm={setShowCancelConfirm}
                    setCancellingOrderId={setCancellingOrderId}
                    setShowReturnConfirm={setShowReturnConfirm}
                    setReturningOrderId={setReturningOrderId}
                    key={order.id}
                  />
                ))
              : !ordersLoading && (
                  <div className="empty-orders">
                    <h3 className="h3">You haven't ordered anything yet!</h3>
                    <button
                      className="btn-primary"
                      onClick={() => navigate("/shop")}
                    >
                      Shop
                    </button>
                  </div>
                )}
          </div>
        )}
        {page === "edit-profile" && (
          <div className="edit-profile" data-aos="fade-up">
            <div className="image-div">
              <img
                src={
                  profilePic?.url || user.profile_image
                    ? `${domainName}${user?.profile_image}`
                    : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                alt="profile"
                className="profile-img"
                onClick={() => imgRef.current.click()}
              />
              <input
                type="file"
                ref={imgRef}
                accept="image/x-png,image/jpeg,image/jpg,image/png"
                onChange={(e) => onImageSelect(e)}
                hidden
              />
            </div>
            <form onSubmit={handleSubmit(handleFormUpdate)}>
              <div className="input-box">
                <label htmlFor="">Name</label>
                <input
                  className={`${!enableEdit && "disabled"}`}
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_\s-]+$/,
                      message: "Special characters are not allowed",
                    },
                  })}
                  disabled={!enableEdit}
                />
                <small className="error">{errors?.name?.message}</small>
              </div>
              <div className="input-box">
                <label htmlFor="">Email</label>
                <input
                  className={`${!enableEdit && "disabled"}`}
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  disabled={!enableEdit}
                />
                <small className="error">{errors?.email?.message}</small>
              </div>
              {/* <div className="input-box">
                <label htmlFor="">Password</label>
                <input type="password" />
                <span>Forgot Password ?</span>
              </div> */}
              <div className="input-box">
                <label htmlFor="">Mobile Number</label>
                <input
                  className={`${!enableEdit && "disabled"}`}
                  type="tel"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[6-9]\d{9}$/i,
                      message: "Enter a valid phone number",
                    },
                  })}
                  disabled={!enableEdit}
                />
                <small className="error">{errors?.phoneNumber?.message}</small>
              </div>
              <div className="buttons">
                {enableEdit && (
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={cancelEditProfile}
                  >
                    Cancel
                  </button>
                )}
                {enableEdit && (
                  <button type="submit" className="btn-primary">
                    Save
                  </button>
                )}
              </div>
            </form>
            {!enableEdit && (
              <button
                type="button"
                className="btn-primary"
                onClick={enableEditOption}
              >
                Edit
              </button>
            )}
          </div>
        )}
        {page === "shipping" && (
          <Shipping addresses={userAddresses} isLoading={addressesIsLoading} />
        )}
        {page === "settings" && (
          <div className="settings">
            <div data-aos="fade-up" className="settings-content">
              <h1>Settings</h1>
              <div>
                Email notifications
                <label class="switch">
                  <input
                    onChange={changeEmailNotificationStatus}
                    type="checkbox"
                    checked={emailNotificationStatus}
                  />
                  <span class="slider"></span>
                </label>
              </div>
              <div>
                Chat messages
                <label class="switch">
                  <input
                    onChange={changeChatNotificationStatus}
                    type="checkbox"
                    checked={chatNotificationStatus}
                  />
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}
        {page === "support-ticket" && (
          <div className="support-ticket" data-aos="fade-up">
            <div className="ticket-form">
              <h3>Support Ticket</h3>
              <form className="form">
                <h3>Create New Ticket</h3>
                <span>
                  Fill up all the information here, then click submit button
                </span>
                <div className="input-box">
                  <label htmlFor="">Ticket Number</label>
                  <input type="tel" name="" id="" placeholder="5263469" />
                </div>
                <div className="input-box">
                  <label htmlFor="">Describe The Problem</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Write a problem"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <ConfirmCancelOrderModal
        show={showCancelConfirm}
        onHide={() => setShowCancelConfirm(false)}
        setcancellingreason={setCancellingReason}
        docancelorderconfirm={doCancelOrderConfirm}
        setcancellingorderId={setCancellingOrderId}
      />
      <ConfirmReturnOrderModal
        show={showReturnConfirm}
        onHide={() => setShowReturnConfirm(false)}
        setreturningreason={setReturningReason}
        doreturnorderconfirm={doReturnOrderConfirm}
        setreturningorderId={setReturningOrderId}
      />
    </div>
  );
};

function ConfirmCancelOrderModal(props) {
  const reasons = [
    "I have changed my mind",
    "I have found a better deal",
    "Ordered by mistake",
    "It is too expensive",
    "Delay of delivery",
  ];

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="cancel-modal">
        <h3>Do you really wanna cancel this order?</h3>
        <hr />
        <div className="form">
          <h4>Select reason for cancelling the order</h4>
          <div className="radio-options">
            {reasons.map((reason) => (
              <div
                className="radio"
                key={reason}
                onClick={() => props.setcancellingreason(reason)}
              >
                <input type="radio" name="reason" id="" value={reason} />
                <label htmlFor="">{reason}</label>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={props.docancelorderconfirm} className="btn-cancel">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setcancellingorderId("");
                props.onHide();
                props.setcancellingreason("");
              }}
              className="btn-secondary"
            >
              Exit
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function ConfirmReturnOrderModal(props) {
  const reasons = [
    "I have changed my mind",
    "Defective or damaged product",
    "Ordered by mistake",
    "Wrong item received",
    "Delay of delivery",
  ];

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="cancel-modal">
        <h3>Do you really wanna return ordered products?</h3>
        <hr />
        <div className="form">
          <h4>Select reason for returning ordered product</h4>
          <div className="radio-options">
            {reasons.map((reason) => (
              <div
                className="radio"
                key={reason}
                onClick={() => props.setreturningreason(reason)}
              >
                <input type="radio" name="reason" id="" value={reason} />
                <label htmlFor="">{reason}</label>
              </div>
            ))}
          </div>
          <div className="buttons">
            <button onClick={props.doreturnorderconfirm} className="btn-cancel">
              Confirm
            </button>
            <button
              onClick={() => {
                props.setreturningorderId("");
                props.onHide();
                props.setreturningreason("");
              }}
              className="btn-secondary"
            >
              Exit
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
