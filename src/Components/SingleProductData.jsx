import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import React, { useState } from "react";
import { saveData } from "../Utils/LocalStorage";

export const SingleProductData = ({ product }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };
  console.log(cart);
  return (
    <Box
      p="15px"
      boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
    >
      <Image
        src={product.imageURL}
        alt={product.name}
        border="1px solid grey"
      />
      <Flex alignItems="center" justifyContent="space-around" pt="8px">
        <Text fontSize="20px">
          {product.currency} : {product.price}
        </Text>
        <Button
          bg="black"
          color="white"
          colorScheme="green"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </Button>
      </Flex>
    </Box>
  );
};
