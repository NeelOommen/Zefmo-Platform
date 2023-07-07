import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise: Stripe | null;

const initStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            'pk_live_51NNaIlSJNOvJqsQNjuGbbriHTAcTFvCbRS7l51hzzvSZ1Dlv7ErQIqWR4Fv1z2MoJ3DEh5zYb43DzlPzNBuSmbwe00zvst13AP'
        );
    }

    return stripePromise;
};

export default initStripe;