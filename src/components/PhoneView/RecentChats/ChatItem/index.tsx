import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from "./index.module.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import profilePic from "../../../../assets/images/bot_icon_2.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import crossPic from "../../../../assets/images/cross.png";
import { AppContext } from "../../../../utils/app-context";
import { User } from "../../../../types";

import { useDispatch } from "react-redux";
import  {
  setBotImage,
} from "../../../../store/slices/userSlice";

interface chatItemProps {
  active: boolean;
  name: string;
  phoneNumber: string | null;
  user?: User;
  isBlank?: boolean;
}

const ChatItem: React.FC<chatItemProps> = ({
  active,
  name,
  phoneNumber,
  user,
  isBlank,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const context = useContext(AppContext);
  const [botIcon, setBotIcon] = useState(user?.botImage);
  const [isUnread, setIsUnread] = useState(false);
  const fontColorToggle = useColorModeValue(
    styles.darkFontColor,
    styles.lightFontColor
  );

  const onChangingCurrentUserHandler = useCallback(() => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    context?.toChangeCurrentUser(user);
    history.push(`/chats/${user?.id}`);
  }, [context, history, user]);

  useEffect(() => {
    if (user?.botImage) {
      if (!user?.useIcon) {
        console.log("--ram ram: here--", { user });
        fetch(user?.botImage)
          .then((res) => {
            if (res.status === 403) {
              setBotIcon(profilePic);
            } else {
              setBotIcon(user?.botImage);
              dispatch(setBotImage(user));
            }
          })
          .catch((err) => {
            setBotIcon(profilePic);
          });
      }
    } else {
      setBotIcon(profilePic);
    }
  }, [dispatch, user, user?.botImage]);

  //  useEffect(()=>{
  //   if(user && !user.isExpired){
  //     console.log("ram ram :",{user})
  //    let endpoint = getConvHistoryUrl(user);

  //    axios.get(endpoint).then(
  //       (response) => {
  //         if(Number(response.data.result.total) === 0){
  //           setIsUnread(true)
  //         }
  //       },
  //     ).catch(err=>{
  //       console.log("error in fetching botHistory",{err})
  //     });
  //   }
  //  },[user])

  return (
    <React.Fragment>
      <button
        onClick={onChangingCurrentUserHandler}
        disabled={isBlank}
        className={styles.container}
      >
        <div
          className={`${styles.avatar} ${
            user?.isExpired
              ? styles.disabled
              : isUnread
              ? styles.unread_border
              : null
          }`}
        >
          <img
            src={!isBlank ? botIcon : crossPic}
            height={"100%"}
            width={"100%"}
            alt="profile pic"
          />
        </div>
        <Box className={`${styles.chatItem_text}`}>
          <Box
            className={`${
              phoneNumber === null
                ? styles.chatItem_botName
                : styles.chatItem_userName
            } ${active ? styles.activeFont : fontColorToggle}`}
          >
            <p
              style={{
                textOverflow: "ellipsis",
                maxWidth: "68vw",
                overflow: "hidden",
                whiteSpace: "nowrap",
                marginBottom: "0",
                color: user?.isExpired ? "lightgrey" : "black",
                textDecoration: user?.isExpired ? "line-through" : "none",
              }}
            >
              {name}
            </p>
          </Box>
        </Box>
        {isUnread && <span className={styles.unread}></span>}
      </button>
    </React.Fragment>
  );
};

export default ChatItem;
