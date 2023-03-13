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
import { useNavigate } from "react-router-dom";


export default function DiaryCard({
  emoji,
  archiveDiary,
  id,
  sendContextData,
  diaryContext,
  timestamp,
  title,
}) {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [input, setInput] = useState("");

  const handleArchive = async () => {
    const confirmed = window.confirm("Are you sure you want to archive this diary entry?");
    if (confirmed) {
    try {
      await axios.put(
        `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary/${id}/archieve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
     
      archiveDiary(id);
    } catch (error) {
      console.log(error);
    }
    window.location.reload()
  };

}

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
        onClick={() => navigate(`/detail-diary/${id}`)}
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
              // If there is no context set, the input will be empty
              value={input || diaryContext}
              border="none"
              autoComplete="off"
              variant="flushed"
              fontSize="lg"
              fontWeight="normal"
            />
            {/* When the user starts typing context, the checkbox appears */}
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

