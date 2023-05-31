import SummaryCard from "../SummaryCard/page";

export default function ResultSummary({setList, influencerList, setValid, validFlag, platform, setPlatform}) {

    const data = influencerList.data

    return(
        <div className="w-full px-8">
            {validFlag?
            <div>
                {
                    data.map((influencer) => (
                        <SummaryCard key={influencer} influencerName={influencer} platform={platform} setPlatform={setPlatform}/>
                    ))
                }
            </div>
            :
            <span className={``}>No data</span>
            }
        </div>
    )
}