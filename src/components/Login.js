import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isEmailNotFound, setIsEmailNotFound] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsInvalidEmail(false);
    setIsEmailNotFound(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsInvalidPassword(false);
  };

  const handleLogin = () => {
    if (!email || !password) {
      setIsInvalidEmail(!email);
      setIsEmailNotFound(false);
      setIsInvalidPassword(!password);
      return;
    }

    const data = { email, password };
    fetch(
      "https://private-anon-ffbbf1870a-halfwineaid.apiary-proxy.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => {
        if (response.status === 200) {
            response.json().then(data => {
                const token = data.access_token;
                localStorage.setItem("token", token);
                alert("Succes Login");
                navigate("/user")
                onClose();
                window.location.reload()
                // call a function to handle successful login
              });
        } else if (response.status === 400) {
          setIsInvalidEmail(true);
        } else if (response.status === 404) {
          setIsEmailNotFound(true);
        } else if (response.status === 401) {
          setIsInvalidPassword(true);
        }
      })
      .then((data) => {
        if (data) {
          onClose();
          // call a function to handle successful login
          console.log(data); // response with user information and access token
        }
      })
      .catch((error) => {
        console.error("Login error: ", error);
      });
  };

  return (
    <>
      <Button onClick={onOpen}>Login</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login to your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={isInvalidEmail}>
              <FormLabel>Email</FormLabel>
              <Input
                ref={initialRef}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
              />
              {isInvalidEmail && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  Please enter a valid email
                </Text>
              )}
              {isEmailNotFound && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  Email not found
                </Text>
              )}
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={isInvalidPassword}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
              {isInvalidPassword && (
                <Text fontSize="xs" color="red.500" mt={1}>
                  Password Wrong!
                </Text>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
              <Button onClick={handleLogin} colorScheme='blue' mr={3}>
                Login
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

