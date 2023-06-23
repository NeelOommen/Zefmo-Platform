import logo from 'public/decologo.png'
import Image from 'next/image'

export default function termsandconditions(){
    return(
        <div className='md:bg-zBlueGreen-500 bg-zYellow-500 md:w-auto h-auto py-4 md:p-6  px-4 md:px-12 text-black'>
            <Image 
                src={logo}
                alt="Company logo"
                className='ml-4 mb-4 w-36 block left-0'
            />
            <div className='bg-zYellow-500 md:border-2 md:border-black md:shadow-harsh10px md:p-4'>
                <h1 className='text-black font-poppins font-bold text-4xl'>TERMS AND CONDITIONS</h1>
                <br />
                <div>This agreement (&ldquo;Agreement&rdquo;) is entered into by and between the user (&ldquo;User&rdquo;) and Zefmo Media Pvt. Ltd. (&ldquo;Platform&rdquo;), a company incorporated under the laws of the Republic of India.</div>
                <br />
                <div>1. SERVICES: The Platform provides an online service that connects Users with influencers for the purposes of influencer marketing. The User may use the Platform to search, connect, interact and transact with influencers.</div>
                <br />
                <div>2. ELIGIBILITY: By using our services, the User represents and warrants that he/she is at least 18 years old and has the full power and authority to enter into this Agreement.</div>
                <br />
                <div>3. REGISTRATION AND ACCOUNT: The User is required to register and create an account to avail of the services offered by the Platform. The User agrees to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.</div>
                <br />
                <div>4. CONTENT OWNERSHIP: The User acknowledges that all intellectual property rights in the content shared by the influencers belong to the respective influencers or their licensors, and the Platform does not claim any ownership over such content.</div>
                <br />
                <div>5. CONFIDENTIALITY: The User agrees to maintain the confidentiality of the information obtained from the Platform and use it only for the purpose it was intended for.</div>
                <br />
                <div>6. DATA PRIVACY: The User&lsquo;s registration data and certain other information about the User are subject to our Privacy Policy.</div>
                <br />
                <div>7. USER CONDUCT: The User agrees to use the Platform and its services for lawful purposes only. The User agrees not to use the Platform for transmitting or storing any unlawful material or for fraudulent purposes.</div>
                <br />
                <div>8. TERM AND TERMINATION: The Platform reserves the right to modify, suspend, or terminate your account and/or access to the services, for any reason, and without notice, at any time, and without liability to you.</div>
                <br />
                <div>9. GOVERNING LAW: This Agreement shall be governed by the laws of the Republic of India. All disputes arising out of or in relation to this Agreement shall be settled by the courts of Delhi, India.</div>
                <br />
                <div>10. AMENDMENTS: The Platform reserves the right to modify or replace this Agreement at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</div>
            </div>
        </div>
    )
}