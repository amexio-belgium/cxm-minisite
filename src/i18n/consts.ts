/* 
    To add new languages, add them in this file. Add them in the i18nParams for the routing,
    in the languages for the language picker and in the UI json for the translations 
*/

export const i18nParams = [
    {params: {lang: 'en'}},
    {params: {lang: 'nl'}},
    {params: {lang: 'fr'}},
]

export const languages = {
    en: 'English',
    fr: 'Français',
    nl: 'Nederlands',
};

export const defaultLang = 'en';

export const ui = {
    en: {
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.blog': 'Insights',
        'nav.cases': 'Work',
        '404.headline': "Something's missing.",
        '404.text': "Sorry, we can't find that page. You'll find lots to explore on the home page.",
        '404.button': 'Back to Homepage',
        'hero.headline': 'Turning your content <mark>into value</mark>',
        'hero.text': 'AmeXio Fuse designs, builds and runs large-scale content platforms to make your business more smart, fast & cost-effective.',
        'hero.button': 'Get Started',
        'about.headline': 'About Us',
        'about.text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin auctor consectetur risus, eu fermentum est iaculis id. Mauris vel ipsum vel purus cursus commodo. Nullam eu dui non mauris vehicula varius vel nec magna. Nam a luctus nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus non dolor nec quam elementum tincidunt.',
        'services.headline': 'What do we do',
        'services.item1.headline': 'CX Strategy',
        'services.item1.text': 'Crafting comprehensive customer experience strategies tailored to your business objectives.',
        'services.item2.headline': 'CXM Platforms',
        'services.item2.text': 'Implementing and customizing CXM platforms to optimize customer interactions.',
        'services.item3.headline': 'Customer Analytics',
        'services.item3.text': 'Leveraging data analytics to gain insights into customer behavior and preferences.',
        'contact.headline': 'Contact us',
        'contact.text': 'Ready to enhance your customer experience? Reach out to us today.',
        'contact.button': 'Contact Now'
    },
    fr: {
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.blog': 'Insights',
        'nav.cases': 'Work',
        'hero.headline' : 'Empower Your CXM with Us',
        'hero.text' : "Nous sommes spécialisés dans la fourniture de solutions de gestion de l'expérience client de pointe adaptées à votre entreprise",
        'hero.button' : 'Get Started',
        'about.headline' : 'About Us',
        'about.text' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin auctor consectetur risus, eu fermentum est iaculis id. Mauris vel ipsum vel purus cursus commodo. Nullam eu dui non mauris vehicula varius vel nec magna. Nam a luctus nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae ; Vivamus non dolor nec quam elementum tincidunt',
        'services.headline' : 'About Us',
        'services.item1.headline' : 'CX Strategy',
        'services.item1.text' : "Élaboration de stratégies d'expérience client complètes adaptées à vos objectifs commerciaux",
        'services.item2.headline' : 'Plateformes CXM',
        'services.item2.text' : 'Mise en œuvre et personnalisation de plateformes CXM pour optimiser les interactions avec les clients',
        'services.item3.headline' : 'Customer Analytics',
        'services.item3.text' : "Tirer parti de l'analyse des données pour mieux comprendre le comportement et les préférences des clients",
        'contact.headline' : 'Contactez-nous',
        'contact.text' : "Prêt à améliorer votre expérience client ? Contactez-nous dès aujourd'hui",
        'contact.button' : 'Contact Now'
    },
    nl: {
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.blog': 'Insights',
        'nav.cases': 'Work',
        'hero.headline': 'Empower Your CXM with Us',
        'hero.text':'Wij zijn gespecialiseerd in het leveren van geavanceerde oplossingen voor Customer Experience Management, op maat gemaakt voor uw bedrijf.',
        'hero.button': 'Aan de slag',
        'about.headline': 'Over ons',
        'about.text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Proin auctor consectetur risus, eu fermentum est iaculis id. Mauris vel ipsum vel purus cursus commodo. Nullam eu dui non mauris vehicula varius vel nec magna. Nam a luctus nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus non dolor nec quam elementum tincidunt.',
        'services.headline': 'Wat wij doen',
        'services.item1.headline': 'CX Strategie',
        'services.item1.text': 'Uitgebreide klantervaringsstrategieën op maat voor uw bedrijfsdoelstellingen',
        'services.item2.headline': 'CXM-platforms',
        'services.item2.text': 'Implementatie en aanpassing van CXM-platforms om klantinteracties te optimaliseren',
        'services.item3.headline': 'Customer Analytics',
        'services.item3.text': 'Gebruik van data-analyse om inzicht te krijgen in gedrag en voorkeuren van klanten.',
        'contact.headline': 'Neem contact met ons op',
        'contact.text': 'Klaar om uw klantervaring te verbeteren? Neem vandaag nog contact met ons op',
        'contact.button':'Neem nu contact op'
    },
} as const;