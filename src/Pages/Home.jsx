/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FiFilter } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { getProductsData } from "../Redux/App/actions";
import { SingleProductData } from "../Components/SingleProductData";
import { getData, saveData } from "../Utils/LocalStorage";
import { useSearchParams } from "react-router-dom";

// filter data to populate
const colors = ["Red", "Blue", "Green"];
const gender = ["Men", "Women"];
const prices = ["0-250rs", "251-450rs", "rs450"];
const types = ["Polo", "Hoddie", "Basic"];

export const Home = () => {
  const products = useSelector((state) => state.products); // getting the products data from the redux store
  const dispatch = useDispatch();
  const cartFromLocalStorage = getData("cart") || []; // is no items in the localstorage creating an array
  // const [optionValue, setOptionValue] = useState(""); // this states for radio buttons
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(cartFromLocalStorage); // storing the localstorage data along with new product
  const [searchParams, setSearchParams] = useSearchParams();
  const intialSearchParams = searchParams.getAll("color");
  const [category, setCategory] = useState(intialSearchParams || []);
  const [genderVal, setGenderVal] = useState("");
  const [priceVal, setPriceVal] = useState("");
  const [typeVal, setTypeVal] = useState("");

  // Functions //
  const handleCheckbox = (e) => {
    // filtering w.r.t diet and it uses redux
    const option = e.target.value;
    let newCategory = [...category];
    if (category.includes(option)) {
      newCategory.splice(newCategory.indexOf(option), 1);
    } else {
      newCategory.push(option);
    }
    setCategory(newCategory);
  };

  const handleAddToCart = (product) => {
    // setting the cart state with product on triggering this function
    setCart([...cart, { ...product, qty: 1 }]);
  };

  // changing the url with the colors using search params
  useEffect(() => {
    if (category) {
      setSearchParams({ color: category });
    }
  }, [category, setSearchParams]);

  //dispatching the action to the store
  useEffect(() => {
    dispatch(getProductsData());
  }, []);

  // adding the cart items to the local storage while changing the cart array
  useEffect(() => {
    saveData("cart", cart);
  }, [cart]);

  return (
    <Container maxW="100%" p="">
      <Flex w={["100%", "100%", "40%", "30%"]} m="auto" mt="10">
        <SearchIcon mt="10px" mr="10px" />
        <Input
          w="70%"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          size="sm"
          colorScheme="none"
          border="none"
          borderBottom="1px solid "
          rounded={false}
          variant="unstyled"
        />

        <Icon
          as={FiFilter}
          bg="black"
          color="white"
          w={10}
          h={5}
          rounded={"md"}
          pt="2px"
          ml="10px"
          mt="10px"
          visibility={["visible", "visible", "hidden", "hidden"]}
        />
      </Flex>

      <Flex ml="-15px" w="100%" mt="10px">
        <Box
          pl="20px"
          w={["0%", "0%", "25%", "15%"]}
          visibility={["hidden", "hidden", "visible", "visible"]}
          boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px"
        >
          {/* colors radio buttons */}
          <Text textAlign={"left"} fontSize="20px" fontWeight="bold">
            Color
          </Text>
          <Stack direction="column">
            {colors.map((color, i) => (
              <Checkbox
                key={i}
                value={color}
                defaultChecked={category.includes({ color })}
                onChange={handleCheckbox}
              >
                {color}
              </Checkbox>
            ))}
          </Stack>

          {/* Genders radio buttons */}
          <Text textAlign={"left"} fontSize="20px" fontWeight="bold">
            Gender
          </Text>
          <RadioGroup onChange={setGenderVal} value={genderVal}>
            <Stack direction="column">
              {gender.map((ele, i) => (
                <Radio key={i} value={ele}>
                  {ele}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          {/* Prices radio buttons */}
          <Text textAlign={"left"} fontSize="20px" fontWeight="bold">
            Prices
          </Text>
          <RadioGroup onChange={setPriceVal} value={priceVal}>
            <Stack direction="column">
              <Radio value="250">0-250rs</Radio>
              <Radio value="350">less than 350</Radio>
              <Radio value="500">less than 500</Radio>
            </Stack>
          </RadioGroup>

          {/* Types radio buttons */}
          <Text textAlign={"left"} fontSize="20px" fontWeight="bold">
            Types
          </Text>
          <RadioGroup onChange={setTypeVal} value={typeVal}>
            <Stack direction="column">
              {types.map((ele, i) => (
                <Radio key={i} value={ele}>
                  {ele}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>

        <Box w="85%" ml="10" h="90vh" overflow="scroll">
          <Grid
            gridTemplateColumns={[
              "repeat(1,1fr)",
              "repeat(1,1fr)",
              "repeat(3,1fr)",
              "repeat(3,1fr)",
            ]}
            gap="10"
          >
            {products
              .filter((product) => {
                if (searchTerm === "")
                  return product; // filtering the search item
                else if (
                  product.name.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return product;
                }
              })
              .filter((product) => {
                // filtering the color of the product
                if (category.length === 0) return product;
                else if (product.color === category[0]) return product;
              })
              .filter((product) => {
                // filtering the gender val
                if (genderVal === "") return product;
                else if (product.gender === genderVal) return product;
              })

              .filter((product) => {
                if (priceVal === "") return product;
                else if (product.price <= priceVal) return product;
              })
              .filter((product) => {
                // filtering the type of the product
                if (typeVal === "") return product;
                else if (product.type === typeVal) return product;
              })
              .map(
                (
                  product // finally mapping those products aftering filtering
                ) => (
                  <Box
                    key={product.id}
                    p="15px"
                    boxShadow="rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
                  >
                    <Image
                      src={product.imageURL}
                      alt={product.name}
                      border="1px solid grey"
                    />
                    <Text textAlign="center" fontWeight="bold" fontSize="18px">
                      Name : {product.name}
                    </Text>
                    <Text textAlign="center" fontWeight="bold" fontSize="18px">
                      gender : {product.gender}
                    </Text>
                    <Flex
                      alignItems="center"
                      justifyContent="space-around"
                      pt="8px"
                    >
                      <Text fontSize="20px">
                        {product.currency} : {product.price}
                      </Text>
                      <Button
                        bg="black"
                        color="white"
                        colorScheme="green"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to cart
                      </Button>
                    </Flex>
                  </Box>
                )
              )}
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
};
