import React from "react";

// import BotAvatar from "./icons/bot.svg";
import BotImage from "./icons/bot_profile.svg";

const CoBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none" }}
      >
        <img className="b_p_s" alt="BotAvatar" src={BotImage} />
      </div>
    </div>
  );
};

export default CoBotAvatar;
