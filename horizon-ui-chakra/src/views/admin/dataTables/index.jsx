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
  Box,
  SimpleGrid,
  Flex,
  Text,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import CheckTable from "views/admin/dataTables/components/CheckTable";
import ColumnsTable from "views/admin/dataTables/components/ColumnsTable";
import ComplexTable from "views/admin/dataTables/components/ComplexTable";
import {
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "views/admin/dataTables/variables/columnsData";

// import {CustomerDetailData} from "views/admin/profile/variables/CustomerDetail.json"
import tableDataDevelopment from "views/admin/dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "views/admin/dataTables/variables/tableDataCheck.json";
import tableDataColumns from "views/admin/dataTables/variables/tableDataColumns.json";
import tableDataComplex from "views/admin/dataTables/variables/tableDataComplex.json";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

export default function Settings() {
  // console.log(tableDataColumns);
  const history = useHistory();

  const handleAddCustomer = () => {
    history.push({
      pathname: `/admin/data-tables/addCustomer`,
    });
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");
  // console.log("HERE",history);
  const handleViewButtonClick = (data) => {
    // Navigate to the profile route with props
    const custId = data.id;
    // console.log(CustomerDetailData);

    history.push({
      pathname: `/admin/data-tables/profile/${custId}`,
      state: { id: custId },
    });
  };
  // Chakra Color Mode
  return (
    <Box>
      {/* <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
      </SimpleGrid> */}
      <Flex px="25px" py={'16px'} borderRadius={'16px'} justify="space-between" mb="20px" align="center" bg={'white'}>
        <Text
          color={textColor}
          fontSize="2rem"
          fontWeight="700"
          lineHeight="100%"
        >
          Customers
        </Text>
        <Button colorScheme="blue" onClick={handleAddCustomer}>
          Add Customers
        </Button>
      </Flex>
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={tableDataColumns}
        handleClick={handleViewButtonClick}
      />
    </Box>
  );
}
