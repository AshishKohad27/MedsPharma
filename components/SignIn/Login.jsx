import React, { use, useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  FormLabel,
  Spinner,
  Input,
  PinInput,
  PinInputField,
  HStack,
  Text,
  Box,
  Img,
  useToast,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_MESSAGE,
  LOGOUT,
  SAVE_CREDENTIAL,
} from "../../redux/auth/user.type";
import { getDetailsFromToken, postLogin } from "../../redux/auth/user.action";
import axios from "axios";
let initState = {
  email: "",
  password: "",
};
const SendToken = {
  token: "",
};
function Login() {
  const [isAuthUser, steIsAuthUser] = useState(false); // to prevent form hydration in next js
  const [form, setForm] = useState(initState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { loading, error, isAuth, message, tokenDetails, errorMessage } =
    useSelector((store) => store.user);
  // console.log('loginCredential:', loginCredential)
  console.log("errorMessage:", errorMessage);
  // console.log('loading Login:', loading)
  console.log("message Login:", loading);

  useEffect(() => {
    if (tokenDetails) {
      dispatch({ type: SAVE_CREDENTIAL, payload: tokenDetails });
    }
  }, [tokenDetails]);

  useEffect(() => {
    SendToken.token = localStorage.getItem("access_token");
    console.log("SendToken:", SendToken);
    dispatch(getDetailsFromToken(SendToken));
  }, [isAuth, dispatch]);

  useEffect(() => {
    if (errorMessage === "Token Expired!") {
      dispatch({ type: LOGOUT });
    }
  }, [dispatch, errorMessage]);

  useEffect(() => {
    steIsAuthUser(isAuth);
  }, [isAuth]);

  useEffect(() => {
    if (message === "Wrong Credentials" || errorMessage === "Error Occurs") {
      form.email = "";
      form.password = "";
      console.log("Wrong Credentials");
      alert("Wrong Credentials");
      dispatch({ type: CLEAR_MESSAGE });
    }
  }, [loading, error, isAuth, dispatch, form, message, errorMessage]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please Fill All Details");
    } else {
      dispatch({ type: CLEAR_MESSAGE }); // CLEAR ERROR MESSAGE AND MESSAGE IN FROM REDUX
      dispatch(postLogin(form));
      onClose();
    }
    // console.log("email:", form.email, "password:", form.password)
  };

  return (
    <>
      <div>
        <div id="recaptcha-container"></div>
        <Menu variant="ghost">
          {isAuthUser ? (
            <LogoutFunction name={tokenDetails && tokenDetails.name} />
          ) : (
            <MenuButton
              _hover={{ color: "red" }}
              w="28"
              fontSize={"18"}
              righticon={<ChevronDownIcon />}
              onClick={onOpen}
            >
              Login
            </MenuButton>
          )}
          <MenuList>
            <MenuItem onClick={() => {}}>Sign Out</MenuItem>
          </MenuList>
        </Menu>

        <Drawer size="sm" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />

          <DrawerContent>
            <DrawerCloseButton color="white" right="var(--chakra-space-0)" />
            <Box
              display="flex"
              bg={useColorModeValue("gray.50", "gray.800")}
              justifyContent={"space-between"}
              alignItems="center"
              p="4"
            >
              <Img
                w="60%"
                padding={"30px"}
                src="https://user-images.githubusercontent.com/97351159/208255522-22126415-4bf1-422b-9c54-d637ae7ecf91.png"
              />
              <Img
                w="40%"
                p="4"
                mr="20px"
                src="https://assets.pharmeasy.in/web-assets/dist/1fe1322a.svg?dim=256x0"
              />
            </Box>{" "}
            <hr />
            <DrawerBody marginTop={"40px"}>
              <Stack spacing="24px">
                <Box>
                  <FormLabel fontWeight={"bold"} mb="30px">
                    Quick Login
                  </FormLabel>

                  <Input
                    _focus={{
                      border: "1px solid #10847E",
                    }}
                    onChange={handleChange}
                    name="email"
                    value={form.email}
                    height={"50px"}
                    placeholder="Email"
                    autoComplete="off"
                  />
                  <Input
                    mt="10px"
                    _focus={{
                      border: "1px solid #10847E",
                    }}
                    onChange={handleChange}
                    name="password"
                    value={form.password}
                    height={"50px"}
                    placeholder="Password"
                    autoComplete="off"
                  />

                  <Button
                    mt="10px"
                    disabled={Number[0] === "0"}
                    onClick={handleSubmit}
                    width="100%"
                    height={"50px"}
                    color="white"
                    bg="#10847E"
                    borderRadius={"3px"}
                    _hover={{
                      background: "#10847E",
                      color: "white",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}

function LogoutFunction({ name }) {
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch({ type: LOGOUT });
    dispatch({ type: CLEAR_MESSAGE });
  };
  return (
    <Flex w="160px" justifyContent="center" alignItems="center">
      <Box>
        <Text fontWeight={500}>{name}</Text>
      </Box>
      <Box>
        <Text
          ml="10px"
          color={"red.400"}
          fontWeight={500}
          cursor="pointer"
          onClick={() => handelLogout()}
        >
          Logout
        </Text>
      </Box>
    </Flex>
  );
}

export default Login;
