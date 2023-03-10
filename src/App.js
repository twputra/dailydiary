import "./App.css";
import React, { useState, useEffect } from "react";
import { Flex, } from "@chakra-ui/react";
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import User from "./pages/user";
import Navbar from "./components/Navbar";
import NavbarUser from "./components/NavbarUser";

function App() {
  const [show, setShow] = useState(true);

  // this is to show the alert notification when context is set
  useEffect(() => {
    const timeId = setTimeout(() => {
      // After 3 seconds set the show value to false
      setShow(false);
    }, 1000);

    return () => {
      clearTimeout(timeId);
    };
  }, [show]);

  return (
    <>
    <Flex position="fixed" top="0" w="100%">
      {!localStorage.getItem("token") ? <Navbar /> : <NavbarUser /> }
      
    </Flex>
    <Routes>
      <Route path ="/" element={<Home />} />
      <Route path ="user" element={<User />} />
    </Routes>
    </>
  );
}

export default App;