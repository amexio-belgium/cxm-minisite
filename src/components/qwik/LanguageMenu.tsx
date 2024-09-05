import {$, component$, useId, useOnDocument, useSignal,} from "@builder.io/qwik";
import {languages} from "../../locales/consts";
import iconWorld from "@assets/icons/world.svg";

interface languagesProps {
  currentLang: string;
}

const LanguageMenu = component$((props: languagesProps) => {
  const isVisible = useSignal(false);
  const id = useId();
  const languageTriggerId = `langTrigger-${id}`;
  const languageMenuId = `langMenu-${id}`;

  useOnDocument(
    "click",
    $(() => {
      if (isVisible.value === true) {
        isVisible.value = false;
      }
    }),
  );

  const handleKeyUp = $((event: KeyboardEvent) => {
    if (event.key === "Escape" && isVisible.value === true) {
      isVisible.value = false;
      document.getElementById(languageTriggerId)?.focus();
    }
  });

  const handleLanguageMenuBlur = $((event: FocusEvent) => {
    const languageMenu = document.getElementById(languageMenuId);
    const languageTrigger = document.getElementById(languageTriggerId);

    if (
      languageMenu?.contains(event.relatedTarget as Node) ||
      (event.relatedTarget as Node) == languageTrigger
    ) {
      return false;
    } else {
      isVisible.value = false;
    }
  });

  return (
    <>
      <button
        id={languageTriggerId}
        onClick$={() => {
          isVisible.value = !isVisible.value;
        }}
        aria-expanded={isVisible.value}
        type="button"
        class="group inline-flex gap-2 bg-gradient-to-r from-secondary from-0% via-secondary via-50% to-white to-50% bg-[length:200%_100%] bg-clip-text bg-[100%] text-transparent transition-all hover:bg-[0%_100%] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tertiary motion-reduce:transition-none"
      >
        <img
          class="h-6 w-6 transition group-hover:scale-125 motion-reduce:transition-none"
          src={iconWorld.src}
          alt=""
        />
        {languages[props.currentLang]}
      </button>
      {isVisible.value ? (
        <ul
          id={languageMenuId}
          window:onKeyUp$={handleKeyUp}
          document:onBlur$={handleLanguageMenuBlur}
          class="l absolute -right-2 bottom-0 rounded-xl border border-blue-200 bg-primary/90 p-4 text-white shadow-sm backdrop-blur-sm"
        >
          {Object.entries(languages).map(([lang, label]) => (
            <li>
              <a
                aria-current={props.currentLang == lang}
                class="bg-gradient-to-r from-secondary from-0% via-secondary via-50% to-white to-50% bg-[length:200%_100%] bg-clip-text bg-[100%] text-transparent underline decoration-white decoration-1 underline-offset-2 transition-all hover:bg-[0%_100%] hover:decoration-secondary focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary motion-reduce:transition-none"
                href={`/${lang}/`}
                hreflang={`${lang}`}
                lang={`${lang}`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
});

export default LanguageMenu;
