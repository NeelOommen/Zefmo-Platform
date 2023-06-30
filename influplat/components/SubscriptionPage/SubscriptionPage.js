import Image from "next/image"
import logo from 'public/decologo.png'
import { auth } from '@/firebase/firebaseClient'
import { createCheckoutSession } from "@/stripe/createCheckoutSession"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from "react"

export default function SubscriptionPage(){
    const [user, userLoading] = useAuthState(auth)
    const [buttonText, setButtonText] = useState('Go Premium!')

    function buttonHandler(){
        setButtonText('Please wait while we redirect you...')
        createCheckoutSession(user.uid)
    }

    function logoutHandler(){
        auth.signOut()
    }

    return(
        <div className='bg-zBlueGreen-500 w-screen md:h-screen h-auto py-4 pb-0 md:pb-4'>
            <Image 
                src={logo}
                alt='Zefmo's Logo
                className='ml-8 mb-2 w-36'
            />
            <div className='grid md:grid-cols-2'>
                <div className=''>
                    <h1 className='font-poppins font-bold text-6xl ml-8 '>Subscribe today!</h1>
                    <div className='md:w-11/12 font-opensans md:text-xl bg-zYellow-500 md:ml-8 ml-4 mx-4 my-4 md:px-8 px-2 md:py-12 py-6 border-2 border-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300'>
                        Culpa quis deserunt consequat amet minim laborum sunt ullamco Lorem. Amet nulla ipsum esse ex occaecat ex tempor. Sunt cupidatat fugiat mollit labore ex ullamco amet. Eu duis commodo fugiat excepteur mollit esse nostrud consectetur reprehenderit. Aliqua incididunt deserunt velit velit consectetur. Adipisicing exercitation aute velit Lorem occaecat nulla.
                        <br />
                        Culpa excepteur sint nostrud excepteur esse commodo. Veniam ex cillum adipisicing in deserunt velit pariatur ullamco et aute officia duis sint. Adipisicing duis sint quis laboris. Pariatur voluptate veniam excepteur anim qui Lorem amet. Cillum consectetur quis nisi proident dolore tempor excepteur velit officia.
                        <br />
                        Culpa excepteur sint nostrud excepteur esse commodo. Veniam ex cillum adipisicing in deserunt velit pariatur ullamco et aute officia duis sint. Adipisicing duis sint quis laboris. Pariatur voluptate veniam excepteur anim qui Lorem amet. Cillum consectetur quis nisi proident dolore tempor excepteur velit officia.
                    </div>
                </div>
                <div className='relative overflow-clip px-4 flex flex-col items-center py-24 md:py-32 h-auto'>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zYellow-500 rounded-full z-10 mix-blend-hard-light animate-bgAnim"></div>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zPink-500 rounded-full   z-10 mix-blend-hard-light animate-bgAnim animation-delay-2000"></div>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zPurple-500 rounded-full z-10 mix-blend-hard-light animate-bgAnim animation-delay-4000"></div>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zRed-500 rounded-full    z-10 mix-blend-hard-light animate-bgAnim animation-delay-6000"></div>
                    <div className={`w-4/5 mx-4 p-4 ${!userLoading?'bg-zYellow-500 hover:bg-zYellow-100 hover:text-zYellow-900':'bg-gray-400 text-gray-800'} border-2 z-50 border-black shadow-harsh5px hover:shadow-harsh10px hover:rounded-2xl font-poppins font-bold text-white text-center m-4 mb-2 absolute bottom-24 transition-all duration-300`} onClick={buttonHandler}>{buttonText}</div>
                    <div className='w-4/5 mx-4 p-4 bg-zRed-500 hover:bg-zRed-100 hover:text-zRed-900 border-2 z-50 border-black shadow-harsh5px hover:shadow-harsh10px hover:rounded-2xl font-poppins font-bold text-white text-center m-4 mt-2 absolute bottom-0 transition-all duration-300' onClick={logoutHandler}>Logout</div>
                </div>
            </div>
        </div>
    )
}