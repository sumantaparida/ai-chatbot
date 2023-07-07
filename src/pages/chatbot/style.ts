import styled from 'styled-components';

const ChatbotWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the desired height, such as 100% */
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  ._chat_bot_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh; /* Set the desired height, such as 50% */
    width: 100%;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    z-index: 9999; /* Adjust the z-index as needed */
  }
  // background-color: var(--background-start-rgb);
  ._boat_button {
    width: 55px;
    height: 55px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;

export default ChatbotWrapper;
