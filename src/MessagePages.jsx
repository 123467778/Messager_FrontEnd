import  Modal from "./Modal";
import './Modal.css'
import CreateMessage from "./CreateMessage";
import UpdateMessage from "./UpdateMessage";
import DeleteMessage from "./DeleteMessage";
import GetMessage from "./GetMessage";

import React from "react";


class MessagePages extends React.Component{
    state ={
        modalType:null,
        refresh:false

    };

    triggerRefresh=()=>{
        this.setState(prevState => ({refresh:!prevState.refresh}));
    };


    openModal =(type)=>{
        this.setState({modalType:type});
    };

    closeModal =()=>{
        this.setState({modalType:null});

    };

    render(){
        const {modalType,refresh}=this.state;
        return(
            <div>
                <button onClick={()=>this.openModal("create")}>Add</button>
                <button onClick={()=>this.openModal("update")}>Edit</button>
                <button onClick={()=>this.openModal("delete")}>delete</button>
                <Modal isOpen ={modalType!==null} onClose={this.closeModal}>

                {modalType ==="create" && (<CreateMessage />)}
                {modalType ==="update" && (<UpdateMessage/>)}
                {modalType ==="create" && (<DeleteMessage/>)}


                </Modal>
                <GetMessage/>

            </div>
        )
    }
}
export default MessagePages;