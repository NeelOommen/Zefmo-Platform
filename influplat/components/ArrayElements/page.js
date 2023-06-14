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
    }

    useEffect(() => {
        checkItems();
    }, [items, emptyItems])


    return(
        <div className="max-w-full overflow-x-hidden h-auto">
            {false?'No Items Found' : (
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