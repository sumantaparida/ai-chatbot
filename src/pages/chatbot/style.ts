import styled from 'styled-components';

const ChatbotWrapper = styled.section`
  background: #00d679;
  position: absolute;
  min-height: 100vh;
  max-height: 100vh;
  width: 100vw;
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

  ._carousel {
    min-height: 190px;
    ._c_box {
      border: solid 1px #15803d;
      max-width: 170px;
      border-radius: 5px;
      box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
      ._img_box {
        border-bottom: solid 1px #a0aec0;
        height: 50px;
        img {
          height: 100%;
        }
      }
      ._data_box {
        font-size: 14px;
        p {
          width: 100%;
          span {
            display: flex;
            flex: 1;
            &:last-child {
              color: #3182ce;
              font-weight: bold;
            }
          }
        }
        a {
          width: 100%;
          padding: 3px;
          text-align: center;
        }
      }
    }
  }
  ._default_msg {
    font-size: 12px;
    white-space: pre-wrap;
  }
`;

export default ChatbotWrapper;
