import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const Profile = (props) => {
    const toast = useToast()
    const viewProfile = () =>{
        toast({
            position: 'top',
            title: 'Not Available for this Competition',
            status: 'warning',
            isClosable: true,
            duration: 2000,
            containerStyle: {
                margin: '70px',
            },
        })  
    }
  return (
    <Card className="my-3 flex items-start justify-start drop-shadow-2xl">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name="Segun Adebayo"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            />

            <Box>
              <Heading size="sm">{props.name}</Heading>
              <Text>TechnoCrates, Participant</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize='lg' >Your Complete Score</Text>
        <div className="container m-5" style={{height:"200px",width:"200px"}}>
            <CircularProgressbar value={(props.score/150)*100}  text={`${props.score}/150`}/>
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={viewProfile}>View Profile</Button>
      </CardFooter>
    </Card>
  );
};

export default Profile;
