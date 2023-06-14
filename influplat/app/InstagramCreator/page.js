'use client';
import ArrayElements from "@/components/ArrayElements/page";
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

    function getProps(){
        const iStr = localStorage.getItem('instagramSearch')
        const yStr = localStorage.getItem('youtubeSearch')
        console.log(iStr)
        console.log(yStr)

        //instagram
        if(iStr != "NOT_AVAILABLE"){
            setIAvailable(true)
            fetch(`https://dev.creatordb.app/v2/instagramBasic?instagramId=${iStr}`, {
                headers: {
                  'Accept': 'application/json',
                  'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                }
            })
            .then(response => response.json())
            .then(data => {
                setInstagramData(data.data.basicInstagram)
                console.log(data.data.basicInstagram)
            })
            .catch(error => {
                console.log(error)
            })
        }
        else{
            setIAvailable(false)
        }
        

        //youtube data
        if(yStr != "NOT_AVAILABLE"){
            setYAvailable(true)
            fetch(`https://dev.creatordb.app/v2/youtubeDetail?youtubeId=${yStr}`, {
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
                console.log(youtubeData)
                //console.log(youtubeAdvancedData)
                //console.log(youtubeHistoricalData)

                if(youtubeData.hasEmail === true){
                    fetch(`https://dev.creatordb.app/v2/youtubeEmail?youtubeId=${youtubeData.youtubeId}`, {
                        headers: {
                            'Accept': 'application/json',
                            'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
                        },
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.data)
                        setEmails(data.data)
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })  
        }
        else{
            setYAvailable(false)
        }
    }

    useEffect(() => {
        getProps();
    }, []);

    return(
        <div className="bg-zYellow-500 min-w-screen max-w-screen h-auto p-2">
            <div className="bg-zGreen-500 border-2 border-black max-w-full h-auto mt-1 mx-2 py-2 px-2 shadow-harsh5px">
                <h1 className="text-5xl font-bold">{instagramData.instagramName}</h1>
                <div className="text-xl">@{instagramData.instagramId}</div>
                <Image 
                    src={instagramData.avatar}
                    width={150}
                    height={150}
                    alt={`${instagramData.instagramName}'s Picture`}
                    className="mt-2 rounded-full border-2 border-black shadow-harsh5px"
                />
                <div className={`bg-zPink-500 p-2 mt-4 mx-2 border-2 border-black shadow-harsh5px ${instagramAvailable?'block':'hidden'}`}>
                    <div className="font-bold text-2xl mt-2">Instagram Statistics</div>
                    <div><a href={`https://www.instagram.com/${instagramData.instagramId}/`} target="_blank" className="text-white font- hover:decoration-white hover:decoration-wavy transition-all duration-300">Head to the page</a></div>
                    <div className="mt-2 text-xl">Followers: {instagramData.followers}</div>
                    <div className="mt-2 text-xl">Average Likes: {instagramData.avgLikes}</div>
                    <div className="mt-2 text-xl">Average Comments: {instagramData.avgComments}</div>
                    <div className="mt-2 text-xl mb-2">Engagement Rate: {(instagramData.engageRate * 100).toFixed(3)}%</div>
                    <div className="mt-2 text-md">Tags:</div>
                    <ArrayElements 
                        items={instagramData.hashtags}
                    />
                </div>

                <div className={`bg-zYellow-500 p-2 mt-4 mx-2 border-2 border-black shadow-harsh5px ${youtubeAvailable?'block':'hidden'}`}>
                    <div className="font-bold text-2xl mt-2">Youtube Statistics</div>
                    <div><a href={`https://www.youtube.com/${youtubeData.displayId}/`} target="_blank" className="text-white font- hover:decoration-white hover:decoration-wavy transition-all duration-300">Head to the page</a></div>
                    <div className="mt-2 text-xl">Subscribers: {youtubeHistoricalData.subscribers}</div>
                    <div className="mt-2 text-xl">Engagement Rate (Last 20 Uploads): {(youtubeData.engageRateR20 * 100).toFixed(3)}%</div>
                    <div className="mt-2 text-xl">Engagement Rate (Last 1 Year): {(youtubeData.engageRate1Y * 100).toFixed(3)}%</div>
                    <div className="mt-2 text-xl">Average Likes (Last 20 Uploads): {youtubeData.avgLikesR20}</div>
                    <div className="mt-2 text-xl">Average Likes (Last 1 Year): {youtubeData.avgLikes1Y}</div>
                    <div className="mt-2 text-xl">Average Comments (Last 20 Uploads): {youtubeData.avgCommentsR20}</div>
                    <div className="mt-2 text-xl">Average Comments (Last 1 Year): {youtubeData.avgComments1Y}</div>
                    <div className="mt-2 text-xl">Average views (Last 20 Uploads): {youtubeData.avgViewsR20}</div>
                    <div className="mt-2 text-xl">Average views (Last 1 Year): {youtubeData.avgViews1Y}</div>
                    <div className="mt-2 text-xl">Average Audience Age: {youtubeAdvancedData.dgAvgAge === 0?((youtubeAdvancedData.dgAvgAge) + ' Years'):'Not Available'}</div>
                    <div className="mt-2 text-xl">Emails:</div>
                    <div>
                        {emails.length>0?(
                            <div className="flex flex-wrap">
                                <ArrayElements 
                                    items={emails}
                                />
                            </div>
                        ):('No Emails Found')}
                    </div>
                </div>
            </div>
        </div>
    )
}