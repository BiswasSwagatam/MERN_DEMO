import { background, Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const {createProduct} = useProductStore();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if(!success){
      toast ({
        title:"Error",
        description: message,
        status:"error",
        isClosable: true,
      });
    }
    else {
      toast ({
        title:"Success",
        description: message,
        status:"success",
        isClosable: true,
      });
    }
    setNewProduct({name: "", price: "", image: ""});
  };

  return <Container maxW={"conatainer.sm"}>
    <VStack spacing={0}>
      <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
        Create Product
      </Heading>
      <Box
        w={"full"}
        background={useColorModeValue("white", "gray.900")}
        p={6}
        rounded={"lg"}
        shadow={"md"}
      >
        <VStack spacing={4}>
          <Input 
            placeholder="Product name"
            name="name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name:e.target.value})}
          />
          <Input 
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price:e.target.value})}
          />
          <Input 
            placeholder="Image URL"
            name="image"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image:e.target.value})}
          />
          <Button colorScheme="blue" onClick={handleAddProduct} w={'full'}>
            Add Product
          </Button>
        </VStack>
      </Box>
    </VStack>
  </Container>;

};

export default CreatePage;