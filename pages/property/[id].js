import React from "react";
import { Box, Flex, Text, Spacer, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath, FaGuitar } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
import { fetchApi, baseUrl } from "../../utils/fetchapi";
import ImageScrollbar from "../../components/ImageScrollbar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rentFrequency,
    title,
    rooms,
    baths,
    area,
    agency,
    isVerified,
    description,
    purpose,
    type,
    furnishingStatus,
    amenities,
    photos,
  },
}) => {
  return (
    <Box maxWidth="1000px" margin="auto" p="4">
      {photos && <ImageScrollbar data={photos} />}
      <Box w="full" p="5">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center" justifyContent="space-around" w="full">
            <Box paddingRight="3" color="green.400">
              {isVerified && <GoVerified />}
            </Box>
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
              {rentFrequency && `/${rentFrequency}`}
            </Text>
            <Box>
              <Avatar width="50px" height="50px" src={agency?.logo?.url} />
            </Box>
          </Flex>
        </Flex>
        <Flex
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-around"
          width="250px"
          p="0.5"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
          <BsGridFill />
        </Flex>
        <Box my="2">
          <Text fontSize="md" fontWeight="bold">
            {title}
          </Text>
          <Text my="2" color="gray.600" fontWeight="medium">
            {description}
          </Text>
        </Box>
        <Flex flexWrap="wrap" justifyContent="space-between">
          <Flex
            justifyContent="space-between"
            width="400px"
            borderBottom="1px"
            borderColor="gray.200"
          >
            <Text>Type</Text>
            <Text fontWeight="bold">{type}</Text>
          </Flex>
          <Flex
            justifyContent="space-between"
            width="400px"
            borderBottom="1px"
            borderColor="gray.200"
          >
            <Text>Purpose</Text>
            <Text fontWeight="bold">{purpose}</Text>
          </Flex>
          {furnishingStatus && (
            <Flex
              justifyContent="space-between"
              width="400px"
              borderBottom="1px"
              borderColor="gray.200"
            >
              <Text>Furnishing Status</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        <Box my="5">
          {amenities.length && (
            <Text fontSize="2xl" fontWeight="bold">
              Amenities
            </Text>
          )}
          <Flex flexWrap="wrap" w="full">
            {amenities.map((item) =>
              item.amenities.map((amenity) => (
                <Text
                  key={amenity.text}
                  margin="2"
                  color="blue.500"
                  fontWeight="bold"
                  fontSize="sm"
                  bg="gray.100"
                  p="1"
                  borderRadius="5px"
                >
                  {amenity.text}
                </Text>
              ))
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default PropertyDetails;

export async function getServerSideProps({ params: { id } }) {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);
  return {
    props: {
      propertyDetails: data,
    },
  };
}
