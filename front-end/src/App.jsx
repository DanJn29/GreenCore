import React from "react";
import Calendar from "react-calendar";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "react-calendar/dist/Calendar.css";

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000").replace(/\/+$/, "");
const SUPPORTED_LANGUAGES = ["AM", "EN", "RU"];
const STORAGE_KEYS = {
  accessToken: "greencore_access_token",
  tokenType: "greencore_token_type",
  userRole: "greencore_user_role",
  language: "greencore_language",
};

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
      lead: "Ընտանեկան բիզնես, որը միավորում է ավանդական արժեքներն ու ժամանակակից գյուղատնտեսական լուծումները՝ ապահովելով բարձրորակ օրգանիկ մրգեր ներքին շուկայի և արտահանման համար։",
      cta1: "Դառնալ գործընկեր",
      cta2: "Ամրագրել այց",
    },
    about: {
      title: "Մեր մասին",
      headline: "Մեր արմատները բնության մեջ են, մեր ընթացքը՝ տեխնոլոգիայի։",
      text1: "Մենք վերափոխում ենք հողատարածքը ժամանակակից, բարձր տեխնոլոգիական այգու, որտեղ յուրաքանչյուր ծառ խնամվում է ընտանեկան հոգատարությամբ։ Մեր նպատակն է ստեղծել էկոլոգիապես մաքուր միջավայր և աճեցնել լավագույն որակի մրգեր, որոնք կներկայացնեն մեր երկրի համն ու հոտը միջազգային շուկայում։",
      text2: "Այն ամենը, ինչ դուք տեսնում եք՝ փարթամ կանաչ դաշտերից մինչև նորարարական գյուղատնտեսական տեխնիկաներ, պարզապես հնարավորությունների օրինակ է։ Մենք հավատում ենք, որ գյուղատնտեսությունը սերմից շատ ավելին է։ Այն հոգատարություն է, կայունություն և պատասխանատվություն ապագայի հանդեպ։",
    },
    products: {
      title: "Արտադրանք",
      fruits: {
        fig: "Թուզ",
        peach: "Դեղձ",
        nectarine: "Նեկտար",
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
          { title: "Նեկտար", description: "Հարթ, պինդ, փայլուն և վառ գունավորմամբ նեկտարներ: Առանձնանում են իրենց կատարյալ  տեսքով և խրթխրթան միջուկով:" },
          { title: "Արտահանում", description: "Բարձր փոխադրելիություն և երկար պահպանման ժամկետ, ինչը դարձնում է այն արտահանման համար ամենահուսալի և շահավետ պրոդուկտներից մեկը:" },
          { title: "Մեծածախ մատակարարում", description: "Գերազանց ընտրություն սուպերմարկետների և HoReCa ոլորտի համար, որտեղ վիզուալ գրավչությունը և թարմությունը առաջնային են։" },
        ],
      },
    },
    process: {
      title: "Գործընթաց",
      steps: [
        {
          title: "1. Ձմեռային շրջան (հունվար-փետրվար)",
          bullets: ["Սանիտարական և ձևավորող էտ", "Վնասված և հին ճյուղերի հեռացում", "Կանխարգելիչ պաշտպանություն", "Կաթիլային ոռոգման համակարգի ստուգում"],
        },
        {
          title: "2. Վեգետացիայի սկիզբ (մարտ-ապրիլ)",
          bullets: ["Սեզոնային սնուցման ապահովում", "Կանոնավոր ոռոգման մեկնարկ", "Հողի վիճակի վերահսկում", "Նոր աճի և տերևային զանգվածի վերահսկում"],
        },
        {
          title: "3. Պտղի ձևավորում (մայիս-հունիս)",
          bullets: ["Կայուն ջրային ռեժիմի պահպանում", "Ծառի բեռնվածության վերահսկում", "Պտղի զարգացման դիտարկում", "Դաշտային որակի վերահսկում"],
        },
        {
          title: "4. Հասունացում և բերքահավաք (հուլիս-սեպտեմբեր)",
          bullets: ["Օպտիմալ հասունության որոշում", "Ձեռքով բերքահավաք", "Բերքահավաք յուրաքանչյուր 2-3 օրը մեկ ակտիվ փուլում", "Զգույշ տեղափոխում դաշտից"],
        },
        {
          title: "5. Հետբերքահավաքային մշակում",
          bullets: ["Նախնական տեսակավորում", "Որակի և չափի ընտրություն", "Նախնական սառեցում", "Պատրաստում փաթեթավորման"],
        },
        {
          title: "6. Փաթեթավորում",
          bullets: ["Չափերի կալիբրացում", "Օդափոխվող տարաների օգտագործում", "Խմբաքանակի և հավաքման ամսաթվի մակնշում"],
        },
        {
          title: "7. Լոգիստիկա",
          bullets: ["Ջերմաստիճանային ռեժիմի պահպանում", "Սառը շղթայի ապահովում", "Օպերատիվ առաքում թարմ շուկա"],
        },
      ],
    },
    tourism: {
      title: "Զբոսաշրջություն",
      headline: "Հրավիրում ենք բացահայտելու մեր խելացի այգիները։",
      servicesTitle: "Առաջարկվող ծառայություններ",
      services: ["1. Շրջայց նորագույն տեխնոլոգիաներով հագեցած այգում:", "2. Թարմ բերքի և թզից պատրաստված մթերքների համտես:", "3. Գնումներ անմիջապես արտադրողից:"],
      cta: "Ամրագրել այց",
    },
    whyChoose: {
      title: "Ինչու՞ ընտրել մեզ",
      cards: [
        { title: "100% Օրգանիկ", description: "Միջազգային չափանիշներին համապատասխանող մաքրություն։" },
        { title: "Նորարարություն", description: "Կայուն և կանխատեսելի որակ՝ շնորհիվ AgTech լուծումների։" },
        { title: "Վստահելիություն", description: "Ընտանեկան բիզնեսի նվիրվածություն և բիզնես գործընթացների թափանցիկություն։" },
        { title: "Գլոբալ հասանելիություն", description: "Պատրաստ ենք արտահանման ցանկացած ծավալի պահանջարկի:" },
      ],
      summary: "Էկոլոգիական պատասխանատվություն, նորարարական մտածելակերպ և երկարաժամկետ, փոխշահավետ համագործակցություն։",
      cta: "Դառնալ գործընկեր",
    },
    footer: {
      contactTitle: "Կապ",
      sectionsTitle: "Բաժիններ",
      mediaTitle: "Մեդիա",
      sections: ["Մեր մասին", "Արտադրանք", "Գործընթաց", "Տուրիզմ", "Ինչու՞ ընտրել մեզ"],
    },
    booking: {
      title: "Ընտրեք ցանկալի ամսաթիվ",
      nameLabel: "Անուն",
      namePlaceholder: "Ձեր անունը",
      phoneLabel: "Հեռախոսահամար",
      phonePlaceholder: "+374 98 56 56 56",
      dateLabel: "Ընտրեք ցանկալի ամսաթիվ",
      submit: "Ամրագրել այց",
      submitting: "Ամրագրվում է...",
      cancel: "Չեղարկել",
      success: "Այցը հաջողությամբ ամրագրվել է։",
      errors: {
        requiredName: "Խնդրում ենք մուտքագրել Ձեր անունը։",
        requiredPhone: "Խնդրում ենք մուտքագրել հեռախոսահամարը։",
        requiredDate: "Խնդրում ենք ընտրել այցի ամսաթիվը։",
        generic: "Այցի ամրագրումը հիմա հասանելի չէ։ Կրկին փորձեք։",
        network: "Չհաջողվեց կապ հաստատել սերվերի հետ։",
      },
    },
    login: {
      navAriaLabel: "Բացել մուտքի էջը",
      title: "Մուտք",
      subtitle: "Մուտք գործեք Ձեր հաշիվ` պատվերներն ու ամրագրումները կառավարելու համար։",
      emailLabel: "էլ-հասցե",
      emailPlaceholder: "companyname@gmail.com",
      passwordLabel: "Գաղտնաբառ",
      passwordPlaceholder: "Մուտքագրեք գաղտնաբառը",
      remember: "Հիշել ինձ",
      forgot: "Մոռացե՞լ եք գաղտնաբառը։",
      submit: "Մուտք գործել",
      loading: "Մուտք է կատարվում...",
      continue: "կամ շարունակել",
      google: "Google-ով",
      linkedin: "LinkedIn-ով",
      noAccount: "Չունե՞ք հաշիվ։",
      register: "Գրանցվել",
      success: "Հաշիվը ստեղծվել է։ Մուտք գործեք շարունակելու համար։",
      errors: {
        invalid: "Սխալ էլ-հասցե կամ գաղտնաբառ։",
        validation: "Խնդրում ենք լրացնել երկու դաշտերն էլ ճիշտ ձևաչափով։",
        requiredEmail: "Խնդրում ենք մուտքագրել էլ-հասցեն։",
        requiredPassword: "Խնդրում ենք մուտքագրել գաղտնաբառը։",
        invalidEmail: "Խնդրում ենք մուտքագրել վավեր էլ-հասցե։",
        generic: "Մուտքը հիմա հասանելի չէ։ Կրկին փորձեք։",
        network: "Չհաջողվեց կապ հաստատել սերվերի հետ։",
      },
    },
    register: {
      title: "Ստեղծել հաշիվ",
      subtitle: "Մուտք մեր համակարգ և կառավարեք օրգանական գյուղատնտեսության նոր սերնդի հնարավորությունները։",
      nameLabel: "Անուն",
      namePlaceholder: "Անուն կամ ընկերության անվանում",
      companyLabel: "Ընկերության անվանում",
      companyPlaceholder: "Մուտքագրեք ընկերության անվանումը",
      emailLabel: "էլ-հասցե",
      emailPlaceholder: "companyname@gmail.com",
      phoneLabel: "Հեռախոսահամար",
      phonePlaceholder: "+374 00 00 00 00",
      passwordLabel: "Գաղտնաբառ",
      passwordPlaceholder: "Մուտքագրեք գաղտնաբառը",
      confirmPasswordLabel: "Կրկնել գաղտնաբառը",
      confirmPasswordPlaceholder: "Կրկնեք գաղտնաբառը",
      terms: "Ընդունում եմ Ծառայությունների մատուցման պայմաններն ու Գաղտնիության քաղաքականությունը։",
      submit: "Գրանցվել",
      loading: "Գրանցվում է...",
      haveAccount: "Արդեն ունե՞ք հաշիվ։",
      login: "Մուտք գործել",
      errors: {
        validation: "Խնդրում ենք լրացնել բոլոր դաշտերը ճիշտ ձևաչափով։",
        requiredName: "Խնդրում ենք մուտքագրել անունը։",
        requiredCompanyName: "Խնդրում ենք մուտքագրել ընկերության անվանումը։",
        requiredEmail: "Խնդրում ենք մուտքագրել էլ-հասցեն։",
        requiredPhone: "Խնդրում ենք մուտքագրել հեռախոսահամարը։",
        requiredPassword: "Խնդրում ենք մուտքագրել գաղտնաբառը։",
        requiredConfirmPassword: "Խնդրում ենք կրկնել գաղտնաբառը։",
        invalidEmail: "Խնդրում ենք մուտքագրել վավեր էլ-հասցե։",
        passwordMismatch: "Գաղտնաբառերը չեն համընկնում։",
        generic: "Գրանցումն այժմ հասանելի չէ։ Կրկին փորձեք։",
        network: "Չհաջողվեց կապ հաստատել սերվերի հետ։",
      },
      success: "Գրանցումն ավարտված է։ Այժմ կարող եք մուտք գործել։",
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
      lead: "A family business that combines traditional values and modern agricultural solutions, ensuring high-quality organic fruits for the domestic market and for export.",
      cta1: "Become a Partner",
      cta2: "Book a Visit",
    },
    about: {
      title: "About",
      headline: "Our roots are in nature, our path is in technology.",
      text1: "We are transforming the land into a modern, high-tech garden where each tree is cared for with family-like attention. Our goal is to create an ecologically clean environment and grow the best quality fruits that will represent the flavor and aroma of our country in the international market.",
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
          title: "1. Winter Period (January-February)",
          bullets: ["Sanitary and shaping pruning", "Removal of damaged and old branches", "Preventive protection", "Inspection of the drip irrigation system"],
        },
        {
          title: "2. Beginning of Vegetation (March-April)",
          bullets: ["Ensuring seasonal nutrition", "Start of regular irrigation", "Soil condition monitoring", "Monitoring of new growth and leaf mass"],
        },
        {
          title: "3. Fruit Formation (May-June)",
          bullets: ["Maintaining a stable water regime", "Monitoring tree load", "Observing fruit development", "Field quality control"],
        },
        {
          title: "4. Ripening and Harvesting (July-September)",
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
    booking: {
      title: "Select your preferred date",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      phoneLabel: "Phone number",
      phonePlaceholder: "+374 98 56 56 56",
      dateLabel: "Select your preferred date",
      submit: "Book a Visit",
      submitting: "Booking...",
      cancel: "Cancel",
      success: "Your visit has been booked successfully.",
      errors: {
        requiredName: "Please enter your name.",
        requiredPhone: "Please enter your phone number.",
        requiredDate: "Please select a visit date.",
        generic: "Visit booking is unavailable right now. Please try again.",
        network: "Could not connect to the server.",
      },
    },
    login: {
      navAriaLabel: "Open login page",
      title: "Log In",
      subtitle: "Sign in to your account to manage orders and visit bookings.",
      emailLabel: "Email",
      emailPlaceholder: "companyname@gmail.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      remember: "Remember me",
      forgot: "Forgot password?",
      submit: "Log In",
      loading: "Signing in...",
      continue: "or continue with",
      google: "Continue with Google",
      linkedin: "Continue with LinkedIn",
      noAccount: "Don't have an account?",
      register: "Register",
      success: "Your account was created. Sign in to continue.",
      errors: {
        invalid: "Invalid email or password.",
        validation: "Please enter a valid email and password.",
        requiredEmail: "Please enter your email.",
        requiredPassword: "Please enter your password.",
        invalidEmail: "Please enter a valid email address.",
        generic: "Login is unavailable right now. Please try again.",
        network: "Could not connect to the server.",
      },
    },
    register: {
      title: "Create Account",
      subtitle: "Join Green Core and manage orders and visit bookings from one account.",
      nameLabel: "Name",
      namePlaceholder: "Your name or business name",
      companyLabel: "Company name",
      companyPlaceholder: "Enter your company name",
      emailLabel: "Email",
      emailPlaceholder: "companyname@gmail.com",
      phoneLabel: "Phone number",
      phonePlaceholder: "+374 00 00 00 00",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      confirmPasswordLabel: "Confirm password",
      confirmPasswordPlaceholder: "Repeat your password",
      terms: "I agree to the Terms of Service and Privacy Policy.",
      submit: "Register",
      loading: "Creating account...",
      haveAccount: "Already have an account?",
      login: "Log In",
      errors: {
        validation: "Please fill in all fields with valid values.",
        requiredName: "Please enter your name.",
        requiredCompanyName: "Please enter your company name.",
        requiredEmail: "Please enter your email.",
        requiredPhone: "Please enter your phone number.",
        requiredPassword: "Please enter your password.",
        requiredConfirmPassword: "Please confirm your password.",
        invalidEmail: "Please enter a valid email address.",
        passwordMismatch: "Passwords do not match.",
        generic: "Registration is unavailable right now. Please try again.",
        network: "Could not connect to the server.",
      },
      success: "Registration completed. You can sign in now.",
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
      lead: "Семейный бизнес, объединяющий традиционные ценности и современные агротехнические решения, обеспечивающий высококачественные органические фрукты для внутреннего рынка и на экспорт.",
      cta1: "Стать партнером",
      cta2: "Забронировать визит",
    },
    about: {
      title: "О нас",
      headline: "Наши корни - в природе, наш путь - в технологиях.",
      text1: "Мы преобразуем землю в современный, высокотехнологичный сад, где за каждым деревом ухаживают с семейной заботой. Наша цель - создать экологически чистую среду и вырастить фрукты наилучшего качества, которые представят вкус и аромат нашей страны на международном рынке.",
      text2: "Все, что вы видите - от пышных зеленых полей до инновационных агротехник, - это лишь пример возможностей. Мы верим, что сельское хозяйство - это нечто гораздо большее, чем просто семя. Это забота, устойчивость и ответственность перед будущим.",
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
          title: "1. Зимний период (январь-февраль)",
          bullets: ["Санитарная и формирующая обрезка", "Удаление поврежденных и старых ветвей", "Профилактическая защита", "Проверка системы капельного орошения"],
        },
        {
          title: "2. Начало вегетации (март-апрель)",
          bullets: ["Обеспечение сезонного питания", "Начало регулярного полива", "Контроль состояния почвы", "Мониторинг нового прироста и листовой массы"],
        },
        {
          title: "3. Формирование плодов (май-июнь)",
          bullets: ["Поддержание стабильного водного режима", "Контроль нагрузки на дерево", "Наблюдение за развитием плодов", "Полевой контроль качества"],
        },
        {
          title: "4. Созревание и сбор урожая (июль-сентябрь)",
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
        { title: "Глобальная доступность", description: "Готовы к экспорту на любой объем спроса." },
      ],
      summary: "Экологическая ответственность, инновационное мышление и долгосрочное взаимовыгодное сотрудничество.",
      cta: "Стать партнером",
    },
    footer: {
      contactTitle: "Контакты",
      sectionsTitle: "Разделы",
      mediaTitle: "Медиа",
      sections: ["О нас", "Продукция", "Процесс", "Туризм", "Почему мы"],
    },
    booking: {
      title: "Выберите предпочтительную дату",
      nameLabel: "Имя",
      namePlaceholder: "Ваше имя",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+374 98 56 56 56",
      dateLabel: "Выберите предпочтительную дату",
      submit: "Забронировать визит",
      submitting: "Бронирование...",
      cancel: "Отмена",
      success: "Ваш визит успешно забронирован.",
      errors: {
        requiredName: "Пожалуйста, введите ваше имя.",
        requiredPhone: "Пожалуйста, введите номер телефона.",
        requiredDate: "Пожалуйста, выберите дату визита.",
        generic: "Бронирование визита сейчас недоступно. Попробуйте снова.",
        network: "Не удалось подключиться к серверу.",
      },
    },
    login: {
      navAriaLabel: "Открыть страницу входа",
      title: "Вход",
      subtitle: "Войдите в аккаунт, чтобы управлять заказами и бронированиями визитов.",
      emailLabel: "Эл. почта",
      emailPlaceholder: "companyname@gmail.com",
      passwordLabel: "Пароль",
      passwordPlaceholder: "Введите пароль",
      remember: "Запомнить меня",
      forgot: "Забыли пароль?",
      submit: "Войти",
      loading: "Выполняется вход...",
      continue: "или продолжить через",
      google: "Продолжить через Google",
      linkedin: "Продолжить через LinkedIn",
      noAccount: "Нет аккаунта?",
      register: "Зарегистрироваться",
      success: "Аккаунт создан. Войдите, чтобы продолжить.",
      errors: {
        invalid: "Неверная почта или пароль.",
        validation: "Введите корректные почту и пароль.",
        requiredEmail: "Пожалуйста, введите эл. почту.",
        requiredPassword: "Пожалуйста, введите пароль.",
        invalidEmail: "Пожалуйста, введите корректный email.",
        generic: "Сейчас вход недоступен. Попробуйте снова.",
        network: "Не удалось подключиться к серверу.",
      },
    },
    register: {
      title: "Создать аккаунт",
      subtitle: "Подключитесь к Green Core и управляйте заказами и бронированием визитов из одного кабинета.",
      nameLabel: "Имя",
      namePlaceholder: "Ваше имя или название бизнеса",
      companyLabel: "Название компании",
      companyPlaceholder: "Введите название компании",
      emailLabel: "Эл. почта",
      emailPlaceholder: "companyname@gmail.com",
      phoneLabel: "Номер телефона",
      phonePlaceholder: "+374 00 00 00 00",
      passwordLabel: "Пароль",
      passwordPlaceholder: "Введите пароль",
      confirmPasswordLabel: "Повторите пароль",
      confirmPasswordPlaceholder: "Повторите пароль",
      terms: "Я принимаю Условия использования и Политику конфиденциальности.",
      submit: "Зарегистрироваться",
      loading: "Создание аккаунта...",
      haveAccount: "Уже есть аккаунт?",
      login: "Войти",
      errors: {
        validation: "Заполните все поля корректными значениями.",
        requiredName: "Пожалуйста, введите имя.",
        requiredCompanyName: "Пожалуйста, введите название компании.",
        requiredEmail: "Пожалуйста, введите эл. почту.",
        requiredPhone: "Пожалуйста, введите номер телефона.",
        requiredPassword: "Пожалуйста, введите пароль.",
        requiredConfirmPassword: "Пожалуйста, повторите пароль.",
        invalidEmail: "Пожалуйста, введите корректный email.",
        passwordMismatch: "Пароли не совпадают.",
        generic: "Сейчас регистрация недоступна. Попробуйте снова.",
        network: "Не удалось подключиться к серверу.",
      },
      success: "Регистрация завершена. Теперь можно войти.",
    },
  },
};

