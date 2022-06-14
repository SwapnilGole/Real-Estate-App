import React from 'react'
import {Flex,Box} from "@chakra-ui/react"

const Footer = () => {
  return (
    <Flex w="full">
        <Box textAlign="center" p="5" color="gray.500" w="full" fontWeight="bold"
        borderTop="1px" borderColor="green">
           &copy; 2022 Sai Real Estates, Inc
        </Box>
    </Flex>
  )
}

export default Footer