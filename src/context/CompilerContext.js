import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext } from "react";
import { db } from "../firebase-config";

const CompilerContext = createContext();

const CompilerProvider = ({ children }) => {
  const RunCode = async ({ uid, value, language }) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: uid, language, code: value }),
    };
    try {
      const varTime = setTimeout(() => {
        throw new Error("Time limit Exceeded");
      }, 60000);

      const response = await fetch(
        "https://compilerapi.onrender.com/api/run",
        option
      );

      const json = await response.json();

      if (json.stderr) {
        throw json.stderr;
      }

      const output = json.output.split("\n");
      clearTimeout(varTime);

      return output;
    } catch (error) {
      throw new Error(`Error while Compiling the Code: ${error}`);
    }
  };

  const SubmitCode = async ({ uid, value, language, question , code}) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: uid, language, code: value }),
    };
    try {
      const response = await fetch(
        "https://compilerapi.onrender.com/api/run",
        option
      );

      const json = await response.json();

      if (json.stderr) {
        throw new Error(`Error while Compiling the Code: ${json.stderr}`);
      }

      const output = +json.output;

      let userInfo = await getDoc(doc(db, "codeTech", uid));

      if (userInfo.exists()) {
        userInfo = userInfo.data();

        if (userInfo.submitArray[+question.srno - 1] <= output) {
          userInfo.score += output - userInfo.submitArray[+question.srno - 1];
          userInfo.submitArray[+question.srno - 1] = output;

          //Add value to submit array
          const submit = {
            no:question.srno,
            language:language,
            question:question.title,
            marks : output,
            code:code,
            time: Date.now()
          }
          userInfo.submission.push(submit)
        }

        await setDoc(doc(db, "codeTech", uid), userInfo);
      } else {
        throw new Error(`Error while Compiling the Code: ${"User Not exist"}`);
      }

      return output;
    } catch (error) {
      throw new Error(`Error while Compiling the Code: ${error.message}`);
    }
  };

  const RunUsingApi = async ({ uid ,value, language, lang }) => {
    const url = "https://onecompiler-apis.p.rapidapi.com/api/v1/run";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "db68717ecemsh7537959e53f1ff2p115a3ajsn122cf34378f5",
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: language,
        files: [
          {
            name: `${uid}.${lang}`,
            content: value,
          },
        ],
      }),
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();

      if (json.stderr) {
        throw json.stderr;
      }

      const output = json.stdout.split("\n");

      return output;

    } catch (error) {
      throw new Error(`Error while Compiling the Code: ${error}`);
    }
  };

  const SubmitUsingApi = async ({ uid ,value, language, lang , question, code=""}) => {
    const url = "https://onecompiler-apis.p.rapidapi.com/api/v1/run";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "77e7f44330mshb5bccf2b84c1782p1fb1efjsne98b35de514f",
        "X-RapidAPI-Host": "onecompiler-apis.p.rapidapi.com",
      },
      body: JSON.stringify({
        language: language,
        files: [
          {
            name: `${uid}.${lang}`,
            content: value,
          },
        ],
      }),
    };

    try {
        const response = await fetch(url, options);
  
        const json = await response.json();
  
        if (json.stderr) {
          throw new Error(`Error while Compiling the Code: ${json.stderr}`);
        }
  
        const output = +json.stdout;
  
        let userInfo = await getDoc(doc(db, "codeTech", uid));
  
        if (userInfo.exists()) {
          userInfo = userInfo.data();
  
          if (userInfo.submitArray[+question.srno - 1] <= output) {
            userInfo.score += output - userInfo.submitArray[+question.srno - 1];
            userInfo.submitArray[+question.srno - 1] = output;

            //Add value to submit array
            const submit = {
              no:question.srno,
              language:language,
              question:question.title,
              marks : output,
              code:code,
              time: Date.now()
            }
            userInfo.submission.push(submit)
          }
  
          await setDoc(doc(db, "codeTech", uid), userInfo);
        } else {
          throw new Error(`Error while Compiling the Code: ${"User Not exist"}`);
        }
  
        return output;
      } catch (error) {
        throw new Error(`Error while Compiling the Code: ${error.message}`);
      }
  };

  return (
    <CompilerContext.Provider value={{ RunCode, SubmitCode, RunUsingApi, SubmitUsingApi}}>
      {children}
    </CompilerContext.Provider>
  );
};

const useCompilerContext = () => {
  return useContext(CompilerContext);
};

export { CompilerProvider, CompilerContext, useCompilerContext };
