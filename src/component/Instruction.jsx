import {
    Box,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
  } from "@chakra-ui/react";
  import React from "react";
  
  const Instruction = () => {
    return (
      <Card className="my-3 flex items-start justify-start drop-shadow-2xl">
        <CardHeader>
              <Box>
                <Heading size="sm">Instruction To Be Followed</Heading>
              </Box>
        </CardHeader>
        <CardBody>
          <p fontSize='lg' >Read Carefully</p>
        </CardBody>
        <CardFooter>
        </CardFooter>
      </Card>
    );
  };
  
  export default Instruction;
  