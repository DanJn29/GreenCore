import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const translations = {
  AM: {
    navItems: [
      { href: "#about", label: "Մեր մասին" },
      { href: "#products", label: "Արտադրանք" },
      { href: "#process", label: "Գործընթաց" },
      { href: "#tourism", label: "Տուրիզմ" },
      { href: "#why-choose", label: "Ինչու՞ ընտրել մեզ" },
    ],
    hero: {
      title: "Նորարարությունն ու բնությունը՝ մեկ այգում",
      lead: "Ընտանեկան բիզնես, որը միավորում է ավանդական արժեքներն ու ժամանակակից գյուղատնտեսական լուծումները՝ ապահովելով բարձրորակ օրգանիկ թուզ ներքին շուկայի և արտահանման համար։",
      cta1: "Դառնալ գործընկեր",
      cta2: "Ամրագրել այց",
    },
    about: {
      title: "Մեր մասին",
      headline: "Մեր արմատները բնության մեջ են, մեր ընթացքը՝ տեխնոլոգիայի։",
      text1: "Մենք վերափոխում ենք հողատարածքը ժամանակակից, բարձր տեխնոլոգիական այգու, որտեղ յուրաքանչյուր ծառ խնամվում է ընտանեկան հոգատարությամբ։ Մեր նպատակն է ստեղծել էկոլոգիապես մաքուր միջավայր և աճեցնել լավագույն որակի թուզ, որը կներկայացնի մեր երկրի համն ու հոտը միջազգային շուկայում։",
      text2: "Այն ամենը, ինչ դուք տեսնում եք՝ փարթամ կանաչ դաշտերից մինչև նորարարական գյուղատնտեսական տեխնիկաներ, պարզապես հնարավորությունների օրինակ է։ Մենք հավատում ենք, որ գյուղատնտեսությունը սերմից շատ ավելին է։ Այն հոգատարություն է, կայունություն և պատասխանատվություն ապագայի հանդեպ։",
    },
    products: {
      title: "Արտադրանք",
      fruits: {
        fig: "Թուզ",
        peach: "Դեղձ",
        nectarine: "Նեկտարին",
      },
      cards: {
        fig: [
          { title: "Թուզ", description: "Օրգանիկ, էկոլոգիապես մաքուր բերք՝ իդեալական սուպերմարկետների և ռեստորանային ցանցերի համար:" },
          { title: "Արտահանում", description: "Միջազգային (ԵԱՏՄ, ԵՄ) ստանդարտներին համապատասխանող փաթեթավորում և որակի հավաստագրում:" },
          { title: "Մեծածախ մատակարարում", description: "Ճկուն պայմաններ ներքին շուկայի գործընկերների համար:" },
        ],
        peach: [
          { title: "Դեղձ", description: "Արևահամ, հյութալի և նուրբ դեղձ՝ աճեցված բացառապես օրգանիկ պայմաններում: Ունի վառ արտահայտված բույր և բնական քաղցրություն։" },
          { title: "Արտահանում", description: "Ձեռքով զգույշ հավաքագրում և բազմաշերտ հարվածակայուն փաթեթավորում, որն ապահովում է նուրբ մրգի անվնաս և թարմ տեղափոխումը։" },
          { title: "Մեծածախ մատակարարում", description: "Կայուն ծավալներ և անխափան մատակարարում ներքին շուկայի խոշոր առևտրային ցանցերի, ինչպես նաև հյութերի և չրերի արտադրողների համար։" },
        ],
        nectarine: [
          { title: "Նեկտարին", description: "Հարթ, պինդ, փայլուն և վառ գունավորմամբ նեկտարիններ: Առանձնանում են իրենց կատարյալ  տեսքով և խրթխրթան միջուկով:" },
          { title: "Արտահանում", description: "Բարձր փոխադրելիություն և երկար պահպանման ժամկետ, ինչը դարձնում է այն արտահանման համար ամենահուսալի և շահավետ պրոդուկտներից մեկը:" },
          { title: "Մեծածախ մատակարարում", description: "Գերազանց ընտրություն սուպերմարկետների և HoReCa ոլորտի համար, որտեղ վիզուալ գրավչությունը և թարմությունը առաջնային են։" },
        ],
      },
    },
    process: {
      title: "Գործընթաց",
      steps: [
        {
          title: "1․ Ձմեռային շրջան (հունվար–փետրվար)",
          bullets: ["Սանիտարական և ձևավորող էտ", "Վնասված և հին ճյուղերի հեռացում", "Կանխարգելիչ պաշտպանություն", "Կաթիլային ոռոգման համակարգի ստուգում"],
        },
        {
          title: "2․ Վեգետացիայի սկիզկբ (մարտ–ապրիլ)",
          bullets: ["Սեզոնային սնուցման ապահովում", "Կանոնավոր ոռոգման մեկնարկ", "Հողի վիճակի վերահսկում", "Նոր աճի և տերևային զանգվածի վերահսկում"],
        },
        {
          title: "3․ Պտղի ձևավորում (մայիս–հունիս)",
          bullets: ["Կայուն ջրային ռեժիմի պահպանում", "Ծառի բեռնվածության վերահսկում", "Պտղի զարգացման դիտարկում", "Դաշտային որակի վերահսկում"],
        },
        {
          title: "4․ Հասունացում և բերքահավաք (հուլիս–սեպտեմբեր)",
          bullets: ["Օպտիմալ հասունության որոշում", "Ձեռքով բերքահավաք", "Բերքահավաք յուրաքանչյուր 2–3 օրը մեկ ակտիվ փուլում", "Զգույշ տեղափոխում դաշտից"],
        },
        {
          title: "5․ Հետբերքահավաքային մշակում",
          bullets: ["Նախնական տեսակավորում", "Որակի և չափի ընտրություն", "Նախնական սառեցում", "Պատրաստում փաթեթավորման"],
        },
        {
          title: "6․ Փաթեթավորում",
          bullets: ["Չափերի կալիբրացում", "Օդափոխվող տարաների օգտագործում", "Խմբաքանակի և հավաքման ամսաթվի մակնշում"],
        },
        {
          title: "7․ Լոգիստիկա",
          bullets: ["Ջերմաստիճանային ռեժիմի պահպանում", "Սառը շղթայի ապահովում", "Օպերատիվ առաքում թարմ շուկա"],
        },
      ],
    },
    tourism: {
      title: "Զբոսաշրջություն",
      headline: "Հրավիրում ենք բացահայտելու մեր խելացի այգիները։",
      servicesTitle: "Առաջարկվող ծառայություններ",
      services: ["1․ Շրջայց նորագույն տեխնոլոգիաներով հագեցած այգում:", "2․ Թարմ բերքի և թզից պատրաստված մթերքների համտես:", "3․ Գնումներ անմիջապես արտադրողից:"],
      cta: "Ամրագրել այց",
    },
    whyChoose: {
      title: "Ինչու ՞ ընտրել մեզ",
      cards: [
        { title: "100% Օրգանիկ", description: "Միջազգային չափանիշներին համապատասխանող մաքրություն։" },
        { title: "Նորարարություն", description: "Կայուն և կանխատեսելի որակ՝ շնորհիվ AgTech (ագրոտեխ) լուծումների։" },
        { title: "Վստահելիեւթյուն", description: "Ընտանեկան բիզնեսի նվիրվածություն և բիզնես-պրոցեսների թափանցիկություն։" },
        { title: "Գլոբալ հասանելիություն", description: "Պատրաստ ենք արտահանման ցանկացած ծավալի պահանջարկի:" },
      ],
      summary: "Էկոլոգիական պատասխանատվություն, նորարարական մտածելակերպ և երկարաժամկետ, փոխշահավետ Համագործակցություն:",
      cta: "Դառնալ գործընկեր",
    },
    footer: {
      contactTitle: "Կապ",
      sectionsTitle: "Բաժիններ",
      mediaTitle: "Մեդիա",
      sections: ["Մեր մասին", "Արտադրանք", "Գործընթաց", "Տուրիզմ", "Ինչու՞ ընտրել մեզ"],
    },
  },
  EN: {
    navItems: [
      { href: "#about", label: "About" },
      { href: "#products", label: "Products" },
      { href: "#process", label: "Process" },
      { href: "#tourism", label: "Tourism" },
      { href: "#why-choose", label: "Why Choose Us" },
    ],
    hero: {
      title: "Innovation and nature in one garden",
      lead: "A family business that combines traditional values and modern agricultural solutions, ensuring high-quality organic figs for the domestic market and for export.",
      cta1: "Become a Partner",
      cta2: "Book a Visit",
    },
    about: {
      title: "About",
      headline: "Our roots are in nature, our path is in technology.",
      text1: "We are transforming the land into a modern, high-tech garden where each tree is cared for with family-like attention. Our goal is to create an ecologically clean environment and grow the best quality figs that will represent the flavor and aroma of our country in the international market.",
      text2: "Everything you see, from the lush green fields to innovative agricultural techniques, is just an example of possibilities. We believe that agriculture is much more than a seed. It is care, sustainability, and responsibility towards the future.",
    },
    products: {
      title: "Products",
      fruits: {
        fig: "Fig",
        peach: "Peach",
        nectarine: "Nectarine",
      },
      cards: {
        fig: [
          { title: "Fig", description: "Organic, environmentally friendly harvest, ideal for supermarkets and restaurant chains." },
          { title: "Export", description: "Packaging and quality certification meeting international (EAEU, EU) standards." },
          { title: "Wholesale Supply", description: "Flexible terms for partners in the domestic market." },
        ],
        peach: [
          { title: "Peach", description: "A sunny, juicy and delicate peach grown exclusively in organic conditions. It has a bright aroma and natural sweetness." },
          { title: "Export", description: "Careful hand picking and multi-layered, impact-resistant packaging ensure the delicate fruit is transported safely and fresh." },
          { title: "Wholesale Supply", description: "Stable volumes and uninterrupted supply for large retail chains in the domestic market, as well as juice and dried fruit producers." },
        ],
        nectarine: [
          { title: "Nectarine", description: "Smooth, firm, shiny, and brightly colored nectarines. They are distinguished by their perfect shape and crispy flesh." },
          { title: "Export", description: "High transportability and long shelf life make it one of the most reliable and profitable products for export." },
          { title: "Wholesale Supply", description: "An excellent choice for supermarkets and the HoReCa sector, where visual appeal and freshness are paramount." },
        ],
      },
    },
    process: {
      title: "Process",
      steps: [
        {
          title: "1. Winter Period (January–February)",
          bullets: ["Sanitary and shaping pruning", "Removal of damaged and old branches", "Preventive protection", "Inspection of the drip irrigation system"],
        },
        {
          title: "2. Beginning of Vegetation (March–April)",
          bullets: ["Ensuring seasonal nutrition", "Start of regular irrigation", "Soil condition monitoring", "Monitoring of new growth and leaf mass"],
        },
        {
          title: "3. Fruit Formation (May–June)",
          bullets: ["Maintaining a stable water regime", "Monitoring tree load", "Observing fruit development", "Field quality control"],
        },
        {
          title: "4. Ripening and Harvesting (July–September)",
          bullets: ["Determining optimal ripeness", "Manual harvesting", "Harvesting every 2-3 days during the active phase", "Careful transport from the field"],
        },
        {
          title: "5. Post-Harvest Handling",
          bullets: ["Initial sorting", "Quality and size selection", "Pre-cooling", "Preparation for packaging"],
        },
        {
          title: "6. Packaging",
          bullets: ["Size calibration", "Use of ventilated containers", "Labeling with batch and harvest date"],
        },
        {
          title: "7. Logistics",
          bullets: ["Maintaining temperature regime", "Ensuring cold chain", "Prompt delivery to the fresh market"],
        },
      ],
    },
    tourism: {
      title: "Tourism",
      headline: "We invite you to discover our smart gardens.",
      servicesTitle: "Services offered",
      services: ["1. Tour of the garden equipped with the latest technology.", "2. Tasting of fresh harvest and fig-based products.", "3. Purchasing directly from the producer."],
      cta: "Book a Visit",
    },
    whyChoose: {
      title: "Why Choose Us",
      cards: [
        { title: "100% Organic", description: "Purity meeting international standards." },
        { title: "Innovation", description: "Consistent and predictable quality thanks to AgTech solutions." },
        { title: "Trust", description: "Dedication of a family business and transparency of business processes." },
        { title: "Global Accessibility", description: "Ready for export for any volume of demand." },
      ],
      summary: "Ecological responsibility, innovative mindset, and long-term, mutually beneficial cooperation.",
      cta: "Become a Partner",
    },
    footer: {
      contactTitle: "Contact",
      sectionsTitle: "Sections",
      mediaTitle: "Media",
      sections: ["About", "Products", "Process", "Tourism", "Why Choose Us"],
    },
  },
  RU: {
    navItems: [
      { href: "#about", label: "О нас" },
      { href: "#products", label: "Продукция" },
      { href: "#process", label: "Процесс" },
      { href: "#tourism", label: "Туризм" },
      { href: "#why-choose", label: "Почему мы" },
    ],
    hero: {
      title: "Инновации и природа в одном саду",
      lead: "Семейный бизнес, объединяющий традиционные ценности и современные агротехнические решения, обеспечивающий высококачественный органический инжир для внутреннего рынка и на экспорт.",
      cta1: "Стать партнёром",
      cta2: "Забронировать визит",
    },
    about: {
      title: "О нас",
      headline: "Наши корни – в природе, наш путь – в технологиях.",
      text1: "Мы преобразуем землю в современный, высокотехнологичный сад, где за каждым деревом ухаживают с семейной заботой. Наша цель – создать экологически чистую среду и вырастить инжир наилучшего качества, который представит вкус и аромат нашей страны на международном рынке.",
      text2: "Все, что вы видите – от пышных зеленых полей до инновационных агротехник, – это лишь пример возможностей. Мы верим, что сельское хозяйство – это нечто гораздо большее, чем просто семя. Это – забота, устойчивость и ответственность перед будущим.",
    },
    products: {
      title: "Продукция",
      fruits: {
        fig: "Инжир",
        peach: "Персик",
        nectarine: "Нектарин",
      },
      cards: {
        fig: [
          { title: "Инжир", description: "Органический, экологически чистый урожай, идеально подходящий для супермаркетов и сетей ресторанов." },
          { title: "Экспорт", description: "Упаковка и сертификация качества, соответствующие международным стандартам (ЕАЭС, ЕС)." },
          { title: "Оптовые поставки", description: "Гибкие условия для партнеров на внутреннем рынке." },
        ],
        peach: [
          { title: "Персик", description: "Солнечный, сочный и нежный персик, выращенный исключительно в органических условиях. Обладает ярким ароматом и естественной сладостью." },
          { title: "Экспорт", description: "Тщательный ручной сбор и многослойная ударопрочная упаковка гарантируют безопасную и свежую транспортировку нежных фруктов." },
          { title: "Оптовые поставки", description: "Стабильные объемы и бесперебойные поставки для крупных розничных сетей на внутреннем рынке, а также для производителей соков и сухофруктов." },
        ],
        nectarine: [
          { title: "Нектарин", description: "Нектарины гладкие, плотные, блестящие и ярко окрашенные. Они отличаются идеальной формой и хрустящей мякотью." },
          { title: "Экспорт", description: "Высокая транспортабельность и длительный срок хранения делают его одним из самых надежных и выгодных продуктов для экспорта." },
          { title: "Оптовые поставки", description: "Отличный выбор для супермаркетов и сектора HoReCa, где визуальная привлекательность и свежесть имеют первостепенное значение." },
        ],
      },
    },
    process: {
      title: "Процесс",
      steps: [
        {
          title: "1. Зимний период (январь – февраль)",
          bullets: ["Санитарная и формирующая обрезка", "Удаление поврежденных и старых ветвей", "Профилактическая защита", "Проверка системы капельного орошения"],
        },
        {
          title: "2. Начало вегетации (март – апрель)",
          bullets: ["Обеспечение сезонного питания", "Начало регулярного полива", "Контроль состояния почвы", "Мониторинг нового прироста и листовой массы"],
        },
        {
          title: "3. Формирование плодов (май – июнь)",
          bullets: ["Поддержание стабильного водного режима", "Контроль нагрузки на дерево", "Наблюдение за развитием плодов", "Полевой контроль качества"],
        },
        {
          title: "4. Созревание и сбор урожая (июль – сентябрь)",
          bullets: ["Определение оптимальной спелости", "Ручной сбор урожая", "Сбор урожая каждые 2-3 дня в активную фазу", "Аккуратная транспортировка с поля"],
        },
        {
          title: "5. Послеуборочная обработка",
          bullets: ["Предварительная сортировка", "Отбор по качеству и размеру", "Предварительное охлаждение", "Подготовка к упаковке"],
        },
        {
          title: "6. Упаковка",
          bullets: ["Калибровка по размерам", "Использование вентилируемых контейнеров", "Маркировка с указанием партии и даты сбора"],
        },
        {
          title: "7. Логистика",
          bullets: ["Поддержание температурного режима", "Обеспечение холодовой цепи", "Оперативная доставка на свежий рынок"],
        },
      ],
    },
    tourism: {
      title: "Туризм",
      headline: "Приглашаем вас открыть для себя наши умные сады.",
      servicesTitle: "Предлагаемые услуги",
      services: ["1. Экскурсия по саду, оснащенному новейшими технологиями.", "2. Дегустация свежего урожая и продуктов из инжира.", "3. Покупки напрямую у производителя."],
      cta: "Забронировать визит",
    },
    whyChoose: {
      title: "Почему выбирают нас",
      cards: [
        { title: "100% Органика", description: "Чистота, соответствующая международным стандартам." },
        { title: "Инновации", description: "Стабильное и предсказуемое качество благодаря AgTech-решениям." },
        { title: "Надежность", description: "Преданность семейного бизнеса и прозрачность бизнес-процессов." },
        { title: "Global Accessibility", description: "Готовы к экспорту на любой объем спроса." },
      ],
      summary: "Экологическая ответственность, инновационное мышление и долгосрочное, взаимовыгодное сотрудничество.",
      cta: "Стать партнёром",
    },
    footer: {
      contactTitle: "Контакт",
      sectionsTitle: "Разделы",
      mediaTitle: "Media",
      sections: ["О нас", "Продукция", "Процесс", "Туризм", "Почему мы"],
    },
  },
};

