import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Spacer,
  Switch,
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
  Java:"java"
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

  const { RunCode, SubmitCode, RunUsingApi, SubmitUsingApi} = useCompilerContext();

  const [output, setOutput] = useState({ output1: "", output2: "", error: "" });
  const [showResult, setResult] = useState(false);
  const [status, setStatus] = useState(0);
  const toast = useToast()

  const getValue = (code, bool=true) => {
    let value = "";
    const uid = cookies.get('auth')
    const header = `public class ${uid} {\n    public static void main(String[] args) {`
    if(bool){
      if (language === "Cpp") {
        value = question.CppHeader + code + question.CppMain;
      } else if (language === "C") {
        value = question.CHeader + code + question.CMain;
      } else if (language === "Javascript") {
        value = code + "\n" + question.JavascriptMain;
      } else if (language === "Python") {
        value = code + question.PythonMain;
      } else if(language === "Java"){
        value = question.JavaHeader + "\n" + header + "\n" + code + "\n" + question.JavaMain;
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
      } else if(language === "Java"){
        value = question.JavaHeader + "\n" + header + "\n" + code + "\n" + question.JavaSubmit;
      }
    }

    return value;
  };

  const onRun = async (bool=true) => {
    console.log(bool)
    setTabIndex(1);
    setResult(false);
    setProgess(true);
    const uid = cookies.get("auth");
    if (uid !== "" && isUser()) {
      try {
        const value = getValue(code.current.getValue());
        let outputResponse = [];
        if(bool){
           outputResponse = await RunCode({
            uid,
            value,
            language: obj[language],
          });
        }else{
           outputResponse = await RunUsingApi({uid,value,language:language.toLowerCase(),lang:obj[language]})
        }

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

  const onSubmit = async(bool = true) =>{
    setLoading(true)
    const uid = cookies.get('auth')
    if(uid !== "" && isUser()){
      try{
        const value = getValue(code.current.getValue(), false)
        let response = []
        if(bool){
          response = await SubmitCode({uid, value, language: obj[language], question,code:code.current.getValue()})
        } else {
          response = await SubmitUsingApi({uid, value, language:language.toLowerCase() ,lang:obj[language], question ,code:code.current.getValue() })
        }
        createToast('success',`You Score ${response}`)
      } catch(error) {
        createToast('error',error)
      }
    } else{
      createToast('error',"First get Login")
    }
    setLoading(false)
  }

  const [apiSwitch, setApiSwitch] = useState(true)

  return (
    <div className="mx-1 ">
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Text</Tab>
          <Tab>Result</Tab>
        </TabList>
        <TabPanels>
          <TabPanel height={180} className="overflow-auto">
            <Case info={question} />
          </TabPanel>
          <TabPanel
            height={180}
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
        <Box p="4" className="flex items-center justify-center gap-2">
          <Text color="gray" className=" cursor-pointer" onClick={() => setApiSwitch(!apiSwitch) }>Console </Text>
          <Switch size='md' isChecked={apiSwitch} isDisabled/>
        </Box>
        <Spacer />
        <Box p="2">
          <div className="flex gap-2">
            <Button colorScheme="gray" onClick={() => onRun(apiSwitch)}>
              Run
            </Button>
            <Button
              isLoading={loading}
              loadingText='Submitting'
              colorScheme="whatsapp"
              onClick={() => onSubmit(apiSwitch)}>Submit</Button>
          </div>
        </Box>
      </Flex>
    </div>
  );
};

export default Console;
