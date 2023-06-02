'use client';
import ArrayElements from "@/components/ArrayElements/page";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InstagramCreator(){
    const [instagramData, setInstagramData] = useState('');
    const [youtubeData, setYoutubeData] = useState('');
    const [youtubeAdvancedData, setYoutubeAdvancedData] = useState('');
    const [youtubeHistoricalData, setYoutubeHistoryData] = useState('');

    function getProps(){
        const iStr = localStorage.getItem('instagramSearch')
        const yStr = localStorage.getItem('youtubeSearch')
        console.log(iStr)
        console.log(yStr)

        //instagram
        if(iStr != "NOT_AVAILABLE"){
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

        //youtube data
        if(yStr != "NOT_AVAILABLE"){
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
                console.log(youtubeAdvancedData)
                console.log(youtubeHistoricalData)
            })
            .catch(error => {
                console.log(error)
            })  
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
                <div className="bg-zPink-500 p-2 mt-4 mx-2 border-2 border-black shadow-harsh5px">
                    <div className="font-bold text-2xl mt-2">Instagram Statistics</div>
                    <div className="mt-2 text-xl">Followers: {instagramData.followers}</div>
                    <div className="mt-2 text-xl">Average Likes: {instagramData.avgLikes}</div>
                    <div className="mt-2 text-xl">Average Comments: {instagramData.avgComments}</div>
                    <div className="mt-2 text-xl mb-2">Engagement Rate: {(instagramData.engageRate * 100).toFixed(3)}%</div>
                    <div className="mt-2 text-md">Tags:</div>
                    <ArrayElements 
                        items={instagramData.hashtags}
                    />
                </div>

                <div className="bg-zYellow-500 p-2 mt-4 mx-2 border-2 border-black shadow-harsh5px">
                    <div className="font-bold text-2xl mt-2">Youtube Statistics</div>
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
                </div>
            </div>
        </div>
    )
}