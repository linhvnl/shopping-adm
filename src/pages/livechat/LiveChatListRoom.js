// import React/Hook/Router...
import React from "react";

// import icon/image
import iconAdmin from "../../assets/image-icon/icon-admin-male-48-icons8.png";

// function Component
const LiveChatListRoom = function (props) {
  // lấy dữ liệu từ props
  const allRooms = props.allRooms;
  const roomId = props.roomId;
  const setRoomId = props.setRoomId;

  // render list room
  const renderRooms = allRooms?.map((item) => {
    // style cho room đang được chọn
    const activeRoomStyle = item._id === roomId ? "bg-light" : "";

    // style cho list rooms đang có tin nhắn mới từ Client (chưa được admin trả lời)
    const isNewClientMessageRoomStyle = item.isNewClientMessage
      ? "text-primary fw-bold"
      : "";

    // return html
    return (
      <li key={item._id} className={`p-3 border-bottom ${activeRoomStyle}`}>
        <button
          onClick={() => setRoomId(item._id)}
          className="d-flex align-items-center border-0 bg-transparent"
        >
          <img
            src={iconAdmin}
            alt="icon"
            className="rounded-circle me-3"
            style={{ width: "36px", height: "36px", opacity: "100%" }}
          />
          <span
            className={`text-break text-start ${isNewClientMessageRoomStyle}`}
          >
            {item._id}
          </span>
        </button>
      </li>
    );
  });

  // return
  return (
    <>
      {/* nút search room */}
      <div className="p-4 border-bottom">
        <input
          className="form-control"
          type="text"
          placeholder="Search Contact"
        />
      </div>

      {/* danh sách */}
      <div
        className="overflow-auto list-chat-container"
        style={{ height: "85%" }}
      >
        <ol className="list-unstyled">{renderRooms}</ol>
      </div>
    </>
  );
};

export default LiveChatListRoom;
