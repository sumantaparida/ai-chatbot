import styled from 'styled-components';

const ChatbotWrapper = styled.section`
  background: #00d679;
  position: absolute;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  z-index: -1;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: -170px auto auto -200px;
    width: clamp(30vw, 600px, 42vw);
    height: clamp(30vw, 600px, 42vw);
    border-radius: 50%;
    background: #009f69;
    z-index: -1;
  }

  &::after {
    inset: auto -170px -200px auto;
  }

  @media (max-width: 820px) {
    &::before,
    &::after {
      width: 25rem;
      height: 25rem;
    }
  }
  ._boat_button {
    width: 55px;
    height: 55px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
  }
`;

export default ChatbotWrapper;
