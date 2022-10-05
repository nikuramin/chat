import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled'
import { TextField, IconButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiPicker from 'emoji-picker-react';


const ChatRoot = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;
const ChatMessagesPlace = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 16px;
`;

const ChatMessageBase = styled.div`
    text-align: ${({ isMe }) => isMe ? 'right' : 'left'};
`;
const ChatMessage = ({ msg: { message, u_name, dt }, isMe }) => <ChatMessageBase {...{ isMe }}>{isMe ? '' : `${u_name}: `}{message}</ChatMessageBase>;

const ChatMessageFormBase = styled.form`
    display: flex;
    height: 24px;
    align-items: center;
`;
const ChatMessageForm = ({ onSubmit }) => {
    const [isOpenEmoji, setOpenEmoji] = useState(false);
    const inputRef = useRef();
    
    return <ChatMessageFormBase {...{ onSubmit }}>
        <TextField {...{ inputRef, fullWidth: true, label: 'Введите сообщение', name: 'message' }} />
        <IconButton {...{ color: 'primary', onClick: () => { setOpenEmoji(true) } }}>
            <InsertEmoticonIcon />
        </IconButton>
        {isOpenEmoji && <EmojiPicker
            {...{
                emojiStyle: 'google',
                lazyLoadEmojis: true,
                onEmojiClick: e => {
                    inputRef.current.value += ` ${e.emoji} `;
                    inputRef.current.focus();
                    // console.log(inputRef.current.value, e);
                    setOpenEmoji(false);
                }
            }}
        />}
    </ChatMessageFormBase>
};
let webSocket;

const Chat = ({ u_name }) => {

    const wsMessage = (m = {}) => JSON.stringify({ ...m, dt: new Date(), u_name });
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        webSocket = new WebSocket('ws://localhost:8801');
        webSocket.onopen = () =>
            webSocket.send(wsMessage({
                message: 'enter in chat',
                isService: true,
            }));
        webSocket.onmessage = ({ data }) => {
            const m = JSON.parse(data);
            console.log('inner message', m);
            setMessages(msgs => [...msgs, m]);
        };
    }, []);

    const handleSubmitMessageForm = e => {
        e.preventDefault();
        const message = e.target["message"].value;
        console.log('outer message', { message });
        webSocket.send(wsMessage({ message }));
        e.target["message"].value = '';
    };

    return <ChatRoot>
        <ChatMessagesPlace>
            {messages?.map((msg, i) => <ChatMessage {...{ msg, isMe: msg.u_name === u_name, key: `${i}-chat-message` }} />)}
        </ChatMessagesPlace>
        <ChatMessageForm {...{ onSubmit: handleSubmitMessageForm }} />
    </ChatRoot>;
};


export default Chat;
