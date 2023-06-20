import SummaryCard from "../SummaryCard/page";

export default function ResultSummary({ offset, setOffset, setList, influencerList, setValid, validFlag, platform, setPlatform}) {

    const data = influencerList.data

    function increaseOffset(){
        setOffset(offset+25)
    }

    function decreaseOffset(){
        if(offset-25 >= 0){
            setOffset(offset-25)
        }
    }

    return(
        <div className="w-full md:max-w-5xl px-8 text-white group-hover:text-zPurple-500 transition-all duration-300">
            {validFlag?((data!=undefined && data!=null)?
            <div>
                <div className="h-auto md:h-[450px] md:overflow-x-scroll md:no-scrollbar md:flex md:flex-row md:overflow-y-clip">
                        {
                            data.map((influencer) => (
                                <SummaryCard key={influencer} influencerName={influencer} platform={platform} setPlatform={setPlatform}/>
                            ))
                        }
                </div>
                <div className='flex flex-col items-center w-full'>
                    <div className={`flex flex-row min-w-full`}>
                        <div className={`${offset===0?'text-gray-400':'text-black hover:text-zPink-500'} transition-all duration-300`} onClick={decreaseOffset}>{'<'}Previous &nbsp;</div>
                        <div>{offset+1} to {offset+25}</div>
                        <div className={`text-black hover:text-zPink-500 transition-all duration-300`} onClick={increaseOffset}>&nbsp; Next{'>'}</div>
                    </div>
                </div>
            </div>
            :
            <div>
                There was an error while fetching the requested data.
            </div>
            )
            :
            <div>
                <span className={``}>Perform a Search!</span>
            </div>
            }
        </div>
    )
}