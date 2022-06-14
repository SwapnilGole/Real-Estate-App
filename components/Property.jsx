import {React} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Box,Flex,Text,Avatar} from "@chakra-ui/react";
import {FaBed,FaBath,FaGuitar} from "react-icons/fa";
import {BsGridFill} from 'react-icons/bs';
import {GoVerified} from "react-icons/go";
import millify from 'millify';
import defaultImage from "../assets/images/house.jpeg"

const Property = ({property:{coverPhoto,externalID,price,rentFrequency,rooms,title, baths, agency,area,isVerified}}) => (
  <Link href={`/property/${externalID}`} passHref w="full" justifyContent="center" alignItems="center" m="auto">
    <Flex flexWrap="wrap" justifyContent="center" w="full"  paddingTop="0" p="5" cursor="pointer" width="420px"> 
        <Box>
            <Image src={coverPhoto ? coverPhoto.url : defaultImage} width="400px" height="300px" alt="house-image"/>
        </Box>
        <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" justifyContent="space-around" w="full">
                <Box paddingRight="3" color="green.400">{isVerified && <GoVerified/>}</Box>
                <Text fontWeight="bold" fontSize="lg">AED {millify(price)}{rentFrequency && `/${rentFrequency}`}</Text>
                <Box>
                    <Avatar  width="50px" height="50px" src={agency?.logo?.url}/>
                </Box>
            </Flex>
            
        </Flex>
             <Flex flexWrap="wrap" alignItems="center" justifyContent="space-around" width="250px" p="0.5"  color='blue.400'>
                
                    {rooms} <FaBed/> | {baths} <FaBath/> | {millify(area)} sqft <BsGridFill/>
            
            </Flex>
                <Text fontSize="sm">
                    {title.length>30 ? `${title.substring(0,30)}...` : title}
                </Text>
        </Box>
    </Flex>
  </Link>
)

export default Property