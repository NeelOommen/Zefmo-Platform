import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            'pk_test_51NNaIlSJNOvJqsQNO3CCamcyVLCMLVkoYC9AQbydbDF1lufkiLTf3XBASVDEbRYJOpkALEEGZBeh4AtGAacSZA9500ZoZLzpSr'
        );
    }

    return stripePromise;
};

export default initStripe;