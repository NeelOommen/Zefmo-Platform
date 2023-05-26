import SummaryCard from "../SummaryCard/page";

export default function ResultSummary({setList, influencerList, setValid, validFlag}) {

    const data = influencerList.data

    return(
        <div className="w-full">
            {validFlag?
            <div>
                {
                    data.map((influencer) => (
                        <SummaryCard key={influencer} influencerName={influencer}/>
                    ))
                }
            </div>
            :
            <span className={``}>No data</span>
            }
        </div>
    )
}