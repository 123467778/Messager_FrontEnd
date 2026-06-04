import React from "react";
import { useNavigate } from "react-router-dom";

function Buttons(){
    const navigate = useNavigate();
    const style = {margin:"20px"}
        return (
    
      <>
      <div >
        <h2>Messenger Application</h2>

      

       <button type="button" class="btn btn-info" onClick={()=>navigate("/create")  } style={style}>

          Create Message
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/update")}
          style={style}
        >
          Update Message
        </button>

        <button
          className="btn btn-danger"
          onClick={() => navigate("/delete")}
          style={style}
        >
          Delete Message
        </button>

        <button
          className="btn btn-info"
          onClick={() => navigate("/messages")}
          style={style}
        >
          View Messages
        </button>

      
      </div>
      </>
   
    
  );
    
}
export default Buttons;