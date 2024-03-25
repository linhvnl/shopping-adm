/////////////////////////////
// import React/Hook/Router...
import React, { useEffect, useState } from "react";

// import component
import LiveChatContent from "./LiveChatContent";
import LiveChatListRoom from "./LiveChatListRoom";

// __________________________
// set socket connection
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_API_ENDPOINT_ORIGIN, {
  transports: ["websocket"],
});

// __________________________
// function component Live Chat
const LiveChat = (props) => {
  // state all rooms of live chat
  const [allRooms, setAllRooms] = useState([]);

  // state active room of live chat
  const [activeRoom, setActiveRoom] = useState({});

  // state roomId chat
  const [roomId, setRoomId] = useState("");

  // hàm xử lý gửi tin nhắn chat mới
  const sendMessageHandler = async (e) => {
    // lấy giá trị input
    const textMessage = e.target.value.trim();

    // guard
    if (!roomId) {
      return;
    }

    // Send message to server
    socket.emit("new_message_admin", { roomId, message: textMessage });
    e.target.value = "";

    return;
  };

  // useEffect để gửi sự kiện join room mỗi khi roomId thay đổi (admin chọn phòng chat khác để trả lời cho client)
  useEffect(() => {
    if (roomId) {
      socket.emit("join_room", roomId);
    }
  }, [roomId]);

  // useEffect để gửi và lắng nghe socket từ server gửi lên
  useEffect(() => {
    // thực hiện load all rooms chat khi tải lại trang
    socket.emit("load_rooms");

    // load rooms
    socket.on("load_rooms", (rooms) => {
      setAllRooms(rooms);
    });

    // join room
    socket.on("join_room", (room) => setActiveRoom(room));

    // khi có tin nhắn mới (cả 2 phía client - admin)
    socket.on("update_room", (updateRoom) => {
      // cập nhật trạng thái room update trong all rooms
      setAllRooms((prevState) => {
        return prevState?.map((room) => {
          if (room._id === updateRoom._id) {
            return {
              ...room,
              isNewClientMessage: updateRoom.isNewClientMessage,
            };
          }
          return room;
        });
      });

      // cập nhật room chat hiện tại ứng với roomId
      setActiveRoom((prevState) => {
        return prevState._id === updateRoom._id ? updateRoom : prevState;
      });
    });
  }, []);

  // return
  return (
    <>
      {/* title */}
      <div className="fw-bold mb-4">
        <h3 className="fw-bold mb-0">Chat</h3>
        <p className="text-secondary opacity-75 mb-0">Apps / Chat</p>
      </div>

      {/* khung app chat */}
      <div className="card border-0 shadow" style={{ height: "78vh" }}>
        <div className="row g-0 h-100">
          {/* danh sách all rooms chat */}
          <div className="col-3 border-end h-100">
            <LiveChatListRoom
              allRooms={allRooms}
              roomId={roomId}
              setRoomId={setRoomId}
            />
          </div>

          {/* room chat */}
          <div className="col-9 d-flex flex-column h-100">
            <LiveChatContent
              conversation={activeRoom.conversation}
              onSendMessage={sendMessageHandler}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LiveChat;
