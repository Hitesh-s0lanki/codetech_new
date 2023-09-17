import { Box, Text } from "@chakra-ui/react";
import React from "react";
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";

const obj = {
    "Accepted":"green",
    "Wrong Answer":"red",
    "Error":"red"
}

const Result = ({ status , output, error }) => {
  return (
    <Box p={2} className=" overflow-auto">
      <Text fontSize={30} fontWeight={600} color={obj[status]}>
        {status}
      </Text>
      <Box bg="gray.100" p={3}>
        {status !== "Error" && <TableContainer className="border-2" width={"70%"}>
          <Table variant="simple" size='sm' className="border-2" colorScheme="whiteAlpha">
            <Tbody>
              {output &&
                output.map((element) => {
                  return (
                    <Tr>
                      {element.map((e) => {
                        return <Td>{e}</Td>;
                      })}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>}
        {status === "Error" && <Text>{error}</Text>}
      </Box>
    </Box>
  );
};

export default Result;
