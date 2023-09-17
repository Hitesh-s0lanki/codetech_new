const { createContext, useContext } = require("react");

const SqlContext = createContext();


const SqlProvider = ({ children }) => {
  const runSqlCommand = async ({ uid, code ,bool = false}) => {
    const url = "https://sql-code-compiler.p.rapidapi.com/";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "db68717ecemsh7537959e53f1ff2p115a3ajsn122cf34378f5",
        "X-RapidAPI-Host": "sql-code-compiler.p.rapidapi.com",
      },
      body: JSON.stringify({
        code: code,
        version: "latest",
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      let output = result.output.split("\n")
      let ans =  result.output
      if(output.length === 0){
        output = []
      }
      output = output.map((element) => {
        return element.split('|')
      })
      return {output:output,error:"",ans:ans}
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
