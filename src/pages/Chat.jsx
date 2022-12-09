import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Divider from "../components/Divider";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Messages from "../components/Messages";
import axios from "axios";


const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "computer", text: "Hi, How can I help you?" },
    { from: "me", text: "Hi" }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (!inputMessage.trim().length) {
      return;
    }
  
    const data_input = inputMessage;

    setMessages((old) => [...old, { from: "me", text: data_input }]);
    setInputMessage("");

    axios.post('http://localhost:5000/Messeges',{
      message: inputMessage
    },{
          headers:{
            'Content-Type':'application/json',
          }, withCredentials: true
        }).then(res=>{
          setMessages((old) => [...old, { from: "computer", text: res['data']['reply'] }]);
        }).catch(e=>{
          setMessages((old) => [...old, { from: "computer", text: 'Error!' }]);
        })
    
    // setTimeout(() => {
    //   setMessages((old) => [...old, { from: "computer", text: "Query Missing" }]);
    // }, 1000);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" align="center">
      <Flex w={["100%", "100%", "40%"]} h="90%" flexDir="column">
        <Header />
        <Divider />
        <Messages messages={messages} />
        <Divider />
        <Footer
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          setMessages={setMessages}
        />
      </Flex>
    </Flex>
  );

};
export default Chat;
