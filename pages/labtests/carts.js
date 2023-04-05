import {
  Box,
  Text,
  Img,
  Button,
  Flex,
  Container,
  Grid,
  GridItem,
  useToast,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  PinInputField,
  PinInput,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Mainfooter/footer";
import { useDispatch, useSelector } from "react-redux";
import { deleteLabcart, getLabcart, testBooking, updateLabcart } from "../../redux/labcart/action";

function Cart() {
  

  return (
    <Box>
      <Navbar />
      Labtest
      <Footer />
    </Box>
  );
}

export default Cart;
