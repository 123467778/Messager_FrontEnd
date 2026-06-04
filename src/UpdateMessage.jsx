import { useState } from "react";
import axios from "axios";

function UpdateMessage() {
  const [message, setMessage] = useState({
    sender: "",
    text: "",
    data: {
      likes: 0,
      dislikes: 0,
      status: ""
    },
   
  });

  const [id, setId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => ({
      ...prev,
      data: {
        ...prev.data,
        [name]:
          name === "likes" || name === "dislikes"
            ? Number(value)
            : value
      }
    }));
  };

 const handleUpdate = async (e) => {
  e.preventDefault();

  const payload = {
    sender: message.sender,
    text: message.text,
    likes: message.data.likes,
    dislikes: message.data.dislikes,
    status: message.data.status
  };

  try {
    console.log("FINAL PAYLOAD:", payload);

    await axios.put(`http://localhost:8080/message/${id}`, payload);

    alert("Message Updated Successfully");
  } catch (err) {
    console.error(err.response?.data || err.message);
    alert("Update failed");
  }
};

  return (
    <form onSubmit={handleUpdate}>
     <div className="mb-3">
        <label htmlFor="Id" className="form-label">
          ID
        </label>
        <input
          type="text"
          className="form-control"
          id="Id"
          name="Id"
        value={id}
          placeholder="Enter your name"
        
          onChange={(e) => setId(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sender" className="form-label">
          Sender
        </label>
        <input
          type="text"
          className="form-control"
          id="sender"
          name="sender"
        value={message.sender}
          placeholder="Enter your name"
        
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Text
        </label>
        <textarea
          className="form-control"
          id="text"
          name="text"
          value={message.text}
          rows="3"
          onChange={handleChange}
        
        />
      </div>
       
      <div className="mb-3">
        <label htmlFor="sender" className="form-label">
          Likes
        </label>
        <input
          type="number"
          className="form-control"
          id="likes"
          name="likes"
        value={message.data.likes}
          
        
          onChange={handleDataChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sender" className="form-label">
          Dislikes
        </label>
        <input
          type="number"
          className="form-control"
          id="dislikes"
          name="dislikes"
        value={message.data.dislikes}
        
        
          onChange={handleDataChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="sender" className="form-label">
          Status
        </label>
        <input
          type="text"
          className="form-control"
          id="status"
          name="status"
        value={message.data.status}
     
        
          onChange={handleDataChange}
        />
      </div>


      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default UpdateMessage;