// import React, { useState } from "react";
// import {
//   Text,
//   useColorModeValue,
//   Flex,
//   IconButton,
//   Input,
//   VStack,
//   HStack,
// } from "@chakra-ui/react";
// import {  CheckIcon } from "@chakra-ui/icons";
// import { FaRegFileArchive } from 'react-icons/fa'
// import moment from "moment";

// export default function DiaryCard({
//   emoji,
//   deleteEmoji,
//   id,
//   sendContextData,
//   diaryContext,
//   timestamp,
//   title,
// }) {
//   const [input, setInput] = useState("");

//   return (
//     <>
   
//       <Flex
//         w="100%"
//         align="center"
//         bg={useColorModeValue("gray.200", "gray.700")}
//         id="card"
//         m="4"
//         boxShadow="lg"
//         borderRadius="28px"
//         px={2}
//       >
//         <Text fontSize="6xl" m="4">
//           {emoji}
//         </Text>

//         <VStack width="100%">
//           <Text
//             width="95%"
//             color={useColorModeValue("gray.700", "gray.200")}
//             textAlign="left"
//             fontSize={["xs", "sm", "md"]}
//             fontFamily="'Work Sans', sans-serif"
//             fontWeight="normal"
//           >
//             {moment(timestamp).format("l") +
//               " at " +
//               moment(timestamp).format("LT")}
//           </Text>
//           <Text width="95%"
//             color={useColorModeValue("gray.700", "gray.200")}
//             textAlign="left"
//             fontSize={["xs", "sm", "md"]}
//             fontFamily="'Work Sans', sans-serif"
//             fontWeight="normal"> {title} </Text>

//           <HStack width="95%">
//             {/* TODO: sendContextData when enter is pressed like in a form */}
//             <Input
//               id="emojiContextInput"
//               type="text"
//               fontFamily="'Work Sans', sans-serif"
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Add context"
//               // If there is not context set, then the input will be shown = ""
//               value={input || diaryContext}
//               border="none"
//               autoComplete="off"
//               variant="flushed"
//               fontSize="lg"
//               fontWeight="normal"
              
//             />
//             {/* when user start typing context, then the checkbox appears */}
//             {input ? (
//               <IconButton
//                 m="4"
//                 onClick={() => sendContextData(input, id)}
//                 colorScheme="blue"
//                 variant="ghost"
//                 icon={<CheckIcon />}
//                 ml={2}
//               />
//             ) : (
//               ""
//             )}
//           </HStack>
//         </VStack>

//         <IconButton
//           m="4"
//           onClick={() => deleteEmoji(id)}
//           colorScheme="red"
//           variant="ghost"
//           size="lg"
//           icon={<FaRegFileArchive />}
//         />
//       </Flex>
//     </>
//   );
// }



import React, { useState } from "react";
import {
  Text,
  useColorModeValue,
  Flex,
  IconButton,
  Input,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { FaRegFileArchive } from "react-icons/fa";
import moment from "moment";
import axios from "axios";

export default function EmojiCard({
  emoji,
  deleteEmoji,
  id,
  sendContextData,
  diaryContext,
  timestamp,
  title,
}) {
  const [input, setInput] = useState("");

  const handleArchive = async () => {
    try {
      await axios.put(
        `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary/${id}/archieve`
      );
      // Jika permintaan PUT berhasil, panggil fungsi deleteEmoji untuk menghapus kartu emoji
      deleteEmoji(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        w="100%"
        align="center"
        bg={useColorModeValue("gray.200", "gray.700")}
        id="card"
        m="4"
        boxShadow="lg"
        borderRadius="28px"
        px={2}
      >
        <Text fontSize="6xl" m="4">
          {emoji}
        </Text>

        <VStack width="100%">
          <Text
            width="95%"
            color={useColorModeValue("gray.700", "gray.200")}
            textAlign="left"
            fontSize={["xs", "sm", "md"]}
            fontFamily="'Work Sans', sans-serif"
            fontWeight="normal"
          >
            {moment(timestamp).format("l") +
              " at " +
              moment(timestamp).format("LT")}
          </Text>
          <Text
            width="95%"
            color={useColorModeValue("gray.700", "gray.200")}
            textAlign="left"
            fontSize={["xs", "sm", "md"]}
            fontFamily="'Work Sans', sans-serif"
            fontWeight="normal"
          >
            {" "}
            {title}{" "}
          </Text>

          <HStack width="95%">
            {/* TODO: sendContextData when enter is pressed like in a form */}
            <Input
              id="emojiContextInput"
              type="text"
              fontFamily="'Work Sans', sans-serif"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add context"
              // If there is not context set, then the input will be shown = ""
              value={input || diaryContext}
              border="none"
              autoComplete="off"
              variant="flushed"
              fontSize="lg"
              fontWeight="normal"
            />
            {/* when user start typing context, then the checkbox appears */}
            {input ? (
              <IconButton
                m="4"
                onClick={() => sendContextData(input, id)}
                colorScheme="blue"
                variant="ghost"
                icon={<CheckIcon />}
                ml={2}
              />
            ) : (
              ""
            )}
          </HStack>
        </VStack>

        <IconButton
          m="4"
          onClick={handleArchive}
          colorScheme="red"
          variant="ghost"
          size="lg"
          icon={<FaRegFileArchive />}
        />
      </Flex>
    </>
  );
}

