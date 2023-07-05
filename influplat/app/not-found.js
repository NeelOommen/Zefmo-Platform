
export default function Custom404() {
    return(
        <div className='w-screen h-screen bg-zBlueGreen-500 font-poppins font-bold flex flex-col items-center justify-center'>
            <div className='bg-zYellow-500 p-8 flex flex-col items-center border-2 border-black shadow-harsh5px hover:shadow-harsh10px transition-all duration-300'>
                <div className='text-7xl md:text-9xl'>404</div>
                <div className='text-4xl text-center'>The page you requested could not be found.</div>
            </div>
        </div>
    )
}