// import { useState } from "react";
// import axios from "axios";

// function UpdateMessage() {
//   const [message, setMessage] = useState({
//     sender: "",
//     text: "",
//     data: {
//       likes: 0,
//       dislikes: 0,
//       status: ""
//     },
   
//   });

//   const [id, setId] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setMessage((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleDataChange = (e) => {
//     const { name, value } = e.target;

//     setMessage((prev) => ({
//       ...prev,
//       data: {
//         ...prev.data,
//         [name]:
//           name === "likes" || name === "dislikes"
//             ? Number(value)
//             : value
//       }
//     }));
//   };

//  const handleUpdate = async (e) => {
//   e.preventDefault();

//   const payload = {
//     sender: message.sender,
//     text: message.text,
//     likes: message.data.likes,
//     dislikes: message.data.dislikes,
//     status: message.data.status
//   };

//   try {
//     console.log("FINAL PAYLOAD:", payload);

//     await axios.put(`http://localhost:8080/message/${id}`, payload);

//     alert("Message Updated Successfully");
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     alert("Update failed");
//   }
// };

//   return (
//     <form onSubmit={handleUpdate}>
//      <div className="mb-3">
//         <label htmlFor="Id" className="form-label">
//           ID
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="Id"
//           name="Id"
//         value={id}
//           placeholder="Enter your name"
        
//           onChange={(e) => setId(e.target.value)}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="sender" className="form-label">
//           Sender
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="sender"
//           name="sender"
//         value={message.sender}
//           placeholder="Enter your name"
        
//           onChange={handleChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="message" className="form-label">
//           Text
//         </label>
//         <textarea
//           className="form-control"
//           id="text"
//           name="text"
//           value={message.text}
//           rows="3"
//           onChange={handleChange}
        
//         />
//       </div>
       
//       <div className="mb-3">
//         <label htmlFor="sender" className="form-label">
//           Likes
//         </label>
//         <input
//           type="number"
//           className="form-control"
//           id="likes"
//           name="likes"
//         value={message.data.likes}
          
        
//           onChange={handleDataChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="sender" className="form-label">
//           Dislikes
//         </label>
//         <input
//           type="number"
//           className="form-control"
//           id="dislikes"
//           name="dislikes"
//         value={message.data.dislikes}
        
        
//           onChange={handleDataChange}
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="sender" className="form-label">
//           Status
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="status"
//           name="status"
//         value={message.data.status}
     
        
//           onChange={handleDataChange}
//         />
//       </div>


//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// }

// export default UpdateMessage;



import { useState } from "react";
import axios from "axios";

function UpdateMessage() {
  const [id, setId] = useState("");

  const [message, setMessage] = useState({
    sender: "",
    text: "",
    data: {
      likes: 0,
      dislikes: 0,
      status: ""
    },
    nstatus: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => ({
      ...prev,
      [name]: name === "nstatus" ? Number(value) : value
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
      data: {
        likes: message.data.likes,
        dislikes: message.data.dislikes,
        status: message.data.status
      },
      nstatus: message.nstatus
    };

    try {
      console.log("Payload:", payload);

      const response = await axios.put(
        `http://localhost:8080/message/${id}`,
        payload
      );

      console.log(response.data);
      alert("Message Updated Successfully");

      setMessage({
        sender: "",
        text: "",
        data: {
          likes: 0,
          dislikes: 0,
          status: ""
        },
        nstatus: 1
      });

      setId("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Update Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Message</h2>

      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Message ID</label>
          <input
            type="number"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Sender</label>
          <input
            type="text"
            className="form-control"
            name="sender"
            value={message.sender}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Text</label>
          <textarea
            className="form-control"
            name="text"
            rows="3"
            value={message.text}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Likes</label>
          <input
            type="number"
            className="form-control"
            name="likes"
            value={message.data.likes}
            onChange={handleDataChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dislikes</label>
          <input
            type="number"
            className="form-control"
            name="dislikes"
            value={message.data.dislikes}
            onChange={handleDataChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>
          <input
            type="text"
            className="form-control"
            name="status"
            value={message.data.status}
            onChange={handleDataChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">NStatus</label>
          <input
            type="number"
            className="form-control"
            name="nstatus"
            value={message.nstatus}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Message
        </button>
      </form>
    </div>
  );
}

export default UpdateMessage;