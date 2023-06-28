import { app, db } from '@/firebase/firebaseClient';
import initStripe from '@/stripe/initStripe';
import { doc, collection, addDoc, onSnapshot } from 'firebase/firestore';

export async function createCheckoutSession( uid ){
    

    //create checkout document
    const docRef = await addDoc(collection(db, `users/${uid}/checkout_sessions`), {
        price: 'price_1NNrLNSJNOvJqsQNNCPtx4Td',
        success_url: window.location.origin,
        cancel_url: window.location.origin,
        allow_promotion_codes: true
    })

    const checkoutSessionRef = onSnapshot(docRef, async (doc) => {
        // console.log('check this')
        // console.log(doc.data().sessionId)
        //init stripe
        const sessionId = doc.data().sessionId
        if(sessionId){
            const stripe = await initStripe()
            stripe.redirectToCheckout({ sessionId })
        }
    })

    
}