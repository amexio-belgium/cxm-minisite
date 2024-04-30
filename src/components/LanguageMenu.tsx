import { component$, useId, useSignal, $, useOnDocument } from '@builder.io/qwik';
import { languages } from '../i18n/consts';
import iconWorld from '../assets/icons/world.svg'

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
        if (!languageMenu?.contains(event.relatedTarget as Node)) {
            isVisible.value = false;
        }
    });
    
    return (
        <>
            <button id="{languageTriggerId}"
            onClick$={() => {
                isVisible.value = !isVisible.value;
            }} 
            aria-expanded={isVisible.value}
            type="button"
            class="inline-flex gap-2 text-white focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-tertiary">
                <img class="w-6 h-6" src={iconWorld.src} alt="" />
                {languages[props.currentLang]}
            </button>
            {isVisible.value ? (
                <ul id={languageMenuId} window:onKeyUp$={handleKeyUp}  document:onBlur$={handleLanguageMenuBlur} class="absolute bottom-0 p-4 text-white border border-blue-200 shadow-sm -right-2 l backdrop-blur-sm bg-primary/70 rounded-xl">
                    {Object.entries(languages).map(([lang, label]) => (
                        <li>
                            <a aria-current={props.currentLang == lang} class="text-white hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-tertiary" href={`/${lang}/`} hreflang={`${lang}`} lang={`${lang}`}>{label}</a>
                        </li>
                    ))}
                </ul>
            ) : null}
        </>
    );
});
 
export default LanguageMenu;