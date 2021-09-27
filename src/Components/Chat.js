import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import StarOutlineIcon from "@material-ui/icons/StarOutline";
import { InfoOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import { db } from "../firebase";
import Message from "./Message";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("message")
        .orderBy("timestamp", "asc")
  );
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);
  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          {" "}
          <h3>
            <strong>#{roomDetails?.data().name}</strong>
            <StarOutlineIcon />
          </h3>
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlined /> Details
          </p>
        </HeaderRight>
      </Header>
      <ChatMessages>
        {roomMessages?.docs.map((doc) => {
          const { message, timestamp, user, userImage } = doc.data();

          return (
            <Message
              key={doc.id}
              message={message}
              timestamp={timestamp}
              user={user}
              userImage={userImage}
            />
          );
        })}

        <ChatBottom />
      </ChatMessages>

      <ChatInput
        ref={chatRef}
        channelName={roomDetails?.data().name}
        channelId={roomId}
      />
    </ChatContainer>
  );
}

export default Chat;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const HeaderRight = styled.div``;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
  }

  > h4 > .MuvSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
`;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
`;

const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