// --- EDIT PHOTO PATHS HERE ---
const fruitAssets = {
  fig: {
    aboutImage: "/assets/photos/about-fig-box.jpg",
    productImages: [
      "/assets/photos/product-fresh-figs.png",   // Card 1
      "/assets/photos/product-export.jpg",       // Card 2
      "/assets/photos/product-wholesale.jpg"     // Card 3
    ],
    processImages: [
      "/assets/photos/process-winter-pruning.png",   // Step 1
      "/assets/photos/process-spring-growth.png",    // Step 2
      "/assets/photos/process-fruit-formation.png",  // Step 3
      "/assets/photos/process-harvest.png",          // Step 4
      "/assets/photos/process-postharvest.png",      // Step 5
      "/assets/photos/process-packaging.png",        // Step 6
      "/assets/photos/process-logistics.png"         // Step 7
    ],
    icon: "/assets/icons/fig.svg"
  },
  peach: {
    aboutImage: "/assets/photos/Peach.png",
    productImages: [
      "/assets/photos/peach/ProductImagepeach3.png",       // PLACEHOLDER: Change to peach photo
      "/assets/photos/peach/ProductImagepeach2.png",           // PLACEHOLDER: Change to peach photo
      "/assets/photos/peach/ProductImagepeach1.png"         // PLACEHOLDER: Change to peach photo
    ],
    processImages: [
      "/assets/photos/peach/1.png",   // Step 1
      "/assets/photos/peach/2.png",    // Step 2
      "/assets/photos/peach/3.png",    // Step 3
      "/assets/photos/peach/4.png",    // Step 4
      "/assets/photos/peach/5.png",    // Step 5
      "/assets/photos/peach/SeasonImage-1.png",    // Step 6
      "/assets/photos/peach/7.png"         // Step 7
    ],
    icon: "/assets/icons/peach.svg"
  },
  nectarine: {
    aboutImage: "/assets/photos/Nectarine.png",
    productImages: [
      "/assets/photos/nectarine/ProductImage.png",       // PLACEHOLDER: Change to nectarine photo
      "/assets/photos/nectarine/12.png",           // PLACEHOLDER: Change to nectarine photo
      "/assets/photos/nectarine/13.png"         // PLACEHOLDER: Change to nectarine photo
    ],
    processImages: [
      "/assets/photos/nectarine/1.png",   // Step 1
      "/assets/photos/nectarine/2.png",    // Step 2
      "/assets/photos/nectarine/3.png",  // Step 3
      "/assets/photos/nectarine/4.png",          // Step 4
      "/assets/photos/nectarine/5.png",      // Step 5
      "/assets/photos/nectarine/6.png",        // Step 6
      "/assets/photos/nectarine/7.png"         // Step 7
    ],
    icon: "/assets/icons/nectarine.svg"
  }
};

