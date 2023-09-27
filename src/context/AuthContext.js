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
                submitArray:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                status:true,
                submission:[]
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
                const getName = await getDoc(doc(db, 'logical', userCredential.user.uid))
                const userInfo = {
                    name:email.split("@")[0],
                    email:email,
                    password:password,
                    score:0,
                    submitArray:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    status:true,
                    submission:[]
                }
    
                if(getName.exists()){
                    userInfo.name = getName.data().name1
                }else{
                    const getName = await getDoc(doc(db, 'round2', userCredential.user.uid))
                    if(getName.exists()){
                        userInfo.name = getName.data().name1
                    }
                }
                await setDoc(doc(db, 'codeTech', userCredential.user.uid),userInfo)
                return {user:userInfo,error:"",bool:true,uid:userCredential.user.uid};
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

    const getSubmittedCode = async(uid, question) =>{
        try{
            const userInfo = await getDoc(doc(db, 'codeTech', uid))
            if (userInfo.exists()) {
                let ans = []
                const arr = userInfo.data().submission
                arr.forEach((element) => {
                    if(element.no === question){
                        ans.push(element)
                    }
                });

                return ans

              } else {
                throw new Error('User Not exist')
              }
        } catch(error) {
            throw new Error(`Error while getting : ${error}`)
        }       
    }

    return <AuthContext.Provider value={{createUserAuthentication, setUser, getUser, isUser, authenticateUser, getAuthUser, getSubmittedCode}}>{children}</AuthContext.Provider>
}

// Custom Hook
const useAuthContext = () =>{
    return useContext(AuthContext)
}

export {AuthProvider , AuthContext , useAuthContext};