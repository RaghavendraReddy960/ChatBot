import React, { useEffect, useState } from "react";
import { Flex, Input, Button } from "@chakra-ui/react";
import { Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import MicRecorder from 'mic-recorder-to-mp3';
import micLogo from "../components/mic.png"
import Popup from 'reactjs-popup';
import recordingAnimation from './recording.gif'
import stopRecording from './stop_recording.png'
import axios from "axios";

const Footer = ({ inputMessage, setInputMessage, handleSendMessage, setMessages }) => {
  const [isRecording, setIsRecording] = useState(false)
  const [Mp3Recorder, setMp3Recorder] = useState(
    new MicRecorder({ bitRate: 128 })
    );

  const startRecording = () => {
    navigator.getUserMedia({ audio: true },
      () => {
        console.log('Permission Granted');
        Mp3Recorder
          .start()
          .then(() => {
            setIsRecording(true);
          }).catch((e) => console.error(e));

      },
      () => {
        console.log('Permission Denied');

      },
    );

  }

  const stopRecordingfn = () => {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log(blob)
        setIsRecording(false)
        const formData=new FormData();
        formData.append('audioFile',blob);
        for (var key of formData.entries()) {
          console.log(key[0] + ', ' + key[1]);
      }
        axios.post('http://localhost:5000/speechToText',formData,{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }).then(res=>{
          console.log(res.data);
          setMessages((old) => [...old, { from: "computer", text: res.data['reply'] }]);
        }).catch(e=>console.log(e))

        
      }).catch((e) => console.log(e));

  }

  return (
    <div>
      {isRecording && <div style={{ position: "absolute", backgroundColor: "#5982e2", width: "50vw", height: "50vw", top: "0", left: "0", bottom: "0", right: "0", margin: "auto", maxWidth: "250px", maxHeight: "250px", borderRadius: "50%" }}>
        <div style={{ display: "flex", height: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img src={recordingAnimation} style={{ height: "50%", width: "50%" }}></img>
          <button title="Stop Recording" style={{ height: "25%", width: "25%" }} onClick={() => { stopRecordingfn() }}><img src={stopRecording}></img></button>
        </div>
      </div>}
      <Flex w="100%" mt="5">

        <Input
          placeholder="Type Something..."
          border="none"
          borderRadius="none"
          _focus={{
            border: "1px solid black",
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />

        <button onClick={() => { startRecording() }}>
          <img style={{ width: "2rem", height: "2rem" }} src={micLogo} />
        </button>
        <Button
          bg="black"
          color="white"
          borderRadius="none"
          _hover={{
            bg: "white",
            color: "black",
            border: "1px solid black",
          }}
          disabled={inputMessage.trim().length <= 0}
          onClick={handleSendMessage}
        >
          Send
        </Button>

      </Flex>
    </div>
  );
};

export default Footer;
