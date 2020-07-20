import React, { useState } from 'react';
import '../styles/contactUsStyles.scss';
import { TextField, Button } from '@material-ui/core/';


function ContactUs() {
  const [message, setMessage] = useState('');

  const messageInput = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log(message);
  };

  return (
    <div className="contact-us-container">
      <div>Send us a message</div>
      <TextField
        className="multiline-input"
        label=":)"
        multiline
        onChange={(e) => messageInput(e)}
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={() => sendMessage()}>Send</Button>
    </div>
  );
}

export default ContactUs;
