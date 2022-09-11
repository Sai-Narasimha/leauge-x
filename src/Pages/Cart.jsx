import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getData, saveData } from "../Utils/LocalStorage";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(1);

  const handleDecrementQty = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty-1 } : item
      )
    );
    saveData("cart", cartItems);
  };

  const handleIncrementQty = (id) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.id === id && item.qty < item.quantity
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
    saveData("cart", cartItems);
  };
  const handleDelete = (id) => {
    const remainingItems = cartItems.filter((item) => item.id !== id);
    saveData("cart", remainingItems);
    setCartItems(getData("cart"));
  };

  // getting the data from local storage and set the data in the cartData state
  useEffect(() => {
    setCartItems(getData("cart"));
  }, []);

  return (
    <Container maxW="100%" border="2px solid black">
      {cartItems === null || cartItems?.length === 0 ? (
        <Text>No Items In the cart</Text>
      ) : (
        <Box w="fit-content">
          {cartItems?.map((item, i) => (
            <Flex key={i} border="1px solid green" gap="10px">
              <Image src={item.imageURL} alt={item.name} h="100px" />
              <Box>
                <Text>{item.name}</Text>
                <Text>
                  {item.currency} : {item.price}
                </Text>
              </Box>
              <Flex alignItems="center">
                <Button
                  onClick={() => handleDecrementQty(item.id)}
                >
                  -
                </Button>
                <Text>{item.qty}</Text>
                <Button onClick={() => handleIncrementQty(item.id)}>+</Button>
              </Flex>
              <Button onClick={() => handleDelete(item.id)}>Remove</Button>
            </Flex>
          ))}
        </Box>
      )}
    </Container>
  );
};
