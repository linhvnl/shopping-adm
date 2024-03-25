/////////////////////////////
// import React/Hook/Router...
import React, { useRef, useEffect } from "react";

// import icon/image
import iconAdmin from "../../assets/image-icon/icon-admin-male-48-icons8.png";
import iconSendMessage from "../../assets/image-icon/icon-telegram-app-icons8.svg";

////////////////////////////////
// function component nội dung khung Live Chat
const LiveChatContent = (props) => {
  // lấy dữ liệu props
  const conversation = props.conversation;
  const sendMessageHandler = props.onSendMessage;

  // tự động scroll đến cuối khung chat khi có tin nhắn mới
  const chatContainerRef = useRef(null);
  //
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  //
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  // tạo hàm chèn Icon Admin
  const insertIcon = (icon, size = "36px", margin = "me-3", opac = "100%") => (
    <img
      src={icon}
      alt="icon"
      className={`rounded-circle ${margin}`}
      style={{ width: size, height: size, opacity: opac }}
    />
  );

  const chatAdmin = (id, message) => (
    <div key={id} className="d-flex justify-content-end mb-3">
      <div className="text-end" style={{ width: "85%" }}>
        <span
          className="d-inline-block rounded-2 p-2"
          style={{ backgroundColor: "#dbe4ff" }}
        >
          You: {message}
        </span>
      </div>
    </div>
  );

  const chatClient = (id, message) => (
    <div key={id} className="d-flex mb-3">
      <div className="d-flex" style={{ width: "85%" }}>
        {insertIcon(iconAdmin)}
        <span
          className="d-inline-block rounded-2 p-2"
          style={{ backgroundColor: "#c5f6fa" }}
        >
          Client: {message}
        </span>
      </div>
    </div>
  );

  // nội dung trong khung Live Chat
  // return
  return (
    <>
      {/* nội dung lịch sử chat */}
      <div
        ref={chatContainerRef}
        className="p-3 border-bottom overflow-auto chat-container"
        style={{ height: "90%" }}
      >
        {conversation?.map((item) =>
          item.isAdmin
            ? chatAdmin(item._id, item.message)
            : chatClient(item._id, item.message)
        )}
      </div>

      {/* input chat */}
      <div className="d-flex align-items-center p-3" style={{ height: "10%" }}>
        <input
          type="text"
          name="message"
          placeholder="Type and enter"
          className="border-0 flex-fill p-2"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessageHandler(e);
            }
          }}
        />

        {insertIcon(iconSendMessage, "24px", "ms-3")}
      </div>
    </>
  );
};

export default LiveChatContent;
