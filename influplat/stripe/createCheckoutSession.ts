import { app, db } from '@/firebase/firebaseClient';
import initStripe from '@/stripe/initStripe';
import { doc, collection, addDoc, onSnapshot } from 'firebase/firestore';

export async function createCheckoutSession( uid ){
    
    console.log('step1')

    //create checkout document
    const docRef = await addDoc(collection(db, `users/${uid}/checkout_sessions`), {
        price: 'price_1NR71wSJNOvJqsQNd263ma7v',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
        allow_promotion_codes: true
    })

    const checkoutSessionRef = onSnapshot(docRef, async (doc) => {
        // console.log('check this')
        // console.log(doc.data().sessionId)
        //init stripe
        const sessionId = doc.data().sessionId
        console.log(sessionId)
        if(sessionId){
            const stripe = await initStripe()
            stripe.redirectToCheckout({ sessionId })
        }
    })

    
}