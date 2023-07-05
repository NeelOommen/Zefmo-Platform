import { auth } from '@/firebase/firebaseClient'

export default async function isUserPremium(): Promise<boolean> {
    await auth.currentUser?.getIdToken(true)
    const decodedToken = await auth.currentUser?.getIdTokenResult(true)

    return decodedToken?.claims?.stripeRole ? true:false;
}