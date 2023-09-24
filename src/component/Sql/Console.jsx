import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Button, CircularProgress, useToast } from '@chakra-ui/react'
import Result from "./Result";
import { useSQLContext } from "../../context/SqlCompilerContext";
import Cookies from "universal-cookie";
import { useAuthContext } from "../../context/AuthContext";

const cookies = new Cookies()

const Console = ({ code, question }) => {

    const toast = useToast()

    const createToast = (status, message) =>{
      toast({
        position:'top',
          title: `${message}`,
          status: status,
          isClosable: true,
        })
    }

    const [progress, setProgess] = useState(false);
    const { runSqlCommand } = useSQLContext()
    const [result, showResult] = useState(false)
    const [output, setOutput] = useState([])
    const [status, setStatus] = useState("")
    const [error , setError] = useState("")

    const onRun = async() =>{
        showResult(false)
        setProgess(true)
        try{
            const uid = cookies.get('auth')
            const output = await runSqlCommand({uid,code: question.advance + code.current.getValue(), question})
            if(!output.error){
                setOutput(output.output)
                if(output.ans === question.answer){
                    setStatus("Accepted")
                } else {
                    setStatus("Wrong Answer")
                }
            } else {
                setStatus("Error")
                setError(output.error)
            }
        } catch(error){
            setStatus("Error")
            setError(`${error}`)
        }
        setProgess(false)
        showResult(true)
    }

    const { setUser, getAuthUser } = useAuthContext();

    const onSubmit = async() =>{
      try{
        const uid = cookies.get('auth')
        const output = await runSqlCommand({uid,code: question.advance + code.current.getValue(), question,bool:true})
        createToast('success',`You Score ${output.marks}`)
        const user = await getAuthUser(cookies.get("auth"));
        await setUser(user.user);
      }catch(error){
        createToast('error',`Error while Submitting ${error}`)
      }
    }
  return (
    <div className="border-1 rounded">
      <Tabs size="md" variant="enclosed">
        <TabList>
          <Tab>Output</Tab>
        </TabList>
        <TabPanels>
          <TabPanel height={250}>
            {progress && (
                <main className="flex items-center justify-center h-full">
                    <CircularProgress isIndeterminate color="gray" />
                </main>
            )}
            {result && <Result output={output} status={status} error={error}/>}
          </TabPanel>
        </TabPanels>
        <Box className="border-1 flex justify-between items-center p-2">
            <Text>Console</Text>
            <main className="flex gap-2">
                <Button colorScheme="gray" onClick={onRun}>Run</Button>
                <Button colorScheme="green" isDisabled={status !== "Accepted" } onClick={onSubmit}>Submit</Button>
            </main>
        </Box>
      </Tabs>
    </div>
  );
};

export default Console;
