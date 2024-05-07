import { component$, useSignal } from '@builder.io/qwik';

interface Props {
    headline: string;
    text: string;
    class?: string;
}

const FaqQuestion = component$((props: Props) => {
    const isVisible = useSignal(false);

    return (
        <details class="border-b border-gray-500 py-6  h-fit">
            <summary class="flex justify-between items-center w-full gap-4 cursor-pointer" onClick$={() => {isVisible.value = !isVisible.value;}} >
                <b class="text-lg">{props.headline}</b>
                {isVisible.value ? 
                    <svg class="icon-open  w-10 h-10 flex-shrink-0"  width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="17" fill="#FFC256"/>
                        <path d="M11.75 17.75V16.25H22.25V17.75H11.75Z" fill="#0B1215"/>
                    </svg>  
                :   
                    <svg class="icon-closed w-10 h-10  flex-shrink-0" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="17" fill="#FFC256"/>
                        <path d="M16.25 17.75H11.75V16.25H16.25V11.75H17.75V16.25H22.25V17.75H17.75V22.25H16.25V17.75Z" fill="#0B1215"/>
                    </svg>
                } 
            </summary>
            <p class={["text-lg overflow-hidden transition-[max-height, padding] duration-300", isVisible.value ? "max-h-[800px] pt-8": "max-h-0 pt-0" ]} dangerouslySetInnerHTML={props.text}></p>
        </details>
    );
});
 
export default FaqQuestion;