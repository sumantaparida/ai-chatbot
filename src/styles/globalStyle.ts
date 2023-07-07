import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  ._chat_bot_wrapper {
    ._c_header {
      color: #fff
    }
    ._c_content {
     ._l_chat, ._r_chat {
      // border: 1px solid red;
        ._prof {
          width: 40px;
          height: 40px;
          border: 1px solid red;
        }
        ._conv {
          border: solid 1px  #dedede;
          font-size: 14px

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