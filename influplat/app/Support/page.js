'use client';

import Image from 'next/image'
import Script from 'next/script';
import logo from 'public/decologo.png'
import { useState } from 'react'

export default function Support(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [msg, setMsg] = useState('')
    const [buttonMsg, setButtonMsg] = useState('Please Wait')
    const [ready, setReady] = useState(false)

    function scriptLoad(){
        setReady(true)
        setButtonMsg('Send')
    }

    function scriptError(){
        setReady(false)
        setButtonMsg('Something went wrong')
    }

    function sendEmail(){
        Email.send({
            SecureToken: '498cc3ab-08e2-4a73-9d03-a50aba1ce8fd',
            To: 'product@zefmo.com',
            From: 'support@zefmo.com',
            Subject: 'Support required',
            Body: msg
        })
        .then(function (message){
            console.log(message)
        })
    }

    return(
        <div className='bg-zBlueGreen-500 h-screen max-w-screen py-4 md:py-6 overflow-hidden flex flex-col items-center'>
            <Script 
                src='https://smtpjs.com/v3/smtp.js'
                strategy='afterInteractive'
                onLoad={scriptLoad}
                onError={scriptError}
            />
            <Image 
                src={logo}
                alt="Zefmo's Logo"
                className='ml-4 md:ml-8 w-36'
            />
            <div className='bg-zPurple-500 w-fit mx-4 md:mx-8 h-auto mt-4 md:mt-6 px-4 md:px-8 my-4 py-4 md:py-6 border-2 border-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300'>
                <h1 className='font-poppins font-bold text-2xl md:text-7xl'>Get in contact with us!</h1>
                <input 
                    type='text'
                    placeholder='Name'
                    className='my-4 w-full rounded-2xl h-12 p-4 border-2 border-black text-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300 focus:bg-zYellow-500 focus:text-white'
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                />
                <input 
                    type='email'
                    placeholder='Email'
                    className='my-4 w-full rounded-2xl h-12 p-4 border-2 border-black text-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300 focus:bg-zYellow-500 focus:text-white invalid:bg-red-500'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <textarea 
                    placeholder='How can we help you today?'
                    className='my-4 w-full rounded-2xl p-4 border-2 border-black text-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300 focus:bg-zYellow-500 focus:text-white'
                    rows='6'
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
                />
                <div className={`${ready?'bg-zGreen-500 hover:bg-zPink-500 hover:shadow-harsh10px':'bg-gray-800 text-white'} border-2 py-2 md:py-4  shadow-harsh5px font-poppins border-softBlack-500 mx-4 my-4 flex flex-col items-center font-bold transition-all duration-300 text-xl active:scale-90 active:shadow-harsh5px hover:rounded-2xl`} onClick={sendEmail}>{buttonMsg}</div>
            </div>
        </div>
    )
}