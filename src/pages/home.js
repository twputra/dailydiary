import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import Landing from "../components/Landing";
// import ImageHome from "../assets/img/diary-notebook.jpg"
import ImageHome from "../assets/img/diary-notebook.jpg"



export default function Home() {
    return (
        <div className="App">
          <>
            <Flex
              flexDir="column"
              maxW={800}
              align="center"
              mx="auto"
              px={4}
              mt={20}
            >
              <Landing />

              <Box borderRadius='lg'>
              <Image
              width={"100%"}
              alt=""
              src={ImageHome}
              borderRadius='lg'
              style={{marginTop: '20'}}
              ></Image>
              </Box>

            <Flex
              flexDir="column"
              maxW={800}
              align="center"
              mx="auto"
              px={4}
              mt={20}
            >
            </Flex>
            </Flex>
  
          </>
      </div>
    );
  }
  