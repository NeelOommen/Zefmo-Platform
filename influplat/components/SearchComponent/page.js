import { useState } from "react";
import NextCors from 'nextjs-cors'


export default function SearchComponent({setList, influencerList, setValid, validFlag}) {
    const [collapsed, setCollapsed] = useState(true);
    const [buttonText, setButtonText] = useState('Show Filters');

    const [platform, setPlatform] = useState('');
    const [location, setLocation] = useState('');
    const [minFollowers, setMinFollowers] = useState(0);
    const [maxFollowers, setMaxFollowers] = useState(0);
    const [category, setCategory] = useState('');
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(0);

    const instagramSearchURL = 'https://dev.creatordb.app/v2/instagramAdvancedSearch'

    var searchHandler = function() {

        var filterList = []

        //Minimum Follower filter
        if(minFollowers != 0){
            const filter = {
                'filterKey': 'followers',
                'op': '>',
                'value': parseInt(minFollowers)
            }

            filterList.push(filter)
        }

        //Maximum Follower Filter
        if(maxFollowers != 0){
            const filter = {
                'filterKey': 'followers',
                'op': '<',
                'value': parseInt(maxFollowers)
            }

            filterList.push(filter)
        }

        //Location Filter
        if(location != ''){
            const filter = {
                'filterKey': 'country',
                'op': '=',
                'value': location
            }

            filterList.push(filter)
        }

        //Category Filter
        if(category != ''){
            const filter = {
                'filterKey': 'category',
                'op': '=',
                'value': category
            }

            filterList.push(filter)
        }

        //Minimum age filter
        if(minFollowers != 0){
            const filter = {
                'filterKey': 'followers',
                'op': '>',
                'value': parseInt(minFollowers)
            }

            filterList.push(filter)

            setMinFollowers(0)
        }


        fetch(instagramSearchURL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'apiId': '9hjiybMDHBg0xTnfDZBK5qwAErm2-0IdNSUn4zpizffcrZioD'
            },
            body: JSON.stringify({
              'desc': true,
              'filters': filterList,
              'maxResults': 25,
              'offset': 0,
              'sortBy': 'followers'
            })
        }).then(response => response.json())
        .then(data => {
            setList(data)
            setValid(true)
        })
        .catch(error => {
            console.log(error)
            setValid(false)
        })
    }

    var collapseHandler = function() {
        if(collapsed === true){
            setButtonText('Hide Filters');
            
        }
        else{
            setButtonText('Show Filters');
        }

        setCollapsed(!collapsed);
    }

    return(
        <div className={`w-full py-6 bg-zYellow-500 text-black transition-all duration-300 border-b-2 border-black`}>

            <div className={`text-black font-bold my-2 ml-4 ${collapsed===true?'text-lg':'text-4xl'} transition-all duration-300`}>Search</div>

            <div className={`px-4 py-6 text-black font-bold ${collapsed === true? 'hidden opacity-0':'block opacity-100'}`}>Platform</div>
            <select 
                className={`mx-4 px-4 py-2 border-black border-2 hover:bg-zPink-500 transition-all duration-300 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setPlatform(e.target.value)}
                value={platform}
            >
                <option value='instagram'>Instagram</option>
                <option value='tiktok'>Tiktok</option>
                <option value='youtube'>Youtube</option>
            </select>
            <div className={`px-4 py-6 text-black font-bold ${collapsed === true? 'hidden':'block'}`}>Country</div>
            <input 
                type='text'
                placeholder='country'
                className={`ml-4 px-4 py-2 text-black border-black border-2 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setLocation(e.target.value)}
                value={location}
            />
            <div className={`px-4 py-6 text-black font-bold ${collapsed === true? 'hidden':'block'}`}>Followers</div>
            <input 
                type='number'
                placeholder='min followers'
                className={`ml-4 px-4 py-2 border-black border-2 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setMinFollowers(e.target.value)}
                value={minFollowers}
            />
            <input 
                type='number'
                placeholder='max followers'
                className={`ml-4 px-4 py-2 border-black border-2 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setMaxFollowers(e.target.value)}
                value={maxFollowers}
            />
            <div className={`px-4 py-6 text-black font-bold ${collapsed === true? 'hidden':'block'}`}>Category</div>
            <input 
                type='text'
                placeholder='category'
                className={`ml-4 px-4 py-2 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setCategory(e.target.value)}
                value={category}
            />
            <div className={`px-4 py-6 text-black font-bold ${collapsed === true? 'hidden':'block'}`}>Tags</div>
            <input 
                type='text'
                placeholder='tags'
                className={`ml-4 px-4 py-2 ${collapsed === true? 'hidden':'block'}`}
            />
            <div className={`px-4 py-6 text-black font-bold ${collapsed === true? 'hidden':'block'}`}>Age</div>
            <input 
                type='number'
                placeholder='age from'
                className={`ml-4 px-4 py-2 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setMinAge(e.target.value)}
                value={minAge}
            />
            <input 
                type='number'
                placeholder='age to'
                className={`ml-4 px-4 py-2 ${collapsed === true? 'hidden':'block'}`}
                onChange={(e)=>setMaxAge(e.target.value)}
                value={maxAge}
            />

            <div className={`bg-zGreen-500 ${collapsed === true? 'hidden':'block'} border-2 border-black mx-4 my-4 flex flex-col items-center font-bold hover:bg-zPink-500 transition-all duration-300 text-xl`} onClick={searchHandler}>Search</div>

            <div className={`text-black font-bold my-4 mx-4 border-black border-2 min-w-screen right-4 flex flex-col items-center bg-zPink-500 hover:bg-zGreen-500 transition-all duration-300`} onClick={collapseHandler}>{buttonText}</div>
        </div>
    );
}