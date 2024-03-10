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

import { Box, Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useParams } from 'react-router-dom';

// Custom components
import Banner from "views/admin/profile/components/Banner";
import General from "views/admin/profile/components/General";
import Notifications from "views/admin/profile/components/Notifications";
import Projects from "views/admin/profile/components/Projects";
import Storage from "views/admin/profile/components/Storage";
import Upload from "views/admin/profile/components/Upload";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import  customerDetails  from 'views/admin/profile/variables/CustomerDetail.json';
import  BillDetails from 'views/admin/profile/variables/BillDetails.json';

// Assets
import avatar from "assets/img/avatars/customer.jpg"
import banner from "assets/img/auth/banner.png";
import React from "react";
import { columnsDataTransactions } from "./variables/ColumnData";
import ColumnsTable from "views/admin/profile/components/ColumnsTable";

export default function Overview() {
  // console.log(customerDetails);
  // console.log(customerDetails);
  // console.log("HERERERERE");
  

  const textColor = useColorModeValue("secondaryGray.900", "white");
  
  const location = useLocation();
  // debugger;  
  // console.log("yyyy");
  // console.log(location.state);

  
  // const {id } = location.state;
  const {id} = useParams();
  // console.log("id",id);
  // const {id} = {id:1};
  // console.log(id);
  // console.log(customerDetails);
  
  const currentCustomer = customerDetails.find(customer => customer.id === Number(id))
  // console.log(currentCustomer);
  // console.log(someProp, id);
  const history = useHistory();

  const handleAddTransaction = () => {
    // console.log(id);
    history.push({
      pathname: `/admin/data-tables/profile/${currentCustomer.id}/addTransaction`,
      state: { id: currentCustomer.id }
    });
  };

  const handleViewTransaction = (tid) => {
    // console.log("HETTTT");
    // console.log(tid);
    // console.log(currentCustomer);
    history.push({
      pathname: `/admin/data-tables/profile/${currentCustomer.id}/Transaction/${tid}`,
      state: { id: currentCustomer, tid :tid }
    });
  }


  const handleGoBack = () => {
    history.push({
      pathname: `/admin/data-tables/`,
      // state: { id: currentCustomer.id }
    });
  };
  return (
    <Box>
      {/* Main Fields */}
      
      <Text
      // leftIcon={}
      // colorScheme="blue"
      fontSize={'1.5rem'}
      background={'transparent'}
      cursor={'pointer'}
      _hover={{'color':'blue'}}
      // variant="solid"
      onClick={handleGoBack}
    >
      <ArrowBackIcon />
    </Text>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify="space-between"
        align={{ base: "flex-start" }}
        gap={{ base: "20px", lg: "20px" }}
      >
        
        <Banner
          banner={banner}
          avatar={avatar}
          name={currentCustomer.name}
          job={currentCustomer.type}
        />
        {/* {console.log(currentCustomer)} */}
        
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          // minH="250px"
          pe="20px"
          contact={currentCustomer.mobile}
          address={currentCustomer.address}
          email={currentCustomer.email}
          gst={currentCustomer.GSTIN}
        />
        {/* <Storage
    used={25.6}
    total={50}
  />
  <Upload
    minH={{ base: "auto", lg: "420px", "2xl": "365px" }}
    pe='20px'
    pb={{ base: "100px", lg: "20px" }}
  /> */}
      </Flex>

      {/* <Grid
        mb="20px"
        templateColumns={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1.34fr 1.62fr 1fr",
        }}
        templateRows={{
          base: "1fr",
          lg: "repeat(2, 1fr)",
          "2xl": "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        <Projects
          gridArea="1 / 2 / 2 / 2"
          banner={banner}
          avatar={avatar}
          name="Adela Parkson"
          job="Product Designer"
          posts="17"
          followers="9.7k"
          following="274"
        />
        <General
          gridArea={{ base: "2 / 1 / 3 / 2", lg: "1 / 2 / 2 / 3" }}
          minH="365px"
          pe="20px"
        />
        <Notifications
          used={25.6}
          total={50}
          gridArea={{
            base: "3 / 1 / 4 / 2",
            lg: "2 / 1 / 3 / 3",
            "2xl": "1 / 3 / 2 / 4",
          }}
        />
      </Grid> */}
{/* {console.log(BillDetails)} */}
<Box>
  <Flex px="25px" py={'16px'} borderRadius={'16px'} justify="space-between" mb="20px" align="center" bg={'white'}>
        <Text
          color={textColor}
          fontSize="2rem"
          fontWeight="700"
          lineHeight="100%"
        >
          Transactions
        </Text>
        <Button colorScheme="blue" onClick={handleAddTransaction}>
          Add Transaction
        </Button>
      </Flex>
    <ColumnsTable
          columnsData={columnsDataTransactions}
          tableData={BillDetails}
          handleClick={handleViewTransaction}
        />
  </Box>

    </Box>
  );
}