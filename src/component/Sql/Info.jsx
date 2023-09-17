import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box, Textarea } from '@chakra-ui/react'

const Info = ({ question }) => {
  return (
    <div className='w-1/3 border-1 rounded p-2 overflow-auto'>
      <Tabs variant='enclosed'>
        <TabList>
            <Tab fontSize={30} color={'black'}>Description</Tab>
        </TabList>
        <TabPanels>
            <TabPanel className=' overflow-auto' height={700}>
                <Text fontSize={20} fontWeight={600} p={2}>{question.question[0]}</Text>
                <Box p={2} m={2} bg='gray.100'>
                    <Text fontSize={18} fontWeight={600}>Details</Text>
                    <Text fontSize={15} fontWeight={400}>{question.question[1]}</Text>
                    <Textarea value={question.question[2]} rows={15} disabled/>
                    <Text fontSize={15} fontWeight={400}>{question.question[3]}</Text>
                    <Textarea value={question.question[4]} rows={15} disabled/>
                </Box>

                {question.input.length !== 0 && <Box p={2} m={2} bg='gray.100'>
                    <Text fontSize={18} fontWeight={600}>Input</Text>
                    {question.output.map((element)=><Textarea value={element} rows={8} disabled/>)}
                </Box>}

                {question.output.length !== 0 && <Box p={2} m={2} bg='gray.100'>
                    <Text fontSize={18} fontWeight={600}>Output</Text>
                    {question.output.map((element)=><Textarea value={element} rows={8} disabled/>)}
                </Box>}
            </TabPanel>
        </TabPanels>
        </Tabs>
    </div>
  )
}

export default Info
