import { useEffect, useState } from "react";
import ArrayItem from "../ArrayItem/page";

export default function ArrayElements({ items }){
    const [emptyItems, setEmptyItems] = useState(true);

    function checkItems(){
        if(Array.isArray(items) && items.length>0){
            setEmptyItems(false)
        }
        else{
            setEmptyItems(true)
        }

        console.log(emptyItems)
    }

    useEffect(() => {
        checkItems();
    }, [items])


    return(
        <div className="max-w-full overflow-x-hidden h-auto">
            {emptyItems?'No Tags Found' : (
                <div className="flex flex-wrap">
                    {
                        items.map((item) => (
                            <ArrayItem 
                                key={item}
                                displayText={item}
                            />
                            ))
                    }
                </div>
            )
            }
        </div>
    )
}