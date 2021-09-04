import { useRef, useState } from "react";
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
import { Label } from "reactstrap";
import Topbar from "../../layout/Topbar/Topbar";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const password = useRef({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const onSubmit = (data) => {
    // console.log(data);
    setIsSubmitting(true);
    post(
      "api/auth/registerx",
      data,
      (response) => {
        setIsSubmitting(false);
        setIsDisabled(true);
        reset();
      },
      (error) => {
        setIsSubmitting(false);
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
        <Heading color="teal.400">Register New User</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={handleSubmit(onSubmit)} id="form">
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <Label>Username</Label>
                <InputGroup>
                  <Input
                    type="username"
                    placeholder="Username"
                    {...register("username", {
                      required: true,
                      minLength: 4,
                    })}
                  />
                </InputGroup>
                {errors.username && errors.username.type === "required" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Username is required
                  </Text>
                )}
                {errors.username && errors.username.type === "minLength" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Username has to be atleast 4 characters long
                  </Text>
                )}
                <Label>Business Name</Label>
                <InputGroup>
                  <Input
                    type="business_name"
                    placeholder="Business Name"
                    {...register("business_name", {
                      required: true,
                      minLength: 4,
                    })}
                  />
                </InputGroup>
                {errors.business_name &&
                  errors.business_name.type === "required" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      Business Name is required
                    </Text>
                  )}
                {errors.business_name &&
                  errors.business_name.type === "minLength" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      Business Name has to be atleast 4 characters long
                    </Text>
                  )}
                <Label>Password</Label>
                <InputGroup>
                  <Input
                    {...register("password", {
                      required: true,
                      minLength: 6,
                    })}
                    type="password"
                    placeholder="Password"
                  />
                </InputGroup>
                {errors.password && errors.password.type === "required" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Password is required
                  </Text>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <Text fontSize="sm" fontWeight="semibold" color="tomato">
                    Password has to be atleast 6 characters long
                  </Text>
                )}
              </FormControl>

              <FormControl>
                <Label>Repeat Password</Label>
                <InputGroup>
                  <Input
                    {...register("repeat_password", {
                      required: true,
                      validate: {
                        matches: (value) => {
                          return value === getValues().password;
                        },
                      },
                    })}
                    type="password"
                    placeholder="Repeat Password"
                  />
                </InputGroup>
                {errors.repeat_password &&
                  errors.repeat_password.type === "required" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      Repeat Password
                    </Text>
                  )}
                {errors.repeat_password &&
                  errors.repeat_password.type === "matches" && (
                    <Text fontSize="sm" fontWeight="semibold" color="tomato">
                      Password doesnt match
                    </Text>
                  )}
              </FormControl>

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={isSubmitting}
                isDisabled={isDisabled}
              >
                Register New User
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
