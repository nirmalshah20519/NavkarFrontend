import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Grid,
  Heading,
  RadioGroup,
  Radio,
  Text,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

const CustomerForm = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
    const initialData = {
        firstname: "",
        lastname: "",
        gender: "",
        email: "",
        contact: "",
        address1: "",
        address2: "",
        city: "",
        pincode: "",
        state: "",
        gstin: "",
      }
  const [formData, setFormData] = useState(initialData);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validation rules
    let errorMessage = "";
    switch (name) {
      case "firstname":
        if (value.trim() === "") {
          errorMessage = "First name is required";
        }
        break;
      case "lastname":
        if (value.trim() === "") {
          errorMessage = "Last name is required";
        }
        break;
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          errorMessage = "Invalid email address";
        }
        break;
      case "contact":
        if (!/^[0-9]{10}$/.test(value)) {
          errorMessage = "Invalid contact number";
        }
        break;
      case "address1":
        if (value.trim() === "") {
          errorMessage = "Address Line 1 is required";
        }
        break;
      case "address2":
        if (value.trim() === "") {
          errorMessage = "Address Line 2 is required";
        }
        break;
      case "city":
        if (value.trim() === "") {
          errorMessage = "City is required";
        }
        break;
      case "pincode":
        if (!/^[0-9]{6}$/.test(value)) {
          errorMessage = "Invalid pincode";
        }
        break;
      case "state":
        if (value.trim() === "") {
          errorMessage = "State is required";
        }
        break;
      default:
        break;
    }
  
    // Update formData and errors
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: errorMessage });
  };
  
  

  const handleRadioChange = (e) => {
    // console.log(e.target);
    const {name, value, type, checked } = e.target;
  
    if (type === 'radio') {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {};
  
    // Validation rules
    Object.keys(formData).forEach((name) => {
      let errorMessage = "";
      const value = formData[name].trim();
  
      switch (name) {
        case "firstname":
          if (value === "") {
            errorMessage = "First name is required";
            formValid = false;
          }
          break;
        case "lastname":
          if (value === "") {
            errorMessage = "Last name is required";
            formValid = false;
          }
          break;
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value)) {
            errorMessage = "Invalid email address";
            formValid = false;
          }
          break;
        case "contact":
          if (!/^[0-9]{10}$/.test(value)) {
            errorMessage = "Invalid contact number";
            formValid = false;
          }
          break;
        case "address1":
          if (value === "") {
            errorMessage = "Address Line 1 is required";
            formValid = false;
          }
          break;
        case "address2":
          if (value === "") {
            errorMessage = "Address Line 2 is required";
            formValid = false;
          }
          break;
        case "city":
          if (value === "") {
            errorMessage = "City is required";
            formValid = false;
          }
          break;
        case "pincode":
          if (!/^[0-9]{6}$/.test(value)) {
            errorMessage = "Invalid pincode";
            formValid = false;
          }
          break;
        case "state":
          if (value === "") {
            errorMessage = "State is required";
            formValid = false;
          }
          break;
        default:
          break;
      }
  
      newErrors[name] = errorMessage;
    });
  
    // Update errors state
    setErrors(newErrors);
  
    if (formValid) {
      // Handle form submission here, e.g., send data to backend
      console.log(formData);
      // console.log(errors);
      setFormData(initialData);
      setErrors({});
      handleGoBack();
    }
  };
  
  

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" bg="white">
      <Box mb="4">
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
        <Heading as="h2" size="lg" mb="2">
          Add Customer
        </Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing="4">
          <Grid templateColumns="repeat(3, 1fr)" gap="8">
            <FormControl id="firstname">
              <FormLabel> <Text textColor={'red'} display={'inline'}>*</Text> First Name</FormLabel>
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                borderColor={errors.firstname ? "red.500" : "gray.400"}
              />
              {errors.firstname && (
                <Text textColor={'red'}>{errors.firstname}</Text>
              )}
            </FormControl>

            <FormControl id="lastname">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text>  Last Name</FormLabel>
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                borderColor={errors.lastname ? "red.500" : "gray.400"}
              />
              {errors.lastname && (
                <Text textColor={'red'}>{errors.lastname}</Text>
              )}
            </FormControl>

            <FormControl id="gender">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text> Gender</FormLabel>
              <RadioGroup name="gender" value={formData.gender}>
                <Stack direction="row">
                  <Radio value="male" onChange={handleRadioChange}>Male</Radio>
                  <Radio value="female" onChange={handleRadioChange}>Female</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap="8">
            <FormControl id="email">
              <FormLabel> Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                borderColor={errors.email ? "red.500" : "gray.400"}
              />
              {errors.email && (
                <Text textColor={'red'}>{errors.email}</Text>
              )}
            </FormControl>

            <FormControl id="contact">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text> Contact</FormLabel>
              <Input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                borderColor={errors.contact ? "red.500" : "gray.400"}
              />
              {errors.contact && (
                <Text textColor={'red'}>{errors.contact}</Text>
              )}
            </FormControl>

            <FormControl id="address1">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text> Address Line 1</FormLabel>
              <Input
                type="text"
                name="address1"
                value={formData.address1}
                onChange={handleChange}
                borderColor={errors.address1 ? "red.500" : "gray.400"}
              />
              {errors.address1 && (
                <Text textColor={'red'}>{errors.address1}</Text>
              )}
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap="8">
            <FormControl id="address2">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text> Address Line 2</FormLabel>
              <Input
                type="text"
                name="address2"
                value={formData.address2}
                onChange={handleChange}
                borderColor={errors.address2 ? "red.500" : "gray.400"}
              />
              {errors.address2 && (
                <Text textColor={'red'}>{errors.address2}</Text>
              )}
            </FormControl>

            <FormControl id="city">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text> City</FormLabel>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                borderColor={errors.city ? "red.500" : "gray.400"}
              />
              {errors.city && (
                <Text textColor={'red'}>{errors.city}</Text>
              )}
            </FormControl>

            <FormControl id="pincode">
              <FormLabel> <Text textColor={'red'}display={'inline'}>*</Text> Pincode</FormLabel>
              <Input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                borderColor={errors.pincode ? "red.500" : "gray.400"}
              />
              {errors.pincode && (
                <Text textColor={'red'}>{errors.pincode}</Text>
              )}
            </FormControl>
          </Grid>

          <Grid templateColumns="repeat(3, 1fr)" gap="8">
            <FormControl id="state">
              <FormLabel> <Text textColor={'red'} display={'inline'}>*</Text> State</FormLabel>
              <Input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                borderColor={errors.state ? "red.500" : "gray.400"}
              />
              {errors.state && (
                <Text textColor={'red'}>{errors.state}</Text>
              )}
            </FormControl>

            <FormControl id="gstin">
              <FormLabel>  GSTIN</FormLabel>
              <Input
                type="text"
                name="gstin"
                value={formData.gstin}
                onChange={handleChange}
                borderColor={errors.gstin ? "red.500" : "gray.400"}
              />
              {errors.gstin && (
                <Text textColor={'red'}>{errors.gstin}</Text>
              )}
            </FormControl>
          </Grid>

          <Button
            type="submit"
            colorScheme="blue"
            alignSelf="flex-end"
            borderRadius={3}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default CustomerForm;
