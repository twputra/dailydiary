import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ModalDiary() {
const token = localStorage.getItem("token");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [warning, setWarning] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const { isOpen, onOpen, onClose } = useDisclosure();
const navigate = useNavigate();

const handleSubmit = async (event) => {
event.preventDefault();

const data = { title, content };

try {
  const response = await axios.post(
    "https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary",
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
  navigate("/user");
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
window.location.reload()
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
{/* <Navbar /> */}

<VStack>
<Button colorScheme="blue" onClick={onOpen}>
Create Diary
</Button>
<Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Diary</ModalHeader>
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
              {warning && (
                <FormErrorMessage>{errorMessage}</FormErrorMessage>)}
            </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </ModalContent>
            </Modal>

            </VStack>
         
            </>

)

}            