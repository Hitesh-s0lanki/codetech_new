import React from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Text, Box } from '@chakra-ui/react'

const Info = ({ question }) => {
  return (
    <div className='w-1/3 border-1 rounded p-2 overflow-auto'>
      <Tabs variant='enclosed'>
        <TabList>
            <Tab fontSize={30} color={'black'}>Description</Tab>
        </TabList>
        <TabPanels>
            <TabPanel className=' overflow-auto' height={700}>
                <Text fontSize={20} fontWeight={600} p={2}>{question.title}</Text>
                <Box p={2} m={2} bg='gray.100'>
                    <Text fontSize={18} fontWeight={600}>Details</Text>
                    <div className="p-1 overflow-auto">
                        {question.question.map((element)=>{
                            const Item = element.split("\n") 
                            
                            if(Item.length === 1){
                                return <p className='p-1 font-medium'>{Item[0]}</p>
                            }
                            return (
                                <div  className=' w-max '>
                                    {Item.map((e)=>{
                                        return <pre>{e}</pre>
                                    })}
                                </div>
                            )
                            
                        })}
                    </div>
                </Box>

                {question.input.length !== 0 && <Box p={2} m={2} bg='gray.100'>
                    <Text fontSize={18} fontWeight={600}>Input</Text>
                    <div className="p-1 overflow-auto">
                        {question.input.map((element)=>{
                            const Item = element.split("\n") 
                            
                            if(Item.length === 1){
                                return <p className='p-1 font-medium'>{Item[0]}</p>
                            }
                            return (
                                <div  className=' w-max '>
                                    {Item.map((e)=>{
                                        return <pre>{e}</pre>
                                    })}
                                </div>
                            )
                            
                        })}
                    </div>
                </Box>}

                {question.output.length !== 0 && <Box p={2} m={2} bg='gray.100'>
                    <Text fontSize={18} fontWeight={600}>Output</Text>
                    <div className="p-1 overflow-auto">
                        {question.output.map((element)=>{
                            const Item = element.split("\n") 
                            
                            if(Item.length === 1){
                                return <p className='p-1 font-medium'>{Item[0]}</p>
                            }
                            return (
                                <div className=' w-max '>
                                    {Item.map((e)=>{ 
                                        return <pre >{e}</pre>
                                    })}
                                </div>
                            )
                            
                        })}
                    </div>
                </Box>}
            </TabPanel>
        </TabPanels>
        </Tabs>
    </div>
  )
}

export default Info
