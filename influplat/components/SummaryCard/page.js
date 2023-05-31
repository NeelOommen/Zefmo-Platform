import Image from "next/image"
import { useEffect, useState } from "react"
import defaultPFP from 'public/defaultPFP.png'

export default function SummaryCard({ influencerName, platform, setPlatform }){

    const[influencerData, setData] = useState('')
    const [youtubeData, setYoutubeData] = useState('')
    const [youtubeAdvanced, setYoutubeAdvanced] = useState('')
    const [youtubeHistory, setYoutubeHistory] = useState('')


    function getData(){
        if(platform === 'Instagram'){
            fetch(`https://dev.creatordb.app/v2/instagramBasic?instagramId=${influencerName}`, {
                headers: {
                  'Accept': 'application/json',
                  'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                }
            })
            .then(response => response.json())
            .then(data => {
                setData(data.data.basicInstagram)
            })
            .catch(error => {
                console.log(error)
            })
        }

        if(platform === 'Youtube'){
            fetch(`https://dev.creatordb.app/v2/youtubeDetail?youtubeId=${influencerName}`, {
                headers: {
                    'Accept': 'application/json',
                    'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                },
            })
            .then(response => response.json())
            .then(data => {
                setYoutubeData(data.data.basicYoutube)
                setYoutubeAdvanced(data.data.detailYoutube)
                setYoutubeHistory(data.data.histories[0])
            })
            .catch(error => {
                console.log(error)
            })  

        }
    }

    useEffect(() => {
        getData();
    },[influencerName])
    

    return(
        <div className="max-w-full my-4 mx-1 h-auto bg-zGreen-500 p-4 border-black border-2 flex flex-col items-center text-black">
            <Image 
                src={platform === 'Instagram' ? influencerData.avatar:defaultPFP}
                width={150}
                height={150}
                alt={influencerName + "'s Avatar"}
                className={`rounded-full border-black border-2`}
            />
            <div className={`text-white my-1 font-sans font-bold text-2xl px-4 ${platform==='Instagram'?'block':'hidden'}`}>
                {platform==='Instagram'?influencerData.instagramName:''}
            </div>
            <div className={`text-white my-1 font-sans font-bold text-2xl px-4 ${platform==='Youtube'?'block':'hidden'}`}>
                {platform==='Youtube'?youtubeData.youtubeName:''}
            </div>
            <div className={`my-2 flex flex-row items-center ${(platform === 'Instagram')?'block':'hidden'}`}>
                <Image 
                    src={'https://img.icons8.com/ios/50/instagram-new--v1.png'}
                    width={20}
                    height={20}
                    alt={'Instagram logo'}
                />
                &nbsp; @{platform==='Instagram'?influencerData.instagramId:''}
            </div>
            <div className={`my-2 flex flex-row items-center ${platform==='Youtube'?'block':'hidden'}`}>
                <Image 
                    src={'https://img.icons8.com/ios/50/youtube-play--v1.png'}
                    width={20}
                    height={20}
                    alt={'Youtube logo'}
                />
                &nbsp; {youtubeData.displayId}
            </div>
            <div className={`my-2 flex flex-row items-center ${(platform === 'Youtube' && youtubeData.instagramId!='' )?'block':'hidden'}`}>
                <Image 
                    src={'https://img.icons8.com/ios/50/instagram-new--v1.png'}
                    width={20}
                    height={20}
                    alt={'Instagram logo'}
                />
                &nbsp; @{youtubeData.instagramId}
            </div>  
            <div className={`${platform==='Instagram'?'block':'hidden'}`}>
                Followers: {platform==='Instagram'?influencerData.followers:''}
            </div>
            <div className={`${platform==='Youtube'?'block':'hidden'}`}>
                Subscribers: {platform==='Youtube'?youtubeHistory.subscribers:''}
            </div>
            <div className={`${platform==='Instagram'?'block':'hidden'}`}>
                Engagement Rate: {platform==='Instagram'?`${(influencerData.engageRate * 100).toFixed(3)}%`:''}
            </div>
            <div className={`${platform==='Youtube'?'block':'hidden'}`}>
                Engagement Rate (Last 20 Uploads): {platform==='Youtube'?`${(youtubeData.engageRateR20 * 100).toFixed(3)}%`:''}
            </div>
            <div className={`${platform==='Youtube'?'block':'hidden'}`}>
                Engagement Rate (Last 1 Year): {platform==='Youtube'?`${(youtubeData.engageRate1Y * 100).toFixed(3)}%`:''}
            </div>
        </div>
    )
}