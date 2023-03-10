import {
    Flex,
    Box,
    Button,
    useColorModeValue,
    } from "@chakra-ui/react";
    import React from "react";
  import { useNavigate } from "react-router-dom";
    
    function NavbarUser() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate("/")
      window.location.reload()
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
          <Button size="sm" onClick={handleLogout}>
            Logout
          </Button>
    </Flex>
  </Box>
  );
  }
  
  export default NavbarUser;
  
  
  
  
  
  
  
  
  
  
  
  
  
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
  //         {/* Welcome back, Virej Dasani (👆) */}
  
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
  