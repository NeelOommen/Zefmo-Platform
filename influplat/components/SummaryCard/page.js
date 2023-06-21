import Image from "next/image"
import { useEffect, useState } from "react"
import defaultPFP from 'public/defaultPFP.png'

export default function SummaryCard({ influencerName, platform, setPlatform }){

    const[influencerData, setData] = useState('')
    const [youtubeData, setYoutubeData] = useState('')
    const [youtubeAdvanced, setYoutubeAdvanced] = useState('')
    const [youtubeHistory, setYoutubeHistory] = useState('')
    const [loading, setLoading] = useState(true)


    function getData(){
        setLoading(true)
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
            .finally(() => {
                setLoading(false)
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
                console.log(youtubeHistory)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        getData();
    },[influencerName])
    

    function storeData(){
        if(platform === 'Instagram'){
            // localStorage.setItem('instagramSearch', influencerName)
            localStorage.setItem('instagramSearch', JSON.stringify(influencerData))
            localStorage.setItem('getInstagram', 'false')
            
            if(influencerData.youtubeId!=''){
                localStorage.setItem('getYoutube', 'true')
                localStorage.setItem('youtubeSearch',influencerData.youtubeId)
            }
            else{
                localStorage.setItem('getYoutube', 'false')
                localStorage.setItem('youtubeSearch','NOT_AVAILABLE')
            }
        }
        else if(platform === 'Youtube'){
            // localStorage.setItem('youtubeSearch', influencerName)
            localStorage.setItem('youtubeSearch', 'AVAILABLE')
            localStorage.setItem('getYoutube', 'false')
            localStorage.setItem('youtubeData', JSON.stringify(youtubeData))
            localStorage.setItem('youtubeAdvanced', JSON.stringify(youtubeAdvanced))
            localStorage.setItem('youtubeHistory', JSON.stringify(youtubeHistory))

            if(youtubeData.instagramId != ''){
                localStorage.setItem('getInstagram', 'true')
                localStorage.setItem('youtubeSearch', 'NOT_AVAILABLE')
                localStorage.setItem('instagramSearch', youtubeData.instagramId)
            }
            else{
                localStorage.setItem('getInstagram', 'false')
                localStorage.setItem('youtubeSearch', 'NOT_AVAILABLE')
                localStorage.setItem('instagramSearch', 'NOT_AVAILABLE')
            }
        }
        else{
            localStorage.setItem('instagramSearch', 'NOT_AVAILABLE')
            localStorage.setItem('youtubeSearch', 'NOT_AVAILABLE')
        }
        localStorage.setItem('platform', platform)
    }

    return(
        <div>
            {loading?(
                <div className="flex flex-col items-center justify-center max-w-full md:w-80 my-4 mx-1 md:mx-2 h-auto bg-zGreen-500 shadow-harsh10px p-4 border-black border-2 text-white">
                    <div className='w-[40px] h-[40px] border-[4px] border-zGreen-900 border-t-[4px] border-t-zGreen-100 rounded-full animate-spin'></div>
                </div>
            )
            :
            (
                <a href='/InstagramCreator' onClick={storeData} target='_blank'>
                    <div 
                    className={`group max-w-full md:w-80 my-4 font-opensans mx-1 md:mx-2 h-[450px] bg-zGreen-500 text-zGreen-900 border-2 border-zGreen-900 hover:bg-zGreen-900 hover:text-zGreen-500 hover:border-zGreen-500 shadow-harsh10px p-4 flex flex-col items-center hover:rounded-2xl transition-all duration-300 ${platform === 'Youtube'?'px-8':''}`}
                    >
                        <Image 
                            src={platform === 'Instagram' ? influencerData.avatar:defaultPFP}
                            width={platform === 'Instagram' ? 150 : 75}
                            height={platform === 'Instagram' ? 150 : 75}
                            alt={influencerName + "'s Avatar"}
                            className={`rounded-full border-black border-2`}
                        />
                        <div className={`my-1 font-poppins text-2xl px-4 text-center ${platform==='Instagram'?'block':'hidden'}`}>
                            {platform==='Instagram'?influencerData.instagramName:''}
                        </div>
                        <div className={`my-1 font-poppins text-center text-2xl px-4 ${platform==='Youtube'?'block':'hidden'}`}>
                            {platform==='Youtube'?youtubeData.youtubeName:''}
                        </div>
                        <div className={`my-2 flex flex-row items-center ${(platform === 'Instagram')?'block':'hidden'}`}>
                            <Image 
                                src={'https://img.icons8.com/ios/50/instagram-new--v1.png'}
                                width={20}
                                height={20}
                                alt={'Instagram logo'}
                            />
                            &nbsp; <a href={`https://www.instagram.com/${influencerData.instagramId}/`} target='_blank' className="transition-all duration-300">@{platform==='Instagram'?influencerData.instagramId:''}</a>
                        </div>
                        <div className={`my-2 flex flex-row items-center ${platform==='Youtube'?'block':'hidden'}`}>
                            <Image 
                                src={'https://img.icons8.com/ios/50/youtube-play--v1.png'}
                                width={20}
                                height={20}
                                alt={'Youtube logo'}
                            />
                            &nbsp; <a href={`https://www.youtube.com/${youtubeData.displayId}`} target='_blank' className="hover:text-red-500 transition-all duration-300">{youtubeData.displayId}</a>
                        </div>
                        <div className={`my-2 flex flex-row items-center ${(platform === 'Youtube' && youtubeData.instagramId!='' )?'block':'hidden'}`}>
                            <Image 
                                src={'https://img.icons8.com/ios/50/instagram-new--v1.png'}
                                width={20}
                                height={20}
                                alt={'Instagram logo'}
                            />
                            &nbsp; <a href={`https://www.instagram.com/${youtubeData.instagramId}/`} target="_blank" className="hover:text-zPink-500 transition-all duration-300">@{youtubeData.instagramId}</a>
                        </div>  
                        <div className={`${platform==='Instagram'?'block':'hidden'}`}>
                            Followers: {platform==='Instagram'?influencerData.followers:''}
                        </div>
                        <div className={`${(platform==='Youtube' && youtubeHistory != undefined)?'block':'hidden'}`}>
                            Subscribers: {(platform==='Youtube' && youtubeHistory != undefined)?youtubeHistory.subscribers:''}
                        </div>
                        <div className={`${platform==='Instagram'?'block':'hidden'} text-center`}>
                            Engagement Rate: {platform==='Instagram'?`${(influencerData.engageRate * 100).toFixed(3)}%`:''}
                        </div>
                        <div className={`${platform==='Youtube'?'block':'hidden'} text-center`}>
                            Engagement Rate (Last 20 Uploads): {platform==='Youtube'?`${(youtubeData.engageRateR20 * 100).toFixed(3)}%`:''}
                        </div>
                        <div className={`${platform==='Youtube'?'block':'hidden'} text-center`}>
                            Engagement Rate (Last 1 Year): {platform==='Youtube'?`${(youtubeData.engageRate1Y * 100).toFixed(3)}%`:''}
                        </div>
                    </div>
                </a>
            )}
        </div>
    )
}