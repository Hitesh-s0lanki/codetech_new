import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";

const status = [
  [
    {
      text: "Accepted",
      color: "green",
    },
    {
      text: "Wrong Answer",
      color: "red",
    },
  ],
  {
    text: "Error",
    color: "red",
  },
];

const RunedCase = ({ Status, info, result }) => {
  const text =
    Status === 1
      ? status[1]
      : result.output1 === info.expected1 && result.output2 === info.expected2
      ? status[0][0]
      : status[0][1];
  return (
    <Tabs variant="soft-rounded" colorScheme="gray">
      <Text p={1} fontSize={30} className="font-bold" color={text.color}>
        {text.text}
      </Text>
      {Status === 0 && (
        <>
          <TabList>
            <Tab>Case 1</Tab>
            <Tab>Case 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Text>Input</Text>
              <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {info.case1}
              </Text>
              <Text>Output</Text>
              <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {result.output1}
              </Text>
              <Text>Expected</Text>
              <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {info.expected1}
              </Text>
            </TabPanel>
            <TabPanel>
              <Text>Input</Text>
              <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {info.case2}
              </Text>
              <Text>Output</Text>
              <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {result.output2}
              </Text>
              <Text>Expected</Text>
              <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {info.expected2}
              </Text>
            </TabPanel>
          </TabPanels>
        </>
      )}
      {Status === 1 && (
        <main className="p-2">
            <Text
                className="border-1 rounded w-full p-2"
                style={{ background: "rgb(241, 220, 220)" }}
              >
                {result.error}
              </Text>
        </main>
      )}
    </Tabs>
  );
};

export default RunedCase;