const dashboardTranslations = {
  AM: {
    searchPlaceholder: "Որոնել",
    sections: {
      transactions: "Գործարքներ",
      finances: "Ֆինանսներ",
      partners: "Գործընկերներ",
      products: "Ապրանքներ",
      harvestStorage: "Բերք և պահեստ",
      tourism: "Տուրիզմ",
      settings: "Կարգավորումներ",
      logout: "Ելք",
      loggingOut: "Ելք...",
    },
    toolbar: {
      delete: "Ջնջել",
      filter: "Ֆիլտրել",
      newOrder: "Նոր պատվեր",
      addProduct: "Ավելացնել ապրանք",
    },
    rowMenu: {
      moreActions: "Լրացուցիչ գործողություններ",
      delete: "Ջնջել",
      editPaid: "Խմբագրել վճարվածը",
      editProduct: "Խմբագրել ապրանքը",
    },
    editor: {
      save: "Պահպանել",
      cancel: "Չեղարկել",
    },
    filters: {
      statusLabel: "Կարգավիճակ",
      productLabel: "Ապրանք",
      companyLabel: "Ընկերություն",
      dateLabel: "Այցի ամսաթիվ",
      allStatuses: "Բոլոր կարգավիճակները",
      allProducts: "Բոլոր ապրանքները",
      allCompanies: "Բոլոր ընկերությունները",
      reset: "Մաքրել",
      apply: "Կիրառել",
    },
    modal: {
      title: "Ավելացնել գործարք",
      productLabel: "Ապրանքի տեսակ",
      productPlaceholder: "Ընտրեք ապրանքը",
      quantityLabel: "Քանակ",
      quantityPlaceholder: "Մուտքագրեք քանակը",
      cancel: "Չեղարկել",
      submit: "Ստեղծել",
      creating: "Ստեղծվում է...",
      loadingProducts: "Ապրանքները բեռնվում են...",
      noProducts: "Այս պահին հասանելի ապրանքներ չկան։",
    },
    productModal: {
      title: "Ավելացնել ապրանք",
      nameLabel: "Ապրանքի անվանում",
      namePlaceholder: "Մուտքագրեք ապրանքի անվանումը",
      quantityLabel: "Քանակ",
      quantityPlaceholder: "Մուտքագրեք քանակը",
      priceLabel: "Գին",
      pricePlaceholder: "Մուտքագրեք գինը",
      cancel: "Չեղարկել",
      submit: "Ավելացնել",
      creating: "Ավելացվում է...",
    },
    cards: {
      transactions: "Գործարքներ",
      finances: "Ֆինանսներ",
      partners: "Գործընկերներ",
      products: "Ապրանքներ",
      tourism: "Տուրիզմ",
    },
    summaryRows: {
      overall: "Ընդհանուր ամփոփում",
    },
    columns: {
      name: "Անուն",
      email: "Էլ-հասցե",
      phone: "Հեռախոս",
      visitDate: "Այցի ամսաթիվ",
      productId: "Ապրանքի ID",
      productType: "Ապրանք",
      companyName: "Ընկերություն",
      userName: "Հաճախորդի անունը",
      quantity: "Քանակ (կգ)",
      price: "Գին (դր)",
      total: "Ընդհանուր գումար (դր)",
      paid: "Վճարված գումար (դր)",
      debt: "Պարտք (դր)",
      status: "Կարգավիճակ",
      actions: "Գործողություններ",
    },
    status: {
      pending: "Սպասում",
      accepted: "Ընդունված",
      harvesting: "Հավաքագրում",
      packaging: "Փաթեթավորում",
      onTheWay: "Ճանապարհին",
      canceled: "Չեղարկված",
    },
    empty: {
      transactions: "Գործարքներ դեռ չկան։",
      finances: "Ֆինանսական տվյալներ դեռ չկան։",
      partners: "Գործընկերներ դեռ չկան։",
      products: "Ապրանքներ դեռ չկան։",
      tourism: "Ամրագրված այցելություններ դեռ չկան։",
    },
    loading: {
      transactions: "Գործարքները բեռնվում են...",
      finances: "Ֆինանսական տվյալները բեռնվում են...",
      partners: "Գործընկերները բեռնվում են...",
      products: "Ապրանքները բեռնվում են...",
      tourism: "Ամրագրված այցելությունները բեռնվում են...",
    },
    errors: {
      transactions: "Չհաջողվեց բեռնել գործարքները։",
      finances: "Չհաջողվեց բեռնել ֆինանսական տվյալները։",
      partners: "Չհաջողվեց բեռնել գործընկերներին։",
      products: "Չհաջողվեց բեռնել ապրանքները։",
      tourism: "Չհաջողվեց բեռնել ամրագրված այցելությունները։",
      createTransaction: "Չհաջողվեց ստեղծել գործարքը։",
      createProduct: "Չհաջողվեց ստեղծել ապրանքը։",
      deleteTransaction: "Չհաջողվեց ջնջել գործարքը։",
      deleteProduct: "Չհաջողվեց ջնջել ապրանքը։",
      deleteBooking: "Չհաջողվեց ջնջել ամրագրումը։",
      updateTransaction: "Չհաջողվեց թարմացնել գործարքը։",
      updateProduct: "Չհաջողվեց թարմացնել ապրանքը։",
      logout: "Չհաջողվեց դուրս գալ։ Կրկին փորձեք։",
      productRequired: "Խնդրում ենք ընտրել ապրանքը։",
      productNameRequired: "Խնդրում ենք մուտքագրել ապրանքի անվանումը։",
      quantityRequired: "Խնդրում ենք մուտքագրել ճիշտ քանակ։",
      quantityMinimum: "Գործարքի նվազագույն քանակը 10000 է։",
      priceRequired: "Խնդրում ենք մուտքագրել ճիշտ գինը։",
      paidRequired: "Խնդրում ենք մուտքագրել ճիշտ վճարված գումարը։",
    },
  },
  EN: {
    searchPlaceholder: "Search",
    sections: {
      transactions: "Transactions",
      finances: "Finances",
      partners: "Partners",
      products: "Products",
      harvestStorage: "Harvest & storage",
      tourism: "Tourism",
      settings: "Settings",
      logout: "Log out",
      loggingOut: "Logging out...",
    },
    toolbar: {
      delete: "Delete",
      filter: "Filter",
      newOrder: "New order",
      addProduct: "Add product",
    },
    rowMenu: {
      moreActions: "More actions",
      delete: "Delete",
      editPaid: "Edit paid",
      editProduct: "Edit product",
    },
    editor: {
      save: "Save",
      cancel: "Cancel",
    },
    filters: {
      statusLabel: "Status",
      productLabel: "Product",
      companyLabel: "Company",
      dateLabel: "Visit date",
      allStatuses: "All statuses",
      allProducts: "All products",
      allCompanies: "All companies",
      reset: "Reset",
      apply: "Apply",
    },
    modal: {
      title: "Add transaction",
      productLabel: "Product type",
      productPlaceholder: "Select a product",
      quantityLabel: "Quantity",
      quantityPlaceholder: "Enter quantity",
      cancel: "Cancel",
      submit: "Create",
      creating: "Creating...",
      loadingProducts: "Loading products...",
      noProducts: "No available products right now.",
    },
    productModal: {
      title: "Add product",
      nameLabel: "Product name",
      namePlaceholder: "Enter the product name",
      quantityLabel: "Quantity",
      quantityPlaceholder: "Enter quantity",
      priceLabel: "Price",
      pricePlaceholder: "Enter price",
      cancel: "Cancel",
      submit: "Add",
      creating: "Adding...",
    },
    cards: {
      transactions: "Transactions",
      finances: "Finances",
      partners: "Partners",
      products: "Products",
      tourism: "Tourism",
    },
    summaryRows: {
      overall: "Overall summary",
    },
    columns: {
      name: "Name",
      email: "Email",
      phone: "Phone",
      visitDate: "Visit date",
      productId: "Product ID",
      productType: "Product",
      companyName: "Company",
      userName: "Customer name",
      quantity: "Quantity (kg)",
      price: "Price (AMD)",
      total: "Total (AMD)",
      paid: "Paid (AMD)",
      debt: "Debt (AMD)",
      status: "Status",
      actions: "Actions",
    },
    status: {
      pending: "Pending",
      accepted: "Accepted",
      harvesting: "Harvesting",
      packaging: "Packaging",
      onTheWay: "On the way",
      canceled: "Canceled",
    },
    empty: {
      transactions: "No transactions yet.",
      finances: "No finance records yet.",
      partners: "No partners yet.",
      products: "No products yet.",
      tourism: "No tourism bookings yet.",
    },
    loading: {
      transactions: "Loading transactions...",
      finances: "Loading finances...",
      partners: "Loading partners...",
      products: "Loading products...",
      tourism: "Loading tourism bookings...",
    },
    errors: {
      transactions: "Could not load transactions.",
      finances: "Could not load finances.",
      partners: "Could not load partners.",
      products: "Could not load products.",
      tourism: "Could not load tourism bookings.",
      createTransaction: "Could not create the transaction.",
      createProduct: "Could not create the product.",
      deleteTransaction: "Could not delete the transaction.",
      deleteProduct: "Could not delete the product.",
      deleteBooking: "Could not delete the booking.",
      updateTransaction: "Could not update the transaction.",
      updateProduct: "Could not update the product.",
      logout: "Could not log out. Please try again.",
      productRequired: "Please select a product.",
      productNameRequired: "Please enter a product name.",
      quantityRequired: "Please enter a valid quantity.",
      quantityMinimum: "Minimum transaction quantity is 10000.",
      priceRequired: "Please enter a valid price.",
      paidRequired: "Please enter a valid paid amount.",
    },
  },
  RU: {
    searchPlaceholder: "Поиск",
    sections: {
      transactions: "Транзакции",
      finances: "Финансы",
      partners: "Партнеры",
      products: "Продукты",
      harvestStorage: "Урожай и склад",
      tourism: "Туризм",
      settings: "Настройки",
      logout: "Выход",
      loggingOut: "Выход...",
    },
    toolbar: {
      delete: "Удалить",
      filter: "Фильтр",
      newOrder: "Новый заказ",
      addProduct: "Добавить продукт",
    },
    rowMenu: {
      moreActions: "Дополнительные действия",
      delete: "Удалить",
      editPaid: "Изменить оплату",
      editProduct: "Изменить продукт",
    },
    editor: {
      save: "Сохранить",
      cancel: "Отмена",
    },
    filters: {
      statusLabel: "Статус",
      productLabel: "Продукт",
      companyLabel: "Компания",
      dateLabel: "Дата визита",
      allStatuses: "Все статусы",
      allProducts: "Все продукты",
      allCompanies: "Все компании",
      reset: "Сбросить",
      apply: "Применить",
    },
    modal: {
      title: "Добавить транзакцию",
      productLabel: "Тип продукта",
      productPlaceholder: "Выберите продукт",
      quantityLabel: "Количество",
      quantityPlaceholder: "Введите количество",
      cancel: "Отмена",
      submit: "Создать",
      creating: "Создание...",
      loadingProducts: "Загрузка продуктов...",
      noProducts: "Сейчас нет доступных продуктов.",
    },
    productModal: {
      title: "Добавить продукт",
      nameLabel: "Название продукта",
      namePlaceholder: "Введите название продукта",
      quantityLabel: "Количество",
      quantityPlaceholder: "Введите количество",
      priceLabel: "Цена",
      pricePlaceholder: "Введите цену",
      cancel: "Отмена",
      submit: "Добавить",
      creating: "Добавление...",
    },
    cards: {
      transactions: "Транзакции",
      finances: "Финансы",
      partners: "Партнеры",
      products: "Продукты",
      tourism: "Туризм",
    },
    summaryRows: {
      overall: "Общий итог",
    },
    columns: {
      name: "Имя",
      email: "Эл. почта",
      phone: "Телефон",
      visitDate: "Дата визита",
      productId: "ID продукта",
      productType: "Продукт",
      companyName: "Компания",
      userName: "Имя клиента",
      quantity: "Количество (кг)",
      price: "Цена (AMD)",
      total: "Сумма (AMD)",
      paid: "Оплачено (AMD)",
      debt: "Долг (AMD)",
      status: "Статус",
      actions: "Действия",
    },
    status: {
      pending: "В ожидании",
      accepted: "Принято",
      harvesting: "Сбор урожая",
      packaging: "Упаковка",
      onTheWay: "В пути",
      canceled: "Отменено",
    },
    empty: {
      transactions: "Транзакций пока нет.",
      finances: "Финансовых данных пока нет.",
      partners: "Партнеров пока нет.",
      products: "Продуктов пока нет.",
      tourism: "Бронирований пока нет.",
    },
    loading: {
      transactions: "Загрузка транзакций...",
      finances: "Загрузка финансовых данных...",
      partners: "Загрузка партнеров...",
      products: "Загрузка продуктов...",
      tourism: "Загрузка бронирований...",
    },
    errors: {
      transactions: "Не удалось загрузить транзакции.",
      finances: "Не удалось загрузить финансовые данные.",
      partners: "Не удалось загрузить партнеров.",
      products: "Не удалось загрузить продукты.",
      tourism: "Не удалось загрузить бронирования.",
      createTransaction: "Не удалось создать транзакцию.",
      createProduct: "Не удалось создать продукт.",
      deleteTransaction: "Не удалось удалить транзакцию.",
      deleteProduct: "Не удалось удалить продукт.",
      deleteBooking: "Не удалось удалить бронирование.",
      updateTransaction: "Не удалось обновить транзакцию.",
      updateProduct: "Не удалось обновить продукт.",
      logout: "Не удалось выйти. Попробуйте снова.",
      productRequired: "Выберите продукт.",
      productNameRequired: "Введите название продукта.",
      quantityRequired: "Введите корректное количество.",
      quantityMinimum: "Минимальное количество для транзакции — 10000.",
      priceRequired: "Введите корректную цену.",
      paidRequired: "Введите корректную сумму оплаты.",
    },
  },
};

const apiErrorLocalization = {
  AM: {
    exact: {
      "could not validate credentials.": "Չհաջողվեց վավերացնել տվյալները։",
      "admin access required.": "Պահանջվում է ադմինի հասանելիություն։",
      "user with this email already exists.": "Այս էլ-հասցեով օգտատեր արդեն գոյություն ունի։",
      "incorrect email or password.": "Սխալ էլ-հասցե կամ գաղտնաբառ։",
      "product not found.": "Ապրանքը չի գտնվել։",
      "transaction not found.": "Գործարքը չի գտնվել։",
      "booking not found.": "Ամրագրումը չի գտնվել։",
      "requested quantity exceeds available product quantity.": "Պահանջվող քանակը գերազանցում է հասանելի քանակը։",
      "only pending transactions can be deleted.": "Միայն սպասման մեջ գտնվող գործարքները կարելի է ջնջել։",
      "booking limit for this day has been reached.": "Այս օրվա համար ամրագրումների սահմանաչափը լրացել է։",
      "name must not be empty.": "Անունը չպետք է դատարկ լինի։",
      "field must not be empty.": "Դաշտը չպետք է դատարկ լինի։",
      "password must not be empty.": "Գաղտնաբառը չպետք է դատարկ լինի։",
      "phone must be a valid phone number.": "Հեռախոսահամարը պետք է լինի վավեր։",
      "product type is required.": "Խնդրում ենք մուտքագրել ապրանքի անվանումը։",
      "quantity is required.": "Խնդրում ենք մուտքագրել ճիշտ քանակ։",
      "product type must not be empty.": "Ապրանքի անվանումը չպետք է դատարկ լինի։",
      "price is required.": "Խնդրում ենք մուտքագրել ճիշտ գինը։",
      "product deleted successfully.": "Ապրանքը հաջողությամբ ջնջվել է։",
      "booking deleted successfully.": "Ամրագրումը հաջողությամբ ջնջվել է։",
      "logged out successfully.": "Դուք հաջողությամբ դուրս եկաք համակարգից։",
      "field required": "Դաշտը պարտադիր է։",
      "input should be a valid string": "Մուտքագրված արժեքը պետք է լինի տեքստ։",
      "input should be a valid number": "Մուտքագրված արժեքը պետք է լինի թիվ։",
      "input should be a valid integer": "Մուտքագրված արժեքը պետք է լինի ամբողջ թիվ։",
      "input should be a valid datetime": "Մուտքագրված ամսաթիվը պետք է լինի վավեր։",
      "input should be a valid date": "Մուտքագրված ամսաթիվը պետք է լինի վավեր։",
      "value is not a valid email address": "Մուտքագրեք վավեր էլ-հասցե։",
      "request failed": "Հարցումը չհաջողվեց։",
    },
    templates: {
      minTransactionQuantity: (value) => `Գործարքի նվազագույն քանակը ${value} է։`,
      greaterThanOrEqual: (value) => `Արժեքը պետք է մեծ կամ հավասար լինի ${value}-ին։`,
      greaterThan: (value) => `Արժեքը պետք է մեծ լինի ${value}-ից։`,
      lessThanOrEqual: (value) => `Արժեքը պետք է փոքր կամ հավասար լինի ${value}-ին։`,
      lessThan: (value) => `Արժեքը պետք է փոքր լինի ${value}-ից։`,
      stringMin: (value) => `Տեքստը պետք է պարունակի առնվազն ${value} նիշ։`,
      stringMax: (value) => `Տեքստը պետք է պարունակի առավելագույնը ${value} նիշ։`,
      invalidNumber: "Մուտքագրեք վավեր թիվ։",
      invalidInteger: "Մուտքագրեք վավեր ամբողջ թիվ։",
      invalidDateTime: "Մուտքագրեք վավեր ամսաթիվ։",
      invalidEmail: "Մուտքագրեք վավեր էլ-հասցե։",
    },
  },
  EN: {
    exact: {
      "could not validate credentials.": "Could not validate credentials.",
      "admin access required.": "Admin access required.",
      "user with this email already exists.": "User with this email already exists.",
      "incorrect email or password.": "Incorrect email or password.",
      "product not found.": "Product not found.",
      "transaction not found.": "Transaction not found.",
      "booking not found.": "Booking not found.",
      "requested quantity exceeds available product quantity.": "Requested quantity exceeds available product quantity.",
      "only pending transactions can be deleted.": "Only pending transactions can be deleted.",
      "booking limit for this day has been reached.": "Booking limit for this day has been reached.",
      "name must not be empty.": "Name must not be empty.",
      "field must not be empty.": "Field must not be empty.",
      "password must not be empty.": "Password must not be empty.",
      "phone must be a valid phone number.": "Phone must be a valid phone number.",
      "product type is required.": "Please enter a product name.",
      "quantity is required.": "Please enter a valid quantity.",
      "product type must not be empty.": "Product type must not be empty.",
      "price is required.": "Please enter a valid price.",
      "product deleted successfully.": "Product deleted successfully.",
      "booking deleted successfully.": "Booking deleted successfully.",
      "logged out successfully.": "Logged out successfully.",
      "field required": "Field required.",
      "input should be a valid string": "Input should be a valid string.",
      "input should be a valid number": "Input should be a valid number.",
      "input should be a valid integer": "Input should be a valid integer.",
      "input should be a valid datetime": "Input should be a valid datetime.",
      "input should be a valid date": "Input should be a valid date.",
      "value is not a valid email address": "Please enter a valid email address.",
      "request failed": "Request failed.",
    },
    templates: {
      minTransactionQuantity: (value) => `Minimum transaction quantity is ${value}.`,
      greaterThanOrEqual: (value) => `Value must be greater than or equal to ${value}.`,
      greaterThan: (value) => `Value must be greater than ${value}.`,
      lessThanOrEqual: (value) => `Value must be less than or equal to ${value}.`,
      lessThan: (value) => `Value must be less than ${value}.`,
      stringMin: (value) => `Text must contain at least ${value} characters.`,
      stringMax: (value) => `Text must contain at most ${value} characters.`,
      invalidNumber: "Please enter a valid number.",
      invalidInteger: "Please enter a valid integer.",
      invalidDateTime: "Please enter a valid date.",
      invalidEmail: "Please enter a valid email address.",
    },
  },
  RU: {
    exact: {
      "could not validate credentials.": "Не удалось проверить учетные данные.",
      "admin access required.": "Требуется доступ администратора.",
      "user with this email already exists.": "Пользователь с таким email уже существует.",
      "incorrect email or password.": "Неверный email или пароль.",
      "product not found.": "Продукт не найден.",
      "transaction not found.": "Транзакция не найдена.",
      "booking not found.": "Бронирование не найдено.",
      "requested quantity exceeds available product quantity.": "Запрошенное количество превышает доступное количество продукта.",
      "only pending transactions can be deleted.": "Удалять можно только транзакции со статусом ожидания.",
      "booking limit for this day has been reached.": "Лимит бронирований на этот день уже достигнут.",
      "name must not be empty.": "Имя не должно быть пустым.",
      "field must not be empty.": "Поле не должно быть пустым.",
      "password must not be empty.": "Пароль не должен быть пустым.",
      "phone must be a valid phone number.": "Телефон должен быть корректным.",
      "product type is required.": "Введите название продукта.",
      "quantity is required.": "Введите корректное количество.",
      "product type must not be empty.": "Название продукта не должно быть пустым.",
      "price is required.": "Введите корректную цену.",
      "product deleted successfully.": "Продукт успешно удален.",
      "booking deleted successfully.": "Бронирование успешно удалено.",
      "logged out successfully.": "Вы успешно вышли из системы.",
      "field required": "Поле обязательно.",
      "input should be a valid string": "Значение должно быть корректной строкой.",
      "input should be a valid number": "Введите корректное число.",
      "input should be a valid integer": "Введите корректное целое число.",
      "input should be a valid datetime": "Введите корректную дату.",
      "input should be a valid date": "Введите корректную дату.",
      "value is not a valid email address": "Введите корректный email.",
      "request failed": "Запрос не выполнен.",
    },
    templates: {
      minTransactionQuantity: (value) => `Минимальное количество для транзакции — ${value}.`,
      greaterThanOrEqual: (value) => `Значение должно быть больше или равно ${value}.`,
      greaterThan: (value) => `Значение должно быть больше ${value}.`,
      lessThanOrEqual: (value) => `Значение должно быть меньше или равно ${value}.`,
      lessThan: (value) => `Значение должно быть меньше ${value}.`,
      stringMin: (value) => `Текст должен содержать не менее ${value} символов.`,
      stringMax: (value) => `Текст должен содержать не более ${value} символов.`,
      invalidNumber: "Введите корректное число.",
      invalidInteger: "Введите корректное целое число.",
      invalidDateTime: "Введите корректную дату.",
      invalidEmail: "Введите корректный email.",
    },
  },
};

