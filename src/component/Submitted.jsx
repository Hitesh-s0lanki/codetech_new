import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Editable, EditableTextarea, EditablePreview } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const Submitted = () => {
  const location = useLocation();
  const { code, language, time, marks } = location.state;
  return (
    <div className="container p-10">
      <Heading>Submitted Code</Heading>
      <div className="container">
        <Text fontSize={20} fontWeight={600} p={1}>
          language: {language}
        </Text>
        <Text fontSize={20} fontWeight={600} p={1}>
          Time Taken: {time}
        </Text>
        <Text fontSize={20} fontWeight={600} p={1}>
          Marks Obtain: {marks}
        </Text>
        <Box bg="gray" className="rounded" p={1} color="black" m={5}>
          <Editable
            bg="white"
            color="black"
            defaultValue={code}
            fontSize="xl"
            p={4}
            isPreviewFocusable
          >
            <EditablePreview height={400}/>
            <EditableTextarea height={400} />
          </Editable>
        </Box>
      </div>
    </div>
  );
};

export default Submitted;
