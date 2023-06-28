export default function LoadingPage(){
    return(
        <div className="flex flex-col relative items-center justify-center w-screen h-screen bg-zBlueGreen-500 transition-all duration-300 border-black border-2 text-white">
            <div className='w-[100px] h-[100px] border-[10px] border-zBlueGreen-900 border-t-[10px] border-t-zBlueGreen-100 rounded-full animate-spin'></div>
        </div>
    )
}