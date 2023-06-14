import SummaryCard from "../SummaryCard/page";

export default function ResultSummary({setList, influencerList, setValid, validFlag, platform, setPlatform}) {

    const data = influencerList.data

    return(
        <div className="w-full md:max-w-5xl px-8 text-zPurple-500">
            {validFlag?((data!=undefined && data!=null)?
            <div className="h-auto md:h-[450px] md:overflow-x-scroll md:no-scrollbar md:flex md:flex-row">
                {
                    data.map((influencer) => (
                        <SummaryCard key={influencer} influencerName={influencer} platform={platform} setPlatform={setPlatform}/>
                    ))
                }
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