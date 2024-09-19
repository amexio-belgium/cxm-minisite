import "dotenv/config";
import fs from "node:fs";
const PUBLIC_ASTRO_BASE_PATH = process.env.PUBLIC_ASTRO_BASE_PATH;

const basePath = PUBLIC_ASTRO_BASE_PATH || "";

const content = `
@font-face {
    font-family: 'Contane';
    src: url('${basePath}/fonts/ContaneMediumRegular.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Contane';
    src: url('${basePath}/fonts/ContaneRegular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Lexend';
    src: url('${basePath}/fonts/Lexend-Light.woff2') format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Lexend';
    src: url('${basePath}/fonts/Lexend-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Lexend';
    src: url('${basePath}/fonts/Lexend-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}
`;

fs.writeFile("public/fonts/fonts.css", content, (err) => {
  if (err) {
    console.log(err);
  }
});
