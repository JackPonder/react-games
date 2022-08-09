import { updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import "../styles/Chat.css";

export default function Chat({ docRef, messages }) {
  const [formValue, setFormValue] = useState("");
  const {user} = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!user) return;

    document.getElementById("form").reset();
    await updateDoc(docRef, {
      messages: arrayUnion({
        content: formValue,
        creator: user.displayName,
        timestamp: new Date()
      })
    })
  }

  const handleChange = (event) => {
    setFormValue(event.target.value);
  }

  return (
    <div className="chat">
      <div style={{ overflow: "auto", marginBottom: "20px" }}>
        {messages.map(message => 
          <div style={{marginBottom: "1vmin"}}>
            <small>{message.creator}</small>
            {message.creator === user?.displayName ?
              <div className="chat-message self">{message.content}</div> :
              <div className="chat-message">{message.content}</div> 
            }
          </div>
        )}        
      </div>
      <form onSubmit={handleSubmit} style={{marginTop: "auto"}} id="form">
        <input type="text" className="form-control" onChange={handleChange}
          placeholder={user ? `Chat as ${user?.displayName}` : "Chat!"} />
      </form>
    </div>
  )
}