'use client';

import HomeElement from "@/components/HomeElement/page";
import LandingPage from "@/components/LandingPage/page";
import { useAuthState } from 'react-firebase-hooks/auth';
import usePremiumStatus from "@/stripe/usePremiumStatus";
import { auth } from '@/firebase/firebaseClient'
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import SubscriptionPage from "@/components/SubscriptionPage/SubscriptionPage";
import { useState } from "react";

export default function Home() {

  const [user, userLoading] = useAuthState(auth)
  const [page, setPage] = useState(0)
  const userIsPremium = usePremiumStatus(user)
  
  return (
    // <HomeElement />
    <div className='overflow-hidden bg-zBlueGreen-500'>
    {!user && userLoading && <LoadingPage />}
    {!user && !userLoading && <LandingPage page={page} setPage={setPage}/>
    }
    {user && !userLoading && (
      userIsPremium?
      (<HomeElement />)
      :
      (
          <SubscriptionPage page={page} setPage={setPage}/>
      )
    )}
    </div>
    //<LandingPage />
  )
}
