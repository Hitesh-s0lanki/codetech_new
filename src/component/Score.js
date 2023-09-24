import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase-config";

const Score = () => {
  const [player, setPlayer] = useState([]);

  useEffect(() => {
    const getAllScore = async () => {
      const query1 = query(collection(db, "codeTech"), orderBy("score", "desc"), limit(5));
      let ans = [];

      try {
        const snapshot = await getDocs(query1);

        snapshot.forEach((doc) => {
          ans.push(doc.data());
        });
      } catch (error) {
        // Handle any potential errors here.
        console.error("Error fetching scores:", error);
      }

      return ans;
    };

    const func = async () => {
      setPlayer(await getAllScore());
    };
    func();
  }, []);

  return (
    <div className="h-full p-10 m-10 border-1 rounded">
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>ScoreBoard</TableCaption>
          <Thead>
            <Tr>
              <Th isNumeric>Rank</Th>
              <Th>Name</Th>
              <Th isNumeric>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {player.map((element, index) => (
              <Tr>
                <Td isNumeric>{index + 1}</Td>
                <Td>{element.name}</Td>
                <Td isNumeric>{element.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Score;
