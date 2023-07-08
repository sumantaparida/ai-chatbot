import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ._chat_bot_wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ._chat_bot_content {
      width: 100%;
      max-width: 500px;
      height: 580px !important;
      background-color: #fff !important;
      color: #000 !important;
    }
    ._c_header {
      color: #fff;
      bdisplay: flex;
      flex-direction: column;
      background-color: #292929;
      padding: 18px;
      border-radius: 8px;
    }
    ._c_content {
      & > div {
      }
      ._r_chat {
        &.Customer {
          ._arrow {
            right: -8px;
            top: 13px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 8px solid #ced9e1;
          }
        }
        &.BOT {
          ._arrow {
            left: -8px;
            top: 13px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid #ced9e1;
          }
        }
        ._arrow {
          width: 0;
          height: 0;
          position: absolute;
        }
        ._prof {
          display: flex;
          position: relative;
          height: 100%;
            display: grid;
            place-content: center;
            padding: 0.5em;
            width: 2.3em;
            height: 2.3em;
            border-radius: 50%;
            background: #6D5D6E;
        }
        ._conv {
          border: solid 1px #dedede;
          font-size: 14px;
          line-height: 18px;
          word-break: break-all;
        }
     }
    }
    ._input_box {
      border: solid 1px red
    }
  }
`;

export default GlobalStyle;
