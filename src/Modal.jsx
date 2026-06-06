import React from "react";

class Modal extends React.Component{
    render(){
        const {isOpen,OnClose,children}=this.props;

        if(!isOpen)
            return null;
        return(
            <div className="modal-overlay"> 
            <div className="modal-Box" >

            <button className="close-btn" onClick={OnClose}>Close</button>
     
            {children}


            </div>
            
            </div>
        )
    }
}
export default Modal;