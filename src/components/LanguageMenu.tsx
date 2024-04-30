import { component$, useSignal, $, useOnDocument } from '@builder.io/qwik';
import { languages } from '../i18n/consts';
import iconWorld from '../assets/icons/world.svg'

interface languagesProps {
    currentLang: string
}

const LanguageMenu = component$((props: languagesProps) => {
    const isVisible = useSignal(false);

    useOnDocument(
        "click",
        $(() => {
            if(isVisible.value === true) {
                isVisible.value = false;
            }
        })
    );
    
    return (
        <>
            {isVisible.value ? (
                <ul class="absolute bottom-0 p-4 text-white border border-blue-200 shadow-sm -right-2 l backdrop-blur-sm bg-primary/70 rounded-xl">
                    {Object.entries(languages).map(([lang, label]) => (
                        <li>
                            <a class="text-white hover:underline focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-tertiary" href={`/${lang}/`} hreflang={`${lang}`} lang={`${lang}`}>{label}</a>
                        </li>
                    ))}
                </ul>
            ) : null}
            <button 
            onClick$={() => {
                isVisible.value = !isVisible.value;
            }} 
            class="inline-flex gap-2 text-white focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-tertiary">
                <img class="w-6 h-6" src={iconWorld.src} alt="world" />
                {languages[props.currentLang]}
            </button>
        </>
    );
});
 
export default LanguageMenu;