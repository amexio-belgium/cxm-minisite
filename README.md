

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |


## 🧞 Add new content

### General content

Under i18n you will find a map called content. In this map there will be files that are used for the labels on the main pages and in general. 
Each one contains a Json with Multiple languages, to add new content just make sure that the keys are the same as the ones already there or make sure the key
also works in the Pages / components. 

These will always take the english as a backup, when there is no text for the current language.

### Services / Projects / blogs

Under the map Content in the SRC folder you will see a map for each of these content types with submaps for every language. 
The files in each map is the content that will be shown on those pages for each language.

These files will be either using regular components or just general text, depending on the type of content. When working with components, make sure that they have the necessary props, and that they are correctly imported.

For the previews on other pages, make sure the title, description and other values are also filled in. For services the button will also have a backup value for each language.

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
