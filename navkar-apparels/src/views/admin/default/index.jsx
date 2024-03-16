import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  useColorModeValue,
  Alert,
  AlertIcon,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { MdDelete, MdEdit, MdSave, MdCancel, MdAdd } from "react-icons/md";
import { useTable, useFilters, usePagination } from "react-table";

export default function UserReports() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [backendMessage, setBackendMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [editableProductId, setEditableProductId] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [filterInput, setFilterInput] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/getAllProductType"
      );
      setProducts(response.data);
      setError(null);
    } catch (error) {
      setError("Oops! Something went wrong. Please try again later.");
    }
    setIsLoading(false);
  };

  const handleDeleteProduct = async (productId) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `http://localhost:5000/api/deleteProduct/${productId}`
      );
      fetchProducts();
      setSuccessMessage("Product deleted successfully.");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Clear the message after 3 seconds
    } catch (error) {
      setBackendMessage(
        "Oops! Something went wrong while deleting the product. Please try again later."
      );
    }
    setIsLoading(false);
  };

  const handleEditProduct = (productId) => {
    setEditableProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    setEditedProductName(productToEdit.name);
  };

  const handleSaveProduct = async () => {
    setIsLoading(true);
    try {
      await axios.patch(
        `http://localhost:5000/api/updateProduct/${editableProductId}`,
        {
          name: editedProductName,
        }
      );
      setEditableProductId(null);
      fetchProducts();
      setSuccessMessage("Product updated successfully.");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Clear the message after 3 seconds
    } catch (error) {
      setBackendMessage(
        "Oops! Something went wrong while saving the product. Please try again later."
      );
    }
    setIsLoading(false);
  };

  const handleCancelEdit = () => {
    setEditableProductId(null);
  };

  const handleAddProduct = async () => {
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/addProduct", {
        name: newProductName,
      });
      setIsModalOpen(false);
      fetchProducts();
      setSuccessMessage("Product added successfully.");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Clear the message after 3 seconds
    } catch (error) {
      setBackendMessage(
        "Oops! Something went wrong while adding the product. Please try again later."
      );
    }
    setIsLoading(false);
  };

  const redColor = useColorModeValue("red.500", "white");
  const greenColor = useColorModeValue("green.500", "white");

  const data = React.useMemo(() => products, [products]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Product Name",
        accessor: "name",
        Filter: ({ column: { filterValue, setFilter } }) => (
          <Input
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search"
          />
        ),
        Cell: ({ row }) => {
          return (
            <>
              {row.original.id === editableProductId ? (
                <Input
                  value={editedProductName}
                  onChange={(e) => setEditedProductName(e.target.value)}
                />
              ) : (
                row.original.name
              )}
            </>
          );
        },
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => {
          return (
            <Flex justifyContent={"end"}>
              {row.original.id === editableProductId ? (
                <>
                  <Button colorScheme="blue" mr={2} onClick={handleSaveProduct}>
                    <MdSave />
                  </Button>
                  <Button colorScheme="red" onClick={handleCancelEdit}>
                    <MdCancel />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    colorScheme="red"
                    mr={2}
                    onClick={() => handleDeleteProduct(row.original.id)}
                  >
                    <MdDelete />
                  </Button>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEditProduct(row.original.id)}
                  >
                    <MdEdit />
                  </Button>
                </>
              )}
            </Flex>
          );
        },
      },
    ],
    [editableProductId, editedProductName]
  );

  const {
    // Destructure the necessary functions and state variables from useTable
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state: { pageIndex, pageSize, filters }, // Destructure pageSize from state
    // Destructure setPage to update the page size
    gotoPage,
    setPageSize,
    setFilter,
  } = useTable(
    { columns, data, initialState: { pageSize: 5 } }, // Set initial page size to 5
    useFilters,
    usePagination
  );

  const handleChangePageSize = (e) => {
    const size = Number(e.target.value);
    gotoPage(0); // Go back to the first page when changing page size
    setPageSize(size); // Set the new page size
  };

  useEffect(() => {
    setFilter("name", filterInput);
  }, [filterInput]);

  const globalFilter = (rows, searchText) => {
    return rows.filter((row) => {
      return Object.values(row.original).some((columnValue) =>
        columnValue.toString().toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  return (
    <>
      {error ? (
        <Box>
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
          <Button onClick={fetchProducts}>Retry</Button>
        </Box>
      ) : (
        <Box>
          <Text fontSize={"3rem"} fontWeight="bold" mb={4}>
            Dashboard
          </Text>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Box mb={4}>
                <Button
                  leftIcon={<MdAdd />}
                  colorScheme="blue"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Product
                </Button>
              </Box>
              <Table {...getTableProps()} variant="striped" colorScheme="gray">
                <Thead>
                  {headerGroups.map((headerGroup) => (
                    <Tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <Th {...column.getHeaderProps()}>
                          {column.render("Header") === "ACTION" ? (
                            <Text style={{ textAlign: "right" }}>
                              {column.render("Header")}
                            </Text>
                          ) : (
                            column.render("Header")
                          )}
                        </Th>
                      ))}
                    </Tr>
                  ))}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                  {page.map((row, i) => {
                    prepareRow(row);
                    return (
                      <Tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <Td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
              <Flex justifyContent="space-between" m={4} alignItems="center">
                <Flex>
                  <Tooltip label="First Page">
                    <IconButton
                      onClick={() => gotoPage(0)}
                      isDisabled={!canPreviousPage}
                      icon={<ArrowLeftIcon h={3} w={3} />}
                      mr={4}
                    />
                  </Tooltip>
                  <Tooltip label="Previous Page">
                    <IconButton
                      onClick={previousPage}
                      isDisabled={!canPreviousPage}
                      icon={<ChevronLeftIcon h={6} w={6} />}
                    />
                  </Tooltip>
                </Flex>

                <Flex alignItems="center">
                  <Text flexShrink="0" mr={8}>
                    Page{" "}
                    <Text fontWeight="bold" as="span">
                      {pageIndex + 1}
                    </Text>{" "}
                    of{" "}
                    <Text fontWeight="bold" as="span">
                      {pageOptions.length}
                    </Text>
                  </Text>
                  <Text flexShrink="0">Go to page:</Text>{" "}
                  <NumberInput
                    ml={2}
                    mr={8}
                    w={28}
                    min={1}
                    max={pageOptions.length}
                    onChange={(value) => {
                      const page = value ? value - 1 : 0;
                      gotoPage(page);
                    }}
                    defaultValue={pageIndex + 1}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Select
                    w={32}
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </Select>
                </Flex>

                <Flex>
                  <Tooltip label="Next Page">
                    <IconButton
                      onClick={nextPage}
                      isDisabled={!canNextPage}
                      icon={<ChevronRightIcon h={6} w={6} />}
                    />
                  </Tooltip>
                  <Tooltip label="Last Page">
                    <IconButton
                      onClick={() => gotoPage(pageOptions.length - 1)}
                      isDisabled={!canNextPage}
                      icon={<ArrowRightIcon h={3} w={3} />}
                      ml={4}
                    />
                  </Tooltip>
                </Flex>
              </Flex>

              {backendMessage && (
                <Alert status="error">
                  <AlertIcon />
                  {backendMessage}
                </Alert>
              )}
              {successMessage && (
                <Alert status="success">
                  <AlertIcon />
                  {successMessage}
                </Alert>
              )}
            </>
          )}
        </Box>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Product Name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
