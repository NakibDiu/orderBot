import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Button,
  Text,
  useToast,
  Box,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import post from "../../../../../../customFunctions/post";

const SendMessageModal = (props) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const toast = useToast();

  const onClose = () => {
    props.onToggle(false);
  };

  const handleSubmit = () => {
    if (!message) return;

    setIsSending(true);

    let messageToSend = message;

    if (newMessage) {
      messageToSend = newMessage;
    }

    const data = {
      order_id: props.order.id,
      message: messageToSend,
    };

    const callBack = (response) => {
      setIsSending(false);
      onClose();
    };

    const errorCallBack = (error) => {
      return;
    };

    post(`/api/user/custom-message/send`, data, callBack, errorCallBack);
  };

  let messages = null;

  if (props.messages) {
    messages = props.messages.map((message) => {
      return (
        <option key={message.id} value={message.id}>
          {message.message}
        </option>
      );
    });
  }

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
      closeOnEsc={true}
      closeOnOverlayClick={true}
      isCentered={true}
      scrollBehavior="inside"
      size="sm"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Message {props.order.customer_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody height="200px">
          <Select
            placeholder="Select Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            marginBottom={2}
          >
            {messages}
          </Select>
          <Box>
            <FormLabel htmlFor="order" fontWeight="bold">
              Or Send A New Message
            </FormLabel>
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type here..."
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            isLoading={isSending}
            isLoadingText="Sending..."
            onClick={handleSubmit}
          >
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendMessageModal;
