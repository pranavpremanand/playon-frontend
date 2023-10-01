import { IoIosSend } from "react-icons/io";
import { MdOutlineAttachment } from "react-icons/md";
import "./Chat.scss";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PiCaretRight } from "react-icons/pi";

export const Chat = () => {
  const chatDivRef = useRef(null);
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [currentChat, setCurrentChat] = useState(1);
  const [viewChat, setViewChat] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
  }, []);

  return (
    <div className="main-message-container">
      <div className="routes">
        <Link to={`/dashboard/${"dashboard"}`} className="underline-none">
          Dashboard
        </Link>
        <PiCaretRight className="icon" />
        <Link
          onClick={() => setViewChat(false)}
          to={`/dashboard/${"message"}`}
          className="underline-none"
        >
          Message
        </Link>
      </div>
      <div className="message" data-aos="fade-up">
        {!isSmallScreen && (
          <div className="head">
            <span>Message</span>
          </div>
        )}
        {!viewChat && isSmallScreen ? (
          <div className="head">
            <span>Message</span>
          </div>
        ) : null}
        <div className="message-main">
          <div className="chat-list lg-view">
            {users.map((chat) => {
              return (
                <div
                  key={chat}
                  onClick={() => setCurrentChat(chat)}
                  className={`user ${chat === currentChat && "active"}`}
                >
                  <img
                    src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                    alt="profile"
                  />
                  <div className="user-info">
                    <span>Gregg Rosen</span>
                    <span>Artist</span>
                    <span>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Sit porro commodi odio cum veritatis ad magnam enim
                      labore, voluptatibus quae harum delectus magni, ullam
                      aspernatur minima dolores voluptas cupiditate explicabo.
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          {!viewChat ? (
            <div className="chat-list sm-view">
              {users.map((chat) => {
                return (
                  <div
                    key={chat}
                    onClick={() => {
                      setCurrentChat(chat);
                      setViewChat(true);
                    }}
                    className={`user ${chat === currentChat && "active"}`}
                  >
                    <img
                      src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                      alt="profile"
                    />
                    <div className="user-info">
                      <span>Gregg Rosen</span>
                      <span>Artist</span>
                      <span>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sit porro commodi odio cum veritatis ad magnam
                        enim labore, voluptatibus quae harum delectus magni,
                        ullam aspernatur minima dolores voluptas cupiditate
                        explicabo.
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="user-chat sm-view-chat">
              <div className="chat-head">
                <img
                  src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                  alt="profile"
                />
                <div className="user-info">
                  <span>Gregg Rosen</span>
                  <span>Artist</span>
                </div>
              </div>
              <div className="chat-messages-div">
                <div ref={chatDivRef} className="messages-content">
                  <div className="left">
                    <div className="message-content">
                      <span>Hello! How can I assist you today?</span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="right">
                    <div className="message-content">
                      <span>
                        Hi there! I'm looking to purchase a piece of artwork for
                        my living room. Can you help me?
                      </span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="left">
                    <div className="message-content">
                      <span>Hello! How can I assist you today?</span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="right">
                    <div className="message-content">
                      <span>
                        Hi there! I'm looking to purchase a piece of artwork for
                        my living room. Can you help me?
                      </span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="left">
                    <div className="message-content">
                      <span>Hello! How can I assist you today?</span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="right">
                    <div className="message-content">
                      <span>
                        Hi there! I'm looking to purchase a piece of artwork for
                        my living room. Can you help me?
                      </span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="right">
                    <div className="message-content">
                      <span>
                        Hi there! I'm looking to purchase a piece of artwork for
                        my living room. Can you help me?
                      </span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="left">
                    <div className="message-content">
                      <span>Hello! How can I assist you today?</span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                  <div className="right">
                    <div className="message-content">
                      <span>
                        Hi there! I'm looking to purchase a piece of artwork for
                        my living room. Can you help me?
                      </span>
                      <small>10:52 AM</small>
                    </div>
                  </div>
                </div>
                <div className="chat-input">
                  <div className="input-box">
                    <input type="text" placeholder="Send a message." />
                    <div className="buttons">
                      <MdOutlineAttachment className="icon" />
                      <IoIosSend className="icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="user-chat lg-view-chat">
            <div className="chat-head">
              <img
                src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                alt="profile"
              />
              <div className="user-info">
                <span>Gregg Rosen</span>
                <span>Artist</span>
              </div>
            </div>
            <div className="chat-messages-div">
              <div ref={chatDivRef} className="messages-content">
                <div className="left">
                  <div className="message-content">
                    <span>Hello! How can I assist you today?</span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="right">
                  <div className="message-content">
                    <span>
                      Hi there! I'm looking to purchase a piece of artwork for
                      my living room. Can you help me?
                    </span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="left">
                  <div className="message-content">
                    <span>Hello! How can I assist you today?</span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="right">
                  <div className="message-content">
                    <span>
                      Hi there! I'm looking to purchase a piece of artwork for
                      my living room. Can you help me?
                    </span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="left">
                  <div className="message-content">
                    <span>Hello! How can I assist you today?</span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="right">
                  <div className="message-content">
                    <span>
                      Hi there! I'm looking to purchase a piece of artwork for
                      my living room. Can you help me?
                    </span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="right">
                  <div className="message-content">
                    <span>
                      Hi there! I'm looking to purchase a piece of artwork for
                      my living room. Can you help me?
                    </span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="left">
                  <div className="message-content">
                    <span>Hello! How can I assist you today?</span>
                    <small>10:52 AM</small>
                  </div>
                </div>
                <div className="right">
                  <div className="message-content">
                    <span>
                      Hi there! I'm looking to purchase a piece of artwork for
                      my living room. Can you help me?
                    </span>
                    <small>10:52 AM</small>
                  </div>
                </div>
              </div>
              <div className="chat-input">
                <div className="input-box">
                  <input type="text" placeholder="Send a message." />
                  <div className="buttons">
                    <MdOutlineAttachment className="icon" />
                    <IoIosSend className="icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
