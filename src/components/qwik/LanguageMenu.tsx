import { component$, useId, useSignal, $, useOnDocument } from '@builder.io/qwik';
import { languages } from '../../i18n/consts';
import iconWorld from '@assets/icons/world.svg'

interface languagesProps {
    currentLang: string
}

const LanguageMenu = component$((props: languagesProps) => {
    const isVisible = useSignal(false);
    const id = useId();
    const languageTriggerId = `langTrigger-${id}`;
    const languageMenuId = `langMenu-${id}`;


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
            document.getElementById(languageTriggerId)?.focus();
          }
    });

    const handleLanguageMenuBlur = $((event: FocusEvent) => {
        const languageMenu = document.getElementById(languageMenuId);
        const languageTrigger = document.getElementById(languageTriggerId);

        if (languageMenu?.contains(event.relatedTarget as Node) || (event.relatedTarget as Node) == languageTrigger) {
            return false;
        } else {
            isVisible.value = false;
        }
    });
    
    return (
        <>
            <button id={languageTriggerId}
            onClick$={() => {
                isVisible.value = !isVisible.value;
            }} 
            aria-expanded={isVisible.value}
            type="button"
            class="group inline-flex gap-2 focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-tertiary
            bg-clip-text bg-[length:200%_100%] bg-[100%] hover:bg-[0%_100%] motion-reduce:transition-none  text-transparent 
            transition-all bg-gradient-to-r from-secondary from-0% via-secondary via-50% to-white to-50%">
                <img class="w-6 h-6 group-hover:scale-125 transition motion-reduce:transition-none" src={iconWorld.src} alt="" />
                {languages[props.currentLang]}
            </button>
            {isVisible.value ? (
                <ul id={languageMenuId} window:onKeyUp$={handleKeyUp}  document:onBlur$={handleLanguageMenuBlur} class="absolute bottom-0 p-4 text-white border border-blue-200 shadow-sm -right-2 l backdrop-blur-sm bg-primary/90 rounded-xl">
                    {Object.entries(languages).map(([lang, label]) => (
                        <li>
                            <a aria-current={props.currentLang == lang} class="underline decoration-1 underline-offset-2 decoration-white hover:decoration-secondary bg-clip-text bg-[length:200%_100%] bg-[100%] hover:bg-[0%_100%] motion-reduce:transition-none text-transparent transition-all bg-gradient-to-r from-secondary from-0% via-secondary via-50% to-white to-50% focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-secondary" href={`/${lang}/`} hreflang={`${lang}`} lang={`${lang}`}>{label}</a>
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    );
});
 
export default LanguageMenu;