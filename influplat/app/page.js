'use client';

import Image from 'next/image'
import greenVector from 'public/greenVector.svg'
import redVector from 'public/redVector.svg'
import purpleVector from 'public/purpleVector.svg'
import logo from 'public/base.png'
import SearchComponent from '@/components/SearchComponent/page'
import ResultSummary from '@/components/ResultSummary/page'
import { useState } from 'react'

export default function Home() {
  const [influencerNameList, setInfluencerList] = useState('')
  const [dataValid, setValidity] = useState(false)
  const [platform, setPlatform] = useState('Instagram')
  const [menuCollapsed, setMenuCollapseState] = useState(true)

  function menuCollapse(){
    setMenuCollapseState(!menuCollapsed)
  }

  return (
    <main className='min-h-screen md:max-h-screen bg-zYellow-500 min-w-screen max-w-screen flex flex-col items-center'> 

      <div className='flex w-full'>
        {/* toprow */}
        {/* <div className={`h-12 w-12 bg-zGreen-500`} onClick={menuCollapse}>Menu</div> */}
        <Image 
          src={logo}
          alt="Company logo"
          className='w-32 h-32 ml-4 block left-0'
        />
      </div>

      <div className={`absolute left-0 top-0 w-32 bg-zYellow-100 md:border-r-2 md:border-black min-h-screen ${menuCollapsed?'w-0 opacity-0 hidden':'w-screen md:w-64 opacity-100'} transition-all duration-300`}>
        <div className={`h-12 w-12 bg-zGreen-500`} onClick={menuCollapse}>Menu</div>
        options
        <div className='absolute bottom-0 text-center py-2 font-bold text-zYellow-500 w-full bg-red-50'>Login</div>
      </div>

      <div className='flex flex-col md:flex-row w-full h-full mb-4 md:h-2/5 md:overflow-clip pb-4'>
        <div className='left-0 top-0 w-full md:w-fit items-center'>
          {/* Searchtab */}
          <SearchComponent setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid} platform={platform} setPlatform={setPlatform}/>
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