const partners = [
  { src: "/assets/brand/Frame.svg", alt: "Partner logo" },
  { src: "/assets/brand/lidl2.svg", alt: "Lidl" },
  { src: "/assets/brand/edeka1.svg", alt: "Edeka" },
  { src: "/assets/brand/billa-seeklogo1.svg", alt: "Billa" },
  { src: "/assets/brand/Frame-1.svg", alt: "Partner logo" },
  { src: "/assets/brand/spar-1.svg", alt: "Spar" },
  { src: "/assets/brand/Spayka_ideVadFEMu_1.svg", alt: "Spayka" },
];

const whyChooseCards = [
  {
    image: "/assets/photos/why-organic.jpg",
  },
  {
    image: "/assets/photos/why-innovation.jpg",
    offset: true,
  },
  {
    image: "/assets/photos/why-trust.jpg",
  },
  {
    image: "/assets/photos/why-global.jpg",
    offset: true,
  },
];

export default function App() {
  const [currentLanguage, setCurrentLanguage] = React.useState("AM");
  const [selectedFruit, setSelectedFruit] = React.useState("fig");
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [visitorName, setVisitorName] = React.useState("");
  const [visitorPhone, setVisitorPhone] = React.useState("");

  const languages = [
    { code: "AM", label: "Armenian" },
    { code: "EN", label: "English" },
    { code: "RU", label: "Русский" },
  ];

  const t = translations[currentLanguage];
  const navItemsTranslated = t.navItems;

  const fruits = [
    { id: "fig", label: t.products.fruits.fig },
    { id: "peach", label: t.products.fruits.peach },
    { id: "nectarine", label: t.products.fruits.nectarine },
  ];

  const handleLanguageSelect = (code) => {
    setCurrentLanguage(code);
  };

  const handleFruitSelect = (fruitId) => {
    setSelectedFruit(fruitId);
  };

  const handleBookVisit = () => {
    setShowDatePicker(true);
  };

  const handleDateSelect = (date) => {
    if (date) {
      setSelectedDate(date);
      console.log("Selected date:", date);
      setShowDatePicker(false);
    }
  };

  const handleCloseModal = () => {
    setShowDatePicker(false);
  };

  // Build the dynamic process list from the fruitAssets object
  const processSteps = fruitAssets[selectedFruit].processImages.map((imgPath, index) => ({
    image: imgPath,
    reverse: index % 2 !== 0 // Automatically alternate layout
  }));

  // Build the product cards list from the fruitAssets object
  const productCards = [
    {
      type: "image",
      image: fruitAssets[selectedFruit].productImages[0],
      alt: t.products.cards[selectedFruit][0].title,
    },
    {
      type: "feature",
      icon: fruitAssets[selectedFruit].icon,
    },
    {
      type: "image",
      image: fruitAssets[selectedFruit].productImages[1],
      alt: t.products.cards[selectedFruit][1].title,
    },
    {
      type: "feature",
      icon: "/assets/icons/export.svg",
    },
    {
      type: "image",
      image: fruitAssets[selectedFruit].productImages[2],
      alt: t.products.cards[selectedFruit][2].title,
    },
    {
      type: "feature",
      icon: "/assets/icons/supply.svg",
    },
  ];

  return (
    <div className="page">
      <header className="hero" id="top">
        <div className="shell shell--wide hero__shell">
          <div className="topbar">
            <a className="brand" href="#top">
              GREEN CORE
            </a>

            <nav className="nav-pill" aria-label="Primary navigation">
              {navItemsTranslated.map((item) => (
                <a
                  key={item.label}
                  className={`nav-pill__link ${item.active ? "is-active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="lang-dropdown">
              <button 
                className="lang-badge" 
                type="button"
                aria-haspopup="true"
              >
                {currentLanguage}
              </button>
              <ul className="lang-dropdown__menu">
                {languages.map((lang) => (
                  <li key={lang.code}>
                    <button
                      className={`lang-dropdown__item ${currentLanguage === lang.code ? "is-active" : ""}`}
                      onClick={() => handleLanguageSelect(lang.code)}
                      type="button"
                    >
                      {lang.code}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero__content">
            <h1 className="hero__title">{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__actions">
              <a className="button button--solid" href="#contact">
                {t.hero.cta1}
              </a>
              <a className="button button--ghost" href="#" onClick={(e) => { e.preventDefault(); handleBookVisit(); }}>
                {t.hero.cta2}
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section section--green about" id="about">
        <div className="shell shell--wide">
          <div className="partner-strip-wrapper" aria-label="Retail partners">
            <div className="partner-strip">
              {[...partners, ...partners].map((partner, index) => (
                <div className="partner-strip__item" key={`${partner.src}-${index}`}>
                  <img src={partner.src} alt={partner.alt} />
                </div>
              ))}
            </div>
          </div>

          <p className="section-title section-title--light">{t.about.title}</p>

          <div className="split split--framed">
            <div className="copy-block">
              <h2 className="headline headline--light">{t.about.headline}</h2>
              <p className="copy copy--light">{t.about.text1}</p>
            </div>

            <div className="media-card media-card--large">
              <img src="/assets/photos/about-smart-orchard.png" alt="Խելացի թզի այգի" />
            </div>
          </div>

          <div className="split split--reversed">
            <div className="media-card media-card--large media-card--fig-box">
              <img src={fruitAssets[selectedFruit].aboutImage} alt={t.products.fruits[selectedFruit]} />
            </div>

            <div className="copy-block copy-block--bordered">
              <p className="copy copy--light">{t.about.text2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section products" id="products">
        <div className="shell shell--wide">
          <div className="section-header">
            <p className="section-title">{t.products.title}</p>
            
            <div className="fruit-dropdown">
              <button 
                className="fruit-badge" 
                type="button"
                aria-haspopup="true"
              >
                {t.products.fruits[selectedFruit]}
                <span className="fruit-dropdown__arrow">▼</span>
              </button>
              <ul className="fruit-dropdown__menu">
                {fruits.map((fruit) => (
                  <li key={fruit.id}>
                    <button
                      className={`fruit-dropdown__item ${selectedFruit === fruit.id ? "is-active" : ""}`}
                      onClick={() => handleFruitSelect(fruit.id)}
                      type="button"
                    >
                      {fruit.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="product-grid">
            {productCards.map((card, index) =>
              card.type === "image" ? (
                <article className="product-card product-card--image" key={`${selectedFruit}-img-${index}`}>
                  <img src={card.image} alt={card.alt} />
                </article>
              ) : (
                <article className="product-card product-card--feature" key={`${selectedFruit}-feature-${index}`}>
                  <img className="product-card__icon" src={card.icon} alt="" aria-hidden="true" />
                  <h3 className="product-card__title">{t.products.cards[selectedFruit][Math.floor(index / 2)].title}</h3>
                  <p className="product-card__text">{t.products.cards[selectedFruit][Math.floor(index / 2)].description}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="shell shell--wide">
          <p className="section-title">{t.process.title}</p>

          <div className="process-list">
            {processSteps.map((step, index) => (
              <article
                className={`process-row ${step.reverse ? "process-row--reverse" : ""}`}
                key={`${selectedFruit}-process-${index}`}
              >
                <div className="process-row__copy">
                  <h3 className="process-row__title">{t.process.steps[index].title}</h3>
                  <ul className="process-row__bullets">
                    {t.process.steps[index].bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="process-row__image">
                  <img src={step.image} alt={t.process.steps[index].title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tourism" id="tourism">
        <div className="shell shell--wide">
          <p className="section-title">{t.tourism.title}</p>
          <h2 className="headline tourism__headline">{t.tourism.headline}</h2>

          <div className="tourism__grid">
            <div className="tourism__image">
              <img src="/assets/photos/tourism-visit.png" alt="Այգու զբոսաշրջային այց" />
            </div>

            <div className="tourism__panel">
              <h3 className="tourism__title">{t.tourism.servicesTitle}</h3>
              <ul className="tourism__services">
                {t.tourism.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <a className="button button--ghost tourism__cta" href="#" onClick={(e) => { e.preventDefault(); handleBookVisit(); }}>
                {t.tourism.cta}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section why-choose" id="why-choose">
        <div className="shell shell--wide">
          <p className="section-title section-title--left">{t.whyChoose.title}</p>

          <div className="why-grid">
            {whyChooseCards.map((card, index) => (
              <article
                className={`why-card ${card.offset ? "why-card--offset" : ""}`}
                key={`why-${index}`}
              >
                <img className="why-card__image" src={card.image} alt={t.whyChoose.cards[index].title} />
                <div className="why-card__overlay">
                  <h3 className="why-card__title">{t.whyChoose.cards[index].title}</h3>
                  <p className="why-card__text">{t.whyChoose.cards[index].description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="why-choose__summary">
            <h2 className="headline headline--compact">{t.whyChoose.summary}</h2>

            <a className="button button--solid" href="#contact">
              {t.whyChoose.cta}
            </a>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell footer__shell">
          <div className="footer__languages" aria-label="Languages">
            <button 
              className={`footer__language-btn ${currentLanguage === "EN" ? "is-active" : "is-muted"}`}
              onClick={() => handleLanguageSelect("EN")}
              type="button"
            >
              EN
            </button>
            <button 
              className={`footer__language-btn ${currentLanguage === "AM" ? "is-active" : "is-muted"}`}
              onClick={() => handleLanguageSelect("AM")}
              type="button"
            >
              AM
            </button>
            <button 
              className={`footer__language-btn ${currentLanguage === "RU" ? "is-active" : "is-muted"}`}
              onClick={() => handleLanguageSelect("RU")}
              type="button"
            >
              RU
            </button>
          </div>

          <div className="footer__columns">
            <section className="footer__column">
              <h3 className="footer__heading">{t.footer.contactTitle}</h3>
              <a className="footer__contact" href="tel:+37498565656">
                <img src="/assets/icons/phone.svg" alt="" aria-hidden="true" />
                <span>+374 98 56 56 56</span>
              </a>
              <a className="footer__contact" href="mailto:infogreencore@gmail.com">
                <img src="/assets/icons/email.svg" alt="" aria-hidden="true" />
                <span>infogreencore@gmail.com</span>
              </a>
              <a className="footer__contact" href="#top">
                <img src="/assets/icons/location.svg" alt="" aria-hidden="true" />
                <span>Armenia, Tavoush province, village Aknaghbyur</span>
              </a>
            </section>

            <section className="footer__column">
              <h3 className="footer__heading">{t.footer.sectionsTitle}</h3>
              <div className="footer__links">
                {t.footer.sections.map((link) => (
                  <a href={`#${slugify(link)}`} key={link}>
                    {link}
                  </a>
                ))}
              </div>
            </section>

            <section className="footer__column">
              <h3 className="footer__heading">{t.footer.mediaTitle}</h3>
              <div className="footer__socials">
                <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
                  <img src="/assets/icons/inst.svg" alt="" aria-hidden="true" />
                </a>
                <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
                  <img src="/assets/icons/fb.svg" alt="" aria-hidden="true" />
                </a>
              </div>
            </section>
          </div>

          <p className="footer__wordmark">GREEN CORE</p>
        </div>
      </footer>

      {showDatePicker && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {currentLanguage === "AM" && "Ընտրեք ցանկալի ամսաթիվ"}
                {currentLanguage === "EN" && "Select your preferred date"}
                {currentLanguage === "RU" && "Выберите предпочитаемую дату"}
              </h2>
              <button className="modal-close" onClick={handleCloseModal} type="button">&times;</button>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <label className="modal-label">
                  {currentLanguage === "AM" && "Անուն"}
                  {currentLanguage === "EN" && "Name"}
                  {currentLanguage === "RU" && "Имя"}
                </label>
                <input
                  type="text"
                  className="modal-input"
                  placeholder={currentLanguage === "AM" ? "Ձեր անունը" : currentLanguage === "EN" ? "Your name" : "Ваше имя"}
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                />
              </div>
              
              <div className="modal-section">
                <label className="modal-label">
                  {currentLanguage === "AM" && "Հեռախոսահամար"}
                  {currentLanguage === "EN" && "Phone Number"}
                  {currentLanguage === "RU" && "Номер телефона"}
                </label>
                <input
                  type="tel"
                  className="modal-input"
                  placeholder={currentLanguage === "AM" ? "+374 98 56 56 56" : currentLanguage === "EN" ? "+374 98 56 56 56" : "+374 98 56 56 56"}
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                />
              </div>

              <div className="modal-section">
                <label className="modal-label">
                  {currentLanguage === "AM" && "Ընտրեք ցանկալի ամսաթիվ"}
                  {currentLanguage === "EN" && "Select your preferred date"}
                  {currentLanguage === "RU" && "Выберите предпочитаемую дату"}
                </label>
                <Calendar
                  onChange={handleDateSelect}
                  minDate={new Date()}
                  value={selectedDate}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="button button--ghost" onClick={handleCloseModal} type="button">
                {currentLanguage === "AM" && "Չեղարկել"}
                {currentLanguage === "EN" && "Cancel"}
                {currentLanguage === "RU" && "Отмена"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function slugify(label) {
  // Armenian labels
  if (label === "Մեր մասին") return "about";
  if (label === "Արտադրանք") return "products";
  if (label === "Գործընթաց") return "process";
  if (label === "Տուրիզմ") return "tourism";
  
  // English labels
  if (label === "About") return "about";
  if (label === "Products") return "products";
  if (label === "Process") return "process";
  if (label === "Tourism") return "tourism";
  
  // Russian labels
  if (label === "О нас") return "about";
  if (label === "Продукция") return "products";
  if (label === "Процесс") return "process";
  if (label === "Туризм") return "tourism";
  
  return "why-choose";
}
