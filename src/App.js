import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import GetMessage from './GetMessage';
import CreateMessage from './CreateMessage';
import UpdateMessage from './UpdateMessage';
import DeleteMessage from './DeleteMessage';
import Buttons from './Buttons'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Messages from './Messages';

import MessagePages  from './MessagePages';


function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Buttons />} />
        <Route path="/create" element={<CreateMessage />} />
        <Route path="/update" element={<UpdateMessage />} />
        <Route path="/delete" element={<DeleteMessage />} />
        <Route path="/messages" element={<GetMessage />} />
      </Routes>
    </BrowserRouter> */}
    {/* <Messages />; */}
    {/* <MessagePages/> */}
    <CreateMessage/>
    </>
  );
}

export default App;
