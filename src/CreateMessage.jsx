// import { useState } from "react";
// import axios from "axios";

// function CreateMessage(){
// //  const[sender,setSender]=useState("");
// //  const [text,setText]=useState("");


// const[message,setMessage]=useState({sender:"" ,text:""})

// const handleChange = (e) => {
//     setMessage({ ...message, [e.target.name]: e.target.value });

//   }; 


// const handleSubmit= async (e)=>{
//     e.preventDefault();
//     try{
//         axios.post("http://localhost:8080/message/create",message);
//          console.log(message.sender);
//         console.log(message.text);



//         alert("Message Saved Successfully...");
//                setMessage({sender:"" ,  text:""});




//     }
//     catch(err){
//         alert("Something went wrong...");
//     }

// }

//     return(
// <>

// <form onSubmit={handleSubmit}>
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
//        <div className="mb-3">
//         <label htmlFor="nstatus" className="form-label">
//           Nstatus
//         </label>
//         <input
//           type="text"
//           className="form-control"
//           id="nstatus"
//           name="nstatus"
//         value={message.nstatus}
//         placeholder="Enter your status code "

//           onChange={handleChange}
//         />
//       </div>

//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
// </>
//     );
// }
// export default CreateMessage;


import { useState } from "react";
import axios from "axios";
import { useReducer } from "react";


/// Initial state 
const initialState = {
  sender: "",
  text: "",
  data: {
    likes: 0,
    dislikes: 0,
    status: ""
  },
  nstatus: 1
};

// 2. Reducer Function
function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]:
            action.field === "nstatus"
              ? Number(action.value)
              : action.value
      };

    case "SET_DATA_FIELD":
      return {
        ...state,
        data: {
          ...state.data,
          [action.field]:
            action.field === "likes" || action.field === "dislikes"
              ? Number(action.value)
              : action.value
        }
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function CreateMessage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 3. Handle normal inputs
  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };

  // 4. Handle nested inputs (data object)
  const handleDataChange = (e) => {
    dispatch({
      type: "SET_DATA_FIELD",
      field: e.target.name,
      value: e.target.value
    });
  };



  // validation
  const [errors, setErrors] = useState({})
  const validate = (state) => {
    let err = {};

    if (!state.sender.trim()) {
      err.sender = "Sender is required";
    }

    if (!state.text.trim()) {
      err.text = "Text is required";
    } else if (state.text.length > 250) {
      err.text = "Text must be less than 250 characters";
    }


   if (state.nstatus !== 1 && state.nstatus !== -1) {
  err.nstatus = "Nstatus must be 1 or -1";
}

    return err;
  };






  // 5. Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    const validationErrors = validate(state);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }





    try {
      await axios.post("http://localhost:8080/message/create", state);

      console.log(state);
      alert("Message Saved Successfully");

      dispatch({ type: "RESET" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sender" className="form-label">
            Sender
          </label>
          <input
            type="text"
            className="form-control"
            id="sender"
            name="sender"
            value={state.sender}
            placeholder="Enter your name"

            onChange={handleChange}
          />
          {errors.sender && (
            <p style={{ color: "red" }}>{errors.sender}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Text
          </label>
          <textarea
            className="form-control"
            id="text"
            name="text"
            value={state.text}
            rows="3"
            onChange={handleChange}

          />
          {errors.text && (
            <p style={{ color: "red" }}>{errors.text}</p>
          )}

        </div>
        <div className="mb-3">
          <label>Nstatus</label>

          <select
            className="form-control"
            name="nstatus"
            value={state.nstatus}
            onChange={handleChange}
          >
            <option value={1}>1</option>
            <option value={-1}>-1</option>
          </select>

          {errors.nstatus && (
            <p style={{ color: "red" }}>{errors.nstatus}</p>
          )}
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
            value={state.data.likes}


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
            value={state.data.dislikes}


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
            value={state.data.status}


            onChange={handleDataChange}
          />
        </div>


        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
export default CreateMessage;




