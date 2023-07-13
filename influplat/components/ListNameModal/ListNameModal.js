import { useState } from "react";


export default function ListNameModal({ modalFlag, setModalFlag, listName, setListName, storeList}){
    const [tempName, setTempName] = useState('')
    
    function btnHandler(){
        setListName(tempName)
        setModalFlag(false)

        storeList()
    }

    return(
        <div className={`absolute top-0 left-0 min-h-screen w-screen flex flex-col items-center text-black ${modalFlag===true?'block':'hidden'}`}>
            <div className="bg-zBlueGreen-500 w-full md:w-fit h-auto flex flex-col items-center px-4 py-8 border-2 border-black shadow-harsh10px">
                <div>Give this List a name:</div>
                <input 
                    type='text'
                    placeholder='Enter List Name'
                    onChange={(e) => setTempName(e.target.value)}
                    value={tempName}
                    className='p-2 border-2 border-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300'
                />
                <div className={`bg-zGreen-500 border-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 mx-4 my-4 p-2 flex flex-col items-center font-bold text-md hover:rounded-2xl hover:bg-zPink-500 transition-all duration-300 text-xl active:scale-90 active:shadow-harsh5px`} onClick={btnHandler}>
                    Save List
                </div>
            </div>
        </div>
    )
}