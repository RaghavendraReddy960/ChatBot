import React from "react";
import { Flex, Avatar, AvatarBadge, Text } from "@chakra-ui/react";
import logo from "./medicalLogo.jpeg"
const Header = () => {
  return (
    <Flex w="100%">
      <Avatar size="lg" name="Dan Abrahmov" src={logo}>
        <AvatarBadge boxSize="1em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          Medical Chatbot
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  );
};

export default Header;
