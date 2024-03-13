import React, { useState } from "react";
import {
  Box,
  Text,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

const TransactionDetail = () => {
  const history = useHistory();
  const location = useLocation();
  // console.log(location.state);
  const { id, tid } = location.state;

  // Sample transaction data, replace it with actual data from your API or state management
  const transactionData = {
    id: tid,
    date: "2024-03-01",
    total: 250.0,
    items: [
      { id: 1, name: "Product 1", quantity: 2, price: 100.0 },
      { id: 2, name: "Product 2", quantity: 1, price: 50.0 },
      { id: 3, name: "Product 3", quantity: 3, price: 30.0 },
    ],
  };

  const [orderFormStatus, setOrderFormStatus] = useState("Created");
  const [orderStatus, setOrderStatus] = useState("Created");
  const [showForm, setShowForm] = useState(false);

  const [formValues, setFormValues] = useState({
    logisticName: "",
    shippingDate: "",
    trackingNo: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
    if (e.target.value !== "Created") {
      setShowForm(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    Object.keys(formValues).forEach((field) => {
      if (!formValues[field]) {
        errors[field] = `${field} is required`;
      }
    });

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(JSON.stringify(formValues, null, 2));
      setIsSubmitting(false);
    }
  };

  const handleGoBack = () => {
    // console.log(id);
    history.push(`/admin/data-tables/profile/${id.id}`, { id: id.id });
  };

  return (
    <Box p="4" bg="white" borderRadius="lg">
      <Text
        fontSize="1.5rem"
        background="transparent"
        cursor="pointer"
        _hover={{ color: "blue" }}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </Text>

      <Stack spacing="4">
        <Text fontWeight="semibold" fontSize="xl">
          Transaction Detail
        </Text>
        <Text>
          <strong>Transaction ID:</strong> {transactionData.id}
        </Text>
        <Text>
          <strong>Date:</strong> {transactionData.date}
        </Text>

        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactionData.items.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>{item.quantity}</Td>
                <Td>₹ {item.price.toFixed(2)}</Td>
                <Td>₹ {(item.quantity * item.price).toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Text fontWeight="semibold">
          <strong>Total:</strong> ₹ {transactionData.total.toFixed(2)}
        </Text>

        <Flex justifyContent="flex-start" alignItems={"end"} gap={2}>
          <FormControl width="25%">
            <FormLabel htmlFor="order-status">Order Status</FormLabel>
            <Select
              id="order-status"
              value={orderStatus}
              onChange={handleStatusChange}
            >
              {orderStatus === "Created" && (
                <option value="Created">Created</option>
              )}
              {/* <option value="Paid">Paid</option> */}
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </Select>
          </FormControl>
          <FormControl width="auto">
            <Button mt={4} colorScheme="teal" type="button">
              Save
            </Button>
          </FormControl>

          {/* <Button ml={2} onClick={handleSaveStatus}>Save Status</Button> */}
        </Flex>

        {showForm && (
          <>
            <Text fontSize="2xl" fontWeight="bold" mt="8" mb="4">
              Shipping Details
            </Text>
            <form onSubmit={handleSubmit}>
              <Flex
                align="center"
                justify="space-between"
                alignItems={"center"}
                wrap="wrap"
                gap="20px"
              >
                <FormControl isInvalid={!!formErrors.logisticName} flex="1">
                  <FormLabel htmlFor="logisticName">Logistic Name</FormLabel>
                  <Input
                    id="logisticName"
                    name="logisticName"
                    value={formValues.logisticName}
                    onChange={handleChange}
                    placeholder="Enter logistic name"
                  />
                  {formErrors.logisticName && (
                    <FormErrorMessage>
                      {formErrors.logisticName}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!formErrors.shippingDate} flex="1">
                  <FormLabel htmlFor="shippingDate">Shipping Date</FormLabel>
                  <Input
                    id="shippingDate"
                    name="shippingDate"
                    type="date"
                    value={formValues.shippingDate}
                    onChange={handleChange}
                    placeholder="Select shipping date"
                  />
                  {formErrors.shippingDate && (
                    <FormErrorMessage>
                      {formErrors.shippingDate}
                    </FormErrorMessage>
                  )}
                </FormControl>

                <FormControl isInvalid={!!formErrors.trackingNo} flex="1">
                  <FormLabel htmlFor="trackingNo">Tracking Number</FormLabel>
                  <Input
                    id="trackingNo"
                    name="trackingNo"
                    value={formValues.trackingNo}
                    onChange={handleChange}
                    placeholder="Enter tracking number"
                  />
                  {formErrors.trackingNo && (
                    <FormErrorMessage>{formErrors.trackingNo}</FormErrorMessage>
                  )}
                </FormControl>

                <Button
                  mt={4}
                  colorScheme="green"
                  isLoading={isSubmitting}
                  type="button"
                >
                  <em className="bi bi-whatsapp"></em>
                </Button>
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Save
                </Button>
              </Flex>
            </form>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default TransactionDetail;
