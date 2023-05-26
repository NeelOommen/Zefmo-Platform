import Image from "next/image"
import { useEffect, useState } from "react"

export default function SummaryCard({ influencerName }){

    const[influencerData, setData] = useState('')

    function getData(){
        fetch(`https://dev.creatordb.app/v2/instagramBasic?instagramId=${influencerName}`, {
            headers: {
              'Accept': 'application/json',
              'apiId': '9hjiybMDHBg0xTnfDZBK5qwAErm2-0IdNSUn4zpizffcrZioD'
            }
        })
        .then(response => response.json())
        .then(data => {
            setData(data.data.basicInstagram)
            console.log(data.data.basicInstagram)
        })
        .catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        getData();
    },[influencerName])
    

    return(
        <div className="max-w-full my-4 mx-1 h-auto bg-zGreen-500 p-4 border-black border-2 flex flex-col items-center text-black">
            <Image 
                src={influencerData.avatar}
                width={150}
                height={150}
                alt={influencerName + "'s Avatar"}
                className={`rounded-full border-black border-2`}
            />
            <div className="text-white my-1 font-sans font-bold text-2xl px-4">
                {influencerData.instagramName}
            </div>
            <div className="my-2 flex flex-row items-center">
                <Image 
                    src={'https://img.icons8.com/ios/50/instagram-new--v1.png'}
                    width={20}
                    height={20}
                    alt={'Instagram logo'}
                />
                &nbsp; @{influencerData.instagramId}
            </div>
            <div>
                Followers: {influencerData.followers}
            </div>
            <div>
                Engagement Rate: {(influencerData.engageRate * 100).toFixed(3)}%
            </div>

        </div>
    )
}