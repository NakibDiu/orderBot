import { useEffect, useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import post from "../../customFunctions/post";
import useLocalState from "../../customHooks/useLocalState";
import url from "../../url";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  const [user, setUser] = useLocalState("user", {});

  useEffect(() => {
    if (user?.access_token && window.location.pathname === "/login") {
      window.location.replace("/admin");
    }
  }, []);

  const onSubmit = (data) => {
    setIsSubmitting(true);
    post(
      "api/auth/loginx",
      data,
      (response) => {
        setIsSubmitting(false);
        setWrongCredentials(false);
        setUser(response.data);
        window.location.replace("/dashboard");
      },
      (error) => {
        setIsSubmitting(false);
        if (error.response.status === 401) {
          setWrongCredentials(true);
        }
      }
    );
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <img
          src={`${url}/images/logo.png`}
          style={{
            height: 50,
            width: 50,
            marginLeft: "1rem",
            marginTop: "-5px",
          }}
        />
        <Heading color="teal.400">Login</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <Input
                    type="username"
                    placeholder="Username"
                    {...register("username", {
                      required: true,
                    })}
                  />
                </InputGroup>
                {errors.username && errors.username.type === "required" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Username is required
                  </Text>
                )}
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    {...register("password", {
                      required: true,
                    })}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && errors.password.type === "required" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Password is required
                  </Text>
                )}
              </FormControl>

              {wrongCredentials ? (
                <Text fontSize="sm" fontWeight="semibold" color="tomato">
                  Wrong credentials. Try again.
                </Text>
              ) : null}
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
