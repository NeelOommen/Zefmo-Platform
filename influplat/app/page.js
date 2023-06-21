'use client';

import Image from 'next/image'
import logo from 'public/base.png'
import lines from 'public/isometric.svg'
import SearchComponent from '@/components/SearchComponent/page'
import ResultSummary from '@/components/ResultSummary/page'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import PresetNameModal from '@/components/PresetNameModal/page';
import PresetComponent from '@/components/PresetComponent/page';
import Head from 'next/head';

export default function Home() {
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

  const firebaseConfig = {
    apiKey: "AIzaSyAg-kS6-1XRd_fptvTIiG71KXh7LOZFX6w",
    authDomain: "zefnau-backend.firebaseapp.com",
    projectId: "zefnau-backend",
    storageBucket: "zefnau-backend.appspot.com",
    messagingSenderId: "201130665262",
    appId: "1:201130665262:web:c64c30107ae5742add06bf",
    measurementId: "G-R2G8DVH28D"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth(app)
  const persistenceMethod = async () => {
    await setPersistence(auth, browserLocalPersistence)
  }

  //persistenceMethod()
  const gProvider = new GoogleAuthProvider()

  function menuCollapse(){
    setMenuCollapseState(!menuCollapsed)
  }

  function doLogin(){
    const userDataLocal = localStorage.getItem('loggedInUserData')
    if(userDataLocal === null){
      signInWithPopup(auth, gProvider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result)
          const token = credential.accessToken
          const user = result.user
          setUserData(user)
          const btnString = 'Logged in as ' + user.displayName
          setLoginButton(btnString)
          setLoggedIn(true)
          localStorage.setItem('loggedInUserData', JSON.stringify(user))
        })
        .catch((error) => {
          console.log(error)
          setLoggedIn(false)
          localStorage.removeItem('loggedInUserData')
        })
    }
    else{
      const userDataTemp = JSON.parse(userDataLocal)
      const btnString = 'Logged in as ' + userDataTemp.displayName
      setLoginButton(btnString)
      setUserData(userDataTemp)
      setLoggedIn(true)
      localStorage.setItem('loggedInUserData', userDataLocal)
    }
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

  function checkLocalLogin(){
    const userDataLocal = localStorage.getItem('loggedInUserData')
    if(userDataLocal !== null){
      const userDataTemp = JSON.parse(userDataLocal)
      const btnString = 'Logged in as ' + userDataTemp.displayName
      setLoginButton(btnString)
      setUserData(userDataTemp)
      setLoggedIn(true)
      localStorage.setItem('loggedInUserData', userDataLocal)
    }
  }

  async function storePreset(){
    try{
      const collectionID= userData.uid
      await setDoc(doc(db, collectionID, presetName), preset);
    }
    catch(error){
      console.log(error)
      toastError('Something went wrong while adding this preset!')
    }
    getPresets()
  }

  async function getPresets(){
    if(loggedIn === true){
      const collectionID = userData.uid
      const presetData = await getDocs(collection(db, collectionID))
      setPresetList(presetData.docs)
    }
  }

  async function removePreset(){
    const collectionID = userData.uid
    await deleteDoc(doc(db, collectionID, presetToDelete))
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
    checkLocalLogin()
  }, [])

  return (
    <main className={`min-h-screen md:max-h-screen bg-zBlueGreen-500 min-w-screen max-w-screen flex flex-col items-center ${menuCollapsed?'overflow-y-clip':'overflow-y-clip'}`}> 
    <Head>
      <link rel="shortcut icon" href="/public/deco.ico" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Poppins:wght@700&display=swap" rel="stylesheet" />
    </Head>      
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

      <div className={`absolute left-0 top-0 w-32 max-w-full bg-zBlueGreen-500 md:border-r-2 md:border-black min-h-screen ${menuCollapsed?'w-0 opacity-0 -translate-x-96':'w-screen md:w-64 opacity-100 translate-x-0'} transition-all duration-300`}>
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

      {/* <div className='w-full bg-zPurple-500 mt-2flex flex-row'>
        <div className='mx-4 my-2 w-fit bg-white py-1 px-2 border-2 border-black flex flex-col items-center text-sm text-black'>
          <span><a  href="https://icons8.com/icon/32292/instagram" className='underline text-zPink-500 decoration-wavy' target='_blank'>Instagram</a>, <a  href="https://icons8.com/icon/37325/youtube" className='underline text-zPink-500 decoration-wavy' target='_blank'>YouTube</a></span> icon by <a href="https://icons8.com" className='underline text-zGreen-500 decoration-wavy' target='_blank'>Icons8</a>
        </div>
      </div> */}
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
