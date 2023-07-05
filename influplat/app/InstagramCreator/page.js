'use client';
import ArrayElements from "@/components/ArrayElements/page";
import SummaryCard from "@/components/SummaryCard/page";
import { Elsie_Swash_Caps } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";6

export default function InstagramCreator(){
    const [instagramData, setInstagramData] = useState('');
    const [youtubeData, setYoutubeData] = useState('');
    const [youtubeAdvancedData, setYoutubeAdvancedData] = useState('');
    const [youtubeHistoricalData, setYoutubeHistoryData] = useState('');
    const [emails, setEmails] = useState([]);

    const [instagramAvailable, setIAvailable] = useState(false);
    const [youtubeAvailable, setYAvailable] = useState(false);
    const [yLoad, setYLoad] = useState(false)
    const [iLoad, setILoad] = useState(false)

    const [relatedUsers, setRelatedUsers] = useState([])

    const [platform, setPlatform] = useState('')

    const [loading, setLoading] = useState(true)

    function getProps(){
        const tempPlatform = localStorage.getItem('platform')
        setPlatform(tempPlatform)
        const iStr = localStorage.getItem('instagramSearch')
        const yStr = localStorage.getItem('youtubeSearch')

        if(platform === 'Instagram'){
            setILoad(true)
            const idata = JSON.parse(iStr)
            setInstagramData(idata)
            const users = instagramData.relatedUsers
            setRelatedUsers(users)
            setIAvailable(true)
            setILoad(false)

            //get youtube if available
            if(localStorage.getItem('getYoutube') === 'true'){
                setYLoad(true)
                localStorage.setItem('getYoutube', 'false')
                fetch(`https://dev.creatordb.app/v2/youtubeDetail?youtubeId=${localStorage.getItem('youtubeSearch')}`, {
                    headers: {
                        'Accept': 'application/json',
                        'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                    },
                })
                .then(response => response.json())
                .then(data => {
                    setYoutubeData(data.data.basicYoutube)
                    setYoutubeAdvancedData(data.data.detailYoutube)
                    setYoutubeHistoryData(data.data.histories[0])
                    setYAvailable(true)
                    setYLoad(false)
    
                    if(youtubeData.hasEmail === true){
                        fetch(`https://dev.creatordb.app/v2/youtubeEmail?youtubeId=${youtubeData.youtubeId}`, {
                            headers: {
                                'Accept': 'application/json',
                                'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                            },
                        })
                        .then(response => response.json())
                        .then(data => {
                            setEmails(data.data)
                            setLoading(false)
                        })
                        .catch(error => {
                            console.log(error)
                            setLoading(false)
                        })
                    }
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false)
                })  
            }
            else{
                setLoading(false)
            }
        }
        
        if(platform === 'Youtube'){
            setYLoad(true)
            setYoutubeData(JSON.parse(localStorage.getItem('youtubeData')))
            setYoutubeAdvancedData(JSON.parse(localStorage.getItem('youtubeAdvanced')))
            setYoutubeHistoryData(JSON.parse(localStorage.getItem('youtubeHistory')))
            setYAvailable(true)
            setYLoad(false)

            //get instagram data if available
            if(localStorage.getItem('getInstagram') === 'true'){
                setILoad(true)
                localStorage.setItem('getInstagram', 'false')
                fetch(`https://dev.creatordb.app/v2/instagramBasic?instagramId=${iStr}`, {
                    headers: {
                      'Accept': 'application/json',
                      'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                    }
                })
                .then(response => response.json())
                .then(data => {
                    setInstagramData(data.data.basicInstagram)
                    const users = instagramData.relatedUsers
                    setRelatedUsers(users)
                    setIAvailable(true)
                    setILoad(false)
                    setLoading(false)
                })
                .catch(error => {
                    console.log(error)
                    setILoad(false)
                })
            }
            else{
                setILoad(false)
                setLoading(false)
            }
        }
    }

    useEffect(() => {
        getProps();
        if(platform !== 'Instagram' || platform !== 'Youtube'){
            setTimeout(function() {
                getProps()
            }, 1000)
        }
    }, [platform]);

    return(
        <div>
            {loading?(
                <div className="flex flex-col items-center justify-center min-w-screen h-screen bg-zBlueGreen-500 shadow-harsh10px border-black border-2 text-white">
                    <div className='w-[40px] h-[40px] border-[4px] border-zBlueGreen-900 border-t-[4px] border-t-zBlueGreen-100 rounded-full animate-spin'></div>
                </div>
            )
            :
            (
            <div className="bg-zBlueGreen-500 min-w-screen max-w-screen h-auto p-2">
                <div className="bg-zGreen-500 border-2 border-black max-w-full h-auto mt-1 mx-2 py-2 px-2 md:px-4 md:py-4 shadow-harsh5px">
                    <h1 className="text-5xl font-poppins">{instagramData.instagramName}</h1>
                    <div className="text-xl font-opensans">@{instagramData.instagramId}</div>
                    <Image 
                        src={instagramData.avatar}
                        width={150}
                        height={150}
                        alt={`${instagramData.instagramName}'s Picture`}
                        className="mt-2 rounded-full border-2 border-black shadow-harsh5px"
                    />
                    <div>
                        {iLoad?(
                            <div className="flex flex-col items-center justify-center max-w-full md:w-80 my-4 mx-1 md:mx-2 h-auto bg-zPink-500 shadow-harsh10px p-4 border-black border-2 text-white">
                                <div className='w-[40px] h-[40px] border-[4px] border-zPink-900 border-t-[4px] border-t-zPink-100 rounded-full animate-spin'></div>
                            </div>
                        ):(
                        <div className={`bg-zPink-500 p-2 mt-4 mx-2 border-2 border-black shadow-harsh5px ${instagramAvailable?'block':'hidden'}`}>
                            <div className="font-bold text-2xl mt-2 font-poppins">Instagram Statistics</div>
                            <div><a href={`https://www.instagram.com/${instagramData.instagramId}/`} target="_blank" className="text-white font-opensans hover:text-pinkComplement-500 transition-all duration-300">Head to the page</a></div>
                            <div className="mt-2 text-xl font-opensans">Followers: {instagramData.followers}</div>
                            <div className="mt-2 text-xl font-opensans">Average Likes: {instagramData.avgLikes}</div>
                            <div className="mt-2 text-xl font-opensans">Average Comments: {instagramData.avgComments}</div>
                            <div className="mt-2 text-xl font-opensans mb-2">Engagement Rate: {(instagramData.engageRate * 100).toFixed(3)}%</div>
                            <div className="mt-2 text-md font-opensans">Tags:</div>
                            <ArrayElements 
                                items={instagramData.hashtags}
                            />
                            {/* <div className="mt-2 text-xl">Related Users</div> */}
                            {/* <div className="h-auto md:h-[450px] md:overflow-x-scroll md:no-scrollbar md:flex md:flex-row">
                                    {
                                       relatedUsers!==undefined?(
                                            relatedUsers?.map((user) => (
                                                <SummaryCard key={user} influencerName={user} platform={platform} setPlatform={setPlatform}/>
                                            ))
                                       )
                                       :
                                       (
                                        <div>
                                            No Related Users found
                                        </div>
                                        )
                                        // <SummaryCard key={relatedUsers[0]} influencerName={relatedUsers[0]} platform={platform} setPlatform={setPlatform}/>
                                    }
                            </div> */}
                        </div>
                        )}
                    </div>

                    <div>
                        {yLoad?(
                            <div className="flex flex-col items-center justify-center max-w-full md:w-80 my-4 mx-1 md:mx-2 h-auto bg-zYellow-500 shadow-harsh10px p-4 border-black border-2 text-white">
                                <div className='w-[40px] h-[40px] border-[4px] border-zYellow-900 border-t-[4px] border-t-zYellow-100 rounded-full animate-spin'></div>
                            </div>
                        )
                        :
                        (
                        <div className={`bg-zYellow-500 p-2 mt-4 mx-2 border-2 border-black shadow-harsh5px ${youtubeAvailable?'block':'hidden'}`}>
                            <div className="font-bold text-2xl mt-2 font-poppins">Youtube Statistics</div>
                            <div><a href={`https://www.youtube.com/${youtubeData.displayId}/`} target="_blank" className="text-white font-opensans hover:text-yellowComplement-500 transition-all duration-300">Head to the page</a></div>
                            <div className="mt-2 text-xl font-opensans">Subscribers: {youtubeHistoricalData.subscribers}</div>
                            <div className="mt-2 text-xl font-opensans">Engagement Rate (Last 20 Uploads): {(youtubeData.engageRateR20 * 100).toFixed(3)}%</div>
                            <div className="mt-2 text-xl font-opensans">Engagement Rate (Last 1 Year): {(youtubeData.engageRate1Y * 100).toFixed(3)}%</div>
                            <div className="mt-2 text-xl font-opensans">Average Likes (Last 20 Uploads): {youtubeData.avgLikesR20}</div>
                            <div className="mt-2 text-xl font-opensans">Average Likes (Last 1 Year): {youtubeData.avgLikes1Y}</div>
                            <div className="mt-2 text-xl font-opensans">Average Comments (Last 20 Uploads): {youtubeData.avgCommentsR20}</div>
                            <div className="mt-2 text-xl font-opensans">Average Comments (Last 1 Year): {youtubeData.avgComments1Y}</div>
                            <div className="mt-2 text-xl font-opensans">Average views (Last 20 Uploads): {youtubeData.avgViewsR20}</div>
                            <div className="mt-2 text-xl font-opensans">Average views (Last 1 Year): {youtubeData.avgViews1Y}</div>
                            <div className="mt-2 text-xl font-opensans">Average Audience Age: {youtubeAdvancedData.dgAvgAge === 0?((youtubeAdvancedData.dgAvgAge) + ' Years'):'Not Available'}</div>
                            <div className="mt-2 text-xl font-opensans font-bold">Estimated Costs:</div>
                            <div className="mt-2 text-xl font-opensans">Cost per engagement: {youtubeAdvancedData.hasOwnProperty('representedCost')?('$' + youtubeAdvancedData.representedCost.costPerEngage[0].toFixed(2) + ' to $' + youtubeAdvancedData.representedCost.costPerEngage[1].toFixed(2)):('Not Available')}</div>
                            <div className="mt-2 text-xl font-opensans">Cost per 1000 views: {youtubeAdvancedData.hasOwnProperty('representedCost')?('$' + youtubeAdvancedData.representedCost.cpm[0].toFixed(2) + ' to $' + youtubeAdvancedData.representedCost.cpm[1].toFixed(2)):('Not Available')}</div>
                            <div className="mt-2 text-xl font-opensans">Overall Cost: {youtubeAdvancedData.hasOwnProperty('representedCost')?('$' + youtubeAdvancedData.representedCost.overallCost[0].toFixed(2) + ' to $' + youtubeAdvancedData.representedCost.overallCost[1].toFixed(2)):('Not Available')}</div>
                            {/* <div className="mt-2 text-xl font-opensans">Emails:</div> */}
                            {/* <div>
                                {emails.length>0?(
                                    <div className="flex flex-wrap">
                                        <ArrayElements 
                                            items={emails}
                                        />
                                    </div>
                                ):('No Emails Found')}
                            </div> */}
                        </div>
                        )}
                    </div>
                </div>
            </div>
        )}
        </div>
    )   
}   