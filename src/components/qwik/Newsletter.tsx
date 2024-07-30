import { component$, useSignal, $, type QRL  } from '@builder.io/qwik';

interface Props {
    class?: string;
    [x: string]: any;
}

const Newsletter = component$((props: Props) => {
    const canSignUp = useSignal(true);
    
    const handleSubmit: QRL = $((values) => {
        canSignUp.value = false;
    });

    return (
        <div 
            {...props.rest}
            class={[
                "inline-flex flex-col items-start justify-start h-auto gap-8 p-8 shadow bg-tertiary/80 rounded-2xl backdrop-blur",
                props.class,
            ]}>
            {canSignUp.value ? (
                <>
                    <div class="flex flex-col items-start justify-start gap-2">
                        <h4 class="text-3xl font-bold text-black">Sign up</h4>
                        <p class="text-lg font-medium text-black">Receive our latest insights in your mailbox every month</p>
                    </div>

                    <form preventdefault:submit onSubmit$={handleSubmit}>
                        <input class="rounded h-[50px] w-full p-4 ring-offset-2 ring-offset-black focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-tertiary" 
                        type="email" id="email" placeholder="Email" pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                        required />
                        <button type="submit">Sign up</button>
                    </form>
                </>
            ) : (
                <>
                    <div class="flex flex-col items-start justify-start gap-2">
                        <h4 class="text-3xl font-bold text-black">Thanks for signing up!</h4>
                        <p class="text-lg font-medium text-black">Receive our latest insights in your mailbox every month</p>
                    </div>
                </>
            )}
        </div>
    );
});
 
export default Newsletter;