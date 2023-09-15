import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext } from "react";
import { db } from "../firebase-config";

const CompilerContext = createContext()

const CompilerProvider = ({ children }) =>{

    const RunCode = async({uid, value, language}) =>{
        const option = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({file:uid,language,code:value})
        }
        try{
            const response = await fetch('https://compilerapi.onrender.com/api/run',option)
    
            const json = await response.json()

            if(json.stderr){
                throw json.stderr
            }

            const output = json.output.split("\n")

            return output
            
        } catch (error) {
            throw new Error(`Error while Compiling the Code: ${error}`)
        }
    }

    const SubmitCode = async({uid, value, language, question}) =>{
        const option = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({file:uid,language,code:value})
        }
        try{
            const response = await fetch('https://compilerapi.onrender.com/api/run',option)
    
            const json = await response.json()

            console.log(json)
            
            if(json.stderr){
                throw new Error(`Error while Compiling the Code: ${json.stderr}`)
            }

            const output = +json.output

            let userInfo = await getDoc(doc(db, 'codeTech', uid))

            if (userInfo.exists()) {
                userInfo = userInfo.data()

    
                if(userInfo.submitArray[+question.srno - 1] < output){
                    userInfo.score += output - userInfo.submitArray[+question.srno - 1]
                    userInfo.submitArray[+question.srno - 1] = output
                }

                await setDoc(doc(db, 'codeTech', uid),userInfo)

              } else {
                throw new Error(`Error while Compiling the Code: ${"User Not exist"}`)
              }


            return output
            
        } catch (error) {
            throw new Error(`Error while Compiling the Code: ${error.message}`)
        }
    }

    return <CompilerContext.Provider value={{RunCode, SubmitCode}}>{children}</CompilerContext.Provider>
}

const useCompilerContext = () =>{
    return useContext(CompilerContext)
}

export {CompilerProvider , CompilerContext , useCompilerContext};