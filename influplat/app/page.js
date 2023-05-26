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

  return (
    <main className='min-h-screen bg-zYellow-500 max-w-screen flex flex-col items-center'>
      <div className='flex w-full'>
        {/* toprow */}
        <Image 
          src={logo}
          alt="Company logo"
          className='w-32 h-32 ml-4 block left-0'
        />
      </div>
      <div className='left-0 top-0 h-auto w-full flex flex-col items-center'>
        {/* Searchtab */}
        <SearchComponent setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid}/>
      </div>
      <div className='w-full h-fit px-4 py-4 flex flex-col items-center'>
        {/* results */}
        <div className='w-full mx-1 bg-zPurple-500 border-black border-2 py-2 flex flex-col items-center'>
          Results
          <ResultSummary setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid}/>
        </div>
      </div>
      <div className='w-full bg-zPurple-500 mt-2 flex flex-row'>
        {/* footer */}
        <div className='mx-4 my-2 bg-white py-2 px-2 border-2 border-black flex flex-col items-center text-sm text-black'>
          <a  href="https://icons8.com/icon/32292/instagram" className='underline text-zPink-500 decoration-wavy' target='_blank'>Instagram</a> icon by <a href="https://icons8.com" className='underline text-zGreen-500 decoration-wavy' target='_blank'>Icons8</a>
        </div>
      </div>
    </main>
  )
}
