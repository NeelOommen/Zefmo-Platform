'use client';

import Image from 'next/image'
import greenVector from 'public/greenVector.svg'
import redVector from 'public/redVector.svg'
import purpleVector from 'public/purpleVector.svg'
import logo from 'public/base.png'
import SearchComponent from '@/components/SearchComponent/page'
import ResultSummary from '@/components/ResultSummary/page'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { doc, collection, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import PresetNameModal from '@/components/PresetNameModal/page';
import PresetComponent from '@/components/PresetComponent/page';

export default function Home() {
  const [influencerNameList, setInfluencerList] = useState('')
  const [dataValid, setValidity] = useState(false)
  const [platform, setPlatform] = useState('Instagram')
  const [menuCollapsed, setMenuCollapseState] = useState(true)
  const [loginButton, setLoginButton] = useState('Login')
  const [loggedIn, setLoggedIn] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [presetName, setPresetName] = useState('')
  const [preset, setPreset] = useState({})
  const [presetList, setPresetList] = useState([])

  const [presetToLoad, setPresetToLoad] = useState({})
  const [loadPreset, setLoadPreset] = useState(false)

  const [presetToDelete, setPresetToDelete] = useState({})
  const [deletePreset, setDeletePreset] = useState(false)

  const [userData, setUserData] = useState({})

  const firebaseConfig = {
    apiKey: "AIzaSyB4v1tPYfRSl-YEG0Ngz1YEymNk9_snUyY",
    authDomain: "zefmo-platform-temp.firebaseapp.com",
    projectId: "zefmo-platform-temp",
    storageBucket: "zefmo-platform-temp.appspot.com",
    messagingSenderId: "265949431449",
    appId: "1:265949431449:web:648b86d4cf25c00e5a9a08",
    measurementId: "G-NJE2MRG7LH"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const auth = getAuth()
  const gProvider = new GoogleAuthProvider()

  function menuCollapse(){
    setMenuCollapseState(!menuCollapsed)
  }

  function doLogin(){
    signInWithPopup(auth, gProvider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      const user = result.user
      setUserData(user)
      const btnString = 'Logged in as ' + user.displayName
      setLoginButton(btnString)
      setLoggedIn(true)
    })
    .catch((error) => {
      console.log(error)
      setLoggedIn(false)
    })
  }

  async function storePreset(){
    await setDoc(doc(db, userData.uid, presetName), preset);
    getPresets()
  }

  async function getPresets(){
    if(loggedIn === true){
      const presetData = await getDocs(collection(db, userData.uid))
      setPresetList(presetData.docs)
      console.log(presetData)
    }
  }

  async function removePreset(){
    await deleteDoc(doc(db, userData.uid, presetToDelete))
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

  return (
    <main className='min-h-screen md:max-h-screen bg-zYellow-500 min-w-screen max-w-screen flex flex-col items-center'> 

      <div className='flex w-full flex-row items-center'>
        {/* toprow */}
        <div className={`h-12 bg-zGreen-500 mx-2 border-2 border-black w-fit p-2`} onClick={menuCollapse}>Menu</div>
        <Image 
          src={logo}
          alt="Company logo"
          className='w-32 h-32 ml-4 block left-0'
        />
      </div>

      <PresetNameModal modalFlag={showModal} setModalFlag={setShowModal} presetName={presetName} setPresetName={setPresetName} preset={preset} setPreset={setPreset} storeDoc={storePreset}/>

      <div className={`absolute left-0 top-0 w-32 bg-zYellow-100 md:border-r-2 md:border-black min-h-screen ${menuCollapsed?'w-0 opacity-0 -translate-x-96':'w-screen md:w-64 opacity-100 translate-x-0'} transition-all duration-300`}>
        <div className={`px-4 py-2 m-2 bg-zPurple-100 text-zPurple-500 border-2 border-zPurple-500 hover:text-zPurple-100 hover:bg-zPurple-500 hover:border-zPurple-100 transition-all duration-300 hover:rounded-2xl`} onClick={menuCollapse}>Close Menu</div>
        <div className='font-bold text-black text-xl mx-2'>Presets</div>
          <div className='h-96 overflow-y-auto'>
            {
              presetList.map((preset) => (
                <PresetComponent key={preset.id} data={preset} presetToLoad={presetToLoad} setPresetToLoad={setPresetToLoad} presetFlag={loadPreset} setPresetFlag={setLoadPreset} presetToDelete={presetToDelete} setPresetToDelete={setPresetToDelete} deletePreset={deletePreset} setDeletePreset={setDeletePreset}/>
              ))
            }
          </div>
        <div className='absolute bottom-0 text-center py-2 font-bold text-zYellow-500 w-full bg-red-50' onClick={doLogin}>{loginButton}</div>
      </div>

      <div className='flex flex-col md:flex-row w-full h-full mb-4 md:h-2/5 md:overflow-clip pb-4'>
        <div className='left-0 top-0 w-full md:w-fit items-center'>
          {/* Searchtab */}
          <SearchComponent setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid} platform={platform} setPlatform={setPlatform} loginStatus={loggedIn} showModal={showModal} setShowModal={setShowModal} preset={preset} setPreset={setPreset} presetToLoad={presetToLoad} setPresetToLoad={setPresetToLoad} presetFlag={loadPreset} setPresetFlag={setLoadPreset}/>
        </div>
        <div className='w-full h-fit px-4 py-4 md:py-0 flex flex-col items-center'>
          {/* results */}
          <div className='w-full mx-1 bg-white hover:bg-zPurple-100 border-black border-2 py-2 flex flex-col items-center shadow-harsh10px transition-all duration-300'>
            <div className='font-bold text-zPurple-500 text-xl'>Results</div>
            <ResultSummary setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid} platform={platform} setPlatform={setPlatform}/>
          </div>
        </div>
      </div>

      <div className='w-full bg-zPurple-500 mt-2flex flex-row'>
        {/* footer */}
        <div className='mx-4 my-2 w-fit bg-white py-1 px-2 border-2 border-black flex flex-col items-center text-sm text-black'>
          <span><a  href="https://icons8.com/icon/32292/instagram" className='underline text-zPink-500 decoration-wavy' target='_blank'>Instagram</a>, <a  href="https://icons8.com/icon/37325/youtube" className='underline text-zPink-500 decoration-wavy' target='_blank'>YouTube</a></span> icon by <a href="https://icons8.com" className='underline text-zGreen-500 decoration-wavy' target='_blank'>Icons8</a>
        </div>
      </div>
    </main>
  )
}
