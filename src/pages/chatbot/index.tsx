import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import type { PopperPlacementType } from '@mui/material/Popper';
import Popper from '@mui/material/Popper';
import Image from 'next/image';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import bIcon from '@/public/icons/bot.svg';
import { Main } from '@/templates/Main';

import ChatbotWrapper from './style';

type Message = {
  id: number;
  content: string;
  sender: 'user' | 'bot';
};

const Chatbot = () => {
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
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim() !== '') {
      const newMessage: Message = {
        id: Date.now(),
        content: message,
        sender: 'user',
      };

      setChatMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  const appendMessage = (content: string, sender: 'user' | 'bot') => {
    const newMessage: Message = {
      id: Date.now(),
      content,
      sender,
    };

    setChatMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return (
    <Main meta={<Meta title="Chatbot" description="Chatbot" />}>
      <ChatbotWrapper className="flex flex-row">
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition className="_chat_bot_wrapper">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="_chat_bot_content flex flex-col" elevation={4}>
                <div className="_c_header flex flex-col bg-gray-900 p-2">Renewal</div>
                <div className="_c_content relative flex flex-1 flex-col gap-2 overflow-auto p-2 chatWindow">
                  {chatMessages.map(mes => (
                    <div key={mes.id} className={`_r_chat flex flex-row gap-2 ${mes.sender === 'user' ? 'even:flex-row-reverse' : ''}`}>
                      <div className="_prof flex flex-col items-center justify-center rounded-full bg-slate-400">s</div>
                      <div className="_conv relative flex flex-1 flex-col rounded-md p-2 font-normal">
                        {mes.content}
                        <div className="_arrow" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-5 py-2">
                  <form onSubmit={handleSend} className="grow">
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
                    onClick={() => appendMessage(message, 'user')}
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
