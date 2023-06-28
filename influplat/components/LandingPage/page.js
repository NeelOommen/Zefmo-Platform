'use client';

import { auth, db } from '@/firebase/firebaseClient';
import { signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { doc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore';
import { redirect } from 'next/navigation';
import logo from 'public/logoStyle1.png'
import Image from 'next/image';


export default function LandingPage({ page, setPage }){

    //persistenceMethod()
    const gProvider = new GoogleAuthProvider()

    function doLogin(){
        signInWithPopup(auth, gProvider)
          .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result)
            const token = credential.accessToken
            const user = result.user
            //setUserData(user)
            const btnString = 'Logged in as ' + user.displayName
            //setLoginButton(btnStriniig)
            //setLoggedIn(true)
            localStorage.setItem('loggedInUserData', JSON.stringify(user))
            const uData = {
              uid: user.uid,
              email: user.email,
              name: user.displayName,
              photoURL: user.photoURL,
          }
            await setDoc(doc(db, "users", user.uid), uData);
            setPage(1)
          })
          .catch((error) => {
            console.log(error)
            //setLoggedIn(false)
            localStorage.removeItem('loggedInUserData')
          })
    }

    return(
        <div className='min-w-screen relative max-h-screen overflow-x-clip h-screen bg-zBlueGreen-500 flex flex-col justify-center items-center'>
          <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-zYellow-500 rounded-full z-10 mix-blend-hard-light animate-bgAnim"></div>
          <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-zPink-500 rounded-full   z-10 mix-blend-hard-light animate-bgAnim animation-delay-2000"></div>
          <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-zPurple-500 rounded-full z-10 mix-blend-hard-light animate-bgAnim animation-delay-4000"></div>
          <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-zRed-500 rounded-full    z-10 mix-blend-hard-light animate-bgAnim animation-delay-6000"></div>
          <div className='md:px-8 px-4 py-4 border-white border-4 rounded-2xl w-fit  hover:scale-110 transition-all duration-300 z-50'>
            <Image 
              src={logo}
              alt="Company logo"
              className='ml-4 w-[300px] md:w-[500px] block left-0'
            />
          </div>
          <div className={`bg-zGreen-500 px-8 py-2 border-2  absolute z-50 bottom-16 shadow-harsh5px hover:shadow-harsh10px font-poppins border-softBlack-500 mx-4 my-4 flex flex-col items-center font-bold hover:bg-zPink-500 transition-all duration-300 text-xl active:scale-90 active:shadow-harsh5px hover:rounded-2xl`} onClick={doLogin}>Login</div>
          <a href='/termsandconditions' target='_blank' className='flex flex-col items-center absolute z-50 bottom-0'>
            <div className={`bg-zGreen-500 px-8 py-2 border-2 shadow-harsh5px hover:shadow-harsh10px font-poppins border-softBlack-500 mx-4 my-4 flex flex-col items-center font-bold hover:bg-zPink-500 transition-all duration-300 text-xl active:scale-90 active:shadow-harsh5px hover:rounded-2xl`}>Terms and Conditions</div>
          </a>
        </div>
    )
}