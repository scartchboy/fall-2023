import React, { useState } from 'react'
import './Chatbot.css'
import { Send } from '@material-ui/icons';

export const Chatbot = () => {
    let hide = {
        display: 'none',
    }
    let show = {
        display: 'block'
    }
    let textRef = React.createRef()
    const messages = ['Hello Chat bot', 'Hi Einstein']

    const [chatopen, setChatopen] = useState(false)
    const toggle = e => {
        setChatopen(!chatopen)
    }

    const handleSend = e => {
        messages.push(e.target.value)
        console.log(e.target.value);
    }

    return (
        <div id='chatCon'>
            <div class="chat-box" style={chatopen ? show : hide}>
                <div class="header">Chat with me</div>
                <div class="msg-area">
                    {
                        messages.map((msg, i) => (
                            i % 2 ? (
                                <p class="right"><span>{msg}</span></p>
                            ) : (
                                <p class="left"><span>{msg}</span></p>
                            )
                        ))
                    }

                </div>
                <div class="footer">
                    <input type="text" ref={textRef} />
                    <button onClick={handleSend}><Send/></button>
                </div>
            </div>
            <div class="pop">
                <p><img onClick={toggle} src="/images/chatIcon.png" alt="" /></p>
            </div>
        </div>
    )
}

export default Chatbot