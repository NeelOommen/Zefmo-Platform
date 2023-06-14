export default function PresetComponent({ loggedIn, data, presetToLoad, setPresetToLoad, presetFlag, setPresetFlag, presetToDelete, setPresetToDelete, deletePreset, setDeletePreset }){
    function handleClick(){
        console.log(data)
        setPresetToLoad(data._document.data.value.mapValue.fields)
        setPresetFlag(true)
    }

    function handleDel(){
        setPresetToDelete(data.id)
        setDeletePreset(true)
    }

    return(
        <div className={`px-4 py-2 m-2 bg-zPurple-100 text-zPurple-500 border-2 border-zPurple-500 hover:text-zPurple-100 hover:bg-zPurple-500 hover:border-zPurple-100 transition-all duration-300 hover:rounded-3xl flex flex-row items-center ${loggedIn?'block':'hidden'}`} onClick={handleClick}>
            {data.id}
            <div className="text-red-700 text-xs bg-red-500 p-1 m-2 border-2 border-red-700 hover:bg-red-300 hover:text-red-700 transition-all duration-300 hover:rounded-3xl" onClick={handleDel}>
                Delete Preset
            </div>
        </div>
    )
}