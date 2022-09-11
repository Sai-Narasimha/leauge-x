import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getData, saveData } from "../Utils/LocalStorage";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  var cartTotal = 0;

  const handleDecrementQty = (id) => {
    setCartItems((cartItems) =>
      cartItems?.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
    saveData("cart", cartItems); // setting the updated qty data to the localstorage
  };

  //  to increment the product quantity
  const handleIncrementQty = (id) => {
    setCartItems((cartItems) =>
      cartItems?.map((item) =>
        item.id === id && item.qty < item.quantity
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
    saveData("cart", cartItems); // setting the updated qty data to the localstorage
  };

  // to delete product in the localstorage
  const handleDelete = (id) => {
    const remainingItems = cartItems?.filter((item) => item.id !== id);
    saveData("cart", remainingItems); // setting the updated remaining products to the localstorage
    setCartItems(getData("cart")); // getting the updated  products data from the localstorage
  };

  // getting the data from local storage and set the data in the cartData state
  useEffect(() => {
    setCartItems(getData("cart"));
  }, []);
  return (
    <Container maxW="100%" border="2px solid black">
      {cartItems === null || cartItems?.length === 0 ? (
        <Text textAlign="center" fontSize="20px">
          No Items In the cart{" "}
          <Link to="/" color="blue" cursor="pointer">
            <u>Shop Here</u>
          </Link>
        </Text>
      ) : (
        <Flex
          w="100%"
          border="1px solid red"
          direction={["column", "column", "row", "row"]}
          alignItems="center"
        >
          <Box h="90vh" overflow="scroll" w={["100%", "100%", "50%", "50%"]}>
            {cartItems?.map((item, i) => {
              cartTotal += item.price * item.qty; // updating the prices
              return (
                <Flex
                  key={i}
                  border="1px solid black"
                  gap="10px"
                  mt="10px"
                  alignItems="center"
                  justifyContent="space-around"
                >
                  <Image src={item.imageURL} alt={item.name} h="100px" />
                  <Box>
                    <Text>{item.name}</Text>
                    <Text>
                      {item.currency} : {item.price}
                    </Text>
                  </Box>
                  <Flex alignItems="center">
                    <Button onClick={() => handleDecrementQty(item.id)}>
                      -
                    </Button>
                    <Text>Qty : {item.qty}</Text>
                    <Button onClick={() => handleIncrementQty(item.id)}>
                      +
                    </Button>
                  </Flex>
                  <Button onClick={() => handleDelete(item.id)}>Remove</Button>
                </Flex>
              );
            })}
          </Box>
          <Box>
            <Heading color="green">Cart Total = {cartTotal}</Heading>
          </Box>
        </Flex>
      )}
    </Container>
  );
};
