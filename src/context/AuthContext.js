import { createContext, useContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth, db} from '../firebase-config'
import { doc, getDoc, setDoc } from "firebase/firestore";


const AuthContext = createContext()



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})

    const createUserAuthentication = async(name, email, password) =>{
        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userInfo = {
                name:name,
                email:email,
                password:password,
                score:0,
                submitArray:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                status:false
            }

            await setDoc(doc(db, 'codeTech', userCredential.user.uid),userInfo)
            return {user:userInfo,error:""};
        } catch (error){
            return {user:"",error:error.message}
        }
    }

    const authenticateUser = async(email, password) =>{
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const userInfo = await getDoc(doc(db, 'codeTech', userCredential.user.uid))
            if (userInfo.exists()) {
                return {user:userInfo.data(),error:"",bool:true,uid:userCredential.user.uid}
              } else {
                return {user:"",error:"",bool:false}
              }
        } catch (error){
            return {user:"",error:error.message,bool:false}
        }
    }

    const getUser = () =>{
        return user
    }

    const getAuthUser = async(uid) =>{
        try{
            console.log("Getting User")
            const userInfo = await getDoc(doc(db, 'codeTech', uid))
            if (userInfo.exists()) {
                return {user:userInfo.data(),error:""}
              } else {
                return {user:"",error:"User Not exist"}
              }
        } catch(error) {
            return {user:"",error:error.message}
        }            
    }

    const isUser = () =>{
        if(Object.keys(user).length === 0)
            return false
        return true
    }

    return <AuthContext.Provider value={{createUserAuthentication, setUser, getUser, isUser, authenticateUser, getAuthUser}}>{children}</AuthContext.Provider>
}

// Custom Hook
const useAuthContext = () =>{
    return useContext(AuthContext)
}

export {AuthProvider , AuthContext , useAuthContext};