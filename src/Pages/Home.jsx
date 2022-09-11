import React, { useState } from "react";
import {
  Box,
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

// filter data
const colors = ["Red", "Blue", "Green"];
const gender = ["Men", "Women"];
const prices = ["0-250rs", "251-450rs", "rs450"];
const types = ["Polo", "Hoddie", "Basic"];

export const Home = () => {
  // this state for radio buttons
  const [colorValue, setColorValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [typeValue, setTypeValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container maxW="100%" border="1px solid black" p="">
      <Flex
        border="1px solid black"
        w={["100%", "100%", "40%", "30%"]}
        m="auto"
      >
        <Input
          w={["70%", "70%", "70%"]}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          size="sm"
          colorScheme="none"
        />

        <SearchIcon mt="10px" ml="10px" />

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

      <Flex ml="-15px" w="100%">
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
          <RadioGroup onChange={setColorValue} value={colorValue}>
            <Stack direction="column">
              {colors.map((color, i) => (
                <Radio key={i} value={color}>
                  {color}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          {/* Genders radio buttons */}
          <Text textAlign={"left"} fontSize="20px" fontWeight="bold">
            Gender
          </Text>
          <RadioGroup onChange={setGenderValue} value={genderValue}>
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
          <RadioGroup onChange={setPriceValue} value={priceValue}>
            <Stack direction="column">
              {prices.map((ele, i) => (
                <Radio key={i} value={ele}>
                  {ele}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>

          {/* Types radio buttons */}
          <Text textAlign={"left"} fontSize="20px" fontWeight="bold">
            Types
          </Text>
          <RadioGroup onChange={setTypeValue} value={typeValue}>
            <Stack direction="column">
              {types.map((ele, i) => (
                <Radio key={i} value={ele}>
                  {ele}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </Box>
        <Box border="2px solid red" w="85%" ml="10">
          <Grid>
            <GridItem>
              <Box border="2px solid red">
                <Image src="" alt="image" />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Flex>
    </Container>
  );
};
