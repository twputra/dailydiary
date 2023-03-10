import {
  Flex,
  Box,
  Button,
  Text,
  Avatar,
  useColorModeValue,
  
  useDisclosure,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  // import { ExternalLinkIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
  // import DarkModeSwitch from "../components/DarkModeSwitch";
  import ModalRegister from "./Register";
  import ModalLogin from "./Login";
// import { useNavigate } from "react-router-dom";
  
  function Navbar({ username, user}) {
  // const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [opened, setOpened] = useState(false);
  const [loginOpened, setLoginOpened] = useState(false);
  const { email, photoURL } = user || {};
  // const token =  localStorage.getItem("token", token)
  
  const handleOpen = () => {
  setOpened(true);
  };
  
  const handleLoginOpen = () => {
  setLoginOpened(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    // navigate("/")
  };
  
  const handleClose = () => {
  setOpened(false);
  setLoginOpened(false);
  };
  
  return (
  <Box
  w="100%"
  bg={useColorModeValue("gray.100", "gray.800")}
  px={4}
  borderBottom="1px"
  borderColor={useColorModeValue("gray.200", "gray.700")}
  backdropFilter="saturate(180%) blur(5px)"
  >
  <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
  <Box fontFamily="'Fredoka One', cursive" fontSize="3xl">
  dailydiary
  </Box>
   {localStorage.getItem("token") ? (
      <Flex alignItems="center">
        {photoURL && (
          <Avatar
            size="sm"
            name={username}
            src={photoURL}
            mr="2"
            rounded="full"
          />
        )}
        <Text mr="2" fontWeight="bold" textAlign="right">
          {email || username}
        </Text>
        <Button size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    ) : (
      <Flex alignItems={"center"} ml={3}>
        
        <ModalRegister isOpen={opened} onClose={handleClose} />
        
        <ModalLogin isOpen={loginOpened} onClose={handleClose} />
      </Flex>
    )}
  </Flex>
</Box>
);
}

export default Navbar;













// import {
//   Flex,
//   Heading,
//   Box,
//   Button,
//   Text,
//   IconButton,
//   Stack,
//   Menu,
//   Avatar,
//   useColorModeValue,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   MenuDivider,
//   MenuGroup,
//   ButtonGroup,
//   useDisclosure,
  
// } from "@chakra-ui/react";
// import React, { useState, useContext } from "react";
// import { ExternalLinkIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
// import DarkModeSwitch from "../components/DarkModeSwitch";
// import ModalRegister from "./Register";
// import ModalLogin from "./Login";

// function Navbar({ username, auth, user, logout, singInWithGoogle }) {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [opened, setOPened] = useState(false);
  
//   const handleOpen = () => {
//     setOPened(true);
//   };
//   const closed = () => {
//     setOPened(false);
//   };
  
//   return (
//     <Box
//       w="100%"
//       bg={useColorModeValue("gray.100", "gray.800")}
//       px={4}
//       borderBottom="1px"
//       borderColor={useColorModeValue("gray.200", "gray.700")}
//       backdropFilter="saturate(180%) blur(5px)"
//     >
//       <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
//         <Box fontFamily="'Fredoka One', cursive" fontSize="3xl">
//           dailydiary
//         </Box>

//         {/* <Heading id="welcomeText">{username}</Heading> */}
//         {/* Welcome back, Virej Dasani (????) */}

//         <Flex alignItems={"center"}>
//           <Menu>
//             <Flex justify="space-between" w="100%" align="center">
//               <Flex>
//                 <DarkModeSwitch />
//               </Flex>
//             </Flex>

//             <Flex alignItems={"center"} ml={3}>
       
//             <ModalRegister isOpen={opened} onClose={closed} />
              
//             </Flex>
//           </Menu>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// }

// export default Navbar;
