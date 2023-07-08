// import Fade from '@mui/material/Fade';
// import type { PopperPlacementType } from '@mui/material/Popper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Paper from '@mui/material/Paper';
import { color } from '@mui/system';
// import Popper from '@mui/material/Popper';
import Image from 'next/image';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import logoImage from '@/public/assets/images/logo_turtlemint.svg';
// import bIcon from '@/public/icons/bot.svg';
import _bIcon from '@/public/icons/suraj.jpeg';
import { Main } from '@/templates/Main';

import ChatbotWrapper from './style';

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
interface Props {}

const Chatbot: React.FC<Props> = () => {
  // const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  // const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadedFileId, setUploadedFileId] = useState(null);
  // const [placement, setPlacement] = useState<PopperPlacementType>();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  // const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    const chatWindow = document.getElementsByClassName('_c_content')[0];
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    try {
      let apiUrl = 'http://localhost:8080/api/v1/data';
      const urlParams = new URLSearchParams(window.location.search);
      const idParam = urlParams.get('id');
      // urlParams.get('id');

      if (idParam) {
        apiUrl += `?fileIds=${idParam}`;
      } else if (uploadedFileId) {
        apiUrl += `?fileIds=${uploadedFileId}`;
      } else {
        console.log('No ID found in the URL or uploadedFileId is missing.');
        return;
      }

      const response = await fetch(apiUrl);
      if (response.ok) {
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
        _suggestions();
      } else {
        console.log('Failed to fetch chat history.');
      }
    } catch (error) {
      console.error('Error while loading chat history:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
  const _chatWithfileID = async (mes?: string, suggestion?: boolean) => {
    const data = {
      fileId: 'c02d77ef-9be3-472e-86cd-9e0a5b35e599',
      question: mes || message || "give me insurer's name",
      docType: 'POLICY_DOCUMENT',
      suggestion,
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
        const _msg_obj_res: Message = {
          id: Date.now(),
          role: 'BOT',
          msg: answer || '',
        };
        setChatMessages(prevMessages => [...prevMessages, _msg_obj_res]);
      } else {
      }
    } catch (error) {}
  };

  const handleFileUpload = event => {
    const file = event.target.files[0]; // Get the uploaded file
    console.log(file);
    if (file && file.type === 'application/pdf') {
      const formData = new FormData();
      formData.append('file', file); // Append the file to the FormData object

      // Make a POST request to the upload URL
      fetch('http://localhost:8080/api/v1/document', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server
          console.log('Upload successful:', data.id);
          setUploadedFileId(data.id);
        })
        .catch(error => {
          // Handle any error that occurred during the upload
          console.error('Upload failed:', error);
        });
    } else {
      console.log('Invalid file format. Please select a PDF file.');
    }
  };

  const _suggestions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/autocomplete/suggestions?prefix=what&vertical=FW');
      let _RES_OBJ: any = {
        id: Date.now(),
        role: 'Customer',
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
        _RES_OBJ.question = _QUES;
        setChatMessages(prevMessages => [...prevMessages, ...[_RES_OBJ]]);
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(scrollToBottom, [chatMessages]);

  // const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLDivElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen(prev => placement !== newPlacement || !prev);
  //   setPlacement(newPlacement);
  //   scrollToBottom();
  // };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _in_str = event.target.value;
    setMessage(_in_str);
  };

  const appendMessage = async () => {
    // event.preventDefault();
    console.log(message);
    if (message) {
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
    _chatWithfileID(mes, true);
    // appendMessage(); // Call the appendMessage function to add the message to chatMessages
  };
  console.log(`Chatbot`, chatMessages);
  return (
    <Main meta={<Meta title="Chatbot" description="Chatbot" />}>
      <ChatbotWrapper className="flex items-center justify-center overflow-hidden">
        <Paper
          style={{ maxWidth: '50%', minHeight: '500px', borderRadius: '30px' }}
          elevation={8}
          className="flex flex-row overflow-auto bg-white _chat_bot_wrapper"
        >
          <div className="flex flex-col p-5 text-black" style={{ flex: '70%' }}>
            <div className="_chat_bot_content flex flex-col">
              <div className="_c_header flex flex-col bg-white text-green-950 font-bold">Renewal</div>
              <div className="_c_content relative flex flex-1 flex-col gap-2 overflow-auto">
                {chatMessages.map(mes => {
                  const { msg, role, type, question, id }: { msg: any; role: string; type?: string; question?: []; id: number | string } = mes || {};
                  if (type === 'suggestion') {
                    return (
                      <div key={id} className={`_r_chat flex flex-row gap-2 ${role === 'Customer' ? 'Customer flex-row-reverse' : 'BOT'}`}>
                        <div className="_s_conv relative flex flex-1 flex-col rounded-md font-normal justify-center">
                          <p className="_q_check_list">
                            <span className="_q_mark">
                              <HelpSharpIcon fontSize="medium" className="text-green-950" />
                            </span>
                            {question &&
                              question.map((_qus: any) => {
                                const { msg, id } = _qus || {};
                                return (
                                  <span
                                    key={id}
                                    className="_q_check_list hover:bg-green-900 bg-green-800 cursor-pointer list"
                                    onClick={() => handleSuggestionClick(msg)}
                                  >
                                    {msg}
                                  </span>
                                );
                              })}
                          </p>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={mes.id} className={`_r_chat flex flex-row gap-2 ${role === 'Customer' ? 'Customer flex-row-reverse' : 'BOT'}`}>
                        <div className="_prof flex flex-col items-center justify-center rounded-full bg-green-950 text-green-50">
                          {role === 'BOT' ? <Image width={30} height={30} src={_bIcon} alt="bot" /> : 'C'}
                        </div>
                        <div className="_conv relative flex flex-col rounded-md px-2 pt-1 pb-1 py-2 font-normal bg-green-700 items-start justify-center">
                          {msg}
                          <div className="_arrow" />
                        </div>
                      </div>
                    );
                  }
                })}
                {/* <div ref={messagesEndRef} /> */}
              </div>
              <div className="flex items-center flex-row justify-center p-2 bg-gray-300 mt-3">
                <div className="flex flex-col">
                  <label
                    htmlFor="file-upload"
                    className="rounded-md bg-green-900 text-green-50 px-2 hover:bg-green-950 focus:outline-none flex items-center"
                    style={{ height: '2rem' }}
                  >
                    <UploadFileIcon className="item-center" style={{ height: '2rem' }} />
                  </label>
                  <input title="file" id="file-upload" type="file" accept=".pdf" style={{ display: 'none' }} onChange={handleFileUpload} />
                </div>
                <div className="flex flex-col flex-1">
                  <form className="grow" onSubmit={appendMessage}>
                    <input
                      title="message"
                      type="text"
                      value={message}
                      onChange={handleInputChange}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault(); // Prevent form submission
                          appendMessage(); // Call the appendMessage function
                        }
                      }}
                      className="h-[36px] w-full rounded-md border border-gray-300 px-2 focus:outline-none ml-0"
                    />
                  </form>
                </div>
                <div className="flex flex-row">
                  <button
                    type="submit"
                    className="mr-2 rounded-md bg-green-900 text-green-50 px-4 py-2 hover:bg-green-950 focus:outline-none flex items-center"
                    onClick={appendMessage}
                    style={{ height: '2rem' }}
                  >
                    <SendIcon className="py-2 item-center" style={{ transform: 'rotate(315deg)', height: '2rem' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center bg-green-950" style={{ flex: '30%' }}>
            <Image src={logoImage} alt="Logo" width={220} height={100} />
          </div>
        </Paper>
      </ChatbotWrapper>
    </Main>
  );
};

export default Chatbot;
