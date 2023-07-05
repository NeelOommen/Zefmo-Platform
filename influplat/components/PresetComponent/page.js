export default function PresetComponent({ loggedIn, data, presetToLoad, setPresetToLoad, presetFlag, setPresetFlag, presetToDelete, setPresetToDelete, deletePreset, setDeletePreset }){
    function handleClick(){
        setPresetToLoad(data._document.data.value.mapValue.fields.data.mapValue.fields)
        setPresetFlag(true)
    }

    function handleDel(){
        setPresetToDelete(data.id)
        setDeletePreset(true)
    }

    return(
        <div className={`px-4 py-2 m-2 max-w-fit font-opensans text-zYellow-900 w-full bg-zYellow-500 border-2 border-zGreen-900 hover:border-zYellow-500 hover:text-zYellow-500 hover:bg-zYellow-900 transition-all duration-300 hover:rounded-3xl flex flex-wrap items-center ${loggedIn?'block':'hidden'}`} onClick={handleClick}>
            {data.id}
            <div className="text-red-700 font-opensans text-xs bg-red-500 p-1 m-2 ml-16 md:ml-10 border-2 border-red-700 hover:bg-red-300 hover:text-red-700 transition-all duration-300 hover:rounded-3xl" onClick={handleDel}>
                Delete Preset
            </div>
        </div>
    )
}