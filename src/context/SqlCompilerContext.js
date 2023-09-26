import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const { createContext, useContext } = require("react");

const SqlContext = createContext();


const SqlProvider = ({ children }) => {
  const runSqlCommand = async ({ uid, code , question ,bool = false}) => {

    const url = 'https://sql-code-compiler.p.rapidapi.com/';

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        'X-RapidAPI-Key': '77e7f44330mshb5bccf2b84c1782p1fb1efjsne98b35de514f',
		    'X-RapidAPI-Host': 'sql-code-compiler.p.rapidapi.com',
      },
      body: JSON.stringify({
        code: code,
        version: "latest",
      }),
    };

    try {
      if(bool){

        let userInfo = await getDoc(doc(db, "codeTech", uid));

        if (userInfo.exists()) {
          userInfo = userInfo.data();
  
          if (userInfo.submitArray[+question.srno - 1] === 0) {
            userInfo.score += 10;
            userInfo.submitArray[+question.srno - 1] = 10;

            //Add value to submit array
            const submit = {
              no:question.srno,
              language:"SQL",
              question:question.question[0],
              marks : 10,
              code:code,
              time: Date.now()
            }
            userInfo.submission.push(submit)

          }
          await setDoc(doc(db, "codeTech", uid), userInfo);
          
          return {marks: "10"}
        } else {
          throw new Error(`Error while Compiling the Code: ${"User Not exist"}`);
        }

      } else{
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result)
        let output = result.output.split("\n")
        let ans =  result.output
        if(output.length === 0){
          output = []
        }
        output = output.map((element) => {
          return element.split('|')
        })
        return {output:output,error:"",ans:ans}
    }
    } catch (error) {
         throw new Error(`Error while execution: ${error}`)
    }
  };


  return (
    <SqlContext.Provider value={{ runSqlCommand }}>
      {children}
    </SqlContext.Provider>
  );
};

const useSQLContext = () => {
  return useContext(SqlContext);
};

export { SqlProvider, SqlContext, useSQLContext };
