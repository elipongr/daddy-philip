import React, { useState} from 'react';
import './App.css';
import chatJson from './data.json';
import {Timeline } from "antd";

interface Chat {
    participants: string[],
    conversation: Message[]
}

interface Message {
    sender: string,
    created_at: string,
    likes?: any,
    media_owner?: any,
    media_share_caption?: any,
    media_share_url?: any,
    text?: any
}

var dateFormat = require('dateformat');
const KATHA = "katha.hr";
const PHILIP = "philip_pl_";
const SHOW_KATA = "Katha";
const SHOW_PHILIP = "Philip";
const allChats: Chat[] = chatJson;
const tempChat: Message[] = [];

const initChat = (): Message[] => {
    allChats.forEach(({participants, conversation}) => {
        if (participants[0] === KATHA || participants[1] === KATHA) {
            conversation.forEach((message) => {
                if (message.text) {
                    if (message.sender === KATHA) {
                        message.sender = SHOW_KATA;
                    }
                    if (message.sender === PHILIP) {
                        message.sender = SHOW_PHILIP;
                    }
                    tempChat.unshift(message);
                }
            })
        }
    });
    return tempChat;
}

const App = () => {
    const [chat, setChat] = useState<Message[]>(initChat);



    return (
        <div className={"App"}>
            <h1 style={{textAlign: "center"}}>Fifty shades of Philip</h1>
            <Timeline mode={"left"}>
                {
                    chat.map(({sender, created_at, text}, index) => {
                        return <Timeline.Item key={index} color={sender === SHOW_KATA ? "red" : "blue"}
                                              label={sender + dateFormat(created_at, '(HH:MM dd.mm.yyyy)') + ":"}>
                            {text}
                        </Timeline.Item>
                    })
                }
            </Timeline>
            Philip
        </div>
    );
}

export default App;