const fruitAssets = {
  fig: {
    aboutImage: "/assets/photos/about-fig-box.jpg",
    productImages: [
      "/assets/photos/product-fresh-figs.png",
      "/assets/photos/product-export.jpg",
      "/assets/photos/product-wholesale.jpg",
    ],
    processImages: [
      "/assets/photos/process-winter-pruning.png",
      "/assets/photos/process-spring-growth.png",
      "/assets/photos/process-fruit-formation.png",
      "/assets/photos/process-harvest.png",
      "/assets/photos/process-postharvest.png",
      "/assets/photos/process-packaging.png",
      "/assets/photos/process-logistics.png",
    ],
    icon: "/assets/icons/fig.svg",
  },
  peach: {
    aboutImage: "/assets/photos/Peach.png",
    productImages: [
      "/assets/photos/peach/ProductImagepeach3.png",
      "/assets/photos/peach/ProductImagepeach2.png",
      "/assets/photos/peach/ProductImagepeach1.png",
    ],
    processImages: [
      "/assets/photos/peach/1.png",
      "/assets/photos/peach/2.png",
      "/assets/photos/peach/3.png",
      "/assets/photos/peach/4.png",
      "/assets/photos/peach/5.png",
      "/assets/photos/peach/SeasonImage-1.png",
      "/assets/photos/peach/7.png",
    ],
    icon: "/assets/icons/peach.svg",
  },
  nectarine: {
    aboutImage: "/assets/photos/Nectarine.png",
    productImages: [
      "/assets/photos/nectarine/ProductImage.png",
      "/assets/photos/nectarine/12.png",
      "/assets/photos/nectarine/13.png",
    ],
    processImages: [
      "/assets/photos/nectarine/1.png",
      "/assets/photos/nectarine/2.png",
      "/assets/photos/nectarine/3.png",
      "/assets/photos/nectarine/4.png",
      "/assets/photos/nectarine/5.png",
      "/assets/photos/nectarine/6.png",
      "/assets/photos/nectarine/7.png",
    ],
    icon: "/assets/icons/nectarine.svg",
  },
};

const aboutImages = [
  { src: fruitAssets.fig.aboutImage, alt: "fig" },
  { src: fruitAssets.peach.aboutImage, alt: "peach" },
  { src: fruitAssets.nectarine.aboutImage, alt: "nectarine" },
];

const languages = [
  { code: "AM", label: "Armenian" },
  { code: "EN", label: "English" },
  { code: "RU", label: "Russian" },
];

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
  { image: "/assets/photos/why-organic.jpg" },
  { image: "/assets/photos/why-innovation.jpg", offset: true },
  { image: "/assets/photos/why-trust.jpg" },
  { image: "/assets/photos/why-global.jpg", offset: true },
];

const dashboardIcons = {
  transactions: "/assets/icons/dashboard_icons/material-symbols_content-copy-outline.svg",
  finances: "/assets/icons/dashboard_icons/material-symbols_money-bag-outline-rounded.svg",
  adminPartners: "/assets/icons/dashboard_icons/mdi_partnership-outline.svg",
  settings: "/assets/icons/dashboard_icons/solar_settings-outline.svg",
  logout: "/assets/icons/dashboard_icons/Icons-2.svg",
  search: "/assets/icons/dashboard_icons/Icons-3.svg",
  notification: "/assets/icons/dashboard_icons/ion_notifications-outline.svg",
  trash: "/assets/icons/dashboard_icons/trash-01.svg",
  filter: "/assets/icons/dashboard_icons/filter-lines.svg",
  plus: "/assets/icons/dashboard_icons/plus.svg",
  adminTransactions: "/assets/icons/dashboard_icons/Icons.svg",
  adminProducts: "/assets/icons/dashboard_icons/Frame.svg",
  adminTourism: "/assets/icons/dashboard_icons/Frame-1.svg",
};

const dashboardLocales = {
  AM: "hy-AM",
  EN: "en-US",
  RU: "ru-RU",
};

const armenianMonthNames = [
  "հունվարի",
  "փետրվարի",
  "մարտի",
  "ապրիլի",
  "մայիսի",
  "հունիսի",
  "հուլիսի",
  "օգոստոսի",
  "սեպտեմբերի",
  "հոկտեմբերի",
  "նոյեմբերի",
  "դեկտեմբերի",
];

const armenianCalendarMonthNames = [
  "հունվար",
  "փետրվար",
  "մարտ",
  "ապրիլ",
  "մայիս",
  "հունիս",
  "հուլիս",
  "օգոստոս",
  "սեպտեմբեր",
  "հոկտեմբեր",
  "նոյեմբեր",
  "դեկտեմբեր",
];

const armenianCalendarWeekdayNames = ["Կիր", "Երկ", "Երք", "Չրք", "Հնգ", "Ուրբ", "Շբթ"];

const ADMIN_TRANSACTION_STATUS_OPTIONS = [
  "pending",
  "accepted",
  "harvesting",
  "packaging",
  "on_the_way",
  "canceled",
];

const USER_TRANSACTION_MIN_QUANTITY = 10000;

