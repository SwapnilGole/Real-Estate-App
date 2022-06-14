
import { useState,useEffect } from 'react';
import {Flex,Select, Text, Input, Spinner, Icon, Button,Box} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import {MdCancel} from "react-icons/md"
import Image from 'next/image';
import {filterData,getFilterValues} from "../utils/filterData";
import noresult from "../assets/images/noresults.png";
import { fetchApi,baseUrl} from '../utils/fetchapi';

const SearchFilters = () => {

    const router = useRouter();
    const [filters,setFilters] = useState(filterData);
    const [searchTerm, setSearchTerm] = useState('')
    const [locationData,setLocationData] = useState();
    const [showLocations,setShowLocations] = useState(false);
    const [loading,setLoading] = useState(false);

    const searchProperties = (filterValues)=>{
        const path = router.pathname;
        const {query} = router;
        const values = getFilterValues(filterValues);

        values.forEach((item)=>{
            if(item.name && filterValues?.[item.name]){
                query[item.name] = item.value;
            }
        })

        router.push({pathname:path,query})

    }

     useEffect(() => {
    if (searchTerm !== '') {
      const fetchData = async () => {
        setLoading(true);
        const data = await fetchApi(`${baseUrl}/auto-complete?query=${searchTerm}`);
        setLoading(false);
        setLocationData(data?.hits);
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <>
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
        {filters.map((filter)=>(
            <Box key={filter.queryName}>
                <Select placeholder={filter.placeholder} w="fit-content"
                p="2"
                onChange={(e)=> searchProperties({[filter.queryName]:e.target.value})}>
                    {filter?.items?.map((item)=>(
                        <option value={item.value} key={item.name}>{item.name}</option>
                    ))}
                </Select>
            </Box>
        ))}
        <Flex flexDir='column'>
            <Button onClick={()=> setShowLocations((showLocations) => !showLocations)} border="1px" borderBottom="gray.200" marginTop="2">
                Search Location
            </Button>
            {showLocations && 
                (
                    <Flex flexDir="column" pos="relative" pX="2">
                        <Input placeholder='Type city here'
                        value={searchTerm}
                        w="300px" my="2"
                        focusBorderColor='gray.300'
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm !== '' && (
                            <Icon as={MdCancel}
                            pos="absolute"
                            cursor="pointer"
                            right="3"
                            top="4.5%"
                            zIndex="1000"
                            fontSize='xl'
                            onClick={()=> setSearchTerm('')}
                            />
                        )}
                        {loading && <Spinner margin="auto" marginTop="3"/> }
                        {showLocations && (
                            <Box height="300px" overflow="auto">
                                {locationData?.map((location)=> (
                                    <Box key={location.id} 
                                    onClick={() => { searchProperties({locationExternalIDs: location.externalID}); setShowLocations(false);setSearchTerm(location.name) } }
                                    >
                                        <Text cursor="pointer" bg="gray.200" p="2" borderBottom="1px" borderColor="gray.100">
                                            {location.name}
                                        </Text>
                            </Box>
                                ))}
                            {!loading && !locationData?.length && (
                                <Flex justifyContent="center" alignItems="center" flexDir="column" my="5">
                                    <Image onTransitionEnd="2s" src={noresult} alt="no-results" />
                                    <Text fontWeight="bold" fontSize="xl">
                                        Waiting For Search !
                                    </Text>
                                </Flex>
                            )}
                            </Box>
                        )}
                    </Flex>
                )
            }
        </Flex>
    </Flex>
    </>
  )
}

export default SearchFilters