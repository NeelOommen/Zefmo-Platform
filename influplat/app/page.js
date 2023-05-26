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
      <div className='bg-zPurple-500 w-full h-fit px-4 py-4 flex flex-col items-center'>
        {/* results */}
        Results
        <ResultSummary setList={setInfluencerList} influencerList={influencerNameList} setValid={setValidity} validFlag={dataValid}/>
      </div>
      <a  href="https://icons8.com/icon/32292/instagram">Instagram</a> icon by <a href="https://icons8.com">Icons8</a>
    </main>
  )
}
