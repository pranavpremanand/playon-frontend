import React, { useEffect, useState } from "react";
import "./StepProgressbar.scss";

function StepProgressbar({ orderStatus }) {
  const [progressStep, setProgressStep] = useState(1);

  useEffect(() => {
    if (orderStatus === "Received") {
      setProgressStep(1);
    } else if (orderStatus === "Packed") {
      setProgressStep(2);
    } else if (
      orderStatus === "Out For Delivery" ||
      orderStatus === "Arriving Today"
    ) {
      setProgressStep(3);
    } else if (orderStatus === "Completed" || orderStatus === "Returned") {
      setProgressStep(4);
    }
  }, [orderStatus]);

  return (
    <div className="main-pb">
      <div className="row d-flex justify-content-center">
        <div className="col-12">
          {orderStatus !== "Canceled" ? (
            <ul id="progressbar" className="text-center">
              <li
                className={
                  progressStep > 1 || progressStep === 1
                    ? "active step0"
                    : " step0"
                }
              >
                <span className="below-txt">Order Confirmed</span>
                <div className="below-txt date">April 5th 2023, 5:00 PM</div>
              </li>
              <li
                className={
                  progressStep > 2 || progressStep === 2
                    ? "active step0"
                    : " step0"
                }
              >
                <span className="below-txt">Shipped</span>
                <div className="below-txt date">April 5th 2023, 5:00 PM</div>
              </li>
              <li
                className={
                  progressStep > 3 || progressStep === 3
                    ? "active step0"
                    : " step0"
                }
              >
                <span className="below-txt">
                  {orderStatus === "Returned"
                    ? "Completed"
                    : orderStatus === "Out For Delivery" ||
                      orderStatus === "Arriving Today"
                    ? orderStatus
                    : "Out For Delivery"}
                </span>
                <div className="below-txt date">April 5th 2023, 5:00 PM</div>
              </li>
              {/* {!orderStatus === "Returned" ? ( */}
              <li
                className={`${
                  progressStep > 4 || progressStep === 4
                    ? "active step0"
                    : " step0"
                }
                      ${orderStatus === "Returned" && "return"}`}
              >
                <span className="below-txt">
                  {orderStatus === "Completed" || orderStatus === "Returned"
                    ? orderStatus
                    : "Completed"}
                </span>
                <div className="below-txt date">April 5th 2023, 5:00 PM</div>
              </li>
              {/* // ) : (
              //   <li
              //     className={
              //       progressStep > 4 || progressStep === 4
              //         ? "active step0 return"
              //         : " step0"
              //     }
              //   >
              //     <span className="below-txt">
              //       {orderStatus === "Completed" || orderStatus === "Returned"
              //         ? orderStatus
              //         : "Completed"}
              //     </span>
              //     <div className="below-txt date">April 5th 2023, 5:00 PM</div>
              //   </li>
              // )} */}
            </ul>
          ) : (
            <h4 className="cancelled-text">Order cancelled!</h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default StepProgressbar;
