import { Avatar, Box, Image, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import avatarSrc from "../assets/Mylogo.png"

// const avatarSrc = "https://avatars.githubusercontent.com/u/25058652";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "8"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            CryptoPulse offers instant access to real-time Bitcoin and cryptocurrency data, including current prices, trends, and exchange information. <br/>Stay informed with up-to-the-minute updates from top exchanges worldwide, ensuring you never miss a market move.
          </Text>
        </VStack>

        <VStack>    
          {/* <Avatar boxSize={"28"} mt={["4", "0"]}  src={avatarSrc}  /> */}
            <Image src={avatarSrc} h={"100px"} w={"140px"} title="Anmol Singh" objectFit={"fill"} />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;