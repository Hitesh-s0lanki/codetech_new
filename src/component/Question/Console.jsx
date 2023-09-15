import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Case from "../Common/Case";
import Cookies from "universal-cookie";
import { useCompilerContext } from "../../context/CompilerContext";
import { useAuthContext } from "../../context/AuthContext";
import RunedCase from "../Common/RunedCase";

const obj = {
  C: "c",
  Cpp: "cpp",
  Javascript: "js",
  Python: "py",
};

const cookies = new Cookies();

const Console = ({ question, code, language }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [progress, setProgess] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const { isUser } = useAuthContext()

  const { RunCode, SubmitCode } = useCompilerContext();

  const [output, setOutput] = useState({ output1: "", output2: "", error: "" });
  const [showResult, setResult] = useState(false);
  const [status, setStatus] = useState(0);
  const toast = useToast()

  const getValue = (code, bool=true) => {
    let value = "";
    if(bool){
      if (language === "Cpp") {
        value = question.CppHeader + code + question.CppMain;
      } else if (language === "C") {
        value = question.CHeader + code + question.CMain;
      } else if (language === "Javascript") {
        value = code + "\n" + question.JavascriptMain;
      } else if (language === "Python") {
        value = code + question.PythonMain;
      }
    }else{
      if (language === "Cpp") {
        value = question.CppHeader + code + question.CppSubmit;
      } else if (language === "C") {
        value = question.CHeader + code + question.CSubmit;
      } else if (language === "Javascript") {
        value = code + "\n" + question.JavascriptSubmit;
      } else if (language === "Python") {
        value = code + question.PythonSubmit;
      }
    }

    return value;
  };

  const onRun = async () => {
    setTabIndex(1);
    setResult(false);
    setProgess(true);
    const uid = cookies.get("auth");
    if (uid !== "" && isUser()) {
      try {
        const value = getValue(code.current.getValue());
        const outputResponse = await RunCode({
          uid,
          value,
          language: obj[language],
        });
        if (outputResponse.length >= 2) {
          setOutput({
            output1: outputResponse[0],
            output2: outputResponse[1],
          });
          setStatus(0);
        } else {
          setStatus(1);
        }
      } catch (error) {
        setOutput({ error: `${error}` });
        setStatus(1);
      }
    } else {
      createToast('error',"First get Login")
    }
    setProgess(false);
    setResult(true);
  };

  const createToast = (status, message) =>{
    toast({
      position:'top',
        title: `${message}`,
        status: status,
        isClosable: true,
      })
  }

  const onSubmit = async() =>{
    setLoading(true)
    const uid = cookies.get('auth')
    if(uid !== "" && isUser()){
      try{
        const value = getValue(code.current.getValue(), false)
        const response = await SubmitCode({uid, value, language: obj[language], question})
        createToast('success',`You Score ${response}`)
      } catch(error) {
        createToast('error',error)
      }
    } else{
      createToast('error',"First get Login")
    }
    setLoading(false)
  }

  return (
    <div className="mx-1 ">
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Result</Tab>
        </TabList>
        <TabPanels>
          <TabPanel height={145} className="overflow-auto">
            <Case info={question} />
          </TabPanel>
          <TabPanel
            height={145}
            className={`overflow-auto ${
              progress ? "flex items-center justify-center" : ""
            }`}
          >
            {progress && <CircularProgress isIndeterminate color="gray" />}
            {showResult && (
              <RunedCase Status={status} info={question} result={output} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex>
        <Box p="4" className=" items-baseline">
          <Text color="gray">Console</Text>
        </Box>
        <Spacer />
        <Box p="2">
          <div className="flex gap-2">
            <Button colorScheme="gray" onClick={onRun}>
              Run
            </Button>
            <Button
              isLoading={loading}
              loadingText='Submitting'
              colorScheme="whatsapp"
              onClick={onSubmit}>Submit</Button>
          </div>
        </Box>
      </Flex>
    </div>
  );
};

export default Console;
