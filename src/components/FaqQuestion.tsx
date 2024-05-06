import { component$, useId, useSignal, $, useOnDocument } from '@builder.io/qwik';

interface Props {
    headline: string;
    text: string;
    class?: string;
}

const FaqQuestion = component$((props: Props) => {
    const isVisible = useSignal(false);
    const id = useId();
    const faqTriggerId = `faqTrigger-${id}`;
    const faqId = `faq-${id}`;

    useOnDocument(
        "click",
        $(() => {
            if(isVisible.value === true) {
                isVisible.value = false;
            }
        })
    );

    const handleKeyUp = $((event: KeyboardEvent) => {
        if (event.key === 'Escape' && isVisible.value === true) {
            isVisible.value = false;
            document.getElementById(faqTriggerId)?.focus();
          }
    });

    const handleFaqBlur = $((event: FocusEvent) => {
        const languageMenu = document.getElementById(faqTriggerId);
        const languageTrigger = document.getElementById(faqId);

        if (languageMenu?.contains(event.relatedTarget as Node) || (event.relatedTarget as Node) == languageTrigger) {
            return false;
        } else {
            isVisible.value = false;
        }
    });
    
    return (
        <div class="border-b border-gray-500 justify-start items-start gap-2 inline-flex flex-col py-6">
            <div class="flex justify-between w-full gap-2" id={faqTriggerId}
                onClick$={() => {isVisible.value = !isVisible.value;}} 
                aria-expanded={isVisible.value}>
                <b class="text-lg">
                    {props.headline}
                </b>
                {isVisible.value ? 
                    <svg class="icon-open"  width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="17" fill="#FFC256"/>
                        <path d="M11.75 17.75V16.25H22.25V17.75H11.75Z" fill="#0B1215"/>
                    </svg>  
                :   
                    <svg class="icon-closed" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="34" height="34" rx="17" fill="#FFC256"/>
                        <path d="M16.25 17.75H11.75V16.25H16.25V11.75H17.75V16.25H22.25V17.75H17.75V22.25H16.25V17.75Z" fill="#0B1215"/>
                    </svg>
                }   
            </div>

            {isVisible.value ? (
                <div id={faqId} window:onKeyUp$={handleKeyUp}  document:onBlur$={handleFaqBlur} class="faq-text flex-col w-full gap-2 pt-8">
                    <p class="text-lg" dangerouslySetInnerHTML={props.text}></p>
                </div>
            ) : null}
        </div>
    );
});
 
export default FaqQuestion;