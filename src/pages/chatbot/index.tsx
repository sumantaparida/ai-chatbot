import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send';
import HelpSharpIcon from '@mui/icons-material/HelpSharp';
import Paper from '@mui/material/Paper';
// import { CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import React, { useEffect, useState } from 'react';

import { Meta } from '@/layouts/Meta';
import logoImage from '@/public/assets/images/logo_turtlemint.svg';
import _bIcon from '@/public/icons/suraj.jpeg';
import { Main } from '@/templates/Main';

import ChatbotWrapper from './style';

interface Message {
  id: number;
  role: string;
  msg: string | object; // Update the type to accept either a string or an object
  type?: string;
  vertical?: string;
  question?: [];
  getquotes?: [];
}

interface Getquotes {
  insurer: string;
  premium: string;
  cashless: string;
  ncb: string;
  cover_amount: string;
  logo: string;
  paymentLink: string;
}

interface Suggestions {
  category: string;
  question: string;
  vertical: string;
}

interface Props {}

const Chatbot: React.FC<Props> = () => {
  const [message, setMessage] = useState('');
  const [uploadedFileId, setUploadedFileId] = useState(null);
  const [vertical, setVertical] = useState('COMMON');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const scrollToBottom = () => {
    const chatWindow = document.getElementsByClassName('_c_content')[0];
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  };

  function getUrlParam(param: any) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  const loadChatHistory = async () => {
    try {
      let apiUrl = 'http://localhost:8080/api/v1/data';
      const idParam = getUrlParam('fileIds');
      // const idParam = urlParams.get('id');
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

  const _chatWithfileID = async (mes?: string, suggestion?: boolean) => {
    const data = {
      fileId: getUrlParam('fileIds') || uploadedFileId || '',
      question: mes || message,
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
        const { answer, vertical } = responseData || {};
        // Process the response data
        console.log('responseData', responseData);
        const _msg_obj_res: Message = {
          id: Date.now(),
          role: 'BOT',
          msg: answer.answer || '',
          vertical: vertical,
        };
        setChatMessages(prevMessages => [...prevMessages, _msg_obj_res]);

        if (vertical) {
          setVertical(vertical);
        } else {
          setVertical('COMMON');
        }
      } else {
      }
    } catch (error) {}
  };
  const _suggestions = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/autocomplete/suggestions?vertical=${vertical}`);
      let _RES_OBJ: any = {
        id: Date.now(),
        role: 'Customer',
        type: 'suggestion',
        question: [],
      };
      let _QUES: any = [];
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.length >= 1) {
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

  const _get_quotes = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/autocomplete/getQuotes');
      let _RES_OBJ: any = {
        id: Date.now(),
        role: 'Getquotes',
        type: 'Getquotes',
        getquotes: [],
      };
      let _QUES: any = [];
      if (response.ok) {
        const responseData = await response.json();
        _QUES = responseData.map((_ele: Getquotes) => ({
          id: Date.now(),
          insurer: _ele.insurer || '',
          premium: _ele.premium,
          cashless: _ele.cashless,
          cover_amount: _ele.cover_amount,
          logo: _ele.logo,
          ncb: _ele.ncb,
          paymentLink: _ele.paymentLink,
        }));

        _RES_OBJ.getquotes = _QUES;
        setChatMessages(prevMessages => [...prevMessages, ...[_RES_OBJ]]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(scrollToBottom, [chatMessages]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const _in_str = event.target.value;
    setMessage(_in_str);
  };

  const appendMessage = async () => {
    // event.preventDefault();
    if (message) {
      const _msg_obj: Message = {
        id: Date.now(),
        role: 'Customer',
        msg: message || '',
      };
      if (message !== 'quote' && (getUrlParam('fileIds') || uploadedFileId)) {
        _chatWithfileID();
      }
      if (message === 'FW') {
        _suggestions();
      }
      if (message === 'quote') {
        _get_quotes();
      }
      setChatMessages(prevMessages => [...prevMessages, _msg_obj]);

      // Clear the input field
      setMessage('');
      scrollToBottom();
    }
  };
  const handleFileUpload = (event: any) => {
    const file = event.target.files[0]; // Get the uploaded file
    console.log(file);
    if (file && file.type === 'application/pdf') {
      setIsLoading(true);
      console.log('hi');
      const formData = new FormData();
      formData.append('file', file); // Append the file to the FormData object
      console.log(formData);
      // Make a POST request to the upload URL
      fetch('http://localhost:8080/api/v1/document', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          const { fileId, defaultAnswer } = data || {};
          const _msg_obj: Message = {
            id: Date.now(),
            role: 'BOT',
            type: 'default',
            msg: defaultAnswer || '',
          };
          // Handle the response from the server
          setChatMessages(prevMessages => [...prevMessages, _msg_obj]);
          setUploadedFileId(fileId);
          setIsLoading(false);
          // _suggestions();
        })
        .catch(error => {
          // Handle any error that occurred during the upload
          console.error('Upload failed:', error);
        });
    } else {
      console.log('Invalid file format. Please select a PDF file.');
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
    if (getUrlParam('fileIds') || uploadedFileId) {
      _chatWithfileID(mes, true);
    }
    // appendMessage(); // Call the appendMessage function to add the message to chatMessages
  };
  console.log(`CHAT_BOX`, chatMessages);
  return (
    <Main meta={<Meta title="Chatbot" description="Chatbot" />}>
      <ChatbotWrapper className="flex items-center justify-center overflow-hidden">
        <Paper
          style={{ width: '845px', height: '520px', borderRadius: '30px' }}
          elevation={8}
          className="flex flex-row overflow-auto bg-white _chat_bot_wrapper"
        >
          <div className="flex flex-col p-5 text-black" style={{ flex: '70%', width: '70%' }}>
            <div className="_chat_bot_content flex flex-col">
              <div className="_c_header flex flex-col bg-white text-green-950 font-bold" />
              <div className="_c_content relative flex flex-1 flex-col gap-2 overflow-auto">
                {isLoading && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                    }}
                  >
                    {/* <CircularProgress style={{ color: 'green' }} /> */}
                    <p style={{ marginTop: '10px' }}>
                      Analyzing{' '}
                      <span>
                        {' '}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="8" viewBox="-5 0 267 50">
                          <g data-name="Group 62" transform="translate(-1882 -1344)">
                            <circle cx="26.5" cy="26.5" r="26.5" transform="rotate(180 1065 698.5)">
                              <animate
                                attributeName="r"
                                begin="0s"
                                calcMode="linear"
                                dur="0.8s"
                                from="15"
                                repeatCount="indefinite"
                                to="15"
                                values="15;18.5;21;26.5;15"
                              />
                            </circle>
                            <circle cx="21" cy="21" r="21" transform="rotate(180 1030.5 695.5)">
                              <animate
                                attributeName="r"
                                begin="0s"
                                calcMode="linear"
                                dur="0.8s"
                                from="18.5"
                                repeatCount="indefinite"
                                to="18.5"
                                values="18.5;15;21;26.5;18.5"
                              />
                            </circle>
                            <circle cx="18.5" cy="18.5" r="18.5" transform="rotate(180 1000 694.5)">
                              <animate
                                attributeName="r"
                                begin="0s"
                                calcMode="linear"
                                dur="0.8s"
                                from="21"
                                repeatCount="indefinite"
                                to="21"
                                values="21;18.5;15;26.5;21"
                              />
                            </circle>
                            <circle cx="15" cy="15" r="15" transform="rotate(180 965 692.5)">
                              <animate
                                attributeName="r"
                                begin="0s"
                                calcMode="linear"
                                dur="0.8s"
                                from="26.5"
                                repeatCount="indefinite"
                                to="26.5"
                                values="26.5;21;18.5;15;26.5"
                              />
                            </circle>
                          </g>
                        </svg>
                      </span>
                    </p>
                  </div>
                )}
                {chatMessages.map(mes => {
                  const {
                    msg,
                    role,
                    type,
                    question,
                    id,
                    getquotes,
                  }: { msg: any; role: string; type?: string; question?: []; id: number | string; getquotes?: [] } = mes || {};
                  if (type === 'suggestion' && question) {
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
                  } else if (type === 'Getquotes') {
                    return (
                      <div className="flex flex-col _carousel overflow-hidden">
                        <div className="flex flex-row gap-3 overflow-auto m-2">
                          {getquotes &&
                            getquotes.map(_res => {
                              const { insurer, premium, cashless, ncb, cover_amount, logo, paymentLink } = _res || {};
                              console.log('_res', _res);
                              return (
                                <div key={insurer} className="flex flex-col _c_box bg-gray-100 hover:bg-gray-200 cursor-pointer">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex flex-col items-center justify-center _img_box">
                                      <Image src={logo} width={100} height={50} alt="" />
                                    </div>
                                    <div className="flex flex-col items-start _data_box">
                                      <div className="flex flex-col pl-1 pr-1 pb-1">
                                        <p className="flex flex-row gap-1">
                                          <span>Premium:</span>
                                          <span>{premium}</span>
                                        </p>
                                        <p className="flex flex-row gap-1">
                                          <span>Cashless:</span>
                                          <span>{cashless ? 'Yes' : 'No'}</span>
                                        </p>
                                        <p className="flex flex-row gap-1">
                                          <span>NCB:</span>
                                          <span>{ncb}</span>
                                        </p>
                                        <p className="flex flex-row gap-1">
                                          <span>Amount:</span>
                                          <span>{cover_amount}</span>
                                        </p>
                                      </div>
                                      <Link
                                        className="bg-green-700 text-white hover:bg-green-800"
                                        href={paymentLink || '/'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Buy
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    );
                  } else if (type === 'default') {
                    return (
                      <div key={mes.id} className={`_r_chat flex flex-row gap-2 ${role === 'Customer' ? 'Customer flex-row-reverse' : 'BOT'}`}>
                        <div className="_prof flex flex-col items-center justify-center rounded-full bg-green-950 text-green-50">
                          {role === 'BOT' ? <Image width={30} height={30} src={_bIcon} alt="bot" /> : 'C'}
                        </div>
                        <div className="_conv relative flex flex-col rounded-md px-2 pt-1 pb-1 py-2 font-normal bg-green-700 items-start justify-center">
                          <pre className="_default_msg">{msg}</pre>
                          <div className="_arrow" />
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
          <div className="flex items-center justify-center bg-green-950" style={{ flex: '30%', width: '30%' }}>
            <Image src={logoImage} alt="Logo" width={220} height={100} />
          </div>
        </Paper>
      </ChatbotWrapper>
    </Main>
  );
};

export default Chatbot;
