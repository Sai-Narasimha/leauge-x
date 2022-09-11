import { Container, Flex, Icon, Text } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Container maxW="100%" bg="lightgrey">
      <Flex justifyContent="space-between" p="15px" fontSize="20px">
        <Text>
          <Link to="/">TeeRex Store</Link>
        </Text>
        <Flex w="10%" justifyContent="space-around">
          <Text visibility={["hidden", "hidden", "visible"]}>
            <Link to="/">Product </Link>
          </Text>

          <Link to="/cart">
            <Icon as={AiOutlineShoppingCart} w="8" h="7" />
          </Link>
        </Flex>
      </Flex>
    </Container>
  );
};
