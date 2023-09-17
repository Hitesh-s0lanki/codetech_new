import React, { useEffect, useState } from "react";
import problem from '../assets/question/question.json'
import sql from '../assets/question/Sql.json'
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Problems = () => {
  const { getUser, isUser } = useAuthContext()
  const [marks, setMarks] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const navigate = useNavigate()

  useEffect(()=>{
    if(isUser()){
      setMarks(getUser().submitArray)
    }
  },[isUser, getUser])
  
  return (
    <div className="card rounded flex-fill w-100 my-3 drop-shadow-2xl" id="users">
      <div className="card-header border-0 card-header-space-between">
        <h2 className="card-header-title h4">Problems</h2>
      </div>

      <div className="table-responsive mx-3">
        <table className="table align-middle table-edge table-hover table-nowrap mb-0 cursor-pointer">
          <thead className="thead-light">
            <tr>
              <th className="w-60px">
                <div className="form-check mb-0">Sr no.</div>
              </th>
              <th>Title</th>
              <th>Status</th>
              <th>Marks</th>
              <th>Your Score</th>
            </tr>
          </thead>
          <tbody className="list">
            {problem.map((Element,index) => {
              return (
                <tr
                  key={Element.title}
                  className="my-3"
                  style={{ fontSize: "16px" }}
                  onClick={() => navigate("/question",{ state: Element })}
                >
                  <td
                    className="text-center"
                    style={{ padding: "20px", fontSize: "20px" }}
                  >
                    {Element.srno}
                  </td>
                  <td style={{ width: "500px" }}>{Element.title}</td>
                  <td className="status">{marks[index] === 0 ? Element.status : 'Solved'}</td>
                  <td
                    className="marks text-center mx-1"
                    style={{ color: "green" }}
                  >
                    {Element.marks}
                  </td>
                  {isUser() && <td
                    className="marks text-center mx-1"
                    style={{ color: "red" }}
                  >
                    {marks[index]}
                  </td>}
                </tr>
              );
            })}
            {sql.map((element, index) => {
              return (
                <tr
                  key={element.question[0]}
                  className="my-3"
                  style={{ fontSize: "16px" }}
                  onClick={() => navigate("/sql",{ state: element })}
                >
                  <td
                    className="text-center"
                    style={{ padding: "20px", fontSize: "20px" }}
                  >
                    {11 + index}
                  </td>
                  <td style={{ width: "500px" }}>{element.question[0]}</td>
                  <td className="status">{"Not Solved"}</td>
                  <td
                    className="marks text-center mx-1"
                    style={{ color: "green" }}
                  >
                    {10}
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
      <div className="card-footer"></div>
    </div>
  );
};

export default Problems;
