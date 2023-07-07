import type { ChangeEvent, ReactNode } from 'react';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import type { PopperPlacementType } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import bIcon from '@/public/icons/bot.svg';
import { Main } from '@/templates/Main';

import ChatbotWrapper from './style';

type ChatbotProps = {
  children?: ReactNode;
};

// type Message = {
//   id: number;
//   role: string;
//   msg: string;
// };
interface Message {
  id: number;
  role: string;
  msg: string | object; // Update the type to accept either a string or an object
}

const Chatbot = (props: ChatbotProps) => {
  const defaultMessage = {
    id: Date.now(),
    role: 'bot',
    msg: 'Default msg',
  };
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [chatMessages, setChatMessages] = useState<Message[]>([defaultMessage]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _in_str = event.target.value;
    setMessage(_in_str);
  };

  // const handleSend = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const _msg_obj: Message = {
  //     id: Date.now(),
  //     role: 'user',
  //     msg: message,
  //   };
  //   setChatMessages(prevMessages => [...prevMessages, _msg_obj]);
  // };

  const appendMessage = (event: any) => {
    event.preventDefault();
    // const newMessage: Message = {
    //   id: Date.now(),
    //   content,
    //   sender,
    // };
    // setChatMessages(prevMessages => [...prevMessages, newMessage]);
    if (message) {
      const _msg_obj: Message = {
        id: Date.now(),
        role: 'user',
        msg: message || '',
      };
      setChatMessages(prevMessages => [...prevMessages, _msg_obj]);
      setMessage('');
    }
  };
  console.log(`Chatbot`, props);
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
                    const { msg, role }: { msg: any; role: string } = mes || {};
                    return (
                      <div key={mes.id} className={`_r_chat flex flex-row gap-2 ${role === 'user' ? 'user flex-row-reverse' : 'bot'}`}>
                        <div className="_prof flex flex-col items-center justify-center rounded-full bg-slate-400">s</div>
                        <div className="_conv relative flex flex-1 flex-col rounded-md p-2 font-normal">
                          {msg}
                          <div className="_arrow" />
                        </div>
                      </div>
                    );
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
