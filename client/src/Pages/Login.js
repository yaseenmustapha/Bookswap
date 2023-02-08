import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const auth = useAuth();

  const handleChangeUsername = (e) => {
    e.preventDefault(); // prevent the default action
    setUsername(e.target.value); // set name to e.target.value (event)
  };

  const handleChangePassword = (e) => {
    e.preventDefault(); // prevent the default action
    setPassword(e.target.value); // set name to e.target.value (event)
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    try {
      const responseStatus = await auth.login(username, password);
      if (responseStatus === 200) navigate("/");
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <Header></Header>
      <Flex minH={"10vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} w={"500px"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Log in
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to sell and trade your books 👋
            </Text>
          </Stack>
          <form onSubmit={tryLogin}>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl
                  id="username"
                  onChange={handleChangeUsername}
                  isRequired
                >
                  <FormLabel>Username</FormLabel>
                  <Input type="username" />
                </FormControl>
                <FormControl
                  id="password"
                  onChange={handleChangePassword}
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  {error && (
                    <Alert status="error">
                      <AlertIcon />
                      Username or password is incorrect
                    </Alert>
                  )}
                  <Button
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Log in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Don't have an account?{" "}
                    <Link href={"/register"} color={"blue.400"}>
                      Sign up
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </form>
        </Stack>
      </Flex>
    </>
  );
}

export default Login;
