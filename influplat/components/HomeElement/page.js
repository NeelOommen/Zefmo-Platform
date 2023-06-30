'use client';

import Image from 'next/image'
import logo from 'public/base.png'
import instagramLogo from 'public/instagramLogo.png'
import facebookLogo from 'public/facebookLogo.png'
import linkedinLogo from 'public/linkedinLogo.png'
import youtubeLogo from 'public/youtubeLogo.png'
import SearchComponent from '@/components/SearchComponent/page'
import ResultSummary from '@/components/ResultSummary/page'
import { useEffect, useState } from 'react'
import { doc, collection, getDocs, setDoc, deleteDoc, or } from 'firebase/firestore'
import PresetNameModal from '@/components/PresetNameModal/page';
import PresetComponent from '@/components/PresetComponent/page';
import { db, auth } from '@/firebase/firebaseClient';

export default function HomeElement(){
    const [colFlag, setColFlag] = useState(false)
    const [influencerNameList, setInfluencerList] = useState('')
    const [dataValid, setValidity] = useState(false)
    const [platform, setPlatform] = useState('Youtube')
    const [menuCollapsed, setMenuCollapseState] = useState(true)
    const [loginButton, setLoginButton] = useState('Login')
    const [loggedIn, setLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [presetName, setPresetName] = useState('')
    const [preset, setPreset] = useState({})
    const [presetList, setPresetList] = useState([])
    const [errorFlag, setErrorFlag] = useState(false)
    const [errorMsg, setErrorMsg] = useState('Some new error')

    const [presetToLoad, setPresetToLoad] = useState({})
    const [loadPreset, setLoadPreset] = useState(false)

    const [presetToDelete, setPresetToDelete] = useState({})
    const [deletePreset, setDeletePreset] = useState(false)

    const [offset, setOffset] = useState(0)

    const [userData, setUserData] = useState({})

    const [firstRender, setFirstRender] = useState(true)

    function menuCollapse(){
      setMenuCollapseState(!menuCollapsed)
    }

    function doLogOut(){
      auth.signOut()
      setLoggedIn(false)
      localStorage.removeItem('loggedInUserData')
      setLoginButton('Login')
    }

    function toastError(errMsg){
      setErrorFlag(true)
      setErrorMsg(errMsg)
      setTimeout(()=>{
        setErrorFlag(false)
        setErrorMsg('')
      }, 5000)
    }

    function doLogin(){
      setLoginButton(`Logged in as ${auth.currentUser.displayName}`)
    }


    async function storePreset(){
      try{
        const userID= userData
        const pName = presetName
        await setDoc(doc(db, 'users', userID, 'presets', pName), preset);
      }
      catch(error){
        console.log(error)
        toastError('Something went wrong while adding this preset!')
      }
      getPresets()
    }

    async function getPresets(){
      if(loggedIn === true){
        const userID = userData
        const presetData = await getDocs(collection(db, `users/${userID}/presets/`))
        setPresetList(presetData.docs)
      }
    }

    async function removePreset(){
      const userId = userData
      await deleteDoc(doc(db, 'users',userId,'presets', presetToDelete))
      getPresets()
    }

    useEffect(() => {
      getPresets()
    }, [userData])

    useEffect(() => {
      if(deletePreset === true){
        removePreset()
        setDeletePreset(false)
      }
    }, [deletePreset])

    useEffect(() => {
      if(presetName!='undefined' && presetName!='' && typeof(presetName)!=typeof(undefined)){
        storePreset()
      }
    }, [presetName])

    useEffect(() => {
      setUserData(auth.currentUser.uid)
      setLoggedIn(true)
      doLogin()
    }, [])


    return(
        <main className={`min-h-screen h-fit md:max-h-screen bg-zBlueGreen-500 min-w-screen max-w-screen flex flex-col items-center ${menuCollapsed?'overflow-y-clip':'overflow-y-hidden'}`}>     
      <div className={`flex w-full flex-row items-center ${!colFlag?'bg-zBlueGreen-500':'bg-zYellow-500'} md:bg-zBlueGreen-500 m-0 z-0 transition-all duration-300`}>
        {/* toprow */}
        <div className={`h-12 font-bold font-poppins text-zGreen-900 bg-zGreen-500 border-zGreen-900 hover:border-zGreen-500 hover:text-zGreen-500 hover:bg-zGreen-900 transition-all duration-300 hover:rounded-2xl mx-2 ml-4 border-2 w-fit p-2`} onClick={menuCollapse}>Menu</div>
        <Image 
          src={logo}
          alt="Company logo"
          className='ml-4 w-36 block left-0'
        />
      </div>

      <PresetNameModal modalFlag={showModal} setModalFlag={setShowModal} presetName={presetName} setPresetName={setPresetName} preset={preset} setPreset={setPreset} storeDoc={storePreset}/>

      <div className={`absolute left-0 top-0 w-32 max-w-full bg-zBlueGreen-500 md:border-r-2 md:border-black min-h-screen ${menuCollapsed?'w-0 opacity-0 -translate-x-96':'w-screen md:w-64 opacity-100 translate-x-0 fixed'} transition-all duration-300`}>
        <div className={`px-4 py-2 font-poppins m-2 border-2 text-zGreen-900 w-full bg-zGreen-500 border-zGreen-900 hover:border-zGreen-500 hover:text-zGreen-500 hover:bg-zGreen-900 transition-all duration-300 hover:rounded-2xl max-w-fit`} onClick={menuCollapse}>Close Menu</div>
        <div className='font-poppins text-black text-xl mx-2'>Presets</div>
          <div className='h-96 overflow-y-auto'>
            {
              presetList.map((preset) => (
                <PresetComponent key={preset.id} loggedIn={loggedIn} data={preset} presetToLoad={presetToLoad} setPresetToLoad={setPresetToLoad} presetFlag={loadPreset} setPresetFlag={setLoadPreset} presetToDelete={presetToDelete} setPresetToDelete={setPresetToDelete} deletePreset={deletePreset} setDeletePreset={setDeletePreset}/>
              ))
            }
          </div>
        <div className={`absolute bottom-20 text-center py-2 font-bold text-zGreen-900 w-full bg-zGreen-500 border-2 border-zGreen-900 hover:border-zGreen-500 hover:text-zGreen-500 hover:bg-zGreen-900 font-opensans transition-all duration-300 ${loggedIn?'block':'hidden'}`} onClick={doLogOut}>Log Out</div>
        <div className='absolute bottom-0 text-center py-2 font-bold text-zGreen-900 w-full bg-zGreen-500 border-2 border-zGreen-900 hover:border-zGreen-500 hover:text-zGreen-500 hover:bg-zGreen-900 font-opensans transition-all duration-300' onClick={doLogin}>{loginButton}</div>
      </div>

      <div className='flex flex-col font-opensans md:flex-row w-full h-full mb-4 md:h-2/5 md:overflow-clip pb-4'>
        <div className='left-0 top-0 w-full md:w-fit items-center'>
          {/* Searchtab */}
          <SearchComponent offset={offset} setOffset={setOffset} setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid} platform={platform} setPlatform={setPlatform} loginStatus={loggedIn} showModal={showModal} setShowModal={setShowModal} preset={preset} setPreset={setPreset} presetToLoad={presetToLoad} setPresetToLoad={setPresetToLoad} presetFlag={loadPreset} setPresetFlag={setLoadPreset} colFlag={colFlag} setColFlag={setColFlag}/>
        </div>
        <div className='w-full h-fit px-4 py-4 md:py-0 flex flex-col items-center'>
          {/* results */}
          <div className='group/mainBox w-full mx-1 bg-zPurple-500 hover:bg-zPurple-100 border-black border-2 py-2 flex flex-col items-center shadow-harsh10px text-white hover:text-zPurple-500 transition-all duration-300'>
            <div className='font-poppins text-xl'>Results</div>
            <ResultSummary offset={offset} setOffset={setOffset} setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid} platform={platform} setPlatform={setPlatform}/>
          </div>
        </div>
      </div>

      <div className='w-full bg-zPurple-500 mt-2 flex md:flex-row flex-col items-center h-fit md:h-32 border-black border-t-2'>
        <div className='flex flex-row items-center'>
          <span className='text-xs ml-4'>© 2017 to 2023 Zefmo Media Pvt. Ltd. | All rights reserved</span>
          <div className='bg-white h-8 w-0 border-[1px] border-white mx-4'></div>
          <a href='/termsandconditions' target='_blank'>
            <span className='text-xs hover:text-zPink-500 decoration-white hover:decoration-zPink-500 underline transition-all duration-300'>Terms and Conditions</span>
          </a>
          <div className='bg-white h-8 w-0 border-[1px] border-white mx-4'></div>
          <a href='/Support' target='_blank'>
            <span className='text-xs hover:text-zPink-500 decoration-white hover:decoration-zPink-500 underline transition-all duration-300'>Support</span>
          </a>
        </div>
        <div className='flex flex-row items-center'>
          <div className='bg-white h-8 w-0 border-[1px] border-white mx-4'></div>
          <a href='https://www.instagram.com/zefmomedia/' target='_blank'>
            <Image 
              src={instagramLogo}
              height={20}
              width={20}
              alt={'Instagram logo'}
              className='filter invert hover:scale-125 transition-all duration-300'
            />
          </a>
          <div className='bg-white h-8 w-0 border-[1px] border-white mx-4'></div>
          <a href='https://www.youtube.com/@zefmomedia5071' target='_blank'>
            <Image 
              src={youtubeLogo}
              height={20}
              width={20}
              alt={'Youtube logo'}
              className='filter invert hover:scale-125 transition-all duration-300'
            />
          </a>
          <div className='bg-white h-8 w-0 border-[1px] border-white mx-4'></div>
          <a href='https://www.linkedin.com/company/zefmo' target='_blank'>
            <Image 
              src={linkedinLogo}
              height={20}
              width={20}
              alt={'Linkedin logo'}
              className='filter invert hover:scale-125 transition-all duration-300'
            />
          </a>
          <div className='bg-white h-8 w-0 border-[1px] border-white mx-4'></div>
          <a href='https://www.facebook.com/zefmomedia/' target='_blank'>
            <Image 
              src={facebookLogo}
              height={20}
              width={20}
              alt={'Facebook logo'}
              className='filter invert hover:scale-125 transition-all duration-300'
            />
          </a>  
        </div>
      </div>
      <div>
        {errorFlag?(
        <div className='bg-red-500 font-opensans p-4 absolute bottom-0 left-0 mb-4 ml-4 w-fit text-black border-2 border-black shadow-harsh5px'>
          {errorMsg}
        </div>
        )
        :
        (<div></div>)
        }
      </div>
    </main>
    )
}