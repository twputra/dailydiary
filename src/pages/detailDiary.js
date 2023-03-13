import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CiTurnL1 } from "react-icons/ci";
import axios from "axios";


export default function DetailDiary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [diary, setDiary] = useState();
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [warning, setWarning] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleBack = () => {
    navigate("/user");
  };

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(
          `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
        setDiary(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDiary();
  }, [id, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { title, content };

    try {
      const response = await axios.put(
        `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      console.log("Successfully", response);
      onClose();
      navigate(`/detail-diary/${id}`);
      setTitle("");
      setContent("");
    } catch (error) {
      if (error.response.status === 401) {
        alert(error.response.data.message);
      } else if (error.response.status === 422) {
        alert(`${error.response.data.message}`);
      } else if (error.response.status === 404) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data.message);
      }
    }
    window.location.reload();
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 500) {
      setContent(inputValue);
      setWarning(false);
    } else {
      setWarning(true);
    }
  };

  function handleTitleChange(event) {
    const newTitle = event.target.value;
    const isAlphanumeric = /^[a-zA-Z0-9\s]+$/.test(newTitle);
    if (!isAlphanumeric && newTitle.length > 0) {
      setErrorMessage(
        "The diary title must only contain alphanumeric characters"
      );
    } else {
      setErrorMessage("");
      setTitle(newTitle);
    }
  }

  return (
    <>
      <VStack>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Diary</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl
                id="title"
                isRequired
                isInvalid={errorMessage !== ""}
              >
                <FormLabel>Title</FormLabel>
                <Textarea
                  placeholder="Enter a title for your diary"
                  value={title}
                  onChange={handleTitleChange}
                />
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </FormControl>

              <FormControl id="content" mt="4" isRequired>
                <FormLabel>Content</FormLabel>
                <Textarea
                  placeholder="Write your diary here max 500 character"
                  rows={10}
                  value={content}
                  onChange={handleChange}
                />
                {warning && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>

      {diary && (
        <Box position="relative" h="100vh" p={100}>
          <Center>
            <Card width={"100%"} padding="2em">
              <CardHeader>
                <Heading>{diary.title}</Heading>
              </CardHeader>
              <CardBody>
                <Text>{diary.content}</Text>
                {/* <Text>Created at: {diary.createdAt}</Text>
                {diary.updatedAt && (
                  <Text>Updated at: {diary.updatedAt}</Text>
                )} */}
              </CardBody>
              <CardFooter>
                <Button colorScheme="blue" onClick={handleBack}>
                  <span style={{ marginRight: "1em" }}>
                    <CiTurnL1 />
                  </span>
                  Back
                </Button>
                <Button colorScheme="green" ml={3} onClick={onOpen}>
                  Update
                </Button>
              </CardFooter>
            </Card>
          </Center>
        </Box>
      )}
    </>
  );
}
