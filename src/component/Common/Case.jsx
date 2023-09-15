import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text } from "@chakra-ui/react";

const Case = ({ info }) => {
  return (
    <Tabs variant="soft-rounded" colorScheme="gray">
      <TabList>
        <Tab>Case 1</Tab>
        <Tab>Case 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Text className="border-1 rounded w-full p-2" style={{background:"rgb(241, 220, 220)"}}>
            {info.case1}
          </Text>
        </TabPanel>
        <TabPanel>
        <Text className="border-1 rounded w-full p-2" style={{background:"rgb(241, 220, 220)"}}>
            {info.case2}
          </Text>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Case;
