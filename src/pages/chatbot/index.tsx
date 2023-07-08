import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import type { PopperPlacementType } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import bIcon from '@/public/icons/bot.svg';
import { Main } from '@/templates/Main';

import ChatbotWrapper from './style';

// type Message = {
//   id: number;
//   role: string;
//   msg: string;
// };
interface Message {
  id: number;
  role: string;
  msg: string | object; // Update the type to accept either a string or an object
  type?: string;
  question?: [];
}

interface Suggestions {
  category: string;
  question: string;
  vertical: string;
}

const Chatbot = () => {
  // const defaultMessage = {
  //   id: Date.now(),
  //   role: 'BOT',
  //   msg: 'Default msg',
  // };
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const chatWindow = document.getElementsByClassName('_c_content')[0];
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  const loadChatHistory = async () => {
    const response = await fetch('http://localhost:8080/api/v1/data?fileIds=58a1b8b3-74ae-452d-81b4-77e9eb662e24');
    const data = await response.json();

    data.forEach((item: any) => {
      // Extract the userType from the API response
      const { userType } = item;

      // Create a new message object for the bot response
      const responseMessage: Message = {
        id: Date.now(),
        role: userType === 'Customer' ? 'Customer' : 'BOT',
        msg: item.content || '', // Update this based on your API response structure
      };

      // Add the bot message to the chat messages
      setChatMessages(prevMessages => [...prevMessages, responseMessage]);
    });
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _chatWithfileID = async (mes?: string) => {
    const data = {
      fileId: 'c02d77ef-9be3-472e-86cd-9e0a5b35e599',
      question: mes || message || "give me insurer's name",
      docType: 'POLICY_DOCUMENT',
    };
    try {
      const response = await fetch('http://localhost:8080/api/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data }),
      });

      if (response.ok) {
        // POST request successful
        const responseData = await response.json();
        const { question, answer } = responseData || {};
        // Process the response data
        console.log('responseData', question, answer);
        // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
        const _msg_obj_res: Message = {
          id: Date.now(),
          role: 'BOT',
          msg: answer || '',
        };
        setChatMessages(prevMessages => [...prevMessages, _msg_obj_res]);
      } else {
        // POST request failed
        // Handle the error
      }
    } catch (error) {
      // Error occurred during the POST request
      // Handle the error
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _suggestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/autocomplete/suggestions?prefix=what&vertical=FW');
      // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
      let _RES_OBJ: any = {
        id: Date.now(),
        role: 'BOT',
        type: 'suggestion',
        question: [],
      };
      let _QUES: any = [];
      if (response.ok) {
        // POST request successful
        const responseData = await response.json();
        if (responseData) {
          _QUES = responseData.map((_ele: Suggestions) => ({
            id: Date.now(),
            msg: _ele.question || '',
            vertical: _ele.vertical,
            category: _ele.category,
          }));
        }
        // Process the response data
        _RES_OBJ.question = _QUES;
        // console.log('responseData', _RES_OBJ);
        setChatMessages(prevMessages => [...prevMessages, ...[_RES_OBJ]]);
        // console.log('FY', chatMessages);
      } else {
        // POST request failed
        // Handle the error
      }
    } catch (error) {
      // Error occurred during the POST request
      // Handle the error
    }
  };

  useEffect(() => {
    // Fetch the API response
    loadChatHistory();
    // scrollToBottom();
  }, []);

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
    scrollToBottom();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
    const _in_str = event.target.value;
    setMessage(_in_str);
  };

  const appendMessage = async () => {
    // event.preventDefault();
    console.log(message);
    if (message) {
      // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
      const _msg_obj: Message = {
        id: Date.now(),
        role: 'Customer',
        msg: message || '',
      };
      _chatWithfileID();
      if (message === 'FW') {
        _suggestions();
      }
      setChatMessages(prevMessages => [...prevMessages, _msg_obj]);

      // Clear the input field
      setMessage('');
      scrollToBottom();
    }
  };
  const handleSuggestionClick = (mes: any) => {
    // setMessage(mes); // Set the clicked message as the input value
    const _msg_obj_res: Message = {
      id: Date.now(),
      role: 'Customer',
      msg: mes || '',
    };
    setChatMessages(prevMessages => [...prevMessages, _msg_obj_res]);
    _chatWithfileID(mes);
    console.log('Selected Suggestion', mes);
    // appendMessage(); // Call the appendMessage function to add the message to chatMessages
  };
  console.log(`Chatbot`, chatMessages);
  return (
    <Main meta={<Meta title="Chatbot" description="Chatbot" />}>
      <ChatbotWrapper className="flex flex-row">
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition className="_chat_bot_wrapper">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="_chat_bot_content flex flex-col" elevation={4}>
                <div className="_c_header flex flex-col bg-gray-900 p-2">Renewal</div>
                <div className="_c_content relative flex flex-1 flex-col gap-2 overflow-auto p-2">
                  {chatMessages.map(mes => {
                    const { msg, role, type, question, id }: { msg: any; role: string; type?: string; question?: []; id: number | string } = mes || {};
                    if (type === 'suggestion') {
                      return (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-i[]nteractions
                        <div key={id} className={`_r_chat flex flex-row gap-2 ${role === 'Customer' ? 'Customer flex-row-reverse' : 'BOT'}`}>
                          <div className="_prof flex flex-col items-center justify-center rounded-full bg-slate-400">s</div>
                          <div className="_conv relative flex flex-1 flex-col rounded-md p-2 font-normal">
                            <ul>
                              {question &&
                                question.map((_qus: any) => {
                                  const { msg, id } = _qus || {};
                                  return (
                                    <li key={id} className="_q_check_list flex hover:bg-slate-400 cursor-pointer" onClick={() => handleSuggestionClick(msg)}>
                                      {msg}
                                    </li>
                                  );
                                })}
                            </ul>
                            <div className="_arrow" />
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={mes.id} className={`_r_chat flex flex-row gap-2 ${role === 'Customer' ? 'Customer flex-row-reverse' : 'BOT'}`}>
                          <div className="_prof flex flex-col items-center justify-center rounded-full bg-slate-400">s</div>
                          <div className="_conv relative flex flex-1 flex-col rounded-md p-2 font-normal">
                            {msg}
                            <div className="_arrow" />
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
                <div className="flex items-center gap-5 py-2">
                  <form className="grow" onSubmit={appendMessage}>
                    <input
                      title="message"
                      type="text"
                      value={message}
                      onChange={handleInputChange}
                      className="ml-2 h-[36px] w-full rounded-md border border-gray-300 px-2 focus:outline-none"
                    />
                  </form>
                  <button
                    type="submit"
                    className="mr-2 rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-800 focus:outline-none"
                    onClick={appendMessage}
                  >
                    Send
                  </button>
                </div>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div
          className="_boat_button border-1 fixed bottom-2 left-2 flex cursor-pointer flex-col items-center justify-center rounded-full border border-gray-500 bg-gray-500"
          role="presentation"
          onClick={handleClick('top-start')}
        >
          <Image src={bIcon} width={35} height={35} alt="Picture of the author" />
        </div>
      </ChatbotWrapper>
      <div ref={messagesEndRef} />
    </Main>
  );
};

export default Chatbot;
