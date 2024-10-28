import { parseHref } from "@lib/helpers";
import { stegaClean } from "@sanity/client/stega";

export class BlogPreviewWeb extends HTMLElement {
  constructor() {
    super();
  }

  async connectedCallback() {
    this.innerHTML = this.createElement();
  }

  attributeChangedCallback() {
    this.shadowRoot.innerHTML = this.createElement();
  }

  get introHTML() {
    return this.getAttribute("introHTML");
  }

  get topics() {
    return JSON.parse(this.getAttribute("topics"));
  }

  get previewImageUrl() {
    return this.getAttribute("previewImageUrl");
  }

  get authorImageUrl() {
    return this.getAttribute("authorImageUrl");
  }

  get authorName() {
    return this.getAttribute("authorName");
  }

  get title() {
    return this.getAttribute("title");
  }

  get link() {
    return this.getAttribute("link");
  }

  get publicationDate() {
    return JSON.parse(this.getAttribute("publicationDate"));
  }

  get tags() {
    return this.getAttribute("tags");
  }

  get jobTitle() {
    return this.getAttribute("jobTitle");
  }

  createElement() {
    return /* HTML */ `
      <article
        class="group relative flex h-full flex-col justify-stretch has-[:focus-visible]:rounded-xl has-[:focus-visible]:outline has-[:focus-visible]:outline-4 has-[:focus-visible]:outline-offset-0 has-[:focus-visible]:outline-orange-500"
      >
        <div
          class="flex aspect-[5/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-t-xl"
        >
          <img
            loading="eager"
            src="${this.previewImageUrl}"
            class="w-full transition-transform duration-300 ease-in-out motion-safe:group-hover:scale-105"
            loading="lazy"
            alt="{blogPost.featuredImage?.asset.altTexts?.[lang]}"
            width="{400}"
            height="{400}"
          />
        </div>
        <div
          class="flex h-full min-w-full flex-col gap-2 border-b-2 border-y-quaternary p-2 py-6"
        >
          <div class="flex flex-row items-center gap-2">
            <formatted-date
              classes="text-xs font-light"
              date="${this.publicationDate}"
            />

            ${this.topics &&
            this.topics.length > 0 &&
            this.topics
              .map(
                (topic) => `
        <span class="c-post-tag text-xs uppercase before:mr-2 before:font-sans before:text-secondary">
          ${stegaClean(topic.prefLabel)}
        </span>
        `,
              )
              .join(", ")}
          </div>
          <h2 class="mb-2 font-serif text-lg font-bold [&>mark]:text-black">
            <a
              href="${parseHref(this.link)}"
              class="bg-gradient-to-r from-secondary from-0% via-secondary via-50% to-black to-50% bg-[length:200%_100%] bg-clip-text bg-[100%] text-black text-transparent no-underline decoration-white decoration-1 underline-offset-2 outline-none transition-all content-none before:absolute before:inset-x-0 before:inset-y-0 hover:bg-[0%_100%] hover:decoration-secondary focus-visible:rounded focus-visible:px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary motion-reduce:transition-none"
              style="transition-duration: ${stegaClean(this.title).length *
              20}ms"
            >
              ${this.title}
            </a>
          </h2>
          <div class="text-sm font-light">${this.introHTML}</div>

          <div class="self-bottom mt-auto flex items-center gap-4 pt-8">
            ${this.authorImageUrl &&
            this.authorImageUrl !== "" &&
            `<img
              loading="eager"
              src="${this.authorImageUrl}"
              class="h-10 w-10 rounded-full sm:h-14 sm:w-14"
              width="50"
              height="50"
              alt="${`${this.authorName} ${this.jobTitle}`}"
            />`}
            <div class="flex flex-col justify-center gap-1">
              <p class="font-xs">${this.authorName ? this.authorName : ""}</p>
              <p class="text-xxs">${this.jobTitle ? this.jobTitle : ""}</p>
            </div>
          </div>
        </div>
      </article>
    `;
  }
}

if ("customElements" in window) {
  customElements.define("blog-preview-web", BlogPreviewWeb);
}
