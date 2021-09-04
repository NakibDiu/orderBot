import { useEffect, useRef, useState } from "react";
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

const PasswordReset = () => {
  const [user, setUser] = useLocalState("user", {});

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const password = useRef({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wrongCredentials, setWrongCredentials] = useState(false);

  useEffect(() => {
    if (user?.access_token && window.location.pathname === "/login") {
      window.location.replace("/admin");
    }
  }, []);

  const onSubmit = (data) => {
    // console.log(data);
    setIsSubmitting(true);
    post(
      "api/auth/pwresetx",
      data,
      (response) => {
        setIsSubmitting(false);
        setWrongCredentials(false);

        setUser({});
        window.location.replace("/login");
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
    <>
      <Topbar />
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
          <Heading color="teal.400">
            {user?.business_name} Password Reset
          </Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleSubmit(onSubmit)} id="form">
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <Label>Current Password</Label>
                  <InputGroup>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      {...register("old_password", {
                        required: true,
                      })}
                    />
                  </InputGroup>
                  {errors.current_password &&
                    errors.current_password.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        Current password is required
                      </Text>
                    )}
                </FormControl>

                <FormControl>
                  <Label>New Password</Label>
                  <InputGroup>
                    <Input
                      {...register("new_password", {
                        required: true,
                        minLength: 6,
                      })}
                      type="password"
                      placeholder="New Password"
                    />
                  </InputGroup>
                  {errors.new_password &&
                    errors.new_password.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        New Password is required
                      </Text>
                    )}
                  {errors.new_password &&
                    errors.new_password.type === "minLength" && (
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
                            return value === getValues().new_password;
                          },
                        },
                      })}
                      type="password"
                      placeholder="Repeat New Password"
                    />
                  </InputGroup>
                  {errors.repeat_password &&
                    errors.repeat_password.type === "required" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        Repeat New Password
                      </Text>
                    )}
                  {errors.repeat_password &&
                    errors.repeat_password.type === "matches" && (
                      <Text fontSize="sm" fontWeight="semibold" color="tomato">
                        Password doesnt match
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
                  Change Password
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default PasswordReset;
