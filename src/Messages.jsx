import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [editId, setEditId] = useState(null);

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

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/message/get"
      );

      setMessages(
        response.data.filter(
          (msg) => msg.nstatus !== -1
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

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

  const clearForm = () => {
    setEditId(null);

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
  };

  const handleEdit = (msg) => {
    setEditId(msg.id);

    setMessage({
      sender: msg.sender,
      text: msg.text,
      data: {
        likes: msg.data.likes,
        dislikes: msg.data.dislikes,
        status: msg.data.status
      },
      nstatus: msg.nstatus
    });
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8080/message/${editId}`,
          message
        );

        alert("Message Updated Successfully");
      } else {
        await axios.post(
          "http://localhost:8080/message",
          message
        );

        alert("Message Added Successfully");
      }

      loadMessages();

      const modalElement =
        document.getElementById("messageModal");

      const modal =
        Modal.getInstance(modalElement);

      if (modal) {
        modal.hide();
      }

      clearForm();

    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8080/message/${id}`
      );

      alert("Message Deleted Successfully");

      loadMessages();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container mt-4">

      {/* Top Buttons */}
      <div className="d-flex justify-content-between mb-4">

        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#messageModal"
          onClick={clearForm}
        >
          Add Message
        </button>

        <button
          className="btn btn-primary"
          onClick={loadMessages}
        >
          Messages
        </button>

      </div>

      {/* Messages Grid */}

      <h3 className="mb-3">Messages</h3>

      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Text</th>
            <th>Likes</th>
            <th>Dislikes</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {messages.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No Messages Found
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.sender}</td>
                <td>{msg.text}</td>
                <td>{msg.data.likes}</td>
                <td>{msg.data.dislikes}</td>
                <td>{msg.data.status}</td>

                <td>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#messageModal"
                    onClick={() => handleEdit(msg)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(msg.id)
                    }
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

      {/* Modal */}

      <div
        className="modal fade"
        id="messageModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">
                {editId
                  ? "Update Message"
                  : "Add Message"}
              </h5>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">

              <div className="mb-3">
                <label className="form-label">
                  Sender
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="sender"
                  value={message.sender}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Text
                </label>

                <textarea
                  className="form-control"
                  name="text"
                  rows="3"
                  value={message.text}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Likes
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="likes"
                  value={message.data.likes}
                  onChange={handleDataChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Dislikes
                </label>

                <input
                  type="number"
                  className="form-control"
                  name="dislikes"
                  value={message.data.dislikes}
                  onChange={handleDataChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Status
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="status"
                  value={message.data.status}
                  onChange={handleDataChange}
                />
              </div>

            </div>

            <div className="modal-footer">

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>

              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                {editId ? "Update" : "Save"}
              </button>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Messages;