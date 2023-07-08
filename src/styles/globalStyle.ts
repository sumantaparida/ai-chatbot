import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ._chat_bot_wrapper {
    ._c_header {
      color: #fff
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
            border-left: 8px solid #15803d;
          }
        }
        &.BOT {
          ._arrow {
            left: -8px;
            top: 13px;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-right: 8px solid #15803d;
          }
        }
        ._arrow {
          width: 0;
          height: 0;
          position: absolute;
        }
        ._prof {
          width: 40px;
          height: 40px;
          border: 1px solid #ced9e1;
          box-shadow: 0px 4px 5px #2f2f2f80;
          overflow: hidden;
        }
        ._conv {
          font-size: 14px;
          line-height: 18px;
          word-break: break-word;
          color: #fff;
          box-shadow: 0px 4px 5px #2f2f2f80;
          max-width: 240px;
          ._q_check_list {
            span {
              padding: 3px 5px;
              border-radius: 5px;
            }
          }
        }
     }
    }
    ._input_box {
      border: solid 1px red
    }
  }
  ._chat_bot_content {
    height: 480px !important;
    width: 320px;
    background-color: #fff !important;
    color: #000 !important;
  }
`;

export default GlobalStyle;
