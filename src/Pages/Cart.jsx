import { Box, Container, Flex, Image, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getData } from "../Utils/LocalStorage";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // getting the data from local storage and set the data in the cartData state
  useEffect(() => {
    setCartItems(getData("cart"));
  }, []);

  return (
    <Container maxW="100%" border="2px solid black">
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
            <Select>
           
            </Select>
          </Flex>
        ))}
      </Box>
    </Container>
  );
};