function HomePage({ currentLanguage, onLanguageSelect }) {
  const [selectedFruit, setSelectedFruit] = React.useState("fig");
  const [isNavbarProductsSuppressed, setIsNavbarProductsSuppressed] = React.useState(false);
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [visitorName, setVisitorName] = React.useState("");
  const [visitorPhone, setVisitorPhone] = React.useState("");
  const [bookingErrorMessage, setBookingErrorMessage] = React.useState("");
  const [bookingSuccessMessage, setBookingSuccessMessage] = React.useState("");
  const [isBookingSubmitting, setIsBookingSubmitting] = React.useState(false);
  const [aboutImageIndex, setAboutImageIndex] = React.useState(0);
  const bookingCloseTimeoutRef = React.useRef(null);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setAboutImageIndex((prevIndex) => (prevIndex + 1) % aboutImages.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  const t = translations[currentLanguage];
  const bookingCalendarLocale = dashboardLocales[currentLanguage] || "en-US";
  const minimumBookingDate = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, []);
  const fruits = [
    { id: "fig", label: t.products.fruits.fig },
    { id: "peach", label: t.products.fruits.peach },
    { id: "nectarine", label: t.products.fruits.nectarine },
  ];

  const clearBookingCloseTimeout = React.useCallback(() => {
    if (bookingCloseTimeoutRef.current) {
      window.clearTimeout(bookingCloseTimeoutRef.current);
      bookingCloseTimeoutRef.current = null;
    }
  }, []);

  const resetBookingForm = React.useCallback(() => {
    setSelectedDate(null);
    setVisitorName("");
    setVisitorPhone("");
    setBookingErrorMessage("");
    setBookingSuccessMessage("");
  }, []);

  React.useEffect(() => () => clearBookingCloseTimeout(), [clearBookingCloseTimeout]);

  const formatBookingCalendarMonthYear = React.useCallback(
    (locale, date) => {
      if (currentLanguage === "AM") {
        return `${armenianCalendarMonthNames[date.getMonth()] || ""} ${date.getFullYear()}`;
      }

      return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(date);
    },
    [currentLanguage],
  );

  const formatBookingCalendarWeekday = React.useCallback(
    (locale, date) => {
      if (currentLanguage === "AM") {
        return armenianCalendarWeekdayNames[date.getDay()] || "";
      }

      return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date).replace(/\.$/u, "");
    },
    [currentLanguage],
  );

  const handleBookVisit = () => {
    clearBookingCloseTimeout();
    resetBookingForm();
    setShowDatePicker(true);
  };

  const handleNavbarFruitSelect = React.useCallback((fruitId) => {
    setSelectedFruit(fruitId);
    setIsNavbarProductsSuppressed(true);

    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "#products");
    }
  }, []);

  const handleDateSelect = (date) => {
    const nextDate = Array.isArray(date) ? date[0] : date;

    if (nextDate) {
      setSelectedDate(nextDate);
      setBookingErrorMessage("");
    }
  };

  const handleCloseModal = () => {
    if (isBookingSubmitting) {
      return;
    }

    clearBookingCloseTimeout();
    resetBookingForm();
    setShowDatePicker(false);
  };

  const handleBookingSubmit = async (event) => {
    event.preventDefault();

    const trimmedName = visitorName.trim();
    const trimmedPhone = visitorPhone.trim();

    if (!trimmedName) {
      setBookingSuccessMessage("");
      setBookingErrorMessage(t.booking.errors.requiredName);
      return;
    }

    if (!trimmedPhone) {
      setBookingSuccessMessage("");
      setBookingErrorMessage(t.booking.errors.requiredPhone);
      return;
    }

    if (!selectedDate) {
      setBookingSuccessMessage("");
      setBookingErrorMessage(t.booking.errors.requiredDate);
      return;
    }

    setIsBookingSubmitting(true);
    setBookingErrorMessage("");
    setBookingSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/greencore/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          phone: trimmedPhone,
          visit_date: serializeBookingVisitDate(selectedDate),
        }),
      });

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok) {
        throw createApiError(response.status, data);
      }

      setVisitorName("");
      setVisitorPhone("");
      setSelectedDate(null);
      setBookingSuccessMessage(t.booking.success);
      clearBookingCloseTimeout();
      bookingCloseTimeoutRef.current = window.setTimeout(() => {
        setShowDatePicker(false);
        setBookingSuccessMessage("");
        bookingCloseTimeoutRef.current = null;
      }, 1600);
    } catch (error) {
      if (error instanceof TypeError) {
        setBookingErrorMessage(t.booking.errors.network);
      } else {
        setBookingErrorMessage(resolveApiErrorMessage(error, currentLanguage, t.booking.errors.generic));
      }
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  const processSteps = fruitAssets[selectedFruit].processImages.map((imgPath, index) => ({
    image: imgPath,
    reverse: index % 2 !== 0,
  }));

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
              {t.navItems.map((item) =>
                item.href === "#products" ? (
                  <div
                    className={`nav-pill__dropdown ${isNavbarProductsSuppressed ? "is-suppressed" : ""}`}
                    key={item.label}
                    onMouseLeave={() => setIsNavbarProductsSuppressed(false)}
                  >
                    <button
                      className="nav-pill__link nav-pill__dropdown-trigger"
                      type="button"
                      aria-haspopup="menu"
                    >
                      <span>{item.label}</span>
                    </button>

                    <ul className="nav-pill__dropdown-menu" role="menu" aria-label={item.label}>
                      {fruits.map((fruit) => (
                        <li key={fruit.id} role="none">
                          <button
                            className={`nav-pill__dropdown-item ${selectedFruit === fruit.id ? "is-active" : ""}`}
                            type="button"
                            role="menuitem"
                            onClick={() => handleNavbarFruitSelect(fruit.id)}
                          >
                            {fruit.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a
                    key={item.label}
                    className="nav-pill__link"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                ),
              )}
            </nav>

            <div className="topbar__controls">
              <div className="lang-dropdown">
                <button className="lang-badge" type="button" aria-haspopup="true">
                  {currentLanguage}
                </button>
                <ul className="lang-dropdown__menu">
                  {languages.map((language) => (
                    <li key={language.code}>
                      <button
                        className={`lang-dropdown__item ${currentLanguage === language.code ? "is-active" : ""}`}
                        onClick={() => onLanguageSelect(language.code)}
                        type="button"
                      >
                        {language.code}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <Link className="login-badge" to="/login" aria-label={t.login.navAriaLabel}>
                <img src="/assets/icons/login.svg" alt="" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="hero__content">
            <h1 className="hero__title">{t.hero.title}</h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__actions">
              <Link className="button button--solid" to="/register">
                {t.hero.cta1}
              </Link>
              <a
                className="button button--ghost"
                href="#book-visit"
                onClick={(event) => {
                  event.preventDefault();
                  handleBookVisit();
                }}
              >
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
              <img src="/assets/photos/about-smart-orchard.png" alt="Smart orchard" />
            </div>
          </div>

          <div className="split split--reversed">
            <div className="media-card media-card--large media-card--fig-box">
              <img src={aboutImages[aboutImageIndex].src} alt={t.products.fruits[aboutImages[aboutImageIndex].alt]} />
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
              <button className="fruit-badge" type="button" aria-haspopup="true">
                {t.products.fruits[selectedFruit]}
                <span className="fruit-dropdown__arrow">▼</span>
              </button>
              <ul className="fruit-dropdown__menu">
                {fruits.map((fruit) => (
                  <li key={fruit.id}>
                    <button
                      className={`fruit-dropdown__item ${selectedFruit === fruit.id ? "is-active" : ""}`}
                      onClick={() => setSelectedFruit(fruit.id)}
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
              <article className={`process-row ${step.reverse ? "process-row--reverse" : ""}`} key={`${selectedFruit}-process-${index}`}>
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
              <img src="/assets/photos/tourism-visit.png" alt="Tourism visit" />
            </div>

            <div className="tourism__panel">
              <h3 className="tourism__title">{t.tourism.servicesTitle}</h3>
              <ul className="tourism__services">
                {t.tourism.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <a
                className="button button--ghost tourism__cta"
                href="#book-visit"
                onClick={(event) => {
                  event.preventDefault();
                  handleBookVisit();
                }}
              >
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
              <article className={`why-card ${card.offset ? "why-card--offset" : ""}`} key={`why-${index}`}>
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

            <Link className="button button--solid" to="/register">
              {t.whyChoose.cta}
            </Link>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell footer__shell">
          <div className="footer__languages" aria-label="Languages">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`footer__language-btn ${currentLanguage === language.code ? "is-active" : "is-muted"}`}
                onClick={() => onLanguageSelect(language.code)}
                type="button"
              >
                {language.code}
              </button>
            ))}
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
          <div className="modal-content booking-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{t.booking.title}</h2>
              <button className="modal-close" onClick={handleCloseModal} type="button" disabled={isBookingSubmitting}>
                &times;
              </button>
            </div>
            <form className="booking-modal__form" onSubmit={handleBookingSubmit}>
              <div className="modal-body">
                <div className="modal-section">
                  <label className="modal-label" htmlFor="visit-booking-name">
                    {t.booking.nameLabel}
                  </label>
                  <input
                    id="visit-booking-name"
                    type="text"
                    className="modal-input"
                    placeholder={t.booking.namePlaceholder}
                    value={visitorName}
                    onChange={(event) => {
                      setVisitorName(event.target.value);
                      setBookingErrorMessage("");
                    }}
                  />
                </div>

                <div className="modal-section">
                  <label className="modal-label" htmlFor="visit-booking-phone">
                    {t.booking.phoneLabel}
                  </label>
                  <input
                    id="visit-booking-phone"
                    type="tel"
                    className="modal-input"
                    placeholder={t.booking.phonePlaceholder}
                    value={visitorPhone}
                    onChange={(event) => {
                      setVisitorPhone(event.target.value);
                      setBookingErrorMessage("");
                    }}
                  />
                </div>

                <div className="modal-section">
                  <label className="modal-label">{t.booking.dateLabel}</label>
                  <Calendar
                    className="booking-calendar"
                    locale={bookingCalendarLocale}
                    calendarType="iso8601"
                    minDate={minimumBookingDate}
                    next2Label={null}
                    prev2Label={null}
                    formatMonthYear={formatBookingCalendarMonthYear}
                    formatShortWeekday={formatBookingCalendarWeekday}
                    onChange={handleDateSelect}
                    value={selectedDate}
                  />
                </div>

                {bookingErrorMessage ? (
                  <p className="modal-feedback modal-feedback--error" role="alert">
                    {bookingErrorMessage}
                  </p>
                ) : null}

                {bookingSuccessMessage ? (
                  <p className="modal-feedback modal-feedback--success" role="status">
                    {bookingSuccessMessage}
                  </p>
                ) : null}
              </div>
              <div className="modal-footer">
                <button className="button button--ghost" onClick={handleCloseModal} type="button" disabled={isBookingSubmitting}>
                  {t.booking.cancel}
                </button>
                <button className="button button--solid booking-modal__submit" type="submit" disabled={isBookingSubmitting}>
                  {isBookingSubmitting ? t.booking.submitting : t.booking.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function LoginPage({ currentLanguage }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState(location.state?.registeredEmail || "");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState(location.state?.registrationMessage || "");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const t = translations[currentLanguage];

  const handleNoOpAction = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setErrorMessage(t.login.errors.requiredEmail);
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

    if (!isValidEmailAddress(trimmedEmail)) {
      setErrorMessage(t.login.errors.invalidEmail);
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

    if (!trimmedPassword) {
      setErrorMessage(t.login.errors.requiredPassword);
      setSuccessMessage("");
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/greencore/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(resolveLoginError(response.status, payload, currentLanguage, t.login.errors));
        setIsSubmitting(false);
        return;
      }

      if (!payload?.access_token || !payload?.token_type || !payload?.role) {
        setErrorMessage(t.login.errors.generic);
        setIsSubmitting(false);
        return;
      }

      const selectedStorage = rememberMe ? window.localStorage : window.sessionStorage;
      const alternateStorage = rememberMe ? window.sessionStorage : window.localStorage;

      alternateStorage.removeItem(STORAGE_KEYS.accessToken);
      alternateStorage.removeItem(STORAGE_KEYS.tokenType);
      alternateStorage.removeItem(STORAGE_KEYS.userRole);

      selectedStorage.setItem(STORAGE_KEYS.accessToken, payload.access_token);
      selectedStorage.setItem(STORAGE_KEYS.tokenType, payload.token_type);
      selectedStorage.setItem(STORAGE_KEYS.userRole, payload.role);

      navigate(payload.role === "user" ? "/dashboard/transactions" : "/dashboard/admin/transactions", { replace: true });
      return;
    } catch (error) {
      setErrorMessage(t.login.errors.network);
    }

    setIsSubmitting(false);
  };

  return (
    <main className="login-page">
      <Link className="login-page__brand" to="/">
        GREEN CORE
      </Link>

      <section className="login-card" aria-label={t.login.title}>
        <div className="login-card__intro">
          <h1 className="login-card__title">{t.login.title}</h1>
          <p className="login-card__subtitle">{t.login.subtitle}</p>
        </div>

        <form className="login-card__form" onSubmit={handleSubmit} noValidate>
          <div className="login-card__field">
            <label className="login-card__label" htmlFor="email">
              {t.login.emailLabel}
            </label>
            <input
              id="email"
              className="login-card__input"
              type="email"
              autoComplete="email"
              placeholder={t.login.emailPlaceholder}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              disabled={isSubmitting}
            />
          </div>

          <div className="login-card__field">
            <label className="login-card__label" htmlFor="password">
              {t.login.passwordLabel}
            </label>
            <div className="login-card__password">
              <input
                id="password"
                className="login-card__input login-card__input--password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder={t.login.passwordPlaceholder}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                disabled={isSubmitting}
              />
              <button
                className="login-card__password-toggle"
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <EyeIcon />
              </button>
            </div>
          </div>

          <div className="login-card__row">
            <label className="login-card__checkbox">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              <span>{t.login.remember}</span>
            </label>

            <button className="login-card__text-button" type="button" onClick={handleNoOpAction}>
              {t.login.forgot}
            </button>
          </div>

          {errorMessage ? (
            <p className="login-card__feedback login-card__feedback--error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="login-card__feedback login-card__feedback--success" role="status">
              {successMessage}
            </p>
          ) : null}

          <button className="login-card__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t.login.loading : t.login.submit}
          </button>
        </form>

        <div className="login-card__divider">
          <span />
          <p>{t.login.continue}</p>
          <span />
        </div>

        <div className="login-card__socials">
          <button className="login-card__social-button" type="button" onClick={handleNoOpAction}>
            <span className="login-card__social-icon login-card__social-icon--google" aria-hidden="true">
              G
            </span>
            <span>{t.login.google}</span>
          </button>
          <button className="login-card__social-button" type="button" onClick={handleNoOpAction}>
            <span className="login-card__social-icon login-card__social-icon--linkedin" aria-hidden="true">
              in
            </span>
            <span>{t.login.linkedin}</span>
          </button>
        </div>

        <div className="login-card__register">
          <span>{t.login.noAccount}</span>
          <Link className="login-card__text-button login-card__text-button--accent" to="/register">
            {t.login.register}
          </Link>
        </div>
      </section>
    </main>
  );
}

function RegisterPage({ currentLanguage }) {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const t = translations[currentLanguage];

  const updateField = (field) => (event) => {
    setFormData((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setErrorMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedCompanyName = formData.companyName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedPassword = formData.password.trim();
    const trimmedConfirmPassword = formData.confirmPassword.trim();

    if (!trimmedName) {
      setErrorMessage(t.register.errors.requiredName);
      return;
    }

    if (!trimmedCompanyName) {
      setErrorMessage(t.register.errors.requiredCompanyName);
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage(t.register.errors.requiredEmail);
      return;
    }

    if (!isValidEmailAddress(trimmedEmail)) {
      setErrorMessage(t.register.errors.invalidEmail);
      return;
    }

    if (!trimmedPhone) {
      setErrorMessage(t.register.errors.requiredPhone);
      return;
    }

    if (!trimmedPassword) {
      setErrorMessage(t.register.errors.requiredPassword);
      return;
    }

    if (!trimmedConfirmPassword) {
      setErrorMessage(t.register.errors.requiredConfirmPassword);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage(t.register.errors.passwordMismatch);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/greencore/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: formData.password,
          phone: trimmedPhone,
          company_name: trimmedCompanyName,
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setErrorMessage(resolveRegisterError(response.status, payload, currentLanguage, t.register.errors));
        setIsSubmitting(false);
        return;
      }

      navigate("/login", {
        replace: true,
        state: {
          registeredEmail: formData.email,
          registrationMessage: t.register.success,
        },
      });
      return;
    } catch (error) {
      setErrorMessage(t.register.errors.network);
    }

    setIsSubmitting(false);
  };

  return (
    <main className="login-page">
      <Link className="login-page__brand" to="/">
        GREEN CORE
      </Link>

      <section className="login-card login-card--register" aria-label={t.register.title}>
        <div className="login-card__intro">
          <h1 className="login-card__title">{t.register.title}</h1>
          <p className="login-card__subtitle">{t.register.subtitle}</p>
        </div>

        <form className="register-card__form" onSubmit={handleSubmit} noValidate>
          <div className="register-card__grid">
            <div className="register-card__field">
              <label className="login-card__label" htmlFor="register-name">
                {t.register.nameLabel}
              </label>
              <input
                id="register-name"
                className="login-card__input"
                type="text"
                autoComplete="name"
                placeholder={t.register.namePlaceholder}
                value={formData.name}
                onChange={updateField("name")}
                disabled={isSubmitting}
              />
            </div>

            <div className="register-card__field">
              <label className="login-card__label" htmlFor="register-company">
                {t.register.companyLabel}
              </label>
              <input
                id="register-company"
                className="login-card__input"
                type="text"
                autoComplete="organization"
                placeholder={t.register.companyPlaceholder}
                value={formData.companyName}
                onChange={updateField("companyName")}
                disabled={isSubmitting}
              />
            </div>

            <div className="register-card__field">
              <label className="login-card__label" htmlFor="register-email">
                {t.register.emailLabel}
              </label>
              <input
                id="register-email"
                className="login-card__input"
                type="email"
                autoComplete="email"
                placeholder={t.register.emailPlaceholder}
                value={formData.email}
                onChange={updateField("email")}
                disabled={isSubmitting}
              />
            </div>

            <div className="register-card__field">
              <label className="login-card__label" htmlFor="register-password">
                {t.register.passwordLabel}
              </label>
              <div className="login-card__password">
                <input
                  id="register-password"
                  className="login-card__input login-card__input--password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={t.register.passwordPlaceholder}
                  value={formData.password}
                  onChange={updateField("password")}
                  disabled={isSubmitting}
                />
                <button
                  className="login-card__password-toggle"
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            <div className="register-card__field">
              <label className="login-card__label" htmlFor="register-phone">
                {t.register.phoneLabel}
              </label>
              <input
                id="register-phone"
                className="login-card__input"
                type="tel"
                autoComplete="tel"
                placeholder={t.register.phonePlaceholder}
                value={formData.phone}
                onChange={updateField("phone")}
                disabled={isSubmitting}
              />
            </div>

            <div className="register-card__field">
              <label className="login-card__label" htmlFor="register-confirm-password">
                {t.register.confirmPasswordLabel}
              </label>
              <div className="login-card__password">
                <input
                  id="register-confirm-password"
                  className="login-card__input login-card__input--password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder={t.register.confirmPasswordPlaceholder}
                  value={formData.confirmPassword}
                  onChange={updateField("confirmPassword")}
                  disabled={isSubmitting}
                />
                <button
                  className="login-card__password-toggle"
                  type="button"
                  onClick={() => setShowConfirmPassword((previous) => !previous)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon />
                </button>
              </div>
            </div>
          </div>

          <label className="register-card__terms">
            <input type="checkbox" checked={acceptTerms} onChange={(event) => setAcceptTerms(event.target.checked)} />
            <span>{t.register.terms}</span>
          </label>

          {errorMessage ? (
            <p className="login-card__feedback login-card__feedback--error" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <button className="login-card__submit register-card__submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t.register.loading : t.register.submit}
          </button>
        </form>

        <div className="login-card__register">
          <span>{t.register.haveAccount}</span>
          <Link className="login-card__text-button login-card__text-button--accent" to="/login">
            {t.register.login}
          </Link>
        </div>
      </section>
    </main>
  );
}

function UserDashboardPage({ currentLanguage, onLanguageSelect }) {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getStoredAuthSession();
  const dashboardText = dashboardTranslations[currentLanguage];
  const activeSection = getDashboardSection(location.pathname);
  const accessToken = session?.accessToken;
  const tokenType = session?.tokenType;
  const userRole = session?.role;
  const authenticatedSession = accessToken
    ? {
        accessToken,
        tokenType,
        role: userRole,
      }
    : null;
  const [searchValue, setSearchValue] = React.useState("");
  const [profile, setProfile] = React.useState({ name: "", email: "" });
  const [transactionsState, setTransactionsState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [financesState, setFinancesState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [isCreateTransactionOpen, setIsCreateTransactionOpen] = React.useState(false);
  const [productOptionsState, setProductOptionsState] = React.useState({
    data: [],
    isLoading: false,
    error: "",
  });
  const [createTransactionForm, setCreateTransactionForm] = React.useState({
    productId: "",
    quantity: "",
  });
  const [createTransactionError, setCreateTransactionError] = React.useState("");
  const [isCreatingTransaction, setIsCreatingTransaction] = React.useState(false);
  const [deleteTransactionError, setDeleteTransactionError] = React.useState("");
  const [deletingTransactionId, setDeletingTransactionId] = React.useState(null);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [logoutError, setLogoutError] = React.useState("");
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const settingsRef = React.useRef(null);

  React.useEffect(() => {
    setSearchValue("");
  }, [activeSection]);

  React.useEffect(() => {
    if (!isSettingsOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!settingsRef.current?.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isSettingsOpen]);

  React.useEffect(() => {
    if (!accessToken || userRole !== "user" || activeSection !== "transactions" || transactionsState.data !== null) {
      return undefined;
    }

    const controller = new AbortController();

    setDeleteTransactionError("");
    setTransactionsState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/transactions", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile({
          name: payload?.user_name || "",
          email: payload?.user_email || "",
        });
        setTransactionsState({
          data: Array.isArray(payload?.transactions) ? payload.transactions : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401 || error.status === 403) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        setTransactionsState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.transactions),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    activeSection,
    accessToken,
    dashboardText.errors.transactions,
    navigate,
    tokenType,
    transactionsState.data,
    userRole,
  ]);

  React.useEffect(() => {
    if (!accessToken || userRole !== "user" || activeSection !== "finances" || financesState.data !== null) {
      return undefined;
    }

    const controller = new AbortController();

    setFinancesState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/finances", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile((current) => ({
          name: payload?.user_name || current.name || "",
          email: payload?.user_email || current.email || "",
        }));
        setFinancesState({
          data: Array.isArray(payload?.summaries) ? payload.summaries : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401 || error.status === 403) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        setFinancesState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.finances),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    activeSection,
    accessToken,
    dashboardText.errors.finances,
    financesState.data,
    navigate,
    tokenType,
    userRole,
  ]);

  React.useEffect(() => {
    if (!isCreateTransactionOpen || !accessToken || userRole !== "user") {
      return undefined;
    }

    const controller = new AbortController();

    setProductOptionsState({
      data: [],
      isLoading: true,
      error: "",
    });

    fetchAuthenticatedJson("/greencore/products", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProductOptionsState({
          data: Array.isArray(payload) ? payload : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401 || error.status === 403) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        setProductOptionsState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.products),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    accessToken,
    dashboardText.errors.products,
    isCreateTransactionOpen,
    navigate,
    tokenType,
    userRole,
  ]);

  const handleOpenCreateTransactionModal = () => {
    setCreateTransactionForm({
      productId: "",
      quantity: "",
    });
    setCreateTransactionError("");
    setProductOptionsState({
      data: [],
      isLoading: false,
      error: "",
    });
    setIsCreateTransactionOpen(true);
  };

  const handleCloseCreateTransactionModal = () => {
    if (isCreatingTransaction) {
      return;
    }

    setIsCreateTransactionOpen(false);
    setCreateTransactionError("");
  };

  const handleCreateTransactionFieldChange = (field) => (event) => {
    setCreateTransactionForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleCreateTransactionSubmit = async (event) => {
    event.preventDefault();

    const productId = Number(createTransactionForm.productId);
    const quantity = Number(createTransactionForm.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      setCreateTransactionError(dashboardText.errors.productRequired);
      return;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
      setCreateTransactionError(dashboardText.errors.quantityRequired);
      return;
    }

    if (quantity < USER_TRANSACTION_MIN_QUANTITY) {
      setCreateTransactionError(dashboardText.errors.quantityMinimum);
      return;
    }

    setCreateTransactionError("");
    setIsCreatingTransaction(true);

    try {
      await fetchAuthenticatedJson(
        "/greencore/transactions",
        authenticatedSession,
        undefined,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            quantity,
          }),
        },
      );

      setIsCreateTransactionOpen(false);
      setCreateTransactionForm({
        productId: "",
        quantity: "",
      });
      setProductOptionsState({
        data: [],
        isLoading: false,
        error: "",
      });
      setTransactionsState({
        data: null,
        isLoading: false,
        error: "",
      });
      setFinancesState({
        data: null,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate("/login", { replace: true });
        return;
      }

      setCreateTransactionError(resolveDashboardError(error, currentLanguage, dashboardText.errors.createTransaction));
    } finally {
      setIsCreatingTransaction(false);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    setDeleteTransactionError("");
    setDeletingTransactionId(transactionId);

    try {
      await fetchAuthenticatedJson(
        `/greencore/transactions/${transactionId}`,
        authenticatedSession,
        undefined,
        {
          method: "DELETE",
        },
      );

      setTransactionsState({
        data: null,
        isLoading: false,
        error: "",
      });
      setFinancesState({
        data: null,
        isLoading: false,
        error: "",
      });
      return true;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate("/login", { replace: true });
        return false;
      }

      setDeleteTransactionError(resolveDashboardError(error, currentLanguage, dashboardText.errors.deleteTransaction));
      return false;
    } finally {
      setDeletingTransactionId(null);
    }
  };

  const handleLogout = async () => {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await fetchAuthenticatedJson("/greencore/logout", authenticatedSession, undefined, {
        method: "POST",
      });
      clearStoredAuthSession();
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate("/login", { replace: true });
        return;
      }

      setLogoutError(resolveDashboardError(error, currentLanguage, dashboardText.errors.logout));
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!session?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (session.role === "admin") {
    return <Navigate to="/dashboard/admin/transactions" replace />;
  }

  if (session.role !== "user") {
    return <Navigate to="/login" replace />;
  }

  if (!activeSection) {
    return <Navigate to="/dashboard/transactions" replace />;
  }

  const content =
    activeSection === "transactions" ? (
      <DashboardTransactionsSection
        currentLanguage={currentLanguage}
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={transactionsState}
        deleteErrorMessage={deleteTransactionError}
        deletingTransactionId={deletingTransactionId}
        onCreateTransaction={handleOpenCreateTransactionModal}
        onDeleteTransaction={handleDeleteTransaction}
      />
    ) : (
      <DashboardFinancesSection
        currentLanguage={currentLanguage}
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={financesState}
        onCreateTransaction={handleOpenCreateTransactionModal}
      />
    );

  const displayName = profile.name || "";
  const displayEmail = profile.email || "";

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-sidebar__brand" to="/">
          GREEN CORE
        </Link>

        <nav className="dashboard-sidebar__nav" aria-label="Dashboard navigation">
          <Link
            className={`dashboard-sidebar__item ${activeSection === "transactions" ? "is-active" : ""}`}
            to="/dashboard/transactions"
          >
            <img src={dashboardIcons.transactions} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.transactions}</span>
          </Link>

          <Link
            className={`dashboard-sidebar__item ${activeSection === "finances" ? "is-active" : ""}`}
            to="/dashboard/finances"
          >
            <img src={dashboardIcons.finances} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.finances}</span>
          </Link>

          <div className="dashboard-sidebar__settings" ref={settingsRef}>
            <button
              className={`dashboard-sidebar__item ${isSettingsOpen ? "is-active" : ""}`}
              type="button"
              onClick={() => setIsSettingsOpen((current) => !current)}
              aria-expanded={isSettingsOpen}
            >
              <img src={dashboardIcons.settings} alt="" aria-hidden="true" />
              <span>{dashboardText.sections.settings}</span>
            </button>

            {isSettingsOpen ? (
              <div className="dashboard-sidebar__settings-panel" role="dialog" aria-label={dashboardText.sections.settings}>
                <div className="dashboard-sidebar__settings-options">
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <button
                      key={language}
                      className={`dashboard-sidebar__language-option ${currentLanguage === language ? "is-active" : ""}`}
                      type="button"
                      onClick={() => {
                        onLanguageSelect(language);
                        setIsSettingsOpen(false);
                      }}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        {logoutError ? (
          <p className="dashboard-sidebar__feedback dashboard-sidebar__feedback--error" role="alert">
            {logoutError}
          </p>
        ) : null}

        <button
          className="dashboard-sidebar__logout"
          onClick={handleLogout}
          type="button"
          disabled={isLoggingOut}
        >
          <img src={dashboardIcons.logout} alt="" aria-hidden="true" />
          <span>{isLoggingOut ? dashboardText.sections.loggingOut : dashboardText.sections.logout}</span>
        </button>
      </aside>

      <section className="dashboard-shell">
        <header className="dashboard-shell__topbar">
          <label className="dashboard-search" htmlFor="dashboard-search">
            <img src={dashboardIcons.search} alt="" aria-hidden="true" />
            <input
              id="dashboard-search"
              type="search"
              placeholder={dashboardText.searchPlaceholder}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </label>

          <div className="dashboard-shell__profile">
            <div className="dashboard-shell__user">
              <strong>{displayName}</strong>
              <span>{displayEmail}</span>
            </div>

            <div className="dashboard-shell__avatar" aria-hidden="true">
              {getAvatarInitial(displayName)}
            </div>
          </div>
        </header>

        {content}
      </section>

      {isCreateTransactionOpen ? (
        <DashboardCreateTransactionModal
          currentLanguage={currentLanguage}
          dashboardText={dashboardText}
          form={createTransactionForm}
          productOptionsState={productOptionsState}
          errorMessage={createTransactionError}
          isSubmitting={isCreatingTransaction}
          onClose={handleCloseCreateTransactionModal}
          onFieldChange={handleCreateTransactionFieldChange}
          onSubmit={handleCreateTransactionSubmit}
        />
      ) : null}
    </main>
  );
}

function DashboardTransactionsSection({
  currentLanguage,
  dashboardText,
  searchValue,
  state,
  deleteErrorMessage,
  deletingTransactionId,
  onCreateTransaction,
  onDeleteTransaction,
}) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [appliedFilters, setAppliedFilters] = React.useState({
    status: "",
    productType: "",
  });
  const [draftFilters, setDraftFilters] = React.useState({
    status: "",
    productType: "",
  });
  const [openRowMenuId, setOpenRowMenuId] = React.useState(null);
  const filterRef = React.useRef(null);
  const transactions = Array.isArray(state.data) ? state.data : [];
  const statusOptions = React.useMemo(
    () =>
      [...new Set(transactions.map((transaction) => transaction.status).filter(Boolean))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [transactions],
  );
  const productOptions = React.useMemo(
    () =>
      [...new Set(transactions.map((transaction) => transaction.product_type).filter(Boolean))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [transactions],
  );
  const filteredTransactions = React.useMemo(
    () =>
      transactions.filter((transaction) => {
        if (appliedFilters.status && transaction.status !== appliedFilters.status) {
          return false;
        }

        if (appliedFilters.productType && transaction.product_type !== appliedFilters.productType) {
          return false;
        }

        return true;
      }),
    [appliedFilters.productType, appliedFilters.status, transactions],
  );
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const visibleTransactions = React.useMemo(
    () =>
      filteredTransactions.filter((transaction) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          transaction.product_type,
          formatDashboardNumber(transaction.quantity, currentLanguage),
          formatDashboardNumber(transaction.total, currentLanguage),
          formatDashboardNumber(transaction.paid, currentLanguage),
          formatDashboardNumber(transaction.debt, currentLanguage),
          getDashboardStatusLabel(transaction.status, dashboardText.status),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [currentLanguage, dashboardText.status, filteredTransactions, normalizedSearchValue],
  );
  const hasActiveFilters = Boolean(appliedFilters.status || appliedFilters.productType);

  React.useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isFilterOpen]);

  React.useEffect(() => {
    if (openRowMenuId === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!event.target.closest(".dashboard-table__row-actions")) {
        setOpenRowMenuId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openRowMenuId]);

  const handleOpenFilters = () => {
    setDraftFilters(appliedFilters);
    setIsFilterOpen(true);
  };

  const handleDraftFilterChange = (field) => (event) => {
    setDraftFilters((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    const clearedFilters = {
      status: "",
      productType: "",
    };

    setDraftFilters(clearedFilters);
    setAppliedFilters(clearedFilters);
    setIsFilterOpen(false);
  };

  const handleToggleRowMenu = (transactionId) => {
    setOpenRowMenuId((current) => (current === transactionId ? null : transactionId));
  };

  const handleDeleteRow = async (transactionId) => {
    const didDelete = await onDeleteTransaction(transactionId);
    if (didDelete) {
      setOpenRowMenuId(null);
    }
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.transactions}</h1>

        <div className="dashboard-card__toolbar">
          <div className="dashboard-filter" ref={filterRef}>
            <button
              className={`dashboard-card__tool ${hasActiveFilters ? "dashboard-card__tool--active" : ""}`}
              type="button"
              onClick={handleOpenFilters}
            >
              <img src={dashboardIcons.filter} alt="" aria-hidden="true" />
              <span>{dashboardText.toolbar.filter}</span>
            </button>

            {isFilterOpen ? (
              <div className="dashboard-filter__panel" role="dialog" aria-label={dashboardText.toolbar.filter}>
                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.statusLabel}</span>
                  <select value={draftFilters.status} onChange={handleDraftFilterChange("status")}>
                    <option value="">{dashboardText.filters.allStatuses}</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {getDashboardStatusLabel(status, dashboardText.status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.productLabel}</span>
                  <select value={draftFilters.productType} onChange={handleDraftFilterChange("productType")}>
                    <option value="">{dashboardText.filters.allProducts}</option>
                    {productOptions.map((productType) => (
                      <option key={productType} value={productType}>
                        {productType}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="dashboard-filter__actions">
                  <button className="dashboard-filter__button dashboard-filter__button--ghost" type="button" onClick={handleResetFilters}>
                    {dashboardText.filters.reset}
                  </button>
                  <button className="dashboard-filter__button" type="button" onClick={handleApplyFilters}>
                    {dashboardText.filters.apply}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <button className="dashboard-card__tool dashboard-card__tool--primary" type="button" onClick={onCreateTransaction}>
            <img src={dashboardIcons.plus} alt="" aria-hidden="true" />
            <span>{dashboardText.toolbar.newOrder}</span>
          </button>
        </div>
      </div>

      {deleteErrorMessage ? (
        <p className="dashboard-card__feedback dashboard-card__feedback--error" role="alert">
          {deleteErrorMessage}
        </p>
      ) : null}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th>{dashboardText.columns.productType}</th>
              <th>{dashboardText.columns.quantity}</th>
              <th>{dashboardText.columns.total}</th>
              <th>{dashboardText.columns.paid}</th>
              <th>{dashboardText.columns.debt}</th>
              <th>{dashboardText.columns.status}</th>
              <th className="dashboard-table__actions-column" />
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="8">
                  {dashboardText.loading.transactions}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="8">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visibleTransactions.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="8">
                  {dashboardText.empty.transactions}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visibleTransactions.map((transaction, index) => {
                  const openMenuUpward = index >= visibleTransactions.length - 2;

                  return (
                    <tr key={transaction.id}>
                      <td className="dashboard-table__index-cell">{index + 1}</td>
                      <td>{transaction.product_type}</td>
                      <td>{formatDashboardNumber(transaction.quantity, currentLanguage)}</td>
                      <td>{formatDashboardNumber(transaction.total, currentLanguage)}</td>
                      <td>{formatDashboardNumber(transaction.paid, currentLanguage)}</td>
                      <td>{formatDashboardNumber(transaction.debt, currentLanguage)}</td>
                      <td>
                        <span className={`dashboard-status dashboard-status--${toStatusClassName(transaction.status)}`}>
                          {getDashboardStatusLabel(transaction.status, dashboardText.status)}
                        </span>
                      </td>
                      <td className="dashboard-table__actions-cell">
                        <div className="dashboard-table__row-actions">
                          <button
                            className="dashboard-table__row-menu"
                            type="button"
                            onClick={() => handleToggleRowMenu(transaction.id)}
                            aria-label={dashboardText.rowMenu.moreActions}
                            aria-expanded={openRowMenuId === transaction.id}
                          >
                            <span />
                            <span />
                            <span />
                          </button>

                          {openRowMenuId === transaction.id ? (
                            <div
                              className={`dashboard-table__row-menu-panel ${openMenuUpward ? "dashboard-table__row-menu-panel--upward" : ""}`}
                            >
                              <button
                                className="dashboard-table__row-menu-action"
                                type="button"
                                disabled={transaction.status !== "pending" || deletingTransactionId === transaction.id}
                                onClick={() => handleDeleteRow(transaction.id)}
                              >
                                {dashboardText.rowMenu.delete}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DashboardCreateTransactionModal({
  currentLanguage,
  dashboardText,
  form,
  productOptionsState,
  errorMessage,
  isSubmitting,
  onClose,
  onFieldChange,
  onSubmit,
}) {
  const isSubmitDisabled =
    isSubmitting || productOptionsState.isLoading || productOptionsState.data.length === 0;
  const selectedProduct = productOptionsState.data.find(
    (product) => String(product.product_id) === String(form.productId),
  );

  return (
    <div
      className="modal-overlay dashboard-modal-overlay"
      onClick={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="modal-content dashboard-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{dashboardText.modal.title}</h2>
          <button className="modal-close" onClick={onClose} type="button" disabled={isSubmitting}>
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="modal-body">
            <div className="modal-section">
              <label className="modal-label" htmlFor="dashboard-product-id">
                {dashboardText.modal.productLabel}
              </label>
              <select
                id="dashboard-product-id"
                className="modal-input dashboard-modal__select"
                value={form.productId}
                onChange={onFieldChange("productId")}
                disabled={productOptionsState.isLoading || isSubmitting}
              >
                <option value="">{dashboardText.modal.productPlaceholder}</option>
                {productOptionsState.data.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {`${product.product_type} — ${formatDashboardNumber(product.price, currentLanguage)} դր/կգ`}
                  </option>
                ))}
              </select>
              {selectedProduct ? (
                <p className="dashboard-modal__helper">
                  {`${dashboardText.columns.price}: ${formatDashboardNumber(selectedProduct.price, currentLanguage)} դր/կգ`}
                </p>
              ) : null}
            </div>

            <div className="modal-section">
              <label className="modal-label" htmlFor="dashboard-quantity">
                {dashboardText.modal.quantityLabel}
              </label>
              <input
                id="dashboard-quantity"
                className="modal-input"
                type="number"
                min={USER_TRANSACTION_MIN_QUANTITY}
                step="any"
                placeholder={dashboardText.modal.quantityPlaceholder}
                value={form.quantity}
                onChange={onFieldChange("quantity")}
                disabled={isSubmitting}
              />
            </div>

            {productOptionsState.isLoading ? (
              <p className="dashboard-modal__helper">{dashboardText.modal.loadingProducts}</p>
            ) : null}

            {!productOptionsState.isLoading && productOptionsState.error ? (
              <p className="dashboard-modal__feedback dashboard-modal__feedback--error" role="alert">
                {productOptionsState.error}
              </p>
            ) : null}

            {!productOptionsState.isLoading &&
            !productOptionsState.error &&
            productOptionsState.data.length === 0 ? (
              <p className="dashboard-modal__helper">{dashboardText.modal.noProducts}</p>
            ) : null}

            {errorMessage ? (
              <p className="dashboard-modal__feedback dashboard-modal__feedback--error" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <div className="modal-footer dashboard-modal__footer">
            <button className="button button--ghost dashboard-modal__button dashboard-modal__button--ghost" onClick={onClose} type="button" disabled={isSubmitting}>
              {dashboardText.modal.cancel}
            </button>
            <button className="button button--solid dashboard-modal__button" type="submit" disabled={isSubmitDisabled}>
              {isSubmitting ? dashboardText.modal.creating : dashboardText.modal.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DashboardFinancesSection({ currentLanguage, dashboardText, searchValue, state, onCreateTransaction }) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [appliedProductFilter, setAppliedProductFilter] = React.useState("");
  const [draftProductFilter, setDraftProductFilter] = React.useState("");
  const filterRef = React.useRef(null);
  const summaries = Array.isArray(state.data) ? state.data : [];
  const overallTotals = React.useMemo(
    () =>
      summaries.reduce(
        (totals, summary) => ({
          total: totals.total + Number(summary.total || 0),
          paid: totals.paid + Number(summary.paid || 0),
          debt: totals.debt + Number(summary.debt || 0),
        }),
        { total: 0, paid: 0, debt: 0 },
      ),
    [summaries],
  );
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const productOptions = React.useMemo(
    () =>
      [...new Set(summaries.map((summary) => summary.product_type).filter(Boolean))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [summaries],
  );
  const filteredSummaries = React.useMemo(
    () =>
      summaries.filter((summary) => {
        if (appliedProductFilter && summary.product_type !== appliedProductFilter) {
          return false;
        }

        return true;
      }),
    [appliedProductFilter, summaries],
  );
  const visibleSummaries = React.useMemo(
    () =>
      filteredSummaries.filter((summary, index) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          String(index + 1),
          summary.product_type,
          formatDashboardNumber(summary.quantity, currentLanguage),
          formatDashboardNumber(summary.total, currentLanguage),
          formatDashboardNumber(summary.paid, currentLanguage),
          formatDashboardNumber(summary.debt, currentLanguage),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [currentLanguage, filteredSummaries, normalizedSearchValue],
  );
  const hasActiveFilters = Boolean(appliedProductFilter);

  React.useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isFilterOpen]);

  const handleOpenFilters = () => {
    setDraftProductFilter(appliedProductFilter);
    setIsFilterOpen(true);
  };

  const handleApplyFilters = () => {
    setAppliedProductFilter(draftProductFilter);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    setDraftProductFilter("");
    setAppliedProductFilter("");
    setIsFilterOpen(false);
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.finances}</h1>

        <div className="dashboard-card__toolbar">
          <div className="dashboard-filter" ref={filterRef}>
            <button
              className={`dashboard-card__tool ${hasActiveFilters ? "dashboard-card__tool--active" : ""}`}
              type="button"
              onClick={handleOpenFilters}
            >
              <img src={dashboardIcons.filter} alt="" aria-hidden="true" />
              <span>{dashboardText.toolbar.filter}</span>
            </button>

            {isFilterOpen ? (
              <div className="dashboard-filter__panel" role="dialog" aria-label={dashboardText.toolbar.filter}>
                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.productLabel}</span>
                  <select value={draftProductFilter} onChange={(event) => setDraftProductFilter(event.target.value)}>
                    <option value="">{dashboardText.filters.allProducts}</option>
                    {productOptions.map((productType) => (
                      <option key={productType} value={productType}>
                        {productType}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="dashboard-filter__actions">
                  <button className="dashboard-filter__button dashboard-filter__button--ghost" type="button" onClick={handleResetFilters}>
                    {dashboardText.filters.reset}
                  </button>
                  <button className="dashboard-filter__button" type="button" onClick={handleApplyFilters}>
                    {dashboardText.filters.apply}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <button className="dashboard-card__tool dashboard-card__tool--primary" type="button" onClick={onCreateTransaction}>
            <img src={dashboardIcons.plus} alt="" aria-hidden="true" />
            <span>{dashboardText.toolbar.newOrder}</span>
          </button>
        </div>
      </div>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th>{dashboardText.columns.productType}</th>
              <th>{dashboardText.columns.quantity}</th>
              <th>{dashboardText.columns.total}</th>
              <th>{dashboardText.columns.paid}</th>
              <th>{dashboardText.columns.debt}</th>
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="6">
                  {dashboardText.loading.finances}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="6">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visibleSummaries.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="6">
                  {dashboardText.empty.finances}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visibleSummaries.map((summary, index) => (
                  <tr key={`${summary.product_id}-${summary.product_type}`}>
                    <td className="dashboard-table__index-cell">{index + 1}</td>
                    <td>{summary.product_type}</td>
                    <td>{formatDashboardNumber(summary.quantity, currentLanguage)}</td>
                    <td>{formatDashboardNumber(summary.total, currentLanguage)}</td>
                    <td>{formatDashboardNumber(summary.paid, currentLanguage)}</td>
                    <td>{formatDashboardNumber(summary.debt, currentLanguage)}</td>
                  </tr>
                ))
              : null}
          </tbody>
          {!state.isLoading && !state.error && summaries.length > 0 ? (
            <tfoot>
              <tr className="dashboard-table__summary-row">
                <td className="dashboard-table__summary-label" colSpan="3">
                  {dashboardText.summaryRows.overall}
                </td>
                <td>{formatDashboardNumber(overallTotals.total, currentLanguage)}</td>
                <td>{formatDashboardNumber(overallTotals.paid, currentLanguage)}</td>
                <td>{formatDashboardNumber(overallTotals.debt, currentLanguage)}</td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </section>
  );
}

function AdminDashboardPage({ currentLanguage, onLanguageSelect }) {
  const location = useLocation();
  const navigate = useNavigate();
  const session = getStoredAuthSession();
  const dashboardText = dashboardTranslations[currentLanguage];
  const activeSection = getAdminDashboardSection(location.pathname);
  const accessToken = session?.accessToken;
  const tokenType = session?.tokenType;
  const userRole = session?.role;
  const authenticatedSession = accessToken
    ? {
        accessToken,
        tokenType,
        role: userRole,
      }
    : null;
  const [searchValue, setSearchValue] = React.useState("");
  const [profile, setProfile] = React.useState({ name: "", email: "" });
  const [transactionsState, setTransactionsState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [productsState, setProductsState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [tourismState, setTourismState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [adminFinancesState, setAdminFinancesState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [partnersState, setPartnersState] = React.useState({
    data: null,
    isLoading: false,
    error: "",
  });
  const [transactionActionError, setTransactionActionError] = React.useState("");
  const [productActionError, setProductActionError] = React.useState("");
  const [bookingActionError, setBookingActionError] = React.useState("");
  const [isCreateProductOpen, setIsCreateProductOpen] = React.useState(false);
  const [createProductForm, setCreateProductForm] = React.useState({
    productType: "",
    quantity: "",
    price: "",
  });
  const [createProductError, setCreateProductError] = React.useState("");
  const [isCreatingProduct, setIsCreatingProduct] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [logoutError, setLogoutError] = React.useState("");
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const settingsRef = React.useRef(null);

  React.useEffect(() => {
    setSearchValue("");
    setTransactionActionError("");
    setProductActionError("");
    setBookingActionError("");
  }, [activeSection]);

  React.useEffect(() => {
    if (!isSettingsOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!settingsRef.current?.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isSettingsOpen]);

  React.useEffect(() => {
    if (!accessToken || userRole !== "admin" || activeSection !== "transactions" || transactionsState.data !== null) {
      return undefined;
    }

    const controller = new AbortController();

    setTransactionsState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/admin/transactions", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile({
          name: payload?.admin_name || "",
          email: payload?.admin_email || "",
        });
        setTransactionsState({
          data: Array.isArray(payload?.transactions) ? payload.transactions : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        if (error.status === 403) {
          navigate("/dashboard/transactions", { replace: true });
          return;
        }

        setTransactionsState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.transactions),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    accessToken,
    activeSection,
    dashboardText.errors.transactions,
    navigate,
    tokenType,
    transactionsState.data,
    userRole,
  ]);

  React.useEffect(() => {
    if (!accessToken || userRole !== "admin" || activeSection !== "products" || productsState.data !== null) {
      return undefined;
    }

    const controller = new AbortController();

    setProductsState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/admin/products", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile((current) => ({
          name: payload?.admin_name || current.name || "",
          email: payload?.admin_email || current.email || "",
        }));
        setProductsState({
          data: Array.isArray(payload?.products) ? payload.products : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        if (error.status === 403) {
          navigate("/dashboard/transactions", { replace: true });
          return;
        }

        setProductsState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.products),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    accessToken,
    activeSection,
    dashboardText.errors.products,
    navigate,
    productsState.data,
    tokenType,
    userRole,
  ]);

  React.useEffect(() => {
    if (!accessToken || userRole !== "admin" || activeSection !== "tourism" || tourismState.data !== null) {
      return undefined;
    }

    const controller = new AbortController();

    setTourismState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/admin/tourism", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile((current) => ({
          name: payload?.admin_name || current.name || "",
          email: payload?.admin_email || current.email || "",
        }));
        setTourismState({
          data: Array.isArray(payload?.booked_users) ? payload.booked_users : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        if (error.status === 403) {
          navigate("/dashboard/transactions", { replace: true });
          return;
        }

        setTourismState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.tourism),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    accessToken,
    activeSection,
    dashboardText.errors.tourism,
    navigate,
    tokenType,
    tourismState.data,
    userRole,
  ]);

  React.useEffect(() => {
    if (
      !accessToken ||
      userRole !== "admin" ||
      activeSection !== "finances" ||
      adminFinancesState.data !== null
    ) {
      return undefined;
    }

    const controller = new AbortController();

    setAdminFinancesState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/admin/finances", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile((current) => ({
          name: payload?.admin_name || current.name || "",
          email: payload?.admin_email || current.email || "",
        }));
        setAdminFinancesState({
          data: Array.isArray(payload?.summaries) ? payload.summaries : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        if (error.status === 403) {
          navigate("/dashboard/transactions", { replace: true });
          return;
        }

        setAdminFinancesState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.finances),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    accessToken,
    activeSection,
    adminFinancesState.data,
    dashboardText.errors.finances,
    navigate,
    tokenType,
    userRole,
  ]);

  React.useEffect(() => {
    if (!accessToken || userRole !== "admin" || activeSection !== "partners" || partnersState.data !== null) {
      return undefined;
    }

    const controller = new AbortController();

    setPartnersState((current) => ({
      data: current.data,
      isLoading: true,
      error: "",
    }));

    fetchAuthenticatedJson("/greencore/admin/partners", authenticatedSession, controller.signal)
      .then((payload) => {
        if (controller.signal.aborted) {
          return;
        }

        setProfile((current) => ({
          name: payload?.admin_name || current.name || "",
          email: payload?.admin_email || current.email || "",
        }));
        setPartnersState({
          data: Array.isArray(payload?.partners) ? payload.partners : [],
          isLoading: false,
          error: "",
        });
      })
      .catch((error) => {
        if (controller.signal.aborted || error?.name === "AbortError") {
          return;
        }

        if (error.status === 401) {
          clearStoredAuthSession();
          navigate("/login", { replace: true });
          return;
        }

        if (error.status === 403) {
          navigate("/dashboard/transactions", { replace: true });
          return;
        }

        setPartnersState({
          data: [],
          isLoading: false,
          error: resolveDashboardError(error, currentLanguage, dashboardText.errors.partners),
        });
      });

    return () => {
      controller.abort();
    };
  }, [
    accessToken,
    activeSection,
    dashboardText.errors.partners,
    navigate,
    partnersState.data,
    tokenType,
    userRole,
  ]);

  React.useEffect(() => {
    if (activeSection === "products") {
      return;
    }

    setIsCreateProductOpen(false);
    setCreateProductError("");
  }, [activeSection]);

  const handleUpdateAdminTransaction = async (transactionId, updates) => {
    setTransactionActionError("");

    try {
      const updatedTransaction = await fetchAuthenticatedJson(
        `/greencore/admin/transactions/${transactionId}`,
        authenticatedSession,
        undefined,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        },
      );

      setTransactionsState((current) => ({
        data: Array.isArray(current.data)
          ? current.data.map((transaction) =>
              transaction.transaction_id === transactionId ? updatedTransaction : transaction,
            )
          : current.data,
        isLoading: false,
        error: "",
      }));

      return updatedTransaction;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate(error.status === 403 ? "/dashboard/transactions" : "/login", { replace: true });
        return null;
      }

      setTransactionActionError(resolveDashboardError(error, currentLanguage, dashboardText.errors.updateTransaction));
      return null;
    }
  };

  const handleUpdateAdminProduct = async (productId, updates) => {
    setProductActionError("");

    try {
      const updatedProduct = await fetchAuthenticatedJson(
        `/greencore/admin/products/${productId}`,
        authenticatedSession,
        undefined,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updates),
        },
      );

      setProductsState((current) => ({
        data: Array.isArray(current.data)
          ? current.data.map((product) => (product.product_id === productId ? updatedProduct : product))
          : current.data,
        isLoading: false,
        error: "",
      }));

      return updatedProduct;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate(error.status === 403 ? "/dashboard/transactions" : "/login", { replace: true });
        return null;
      }

      setProductActionError(resolveDashboardError(error, currentLanguage, dashboardText.errors.updateProduct));
      return null;
    }
  };

  const handleDeleteAdminProduct = async (productId) => {
    setProductActionError("");

    try {
      await fetchAuthenticatedJson(`/greencore/admin/products/${productId}`, authenticatedSession, undefined, {
        method: "DELETE",
      });

      setProductsState((current) => ({
        data: Array.isArray(current.data)
          ? current.data.filter((product) => product.product_id !== productId)
          : current.data,
        isLoading: false,
        error: "",
      }));

      return true;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate(error.status === 403 ? "/dashboard/transactions" : "/login", { replace: true });
        return false;
      }

      setProductActionError(resolveDashboardError(error, currentLanguage, dashboardText.errors.deleteProduct));
      return false;
    }
  };

  const handleDeleteAdminBooking = async (bookingId) => {
    setBookingActionError("");

    try {
      await fetchAuthenticatedJson(`/greencore/admin/book/${bookingId}`, authenticatedSession, undefined, {
        method: "DELETE",
      });

      setTourismState((current) => ({
        data: Array.isArray(current.data)
          ? current.data.filter((booking) => booking.id !== bookingId)
          : current.data,
        isLoading: false,
        error: "",
      }));

      return true;
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate(error.status === 403 ? "/dashboard/transactions" : "/login", { replace: true });
        return false;
      }

      setBookingActionError(resolveDashboardError(error, currentLanguage, dashboardText.errors.deleteBooking));
      return false;
    }
  };

  const handleOpenCreateProductModal = () => {
    setCreateProductForm({
      productType: "",
      quantity: "",
      price: "",
    });
    setCreateProductError("");
    setProductActionError("");
    setIsCreateProductOpen(true);
  };

  const handleCloseCreateProductModal = () => {
    if (isCreatingProduct) {
      return;
    }

    setIsCreateProductOpen(false);
    setCreateProductError("");
  };

  const handleCreateProductFieldChange = (field) => (event) => {
    setCreateProductForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleCreateProductSubmit = async (event) => {
    event.preventDefault();

    const trimmedProductType = createProductForm.productType.trim();
    const trimmedQuantity = String(createProductForm.quantity || "").trim();
    const trimmedPrice = String(createProductForm.price || "").trim();
    const quantity = Number(trimmedQuantity);
    const price = Number(trimmedPrice);

    if (!trimmedProductType) {
      setCreateProductError(dashboardText.errors.productNameRequired);
      return;
    }

    if (!trimmedQuantity || !Number.isFinite(quantity) || quantity < 0) {
      setCreateProductError(dashboardText.errors.quantityRequired);
      return;
    }

    if (!trimmedPrice || !Number.isFinite(price) || price < 0) {
      setCreateProductError(dashboardText.errors.priceRequired);
      return;
    }

    setCreateProductError("");
    setIsCreatingProduct(true);

    try {
      const createdProduct = await fetchAuthenticatedJson(
        "/greencore/admin/products",
        authenticatedSession,
        undefined,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_type: trimmedProductType,
            quantity,
            price,
          }),
        },
      );

      setProductsState((current) => ({
        data: [...(Array.isArray(current.data) ? current.data : []), createdProduct].sort(
          (left, right) => left.product_id - right.product_id,
        ),
        isLoading: false,
        error: "",
      }));
      setIsCreateProductOpen(false);
      setCreateProductForm({
        productType: "",
        quantity: "",
        price: "",
      });
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate(error.status === 403 ? "/dashboard/transactions" : "/login", { replace: true });
        return;
      }

      setCreateProductError(resolveDashboardError(error, currentLanguage, dashboardText.errors.createProduct));
    } finally {
      setIsCreatingProduct(false);
    }
  };

  const handleLogout = async () => {
    setLogoutError("");
    setIsLoggingOut(true);

    try {
      await fetchAuthenticatedJson("/greencore/logout", authenticatedSession, undefined, {
        method: "POST",
      });
      clearStoredAuthSession();
      navigate("/login", { replace: true });
    } catch (error) {
      if (error.status === 401 || error.status === 403) {
        clearStoredAuthSession();
        navigate("/login", { replace: true });
        return;
      }

      setLogoutError(resolveDashboardError(error, currentLanguage, dashboardText.errors.logout));
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!session?.accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (session.role === "user") {
    return <Navigate to="/dashboard/transactions" replace />;
  }

  if (session.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  if (!activeSection) {
    return <Navigate to="/dashboard/admin/transactions" replace />;
  }

  let content = null;

  if (activeSection === "transactions") {
    content = (
      <AdminDashboardTransactionsSection
        currentLanguage={currentLanguage}
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={transactionsState}
        errorMessage={transactionActionError}
        onUpdateTransaction={handleUpdateAdminTransaction}
      />
    );
  } else if (activeSection === "products") {
    content = (
      <AdminDashboardProductsSection
        currentLanguage={currentLanguage}
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={productsState}
        errorMessage={productActionError}
        onCreateProduct={handleOpenCreateProductModal}
        onDeleteProduct={handleDeleteAdminProduct}
        onUpdateProduct={handleUpdateAdminProduct}
      />
    );
  } else if (activeSection === "tourism") {
    content = (
      <AdminDashboardTourismSection
        currentLanguage={currentLanguage}
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={tourismState}
        errorMessage={bookingActionError}
        onDeleteBooking={handleDeleteAdminBooking}
      />
    );
  } else if (activeSection === "finances") {
    content = (
      <AdminDashboardFinancesSection
        currentLanguage={currentLanguage}
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={adminFinancesState}
      />
    );
  } else if (activeSection === "partners") {
    content = (
      <AdminDashboardPartnersSection
        dashboardText={dashboardText}
        searchValue={searchValue}
        state={partnersState}
      />
    );
  }

  const displayName = profile.name || "";
  const displayEmail = profile.email || "";

  return (
    <main className="dashboard-page">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-sidebar__brand" to="/">
          GREEN CORE
        </Link>

        <nav className="dashboard-sidebar__nav" aria-label="Dashboard navigation">
          <Link
            className={`dashboard-sidebar__item ${activeSection === "transactions" ? "is-active" : ""}`}
            to="/dashboard/admin/transactions"
          >
            <img src={dashboardIcons.adminTransactions} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.transactions}</span>
          </Link>

          <Link
            className={`dashboard-sidebar__item ${activeSection === "products" ? "is-active" : ""}`}
            to="/dashboard/admin/products"
          >
            <img src={dashboardIcons.adminProducts} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.harvestStorage}</span>
          </Link>

          <Link
            className={`dashboard-sidebar__item ${activeSection === "tourism" ? "is-active" : ""}`}
            to="/dashboard/admin/tourism"
          >
            <img src={dashboardIcons.adminTourism} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.tourism}</span>
          </Link>

          <Link
            className={`dashboard-sidebar__item ${activeSection === "finances" ? "is-active" : ""}`}
            to="/dashboard/admin/finances"
          >
            <img src={dashboardIcons.finances} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.finances}</span>
          </Link>

          <Link
            className={`dashboard-sidebar__item ${activeSection === "partners" ? "is-active" : ""}`}
            to="/dashboard/admin/partners"
          >
            <img src={dashboardIcons.adminPartners} alt="" aria-hidden="true" />
            <span>{dashboardText.sections.partners}</span>
          </Link>

          <div className="dashboard-sidebar__settings" ref={settingsRef}>
            <button
              className={`dashboard-sidebar__item ${isSettingsOpen ? "is-active" : ""}`}
              type="button"
              onClick={() => setIsSettingsOpen((current) => !current)}
              aria-expanded={isSettingsOpen}
            >
              <img src={dashboardIcons.settings} alt="" aria-hidden="true" />
              <span>{dashboardText.sections.settings}</span>
            </button>

            {isSettingsOpen ? (
              <div className="dashboard-sidebar__settings-panel" role="dialog" aria-label={dashboardText.sections.settings}>
                <div className="dashboard-sidebar__settings-options">
                  {SUPPORTED_LANGUAGES.map((language) => (
                    <button
                      key={language}
                      className={`dashboard-sidebar__language-option ${currentLanguage === language ? "is-active" : ""}`}
                      type="button"
                      onClick={() => {
                        onLanguageSelect(language);
                        setIsSettingsOpen(false);
                      }}
                    >
                      {language}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </nav>

        {logoutError ? (
          <p className="dashboard-sidebar__feedback dashboard-sidebar__feedback--error" role="alert">
            {logoutError}
          </p>
        ) : null}

        <button className="dashboard-sidebar__logout" onClick={handleLogout} type="button" disabled={isLoggingOut}>
          <img src={dashboardIcons.logout} alt="" aria-hidden="true" />
          <span>{isLoggingOut ? dashboardText.sections.loggingOut : dashboardText.sections.logout}</span>
        </button>
      </aside>

      <section className="dashboard-shell">
        <header className="dashboard-shell__topbar">
          <label className="dashboard-search" htmlFor="admin-dashboard-search">
            <img src={dashboardIcons.search} alt="" aria-hidden="true" />
            <input
              id="admin-dashboard-search"
              type="search"
              placeholder={dashboardText.searchPlaceholder}
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </label>

          <div className="dashboard-shell__profile">
            <div className="dashboard-shell__user">
              <strong>{displayName}</strong>
              <span>{displayEmail}</span>
            </div>

            <div className="dashboard-shell__avatar" aria-hidden="true">
              {getAvatarInitial(displayName)}
            </div>
          </div>
        </header>

        {content}
      </section>

      {isCreateProductOpen ? (
        <AdminDashboardProductModal
          dashboardText={dashboardText}
          form={createProductForm}
          errorMessage={createProductError}
          isSubmitting={isCreatingProduct}
          onClose={handleCloseCreateProductModal}
          onFieldChange={handleCreateProductFieldChange}
          onSubmit={handleCreateProductSubmit}
        />
      ) : null}
    </main>
  );
}

function AdminDashboardTransactionsSection({
  currentLanguage,
  dashboardText,
  searchValue,
  state,
  errorMessage,
  onUpdateTransaction,
}) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [appliedFilters, setAppliedFilters] = React.useState({
    status: "",
    productType: "",
    companyName: "",
  });
  const [draftFilters, setDraftFilters] = React.useState({
    status: "",
    productType: "",
    companyName: "",
  });
  const [openRowMenuId, setOpenRowMenuId] = React.useState(null);
  const [editingPaidId, setEditingPaidId] = React.useState(null);
  const [paidDraft, setPaidDraft] = React.useState("");
  const [editingStatusId, setEditingStatusId] = React.useState(null);
  const [localErrorMessage, setLocalErrorMessage] = React.useState("");
  const filterRef = React.useRef(null);
  const transactions = Array.isArray(state.data) ? state.data : [];
  const statusOptions = React.useMemo(
    () => ADMIN_TRANSACTION_STATUS_OPTIONS.filter((status) => transactions.some((transaction) => transaction.status === status)),
    [transactions],
  );
  const productOptions = React.useMemo(
    () =>
      [...new Set(transactions.map((transaction) => transaction.product_type).filter(Boolean))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [transactions],
  );
  const companyOptions = React.useMemo(
    () =>
      [...new Set(transactions.map((transaction) => transaction.company_name).filter(Boolean))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [transactions],
  );
  const filteredTransactions = React.useMemo(
    () =>
      transactions.filter((transaction) => {
        if (appliedFilters.status && transaction.status !== appliedFilters.status) {
          return false;
        }

        if (appliedFilters.productType && transaction.product_type !== appliedFilters.productType) {
          return false;
        }

        if (appliedFilters.companyName && transaction.company_name !== appliedFilters.companyName) {
          return false;
        }

        return true;
      }),
    [appliedFilters.companyName, appliedFilters.productType, appliedFilters.status, transactions],
  );
  const summaryTransactions = React.useMemo(
    () =>
      filteredTransactions.reduce(
        (totals, transaction) => ({
          total: totals.total + Number(transaction.total || 0),
          paid: totals.paid + Number(transaction.paid || 0),
          debt: totals.debt + Number(transaction.debt || 0),
        }),
        { total: 0, paid: 0, debt: 0 },
      ),
    [filteredTransactions],
  );
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const visibleTransactions = React.useMemo(
    () =>
      filteredTransactions.filter((transaction) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          transaction.company_name,
          transaction.user_name,
          transaction.product_type,
          formatDashboardNumber(transaction.quantity, currentLanguage),
          formatDashboardNumber(transaction.total, currentLanguage),
          formatDashboardNumber(transaction.paid, currentLanguage),
          formatDashboardNumber(transaction.debt, currentLanguage),
          getDashboardStatusLabel(transaction.status, dashboardText.status),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [currentLanguage, dashboardText.status, filteredTransactions, normalizedSearchValue],
  );
  const hasActiveFilters = Boolean(
    appliedFilters.status || appliedFilters.productType || appliedFilters.companyName,
  );
  const feedbackMessage = localErrorMessage || errorMessage;

  React.useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isFilterOpen]);

  React.useEffect(() => {
    if (openRowMenuId === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!event.target.closest(".dashboard-table__row-actions")) {
        setOpenRowMenuId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openRowMenuId]);

  const handleStartPaidEdit = (transaction) => {
    setLocalErrorMessage("");
    setEditingStatusId(null);
    setOpenRowMenuId(null);
    setEditingPaidId(transaction.transaction_id);
    setPaidDraft(String(transaction.paid ?? ""));
  };

  const handleCancelPaidEdit = () => {
    setEditingPaidId(null);
    setPaidDraft("");
    setLocalErrorMessage("");
  };

  const handleSavePaidEdit = async (transaction) => {
    const paidValue = Number(paidDraft);

    if (!Number.isFinite(paidValue) || paidValue < 0) {
      setLocalErrorMessage(dashboardText.errors.paidRequired);
      return;
    }

    const updatedTransaction = await onUpdateTransaction(transaction.transaction_id, {
      paid: paidValue,
    });

    if (updatedTransaction) {
      setEditingPaidId(null);
      setPaidDraft("");
      setLocalErrorMessage("");
    }
  };

  const handleStatusChange = async (transaction, nextStatus) => {
    if (!nextStatus || nextStatus === transaction.status) {
      setEditingStatusId(null);
      return;
    }

    const updatedTransaction = await onUpdateTransaction(transaction.transaction_id, {
      status: nextStatus,
    });

    if (updatedTransaction) {
      setLocalErrorMessage("");
    }

    setEditingStatusId(null);
  };

  const handleToggleRowMenu = (transactionId) => {
    setEditingStatusId(null);
    setLocalErrorMessage("");
    setOpenRowMenuId((current) => (current === transactionId ? null : transactionId));
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.transactions}</h1>

        <div className="dashboard-card__toolbar">
          <div className="dashboard-filter" ref={filterRef}>
            <button
              className={`dashboard-card__tool ${hasActiveFilters ? "dashboard-card__tool--active" : ""}`}
              type="button"
              onClick={() => {
                setDraftFilters(appliedFilters);
                setIsFilterOpen(true);
              }}
            >
              <img src={dashboardIcons.filter} alt="" aria-hidden="true" />
              <span>{dashboardText.toolbar.filter}</span>
            </button>

            {isFilterOpen ? (
              <div className="dashboard-filter__panel" role="dialog" aria-label={dashboardText.toolbar.filter}>
                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.statusLabel}</span>
                  <select value={draftFilters.status} onChange={(event) => setDraftFilters((current) => ({ ...current, status: event.target.value }))}>
                    <option value="">{dashboardText.filters.allStatuses}</option>
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {getDashboardStatusLabel(status, dashboardText.status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.productLabel}</span>
                  <select value={draftFilters.productType} onChange={(event) => setDraftFilters((current) => ({ ...current, productType: event.target.value }))}>
                    <option value="">{dashboardText.filters.allProducts}</option>
                    {productOptions.map((productType) => (
                      <option key={productType} value={productType}>
                        {productType}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.companyLabel}</span>
                  <select value={draftFilters.companyName} onChange={(event) => setDraftFilters((current) => ({ ...current, companyName: event.target.value }))}>
                    <option value="">{dashboardText.filters.allCompanies}</option>
                    {companyOptions.map((companyName) => (
                      <option key={companyName} value={companyName}>
                        {companyName}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="dashboard-filter__actions">
                  <button
                    className="dashboard-filter__button dashboard-filter__button--ghost"
                    type="button"
                    onClick={() => {
                      const clearedFilters = {
                        status: "",
                        productType: "",
                        companyName: "",
                      };

                      setDraftFilters(clearedFilters);
                      setAppliedFilters(clearedFilters);
                      setIsFilterOpen(false);
                    }}
                  >
                    {dashboardText.filters.reset}
                  </button>
                  <button
                    className="dashboard-filter__button"
                    type="button"
                    onClick={() => {
                      setAppliedFilters(draftFilters);
                      setIsFilterOpen(false);
                    }}
                  >
                    {dashboardText.filters.apply}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {feedbackMessage ? (
        <p className="dashboard-card__feedback dashboard-card__feedback--error" role="alert">
          {feedbackMessage}
        </p>
      ) : null}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table dashboard-table--admin-transactions">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th className="dashboard-table__company-column">{dashboardText.columns.companyName}</th>
              <th className="dashboard-table__user-column">{dashboardText.columns.userName}</th>
              <th className="dashboard-table__product-column">{dashboardText.columns.productType}</th>
              <th className="dashboard-table__numeric-column">{dashboardText.columns.quantity}</th>
              <th className="dashboard-table__numeric-column">{dashboardText.columns.total}</th>
              <th className="dashboard-table__numeric-column">{dashboardText.columns.paid}</th>
              <th className="dashboard-table__numeric-column">{dashboardText.columns.debt}</th>
              <th className="dashboard-table__status-column">{dashboardText.columns.status}</th>
              <th className="dashboard-table__actions-column" />
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="10">
                  {dashboardText.loading.transactions}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="10">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visibleTransactions.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="10">
                  {dashboardText.empty.transactions}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visibleTransactions.map((transaction, index) => {
                  const isEditingPaid = editingPaidId === transaction.transaction_id;
                  const isEditingStatus = editingStatusId === transaction.transaction_id;
                  const openMenuUpward = index >= visibleTransactions.length - 2;

                  return (
                    <React.Fragment key={transaction.transaction_id}>
                      <tr className={isEditingPaid ? "dashboard-table__row--expanded" : ""}>
                        <td className="dashboard-table__index-cell">{index + 1}</td>
                        <td className="dashboard-table__text-cell" title={transaction.company_name}>
                          {transaction.company_name}
                        </td>
                        <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={transaction.user_name}>
                          {transaction.user_name}
                        </td>
                        <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={transaction.product_type}>
                          {transaction.product_type}
                        </td>
                        <td>{formatDashboardNumber(transaction.quantity, currentLanguage)}</td>
                        <td>{formatDashboardNumber(transaction.total, currentLanguage)}</td>
                        <td>{formatDashboardNumber(transaction.paid, currentLanguage)}</td>
                        <td>{formatDashboardNumber(transaction.debt, currentLanguage)}</td>
                        <td className="dashboard-table__status-cell">
                          {isEditingStatus ? (
                            <select
                              className="dashboard-table__select"
                              value={transaction.status}
                              onChange={(event) => handleStatusChange(transaction, event.target.value)}
                              onBlur={() => setEditingStatusId(null)}
                              autoFocus
                            >
                              {ADMIN_TRANSACTION_STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {getDashboardStatusLabel(status, dashboardText.status)}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <button
                              className={`dashboard-status dashboard-status--${toStatusClassName(transaction.status)} dashboard-status--button`}
                              type="button"
                              onClick={() => {
                                if (editingPaidId === null) {
                                  setLocalErrorMessage("");
                                  setOpenRowMenuId(null);
                                  setEditingStatusId(transaction.transaction_id);
                                }
                              }}
                              disabled={editingPaidId !== null}
                            >
                              {getDashboardStatusLabel(transaction.status, dashboardText.status)}
                            </button>
                          )}
                        </td>
                        <td className="dashboard-table__actions-cell">
                          <div className="dashboard-table__row-actions">
                            <button
                              className="dashboard-table__row-menu"
                              type="button"
                              onClick={() => handleToggleRowMenu(transaction.transaction_id)}
                              aria-label={dashboardText.rowMenu.moreActions}
                              aria-expanded={openRowMenuId === transaction.transaction_id}
                              disabled={isEditingPaid}
                            >
                              <span />
                              <span />
                              <span />
                            </button>

                            {openRowMenuId === transaction.transaction_id ? (
                              <div
                                className={`dashboard-table__row-menu-panel ${openMenuUpward ? "dashboard-table__row-menu-panel--upward" : ""}`}
                              >
                                <button
                                  className="dashboard-table__row-menu-action dashboard-table__row-menu-action--neutral"
                                  type="button"
                                  onClick={() => handleStartPaidEdit(transaction)}
                                >
                                  {dashboardText.rowMenu.editPaid}
                                </button>
                              </div>
                            ) : null}
                          </div>
                        </td>
                      </tr>

                      {isEditingPaid ? (
                        <tr className="dashboard-table__edit-row">
                          <td colSpan="10">
                            <div className="dashboard-table__edit-panel">
                              <label className="dashboard-table__edit-field">
                                <span>{dashboardText.columns.paid}</span>
                                <input
                                  className="dashboard-table__input"
                                  type="number"
                                  min="0"
                                  step="any"
                                  value={paidDraft}
                                  onChange={(event) => setPaidDraft(event.target.value)}
                                  autoFocus
                                />
                              </label>

                              <div className="dashboard-table__edit-actions">
                                <button
                                  className="dashboard-table__inline-button"
                                  type="button"
                                  onClick={() => handleSavePaidEdit(transaction)}
                                >
                                  {dashboardText.editor.save}
                                </button>
                                <button
                                  className="dashboard-table__inline-button dashboard-table__inline-button--ghost"
                                  type="button"
                                  onClick={handleCancelPaidEdit}
                                >
                                  {dashboardText.editor.cancel}
                                </button>
                              </div>

                              {feedbackMessage ? (
                                <p className="dashboard-table__edit-feedback" role="alert">
                                  {feedbackMessage}
                                </p>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ) : null}
                    </React.Fragment>
                  );
                })
              : null}
          </tbody>
          {!state.isLoading && !state.error && filteredTransactions.length > 0 ? (
            <tfoot>
              <tr className="dashboard-table__summary-row">
                <td className="dashboard-table__summary-label" colSpan="5">
                  {appliedFilters.companyName
                    ? `${appliedFilters.companyName} · ${dashboardText.summaryRows.overall}`
                    : dashboardText.summaryRows.overall}
                </td>
                <td>{formatDashboardNumber(summaryTransactions.total, currentLanguage)}</td>
                <td>{formatDashboardNumber(summaryTransactions.paid, currentLanguage)}</td>
                <td>{formatDashboardNumber(summaryTransactions.debt, currentLanguage)}</td>
                <td colSpan="2" />
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </section>
  );
}

function AdminDashboardProductsSection({
  currentLanguage,
  dashboardText,
  searchValue,
  state,
  errorMessage,
  onCreateProduct,
  onDeleteProduct,
  onUpdateProduct,
}) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [appliedProductFilter, setAppliedProductFilter] = React.useState("");
  const [draftProductFilter, setDraftProductFilter] = React.useState("");
  const [openRowMenuId, setOpenRowMenuId] = React.useState(null);
  const [editingProductId, setEditingProductId] = React.useState(null);
  const [editForm, setEditForm] = React.useState({
    productType: "",
    quantity: "",
    price: "",
  });
  const [localErrorMessage, setLocalErrorMessage] = React.useState("");
  const filterRef = React.useRef(null);
  const products = Array.isArray(state.data) ? state.data : [];
  const productOptions = React.useMemo(
    () =>
      [...new Set(products.map((product) => product.product_type).filter(Boolean))].sort((left, right) =>
        left.localeCompare(right),
      ),
    [products],
  );
  const filteredProducts = React.useMemo(
    () =>
      products.filter((product) => {
        if (appliedProductFilter && product.product_type !== appliedProductFilter) {
          return false;
        }

        return true;
      }),
    [appliedProductFilter, products],
  );
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const visibleProducts = React.useMemo(
    () =>
      filteredProducts.filter((product, index) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          String(index + 1),
          String(product.product_id),
          product.product_type,
          formatDashboardNumber(product.quantity, currentLanguage),
          formatDashboardNumber(product.price, currentLanguage),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [currentLanguage, filteredProducts, normalizedSearchValue],
  );
  const hasActiveFilters = Boolean(appliedProductFilter);
  const feedbackMessage = localErrorMessage || errorMessage;

  React.useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isFilterOpen]);

  React.useEffect(() => {
    if (openRowMenuId === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!event.target.closest(".dashboard-table__row-actions")) {
        setOpenRowMenuId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openRowMenuId]);

  const handleStartEdit = (product) => {
    setLocalErrorMessage("");
    setOpenRowMenuId(null);
    setEditingProductId(product.product_id);
    setEditForm({
      productType: product.product_type,
      quantity: String(product.quantity),
      price: String(product.price),
    });
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setEditForm({
      productType: "",
      quantity: "",
      price: "",
    });
    setLocalErrorMessage("");
  };

  const handleSaveProduct = async (product) => {
    const trimmedProductType = editForm.productType.trim();
    const quantity = Number(editForm.quantity);
    const price = Number(editForm.price);

    if (!trimmedProductType) {
      setLocalErrorMessage(dashboardText.errors.productNameRequired);
      return;
    }

    if (!Number.isFinite(quantity) || quantity < 0) {
      setLocalErrorMessage(dashboardText.errors.quantityRequired);
      return;
    }

    if (!Number.isFinite(price) || price < 0) {
      setLocalErrorMessage(dashboardText.errors.priceRequired);
      return;
    }

    const updates = {};

    if (trimmedProductType !== product.product_type) {
      updates.product_type = trimmedProductType;
    }

    if (quantity !== Number(product.quantity)) {
      updates.quantity = quantity;
    }

    if (price !== Number(product.price)) {
      updates.price = price;
    }

    if (Object.keys(updates).length === 0) {
      handleCancelEdit();
      return;
    }

    const updatedProduct = await onUpdateProduct(product.product_id, updates);

    if (updatedProduct) {
      setEditingProductId(null);
      setEditForm({
        productType: "",
        quantity: "",
        price: "",
      });
      setLocalErrorMessage("");
    }
  };

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.products}</h1>

        <div className="dashboard-card__toolbar">
          <div className="dashboard-filter" ref={filterRef}>
            <button
              className={`dashboard-card__tool ${hasActiveFilters ? "dashboard-card__tool--active" : ""}`}
              type="button"
              onClick={() => {
                setDraftProductFilter(appliedProductFilter);
                setIsFilterOpen(true);
              }}
            >
              <img src={dashboardIcons.filter} alt="" aria-hidden="true" />
              <span>{dashboardText.toolbar.filter}</span>
            </button>

            {isFilterOpen ? (
              <div className="dashboard-filter__panel" role="dialog" aria-label={dashboardText.toolbar.filter}>
                <label className="dashboard-filter__field">
                  <span>{dashboardText.filters.productLabel}</span>
                  <select value={draftProductFilter} onChange={(event) => setDraftProductFilter(event.target.value)}>
                    <option value="">{dashboardText.filters.allProducts}</option>
                    {productOptions.map((productType) => (
                      <option key={productType} value={productType}>
                        {productType}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="dashboard-filter__actions">
                  <button
                    className="dashboard-filter__button dashboard-filter__button--ghost"
                    type="button"
                    onClick={() => {
                      setDraftProductFilter("");
                      setAppliedProductFilter("");
                      setIsFilterOpen(false);
                    }}
                  >
                    {dashboardText.filters.reset}
                  </button>
                  <button
                    className="dashboard-filter__button"
                    type="button"
                    onClick={() => {
                      setAppliedProductFilter(draftProductFilter);
                      setIsFilterOpen(false);
                    }}
                  >
                    {dashboardText.filters.apply}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <button className="dashboard-card__tool dashboard-card__tool--primary" type="button" onClick={onCreateProduct}>
            <img src={dashboardIcons.plus} alt="" aria-hidden="true" />
            <span>{dashboardText.toolbar.addProduct}</span>
          </button>
        </div>
      </div>

      {feedbackMessage ? (
        <p className="dashboard-card__feedback dashboard-card__feedback--error" role="alert">
          {feedbackMessage}
        </p>
      ) : null}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table dashboard-table--admin-products">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th className="dashboard-table__product-column">{dashboardText.columns.productType}</th>
              <th className="dashboard-table__numeric-column">{dashboardText.columns.quantity}</th>
              <th className="dashboard-table__numeric-column">{dashboardText.columns.price}</th>
              <th className="dashboard-table__actions-column" />
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="5">
                  {dashboardText.loading.products}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="5">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visibleProducts.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="5">
                  {dashboardText.empty.products}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visibleProducts.map((product, index) => {
                  const isEditingProduct = editingProductId === product.product_id;
                  const openMenuUpward = index >= visibleProducts.length - 2;

                  return (
                    <tr key={product.product_id}>
                      <td className="dashboard-table__index-cell">{index + 1}</td>
                      <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={product.product_type}>
                        {isEditingProduct ? (
                          <input
                            className="dashboard-table__input"
                            type="text"
                            value={editForm.productType}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                productType: event.target.value,
                              }))
                            }
                            autoFocus
                          />
                        ) : (
                          product.product_type
                        )}
                      </td>
                      <td className="dashboard-table__editable-cell">
                        {isEditingProduct ? (
                          <input
                            className="dashboard-table__input"
                            type="number"
                            min="0"
                            step="any"
                            value={editForm.quantity}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                quantity: event.target.value,
                              }))
                            }
                          />
                        ) : (
                          formatDashboardNumber(product.quantity, currentLanguage)
                        )}
                      </td>
                      <td className="dashboard-table__editable-cell">
                        {isEditingProduct ? (
                          <input
                            className="dashboard-table__input"
                            type="number"
                            min="0"
                            step="any"
                            value={editForm.price}
                            onChange={(event) =>
                              setEditForm((current) => ({
                                ...current,
                                price: event.target.value,
                              }))
                            }
                          />
                        ) : (
                          formatDashboardNumber(product.price, currentLanguage)
                        )}
                      </td>
                      <td className="dashboard-table__actions-cell">
                        {isEditingProduct ? (
                          <div className="dashboard-table__edit-actions">
                            <button
                              className="dashboard-table__inline-button"
                              type="button"
                              onClick={() => handleSaveProduct(product)}
                            >
                              {dashboardText.editor.save}
                            </button>
                            <button
                              className="dashboard-table__inline-button dashboard-table__inline-button--ghost"
                              type="button"
                              onClick={handleCancelEdit}
                            >
                              {dashboardText.editor.cancel}
                            </button>
                          </div>
                        ) : (
                          <div className="dashboard-table__row-actions">
                            <button
                              className="dashboard-table__row-menu"
                              type="button"
                              onClick={() =>
                                setOpenRowMenuId((current) =>
                                  current === product.product_id ? null : product.product_id,
                                )
                              }
                              aria-label={dashboardText.rowMenu.moreActions}
                              aria-expanded={openRowMenuId === product.product_id}
                            >
                              <span />
                              <span />
                              <span />
                            </button>

                            {openRowMenuId === product.product_id ? (
                              <div
                                className={`dashboard-table__row-menu-panel ${openMenuUpward ? "dashboard-table__row-menu-panel--upward" : ""}`}
                              >
                                <button
                                  className="dashboard-table__row-menu-action dashboard-table__row-menu-action--neutral"
                                  type="button"
                                  onClick={() => handleStartEdit(product)}
                                >
                                  {dashboardText.rowMenu.editProduct}
                                </button>
                                <button
                                  className="dashboard-table__row-menu-action"
                                  type="button"
                                  onClick={async () => {
                                    const deleted = await onDeleteProduct(product.product_id);

                                    if (deleted) {
                                      setOpenRowMenuId(null);
                                      setLocalErrorMessage("");
                                    }
                                  }}
                                >
                                  {dashboardText.rowMenu.delete}
                                </button>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminDashboardTourismSection({
  currentLanguage,
  dashboardText,
  searchValue,
  state,
  errorMessage,
  onDeleteBooking,
}) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [appliedVisitDate, setAppliedVisitDate] = React.useState(null);
  const [draftVisitDate, setDraftVisitDate] = React.useState(null);
  const [openRowMenuId, setOpenRowMenuId] = React.useState(null);
  const filterRef = React.useRef(null);
  const bookings = Array.isArray(state.data) ? state.data : [];
  const calendarLocale = dashboardLocales[currentLanguage] || "en-US";
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const filteredBookings = React.useMemo(
    () =>
      bookings.filter((booking) => {
        if (!appliedVisitDate) {
          return true;
        }

        return getLocalDateKey(booking.visit_date) === getLocalDateKey(appliedVisitDate);
      }),
    [appliedVisitDate, bookings],
  );
  const visibleBookings = React.useMemo(
    () =>
      filteredBookings.filter((booking, index) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          String(index + 1),
          booking.name,
          booking.phone,
          formatDashboardDateTime(booking.visit_date, currentLanguage),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [currentLanguage, filteredBookings, normalizedSearchValue],
  );
  const hasActiveFilters = Boolean(appliedVisitDate);

  React.useEffect(() => {
    if (!isFilterOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!filterRef.current?.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isFilterOpen]);

  React.useEffect(() => {
    if (openRowMenuId === null) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!event.target.closest(".dashboard-table__row-actions")) {
        setOpenRowMenuId(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [openRowMenuId]);

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.tourism}</h1>

        <div className="dashboard-card__toolbar">
          <div className="dashboard-filter" ref={filterRef}>
            <button
              className={`dashboard-card__tool ${hasActiveFilters ? "dashboard-card__tool--active" : ""}`}
              type="button"
              onClick={() => {
                setDraftVisitDate(appliedVisitDate);
                setIsFilterOpen(true);
              }}
            >
              <img src={dashboardIcons.filter} alt="" aria-hidden="true" />
              <span>{dashboardText.toolbar.filter}</span>
            </button>

            {isFilterOpen ? (
              <div className="dashboard-filter__panel dashboard-filter__panel--calendar" role="dialog" aria-label={dashboardText.toolbar.filter}>
                <div className="dashboard-filter__field">
                  <span>{dashboardText.filters.dateLabel}</span>
                  <div className="dashboard-filter__calendar">
                    <Calendar
                      calendarType="iso8601"
                      locale={calendarLocale}
                      next2Label={null}
                      prev2Label={null}
                      formatMonthYear={(locale, date) => formatCalendarMonthYear(locale, date, currentLanguage)}
                      formatShortWeekday={(locale, date) => formatCalendarShortWeekday(locale, date, currentLanguage)}
                      onChange={(value) => {
                        const nextDate = Array.isArray(value) ? value[0] : value;
                        setDraftVisitDate(nextDate || null);
                      }}
                      value={draftVisitDate}
                    />
                  </div>
                </div>

                <div className="dashboard-filter__actions">
                  <button
                    className="dashboard-filter__button dashboard-filter__button--ghost"
                    type="button"
                    onClick={() => {
                      setDraftVisitDate(null);
                      setAppliedVisitDate(null);
                      setIsFilterOpen(false);
                    }}
                  >
                    {dashboardText.filters.reset}
                  </button>
                  <button
                    className="dashboard-filter__button"
                    type="button"
                    onClick={() => {
                      setAppliedVisitDate(draftVisitDate);
                      setIsFilterOpen(false);
                    }}
                  >
                    {dashboardText.filters.apply}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {errorMessage ? (
        <p className="dashboard-card__feedback dashboard-card__feedback--error" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <div className="dashboard-table-wrap">
        <table className="dashboard-table dashboard-table--admin-tourism">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th>{dashboardText.columns.name}</th>
              <th>{dashboardText.columns.phone}</th>
              <th className="dashboard-table__date-column">{dashboardText.columns.visitDate}</th>
              <th className="dashboard-table__actions-column" />
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="5">
                  {dashboardText.loading.tourism}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="5">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visibleBookings.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="5">
                  {dashboardText.empty.tourism}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visibleBookings.map((booking, index) => {
                  const openMenuUpward = index >= visibleBookings.length - 2;

                  return (
                    <tr key={booking.id}>
                      <td className="dashboard-table__index-cell">{index + 1}</td>
                      <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={booking.name}>
                        {booking.name}
                      </td>
                      <td>{booking.phone}</td>
                      <td>{formatDashboardDateTime(booking.visit_date, currentLanguage)}</td>
                      <td className="dashboard-table__actions-cell">
                        <div className="dashboard-table__row-actions">
                          <button
                            className="dashboard-table__row-menu"
                            type="button"
                            onClick={() =>
                              setOpenRowMenuId((current) => (current === booking.id ? null : booking.id))
                            }
                            aria-label={dashboardText.rowMenu.moreActions}
                            aria-expanded={openRowMenuId === booking.id}
                          >
                            <span />
                            <span />
                            <span />
                          </button>

                          {openRowMenuId === booking.id ? (
                            <div
                              className={`dashboard-table__row-menu-panel ${openMenuUpward ? "dashboard-table__row-menu-panel--upward" : ""}`}
                            >
                              <button
                                className="dashboard-table__row-menu-action"
                                type="button"
                                onClick={async () => {
                                  const deleted = await onDeleteBooking(booking.id);

                                  if (deleted) {
                                    setOpenRowMenuId(null);
                                  }
                                }}
                              >
                                {dashboardText.rowMenu.delete}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminDashboardPartnersSection({ dashboardText, searchValue, state }) {
  const partners = Array.isArray(state.data) ? state.data : [];
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const visiblePartners = React.useMemo(
    () =>
      partners.filter((partner, index) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          String(index + 1),
          partner.name,
          partner.email,
          partner.company_name,
          partner.phone,
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [normalizedSearchValue, partners],
  );

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.partners}</h1>
      </div>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table dashboard-table--admin-partners">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th>{dashboardText.columns.name}</th>
              <th>{dashboardText.columns.email}</th>
              <th>{dashboardText.columns.companyName}</th>
              <th>{dashboardText.columns.phone}</th>
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="5">
                  {dashboardText.loading.partners}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="5">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visiblePartners.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="5">
                  {dashboardText.empty.partners}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visiblePartners.map((partner, index) => (
                  <tr key={partner.id}>
                    <td className="dashboard-table__index-cell">{index + 1}</td>
                    <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={partner.name}>
                      {partner.name}
                    </td>
                    <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={partner.email}>
                      {partner.email}
                    </td>
                    <td className="dashboard-table__text-cell dashboard-table__text-cell--multiline" title={partner.company_name}>
                      {partner.company_name}
                    </td>
                    <td>{partner.phone}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function AdminDashboardFinancesSection({ currentLanguage, dashboardText, searchValue, state }) {
  const summaries = Array.isArray(state.data) ? state.data : [];
  const overallTotals = React.useMemo(
    () =>
      summaries.reduce(
        (totals, summary) => ({
          total: totals.total + Number(summary.total || 0),
          paid: totals.paid + Number(summary.paid || 0),
          debt: totals.debt + Number(summary.debt || 0),
        }),
        { total: 0, paid: 0, debt: 0 },
      ),
    [summaries],
  );
  const normalizedSearchValue = searchValue.trim().toLocaleLowerCase();
  const visibleSummaries = React.useMemo(
    () =>
      summaries.filter((summary, index) => {
        if (!normalizedSearchValue) {
          return true;
        }

        const searchableValues = [
          String(index + 1),
          summary.product_type,
          formatDashboardNumber(summary.quantity, currentLanguage),
          formatDashboardNumber(summary.total, currentLanguage),
          formatDashboardNumber(summary.paid, currentLanguage),
          formatDashboardNumber(summary.debt, currentLanguage),
        ];

        return searchableValues.some((value) =>
          String(value || "").toLocaleLowerCase().includes(normalizedSearchValue),
        );
      }),
    [currentLanguage, normalizedSearchValue, summaries],
  );

  return (
    <section className="dashboard-card">
      <div className="dashboard-card__header">
        <h1 className="dashboard-card__title">{dashboardText.cards.finances}</h1>
      </div>

      <div className="dashboard-table-wrap">
        <table className="dashboard-table dashboard-table--admin-finances">
          <thead>
            <tr>
              <th className="dashboard-table__index-column" />
              <th>{dashboardText.columns.productType}</th>
              <th>{dashboardText.columns.quantity}</th>
              <th>{dashboardText.columns.total}</th>
              <th>{dashboardText.columns.paid}</th>
              <th>{dashboardText.columns.debt}</th>
            </tr>
          </thead>
          <tbody>
            {state.isLoading ? (
              <tr>
                <td className="dashboard-table__message" colSpan="6">
                  {dashboardText.loading.finances}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && state.error ? (
              <tr>
                <td className="dashboard-table__message dashboard-table__message--error" colSpan="6">
                  {state.error}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error && visibleSummaries.length === 0 ? (
              <tr>
                <td className="dashboard-table__message" colSpan="6">
                  {dashboardText.empty.finances}
                </td>
              </tr>
            ) : null}

            {!state.isLoading && !state.error
              ? visibleSummaries.map((summary, index) => (
                  <tr key={`${summary.product_id}-${summary.product_type}`}>
                    <td className="dashboard-table__index-cell">{index + 1}</td>
                    <td className="dashboard-table__text-cell" title={summary.product_type}>
                      {summary.product_type}
                    </td>
                    <td>{formatDashboardNumber(summary.quantity, currentLanguage)}</td>
                    <td>{formatDashboardNumber(summary.total, currentLanguage)}</td>
                    <td>{formatDashboardNumber(summary.paid, currentLanguage)}</td>
                    <td>{formatDashboardNumber(summary.debt, currentLanguage)}</td>
                  </tr>
                ))
              : null}
          </tbody>
          {!state.isLoading && !state.error && summaries.length > 0 ? (
            <tfoot>
              <tr className="dashboard-table__summary-row">
                <td className="dashboard-table__summary-label" colSpan="3">
                  {dashboardText.summaryRows.overall}
                </td>
                <td>{formatDashboardNumber(overallTotals.total, currentLanguage)}</td>
                <td>{formatDashboardNumber(overallTotals.paid, currentLanguage)}</td>
                <td>{formatDashboardNumber(overallTotals.debt, currentLanguage)}</td>
              </tr>
            </tfoot>
          ) : null}
        </table>
      </div>
    </section>
  );
}

function AdminDashboardProductModal({
  dashboardText,
  form,
  errorMessage,
  isSubmitting,
  onClose,
  onFieldChange,
  onSubmit,
}) {
  return (
    <div
      className="modal-overlay dashboard-modal-overlay"
      onClick={() => {
        if (!isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="modal-content dashboard-modal" onClick={(event) => event.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{dashboardText.productModal.title}</h2>
          <button className="modal-close" onClick={onClose} type="button" disabled={isSubmitting}>
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit} noValidate>
          <div className="modal-body dashboard-modal__grid">
            <div className="modal-section">
              <label className="modal-label" htmlFor="admin-product-name">
                {dashboardText.productModal.nameLabel}
              </label>
              <input
                id="admin-product-name"
                className="modal-input"
                type="text"
                placeholder={dashboardText.productModal.namePlaceholder}
                value={form.productType}
                onChange={onFieldChange("productType")}
                disabled={isSubmitting}
              />
            </div>

            <div className="modal-section">
              <label className="modal-label" htmlFor="admin-product-quantity">
                {dashboardText.productModal.quantityLabel}
              </label>
              <input
                id="admin-product-quantity"
                className="modal-input"
                type="number"
                min="0"
                step="any"
                placeholder={dashboardText.productModal.quantityPlaceholder}
                value={form.quantity}
                onChange={onFieldChange("quantity")}
                disabled={isSubmitting}
              />
            </div>

            <div className="modal-section">
              <label className="modal-label" htmlFor="admin-product-price">
                {dashboardText.productModal.priceLabel}
              </label>
              <input
                id="admin-product-price"
                className="modal-input"
                type="number"
                min="0"
                step="any"
                placeholder={dashboardText.productModal.pricePlaceholder}
                value={form.price}
                onChange={onFieldChange("price")}
                disabled={isSubmitting}
              />
            </div>

            {errorMessage ? (
              <p className="dashboard-modal__feedback dashboard-modal__feedback--error" role="alert">
                {errorMessage}
              </p>
            ) : null}
          </div>

          <div className="modal-footer dashboard-modal__footer">
            <button
              className="button button--ghost dashboard-modal__button dashboard-modal__button--ghost"
              onClick={onClose}
              type="button"
              disabled={isSubmitting}
            >
              {dashboardText.productModal.cancel}
            </button>
            <button className="button button--solid dashboard-modal__button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? dashboardText.productModal.creating : dashboardText.productModal.submit}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M1.5 12s3.8-6 10.5-6 10.5 6 10.5 6-3.8 6-10.5 6S1.5 12 1.5 12Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function AppRoutes() {
  const [currentLanguage, setCurrentLanguage] = React.useState(getInitialLanguage);

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEYS.language, currentLanguage);
  }, [currentLanguage]);

  return (
    <Routes>
      <Route path="/" element={<HomePage currentLanguage={currentLanguage} onLanguageSelect={setCurrentLanguage} />} />
      <Route path="/login" element={<LoginPage currentLanguage={currentLanguage} />} />
      <Route path="/register" element={<RegisterPage currentLanguage={currentLanguage} />} />
      <Route path="/dashboard/admin/*" element={<AdminDashboardPage currentLanguage={currentLanguage} onLanguageSelect={setCurrentLanguage} />} />
      <Route path="/dashboard/*" element={<UserDashboardPage currentLanguage={currentLanguage} onLanguageSelect={setCurrentLanguage} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return <AppRoutes />;
}

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return "AM";
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEYS.language);
  return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : "AM";
}

function normalizeApiErrorMessage(message) {
  return String(message || "")
    .trim()
    .replace(/\s+/g, " ");
}

function getApiErrorLocalization(language) {
  return apiErrorLocalization[language] || apiErrorLocalization.EN;
}

function translateApiErrorMessage(message, language) {
  const normalizedMessage = normalizeApiErrorMessage(message);

  if (!normalizedMessage) {
    return "";
  }

  const localization = getApiErrorLocalization(language);
  const lowerMessage = normalizedMessage.toLowerCase();

  if (localization.exact[lowerMessage]) {
    return localization.exact[lowerMessage];
  }

  const valueErrorMatch = normalizedMessage.match(/^value error,\s*(.+)$/i);
  if (valueErrorMatch) {
    return translateApiErrorMessage(valueErrorMatch[1], language);
  }

  const minTransactionQuantityMatch = normalizedMessage.match(/^minimum transaction quantity is ([\d.]+)\.?$/i);
  if (minTransactionQuantityMatch) {
    return localization.templates.minTransactionQuantity(minTransactionQuantityMatch[1]);
  }

  const greaterThanOrEqualMatch = normalizedMessage.match(
    /^(?:input|value) should be greater than or equal to ([\d.]+)\.?$/i,
  );
  if (greaterThanOrEqualMatch) {
    return localization.templates.greaterThanOrEqual(greaterThanOrEqualMatch[1]);
  }

  const greaterThanMatch = normalizedMessage.match(/^(?:input|value) should be greater than ([\d.]+)\.?$/i);
  if (greaterThanMatch) {
    return localization.templates.greaterThan(greaterThanMatch[1]);
  }

  const lessThanOrEqualMatch = normalizedMessage.match(/^(?:input|value) should be less than or equal to ([\d.]+)\.?$/i);
  if (lessThanOrEqualMatch) {
    return localization.templates.lessThanOrEqual(lessThanOrEqualMatch[1]);
  }

  const lessThanMatch = normalizedMessage.match(/^(?:input|value) should be less than ([\d.]+)\.?$/i);
  if (lessThanMatch) {
    return localization.templates.lessThan(lessThanMatch[1]);
  }

  const stringMinMatch = normalizedMessage.match(/^string should have at least (\d+) characters?$/i);
  if (stringMinMatch) {
    return localization.templates.stringMin(stringMinMatch[1]);
  }

  const stringMaxMatch = normalizedMessage.match(/^string should have at most (\d+) characters?$/i);
  if (stringMaxMatch) {
    return localization.templates.stringMax(stringMaxMatch[1]);
  }

  if (/value is not a valid email address/i.test(normalizedMessage)) {
    return localization.templates.invalidEmail;
  }

  if (/input should be a valid number/i.test(normalizedMessage) || /unable to parse string as a number/i.test(normalizedMessage)) {
    return localization.templates.invalidNumber;
  }

  if (/input should be a valid integer/i.test(normalizedMessage) || /unable to parse string as an integer/i.test(normalizedMessage)) {
    return localization.templates.invalidInteger;
  }

  if (/input should be a valid datetime/i.test(normalizedMessage) || /input should be a valid date/i.test(normalizedMessage)) {
    return localization.templates.invalidDateTime;
  }

  return "";
}

function createApiError(status, payload) {
  const rawMessage = typeof payload?.detail === "string" ? payload.detail : "";
  const error = new Error(rawMessage || "Request failed");
  error.status = status;
  error.payload = payload;
  error.detail = payload?.detail;
  error.rawMessage = rawMessage;
  return error;
}

function resolveLoginError(statusCode, payload, language, messages) {
  const translatedDetail = resolveApiDetailMessage(payload?.detail, language, "");

  if (translatedDetail) {
    return translatedDetail;
  }

  if (statusCode === 401) {
    return messages.invalid;
  }

  if (statusCode === 422) {
    return messages.validation;
  }

  return messages.generic;
}

function resolveRegisterError(statusCode, payload, language, messages) {
  const translatedDetail = resolveApiDetailMessage(payload?.detail, language, "");

  if (translatedDetail) {
    return translatedDetail;
  }

  if (statusCode === 422) {
    return messages.validation;
  }

  return messages.generic;
}

function fetchAuthenticatedJson(path, session, signal, init = {}) {
  const headers = {
    Authorization: `${session.tokenType || "Bearer"} ${session.accessToken}`,
    ...(init.headers || {}),
  };

  return fetch(`${API_BASE_URL}${path}`, {
    method: init.method || "GET",
    headers,
    body: init.body,
    signal,
  }).then(async (response) => {
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw createApiError(response.status, payload);
    }

    return payload;
  });
}

function getStoredAuthSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const stores = [window.localStorage, window.sessionStorage];

  for (const storage of stores) {
    const accessToken = storage.getItem(STORAGE_KEYS.accessToken);
    const tokenType = storage.getItem(STORAGE_KEYS.tokenType);
    const role = storage.getItem(STORAGE_KEYS.userRole);

    if (accessToken && role) {
      return {
        accessToken,
        tokenType: tokenType || "Bearer",
        role,
      };
    }
  }

  return null;
}

function clearStoredAuthSession() {
  if (typeof window === "undefined") {
    return;
  }

  [window.localStorage, window.sessionStorage].forEach((storage) => {
    storage.removeItem(STORAGE_KEYS.accessToken);
    storage.removeItem(STORAGE_KEYS.tokenType);
    storage.removeItem(STORAGE_KEYS.userRole);
  });
}

function getDashboardSection(pathname) {
  const normalizedPath = String(pathname || "").replace(/\/+$/, "");

  if (normalizedPath === "/dashboard/transactions") {
    return "transactions";
  }

  if (normalizedPath === "/dashboard/finances") {
    return "finances";
  }

  if (normalizedPath === "/dashboard") {
    return null;
  }

  return null;
}

function getAdminDashboardSection(pathname) {
  const normalizedPath = String(pathname || "").replace(/\/+$/, "");

  if (normalizedPath === "/dashboard/admin/transactions") {
    return "transactions";
  }

  if (normalizedPath === "/dashboard/admin/products") {
    return "products";
  }

  if (normalizedPath === "/dashboard/admin/tourism") {
    return "tourism";
  }

  if (normalizedPath === "/dashboard/admin/finances") {
    return "finances";
  }

  if (normalizedPath === "/dashboard/admin/partners") {
    return "partners";
  }

  if (normalizedPath === "/dashboard/admin") {
    return null;
  }

  return null;
}

function formatDashboardNumber(value, language) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return "0";
  }

  return new Intl.NumberFormat(dashboardLocales[language] || "en-US", {
    minimumFractionDigits: Number.isInteger(numericValue) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
}

function formatDashboardDateTime(value, language) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  if (language === "AM") {
    const day = date.getDate();
    const monthName = armenianMonthNames[date.getMonth()] || "";
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day} ${monthName} ${year}, ${hours}:${minutes}`;
  }

  return new Intl.DateTimeFormat(dashboardLocales[language] || "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatCalendarMonthYear(locale, date, language) {
  if (language === "AM") {
    return `${armenianCalendarMonthNames[date.getMonth()] || ""} ${date.getFullYear()}`;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatCalendarShortWeekday(locale, date, language) {
  if (language === "AM") {
    return armenianCalendarWeekdayNames[date.getDay()] || "";
  }

  return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date).replace(/\.$/u, "");
}

function getLocalDateKey(value) {
  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function toStatusClassName(status) {
  return String(status || "pending").replaceAll("_", "-");
}

function getDashboardStatusLabel(status, labels) {
  if (status === "on_the_way") {
    return labels.onTheWay;
  }

  return labels[status] || status;
}

function resolveDashboardError(error, language, fallbackMessage) {
  const localizedMessage = resolveApiErrorMessage(error, language, "");

  if (localizedMessage) {
    return localizedMessage;
  }

  return fallbackMessage;
}

function resolveApiDetailMessage(detail, language, fallbackMessage) {
  if (typeof detail === "string" && detail.trim()) {
    return translateApiErrorMessage(detail, language) || fallbackMessage;
  }

  if (Array.isArray(detail)) {
    const messages = detail
      .map((item) => {
        if (typeof item === "string" && item.trim()) {
          return translateApiErrorMessage(item, language);
        }

        if (typeof item?.msg === "string" && item.msg.trim()) {
          return translateApiErrorMessage(item.msg, language);
        }

        return "";
      })
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return fallbackMessage;
}

function resolveApiErrorMessage(error, language, fallbackMessage) {
  const localizedDetail = resolveApiDetailMessage(error?.detail ?? error?.payload?.detail, language, "");

  if (localizedDetail) {
    return localizedDetail;
  }

  if (typeof error?.message === "string" && error.message.trim()) {
    return translateApiErrorMessage(error.message, language) || fallbackMessage;
  }

  return fallbackMessage;
}

function serializeBookingVisitDate(date) {
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
  const timezoneOffsetMinutes = -localDate.getTimezoneOffset();
  const sign = timezoneOffsetMinutes >= 0 ? "+" : "-";
  const absoluteOffsetMinutes = Math.abs(timezoneOffsetMinutes);
  const offsetHours = String(Math.floor(absoluteOffsetMinutes / 60)).padStart(2, "0");
  const offsetMinutes = String(absoluteOffsetMinutes % 60).padStart(2, "0");
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0");
  const day = String(localDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}T12:00:00${sign}${offsetHours}:${offsetMinutes}`;
}

function getAvatarInitial(name) {
  const trimmedName = String(name || "").trim();
  return trimmedName ? trimmedName.charAt(0).toUpperCase() : "U";
}

function isValidEmailAddress(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function slugify(label) {
  if (label === "Մեր մասին" || label === "About" || label === "О нас") {
    return "about";
  }

  if (label === "Արտադրանք" || label === "Products" || label === "Продукция") {
    return "products";
  }

  if (label === "Գործընթաց" || label === "Process" || label === "Процесс") {
    return "process";
  }

  if (label === "Տուրիզմ" || label === "Tourism" || label === "Туризм") {
    return "tourism";
  }

  return "why-choose";
}
