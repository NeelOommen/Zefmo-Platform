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
        <div className='bg-zBlueGreen-500 w-screen h-screen py-4 pb-0 md:pb-4 overflow-y-scroll md:overflow-y-clip'>
            <Image 
                src={logo}
                alt="Zefmo's Logo"
                className='ml-8 mb-2 w-36'
            />
            <div className='md:grid md:grid-cols-2 h-full '>
                <div className=''>
                    <h1 className='font-poppins font-bold text-6xl ml-8'>Subscribe today!</h1>
                    <div className='w-fit md:w-11/12 h-auto font-opensans font-bold md:text-2xl bg-zYellow-500 hover:bg-zYellow-100 hover:text-zYellow-900 hover:rounded-2xl md:ml-8 ml-4 mx-4 my-4 md:px-8 px-2 md:py-12 py-6 border-2 border-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300'>
                        Welcome to Zefmo Media&apos;s new Influencer Search platform that enables users to find the perfect influencers for their marketing campaigns. 
                        <br />
                        <br />
                        With advanced filtering options, brands can search based on criteria like demographics, niche, follower count, and location. The platform provides in-depth analytics and simplifies collaboration, empowering brands to make data-driven decisions and maximize the impact of their influencer marketing.
                    </div>
                </div>
                <div className='relative overflow-clip lg:px-4 flex flex-col items-center h-1/2 md:h-auto py-16 md:py-32'>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zYellow-500 rounded-full z-10 mix-blend-hard-light animate-bgAnim"></div>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zPink-500 rounded-full   z-10 mix-blend-hard-light animate-bgAnim animation-delay-2000"></div>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zPurple-500 rounded-full z-10 mix-blend-hard-light animate-bgAnim animation-delay-4000"></div>
                    <div className="absolute w-56 md:w-64 h-56 md:h-64 bg-zRed-500 rounded-full    z-10 mix-blend-hard-light animate-bgAnim animation-delay-6000"></div>
                    <div className={`w-4/5 mx-4 p-4 ${!userLoading?'bg-zYellow-500 hover:bg-zYellow-100 hover:text-zYellow-900':'bg-gray-400 text-gray-800'} border-2 z-50 border-black shadow-harsh5px hover:shadow-harsh10px hover:rounded-2xl font-poppins font-bold text-white text-center m-4 mb-2 absolute bottom-28 md:bottom-36 transition-all duration-300`} onClick={buttonHandler}>{buttonText}</div>
                    <div className='w-4/5 mx-4 p-4 bg-zRed-500 hover:bg-zRed-100 hover:text-zRed-900 border-2 z-50 border-black shadow-harsh5px hover:shadow-harsh10px hover:rounded-2xl font-poppins font-bold text-white text-center absolute mt-auto bottom-8 md:bottom-16 mb-4 transition-all duration-300' onClick={logoutHandler}>Logout</div>
                </div>
            </div>
        </div>
    )
}