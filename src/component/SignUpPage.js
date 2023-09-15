import React, { useState } from 'react'
import CodeTech from '../assets/images/CodeTech.png'
import { Button, useToast } from '@chakra-ui/react'
import { useAuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
    const toast = useToast()
    const navigate = useNavigate()
    const [details,setDetails] = useState({Username:"",Password:"",Email:"",Confirm:""})
    const onChange = (e) =>{
        setDetails({...details,[e.target.name] : e.target.value})
    }

    const createToast = (status, message) =>{       
        return toast({
            position: 'top',
            title: message,
            status: status,
            isClosable: true,
            duration: 2000,
            containerStyle: {
                margin: '70px',
            },
        }) 
    }

    const {createUserAuthentication, setUser} = useAuthContext()

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const {Username,Password,Email} = details
        if(!Username || !Password || !Email){
            createToast('error','Fill the Complete Details')
        } else{
            try{
                const user = await(createUserAuthentication(Username, Email, Password))
                if(user.user !== ""){
                    await setUser(user)
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                      })
                      navigate('/')
                } else{
                    createToast('error', user.error)
                }
            } catch (error){
                createToast('error', error.message)
            }
        }
    }

    const signUpWithGoogle = () =>{
        createToast('warning', `This Feature is not there for now`)
    }


  return (
    <div className="container  p-3 rounded border-1 drop-shadow-2xl" style={{width:"400px",background:"#fff",margin:"20px auto"}}>
        <div className="container d-flex flex-column">
            <div className="logo d-flex flex-column" style={{justifyContent:"center",alignContent:"center",alignItems:"center",marginBottom:"35px"}}>
                <img src={CodeTech} alt="logo" height={80} width={100} style={{marginTop:"35px"}}/>
                <div className="text fw-bold" style={{fontSize:"30px"}}>
                    Code<span className="text-warning">Tech</span>
                </div>
            </div>
            <form method='post' className='d-flex flex-column' onSubmit={handleSubmit}>
                <input type="text" className="form-control my-2" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name='Username' value={details.Username} onChange={onChange} required/>
                <input type="password" className="form-control my-2" placeholder="Password" aria-label="Username" aria-describedby="basic-addon1" name='Password' value={details.Password} onChange={onChange}  required/>
                <input type="password" className={"form-control my-2" + (details.Password !== details.Confirm ?" border-danger" : "")} placeholder="Confirm password" aria-label="Username" aria-describedby="basic-addon1" value={details.Confirm} onChange={onChange} name='Confirm' required/>
                <input type="text" className="form-control my-2" placeholder="Email address" aria-label="Username" aria-describedby="basic-addon1" name='Email' value={details.Email} onChange={onChange}   required/>
                <Button type="submit" className="btn" colorScheme='gray'>Sign Up</Button>
            </form>
            <div className="RedirectText text-center my-2" style={{color:"gray"}}>
                Have an account?<span style={{color:"black" ,cursor:"pointer"}} onClick={()=>navigate('/')}>Sign In</span>
            </div>
            <div className="Simple Text text-center my-2" style={{color:"gray"}}>
                Or Sign In With Google
            </div>
            <Button margin={2} padding={2} style={{textTransform:"none",margin:"auto"}} onClick={signUpWithGoogle}>
                <img width="20px" style={{marginBottom:"3px", marginRight:"5px"}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                Google
            </Button>
        </div>
    </div>
  )
}

export default SignUpPage
