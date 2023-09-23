import React, { useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tag,
} from "@chakra-ui/react";
import { useAuthContext } from "../../context/AuthContext";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Info = (props) => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [submittedCode, setSubmit] = useState([]);

  const { getSubmittedCode } = useAuthContext();
  const handleTabsChange = async (index) => {
    setTabIndex(index);
    if (index === 1) {
      try {
        const uid = cookies.get("auth");
        const getSubmit = await getSubmittedCode(uid, props.info.srno);
        setSubmit(getSubmit);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-full overflow-auto bg-white border-2 rounded w-1/3">
      <Tabs colorScheme="gray" index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab fontSize={17}>Description</Tab>
          <Tab fontSize={17}>Submission</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="p-1 h-full">
              <div
                className="Title d-flex my-2 fw-bold"
                style={{ fontSize: "20px" }}
              >
                <div className="no mx-1">{props.info.srno}.</div>
                <div className="name mx-2">{props.info.title}</div>
              </div>
              <div className="marks d-flex justify-content-between">
                <Tag
                m={1}
                fontSize={14}
                  colorScheme={
                    props.info.level === "easy"
                      ? "green"
                      : props.info.level === "medium"
                      ? "purple"
                      : "red"
                  }
                >
                  {props.info.level.toUpperCase()}
                </Tag>
                <span className="mx-2 p-2">10 marks</span>
              </div>
              <div
                className="description my-3 mx-2"
                style={{ fontSize: "17px" }}
              >
                {props.info.description}
              </div>
              <div className="container my-3">
                <p className="fw-bold">Example 1:</p>
                <div
                  className="example1 p-2 flex-column"
                  style={{ background: "#f1dcdc" }}
                >
                  <div>
                    {props.info.InputName} {props.info.case1}
                  </div>
                  <div>Output = {props.info.expected1}</div>
                </div>
              </div>
              <div className="container my-3 ">
                <p className="fw-bold">Example 2:</p>
                <div
                  className="example1 p-2 flex-column"
                  style={{ background: "#f1dcdc" }}
                >
                  <div>
                    {props.info.InputName} {props.info.case2}
                  </div>
                  <div>Output = {props.info.expected2}</div>
                </div>
              </div>
              <div className="conatiner my-3">
                <p className="fw-bold my-2 mx-2">Constraints : </p>
                <ul className="p-2">
                  {props.info.Constraints &&
                    props.info.Constraints.map((element, index) => {
                      return <li key={index}>{element}</li>;
                    })}
                </ul>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="p-1 h-full">
              <div className="card border-1 flex-fill w-90" id="users">
                <div className="card-header border-0 card-header-space-between">
                  <h2 className="card-header-title h5">Details</h2>
                </div>

                <div className="table-responsive mx-3">
                  <table className="table align-middle table-edge table-hover table-nowrap mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th className="w-20px">
                          <div className="form-check mb-0 text-center">
                            Srno.
                          </div>
                        </th>
                        <th>Language</th>
                        <th>YourScore</th>
                      </tr>
                    </thead>

                    <tbody className="list">
                      {submittedCode.map((element, index) => {
                        return (
                          <tr
                            className="my-3"
                            style={{ fontSize: "16px" }}
                            onClick={() =>
                              navigate("/submit", { state: element })
                            }
                          >
                            <td className="text-center">{index + 1}</td>
                            <td className="p-2" style={{ width: "500px" }}>
                              {element.language.toUpperCase()}
                            </td>
                            <td className="status">{element.marks}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Info;
