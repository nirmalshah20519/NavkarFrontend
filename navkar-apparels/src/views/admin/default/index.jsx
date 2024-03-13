/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports

import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useEffect, useState } from "react";
import axios, * as others from 'axios';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import Error from "./components/Error";
import {columnsDataComplex} from "views/admin/default/variables/columnsData";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
export default function UserReports() {
  
  const redColor = useColorModeValue("red.500", "white");
  const redBg = useColorModeValue("red.100", "white");
  const greenColor = useColorModeValue("green.500", "white");
  const greenBg = useColorModeValue("green.100", "white");


  const [error, setError] = useState(null);

  const [customerData, setCustomerData] = useState([])

  useEffect(() => {
    getCustomers().then(()=>{console.log('');})
  },[])

  

  async function getCustomers() {
    // const axios = require('axios');
    // setIsSubmitting(true);

    try {
        const response = await axios.get('http://localhost:5000/api/getRequiredDataCustomers');
        // console.log(response.data);
        const d = response.data
        console.log(d);
        setCustomerData(d)
        setError(null)
        
        // setIsSubmitting(false);
    } catch (error) {
        setError('Oops! Something went wrong. Please try again later.');
        // setIsSubmitting(false);
    }
}

const handleRetry = () => {
  // Retry logic, you can make an API call or perform any necessary action here
  getCustomers();
};



  return (
    <>
    {error ? (
        <Error errorMessage={error} onRetry={handleRetry} />
      ):(
        <>
        <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
            startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={greenBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={greenColor} bg={greenBg} />
              }
            />
          }
          name={<Box color='green.600' fontSize='1.2rem'>Credit</Box>}
          value={<Box color='green.500' fontSize='2.5rem'>₹ 650.6</Box>}
          
        />
        <MiniStatistics
          
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={redBg} 
              icon={
                <Icon w='48px' h='48px' as={MdAttachMoney} color={redColor} />
              }
            />
          }
          name={<Box color='red.600' fontSize='1.2rem'>Debit</Box>}
          value={<Box color='red.500' fontSize='2.5rem'>₹ 650.6</Box>}
          
        />        
      </SimpleGrid>

    </Box>
    <Box >
    <ComplexTable
        columnsData={columnsDataComplex}
        tableData={customerData}
      />
    </Box>
        </>
      )}
    
  </>
  );
}
