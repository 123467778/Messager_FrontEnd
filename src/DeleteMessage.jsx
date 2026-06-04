import { useState } from "react";
import axios from "axios";

function DeleteMessage() {
  const [id, setId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:8080/message/${id}`
      );

      console.log(response.data);
      alert("Message deleted successfully");

      setId("");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Message</h2>

      <form onSubmit={handleDelete}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Message ID
          </label>

          <input
            type="number"
            className="form-control"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter Message ID"
            required
          />
        </div>

        <button type="submit" className="btn btn-danger">
          Delete Message
        </button>
      </form>
    </div>
  );
}

export default DeleteMessage;