import { Disclosure} from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

import { useAuthContext } from '../context/AuthContext'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const navigation = [
  { name: 'Home', to: '/home', current: true },
  { name: 'ScoreBoard', to: '/score', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



export default function TopBar() {

    const navigate = useNavigate()
    const { isUser, setUser, getUser, getAuthUser} = useAuthContext()

    const onHomeClick = async() =>{
      try{
        const uid = cookies.get('auth')
        const user = await getAuthUser(uid)
        await setUser(user.user)
      } catch(err){
        console.log(err)
      }
    }

    const handleLogout = async() =>{
      cookies.set('auth',"")
      navigate("/")
      await setUser({})
    }

  return (
    <Disclosure as="nav" className="bg-white border-2">
          <div className="mx-10">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                <Link className="navbar-brand fw-bold text-2xl" to="/">
                  Code<span className="text-warning">Tech</span>
                </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        onClick={onHomeClick}
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {isUser() && (<div className=" flex items-center">
                  <div className="Timer mx-1 d-flex justify-content-center align-items-center fw-bold" >Total Score: </div>
                  <Button className="btn mx-1" colorScheme='whatsapp'>{getUser().score}</Button>
                  <div className="vr"></div>
                  <Button className="btn mx-2" colorScheme='red' onClick={handleLogout}>
                    Logout
                  </Button>
              </div>)}
            </div>
          </div>
    </Disclosure>
  )
}
