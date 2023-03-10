import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function ModalRegister() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!email || !username || !password || !confirmPassword) {
      return;
    }

    setEmailError(false);
    setUsernameError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    const usernameRegex = /^\w+$/;
    if (!usernameRegex.test(username)) {
      setUsernameError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    try {
      const response = await fetch(
        "https://private-anon-ffbbf1870a-halfwineaid.apiary-proxy.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            username,
            password,
            password_confirmation: confirmPassword,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        alert("Succes Register");
        if (data.errors) {
          if (data.errors.email) {
            setEmailError(true);
          }
          if (data.errors.username) {
            setUsernameError(true);
          }
        }
      } else {
        alert("Succes Register");
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Register</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isInvalid={emailError}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {emailError && (
                <FormErrorMessage>Please enter a valid email.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={usernameError}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              {usernameError && (
                <FormErrorMessage>
                  Please enter a unique username containing only alphanumeric
                  characters.
                </FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={passwordError}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError && (
                  <FormErrorMessage>
                    The password must only contain letters and numbers.
                  </FormErrorMessage>
                )}
            </FormControl>
            <FormControl mt={4} isInvalid={confirmPasswordError}>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              {confirmPasswordError && (
                  <FormErrorMessage>
                    The password confirmation does not match.
                  </FormErrorMessage>
                )}
              </FormControl>
          </ModalBody>

          <ModalFooter>
              <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                Register
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
