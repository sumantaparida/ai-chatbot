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
        ._arrow {
          width: 0;
          height: 0;
          border-top: 8px solid transparent;
          border-bottom: 8px solid transparent;
          border-right: 8px solid #ced9e1;
          position: absolute;
          left: -8px;
          top: 13px;
        }
        ._prof {
          width: 40px;
          height: 40px;
          border: 1px solid #ced9e1;
        }
        ._conv {
          border: solid 1px #dedede;
          font-size: 14px;
          line-height: 18px;
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