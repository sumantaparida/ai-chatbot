/* eslint-disable tailwindcss/no-custom-classname */
import React, { ReactNode } from 'react';
import Popper, { PopperPlacementType } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Paper from '@mui/material/Paper';
import bIcon from '@/public/icons/bot.svg';
import Image from 'next/image';

import ChatbotWrapper from './style';

type ChatbotProps = {
  children?: ReactNode;
};

const Chatbot = (props: ChatbotProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  console.log(`Chatbot`, props);

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(prev => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <Main meta={<Meta title="Chatbot" description="Chatbot" />}>
      <ChatbotWrapper className="flex flex-row">
        <Popper open={open} anchorEl={anchorEl} placement={placement} transition className="_chat_bot_wrapper">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="_chat_bot_content flex flex-col" elevation={4}>
                <div className="flex flex-col _c_header p-2 bg-gray-900">Renewal</div>
                <div className="flex flex-1 flex-col _c_content p-2 relative gap-2">
                  <div className="_l_chat flex flex-row gap-2">
                    <div className="rounded-full _prof flex flex-col items-center justify-center bg-slate-400">s</div>
                    <div className="flex flex-col _conv p-2 rounded-md font-normal">Testing testing testing</div>
                  </div>
                  <div className="_r_chat flex gap-2 flex-row-reverse">
                    <div className="rounded-full _prof flex flex-col items-center justify-center bg-slate-400">s</div>
                    <div className="flex flex-col _conv p-2 rounded-md font-normal">Testing testing testing</div>
                  </div>
                </div>
                <div className="flex flex-row _input_box">input</div>
              </Paper>
            </Fade>
          )}
        </Popper>
        <div
          className="_boat_button flex flex-col fixed bottom-2 left-2 cursor-pointer bg-gray-500 rounded-full items-center justify-center border border-1 border-gray-500"
          role="presentation"
          onClick={handleClick('top-start')}
        >
          <Image src={bIcon} width={35} height={35} alt="Picture of the author" />
        </div>
      </ChatbotWrapper>
    </Main>
  );
};

export default Chatbot;
