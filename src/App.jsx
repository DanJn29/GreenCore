const navItems = [
  { href: "#about", label: "Մեր մասին" },
  { href: "#products", label: "Արտադրանք", active: true },
  { href: "#process", label: "Գործընթաց" },
  { href: "#tourism", label: "Տուրիզմ" },
  { href: "#why-choose", label: "Ինչու՞ ընտրել մեզ" },
];

const partners = [
  { src: "/assets/brand/partner-1.svg", alt: "Partner logo" },
  { src: "/assets/brand/lidl.svg", alt: "Lidl" },
  { src: "/assets/brand/edeka.svg", alt: "Edeka" },
  { src: "/assets/brand/billa.svg", alt: "Billa" },
  { src: "/assets/brand/partner-5.svg", alt: "Partner logo" },
  { src: "/assets/brand/spar.svg", alt: "Spar" },
  { src: "/assets/brand/spayka.svg", alt: "Spayka" },
];

const productCards = [
  {
    type: "image",
    image: "/assets/photos/product-fresh-figs.png",
    alt: "Թարմ թզի արտադրանք",
  },
  {
    type: "feature",
    icon: "/assets/icons/fresh-fig.svg",
    title: "Թարմ թուզ",
    description:
      "Օրգանիկ, էկոլոգիապես մաքուր բերք՝ իդեալական սուպերմարկետների և ռեստորանային ցանցերի համար:",
  },
  {
    type: "image",
    image: "/assets/photos/product-export.jpg",
    alt: "Արտահանման համար նախատեսված թուզ",
  },
  {
    type: "feature",
    icon: "/assets/icons/export.svg",
    title: "Արտահանում",
    description:
      "Միջազգային (ԵԱՏՄ, ԵՄ) ստանդարտներին համապատասխանող փաթեթավորում և որակի հավաստագրում:",
  },
  {
    type: "image",
    image: "/assets/photos/product-wholesale.jpg",
    alt: "Մեծածախ մատակարարման գործընկերային աշխատանք",
  },
  {
    type: "feature",
    icon: "/assets/icons/wholesale.svg",
    title: "Մեծածախ մատակարարում",
    description: "Ճկուն պայմաններ ներքին շուկայի գործընկերների համար:",
  },
];

const processSteps = [
  {
    title: "1․ Ձմեռային շրջան (հունվար–փետրվար)",
    bullets: [
      "Սանիտարական և ձևավորող էտ",
      "Վնասված և հին ճյուղերի հեռացում",
      "Կանխարգելիչ պաշտպանություն",
      "Կաթիլային ոռոգման համակարգի ստուգում",
    ],
    image: "/assets/photos/process-winter-pruning.png",
    reverse: false,
  },
  {
    title: "2․ Վեգետացիայի սկիզբ (մարտ–ապրիլ)",
    bullets: [
      "Սեզոնային սնուցման ապահովում",
      "Կանոնավոր ոռոգման մեկնարկ",
      "Հողի վիճակի վերահսկում",
      "Նոր աճի և տերևային զանգվածի վերահսկում",
    ],
    image: "/assets/photos/process-spring-growth.png",
    reverse: true,
  },
  {
    title: "3․ Պտղի ձևավորում (մայիս–հունիս)",
    bullets: [
      "Կայուն ջրային ռեժիմի պահպանում",
      "Ծառի բեռնվածության վերահսկում",
      "Պտղի զարգացման դիտարկում",
      "Դաշտային որակի վերահսկում",
    ],
    image: "/assets/photos/process-fruit-formation.png",
    reverse: false,
  },
  {
    title: "4․ Հասունացում և բերքահավաք (հուլիս–սեպտեմբեր)",
    bullets: [
      "Օպտիմալ հասունության որոշում",
      "Ձեռքով բերքահավաք",
      "Բերքահավաք յուրաքանչյուր 2–3 օրը մեկ ակտիվ փուլում",
      "Զգույշ տեղափոխում դաշտից",
    ],
    image: "/assets/photos/process-harvest.png",
    reverse: true,
  },
  {
    title: "5․ Հետբերքահավաքային մշակում",
    bullets: [
      "Նախնական տեսակավորում",
      "Որակի և չափի ընտրություն",
      "Նախնական սառեցում",
      "Պատրաստում փաթեթավորման",
    ],
    image: "/assets/photos/process-postharvest.png",
    reverse: false,
  },
  {
    title: "6․ Փաթեթավորում",
    bullets: [
      "Չափերի կալիբրացում",
      "Օդափոխվող տարաների օգտագործում",
      "Խմբաքանակի և հավաքման ամսաթվի մակնշում",
    ],
    image: "/assets/photos/process-packaging.png",
    reverse: true,
  },
  {
    title: "7․ Լոգիստիկա",
    bullets: [
      "Ջերմաստիճանային ռեժիմի պահպանում",
      "Սառը շղթայի ապահովում",
      "Օպերատիվ առաքում թարմ շուկա",
    ],
    image: "/assets/photos/process-logistics.png",
    reverse: false,
  },
];

const tourismServices = [
  "1․ Շրջայց նորագույն տեխնոլոգիաներով հագեցած այգում:",
  "2․ Թարմ բերքի և թզից պատրաստված մթերքների համտես:",
  "3․ Գնումներ անմիջապես արտադրողից:",
];

const whyChooseCards = [
  {
    title: "100% Օրգանիկ",
    description: "Միջազգային չափանիշներին համապատասխանող մաքրություն։",
    image: "/assets/photos/why-organic.jpg",
  },
  {
    title: "Նորարարություն",
    description: "Կայուն և կանխատեսելի որակ՝ շնորհիվ AgTech (ագրոտեխ) լուծումների։",
    image: "/assets/photos/why-innovation.jpg",
    offset: true,
  },
  {
    title: "Վստահելիեւթյուն",
    description: "Ընտանեկան բիզնեսի նվիրվածություն և բիզնես-պրոցեսների թափանցիկություն։",
    image: "/assets/photos/why-trust.jpg",
  },
  {
    title: "Գլոբալ հասանելիություն",
    description: "Պատրաստ ենք արտահանման ցանկացած ծավալի պահանջարկի:",
    image: "/assets/photos/why-global.jpg",
    offset: true,
  },
];

const footerLinks = [
  "Մեր մասին",
  "Արտադրանք",
  "Գործընթաց",
  "Տուրիզմ",
  "Ինչու՞ ընտրել մեզ",
];

export default function App() {
  return (
    <div className="page">
      <header className="hero" id="top">
        <div className="shell shell--wide hero__shell">
          <div className="topbar">
            <a className="brand" href="#top">
              GREEN CORE
            </a>

            <nav className="nav-pill" aria-label="Primary navigation">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  className={`nav-pill__link ${item.active ? "is-active" : ""}`}
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <button className="lang-badge" type="button">
              AM
            </button>
          </div>

          <div className="hero__content">
            <h1 className="hero__title">Նորարարությունն ու բնությունը՝ մեկ այգում</h1>
            <p className="hero__lead">
              Ընտանեկան բիզնես, որը միավորում է ավանդական արժեքներն ու ժամանակակից
              գյուղատնտեսական լուծումները՝ ապահովելով բարձրորակ օրգանիկ թուզ ներքին
              շուկայի և արտահանման համար։
            </p>
            <div className="hero__actions">
              <a className="button button--solid" href="#contact">
                Դառնալ գործընկեր
              </a>
              <a className="button button--ghost" href="#tourism">
                Ամրագրել այց
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="section section--green about" id="about">
        <div className="shell shell--wide">
          <div className="partner-strip" aria-label="Retail partners">
            {partners.map((partner) => (
              <div className="partner-strip__item" key={partner.src}>
                <img src={partner.src} alt={partner.alt} />
              </div>
            ))}
          </div>

          <p className="section-title section-title--light">Մեր մասին</p>

          <div className="split split--framed">
            <div className="copy-block">
              <h2 className="headline headline--light">
                Մեր արմատները բնության մեջ են, մեր ընթացքը՝ տեխնոլոգիայի։
              </h2>
              <p className="copy copy--light">
                Մենք վերափոխում ենք հողատարածքը ժամանակակից, բարձր տեխնոլոգիական այգու,
                որտեղ յուրաքանչյուր ծառ խնամվում է ընտանեկան հոգատարությամբ։ Մեր նպատակն
                է ստեղծել էկոլոգիապես մաքուր միջավայր և աճեցնել լավագույն որակի թուզ,
                որը կներկայացնի մեր երկրի համն ու հոտը միջազգային շուկայում։
              </p>
            </div>

            <div className="media-card media-card--large">
              <img src="/assets/photos/about-smart-orchard.png" alt="Խելացի թզի այգի" />
            </div>
          </div>

          <div className="split split--reversed">
            <div className="media-card media-card--large">
              <img src="/assets/photos/about-fig-box.jpg" alt="Թուզի ընտրանի" />
            </div>

            <div className="copy-block copy-block--bordered">
              <p className="copy copy--light">
                Այն ամենը, ինչ դուք տեսնում եք՝ փարթամ կանաչ դաշտերից մինչև նորարարական
                գյուղատնտեսական տեխնիկաներ, պարզապես հնարավորությունների օրինակ է։
                Մենք հավատում ենք, որ գյուղատնտեսությունը սերմից շատ ավելին է։ Այն
                հոգատարություն է, կայունություն և պատասխանատվություն ապագայի հանդեպ։
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section products" id="products">
        <div className="shell shell--wide">
          <p className="section-title">Արտադրանք</p>

          <div className="product-grid">
            {productCards.map((card) =>
              card.type === "image" ? (
                <article className="product-card product-card--image" key={card.image}>
                  <img src={card.image} alt={card.alt} />
                </article>
              ) : (
                <article className="product-card product-card--feature" key={card.title}>
                  <img className="product-card__icon" src={card.icon} alt="" aria-hidden="true" />
                  <h3 className="product-card__title">{card.title}</h3>
                  <p className="product-card__text">{card.description}</p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section process" id="process">
        <div className="shell shell--wide">
          <p className="section-title">Գործընթաց</p>

          <div className="process-list">
            {processSteps.map((step) => (
              <article
                className={`process-row ${step.reverse ? "process-row--reverse" : ""}`}
                key={step.title}
              >
                <div className="process-row__copy">
                  <h3 className="process-row__title">{step.title}</h3>
                  <ul className="process-row__bullets">
                    {step.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>

                <div className="process-row__image">
                  <img src={step.image} alt={step.title} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tourism" id="tourism">
        <div className="shell shell--wide">
          <p className="section-title">Զբոսաշրջություն</p>
          <h2 className="headline tourism__headline">
            Հրավիրում ենք բացահայտելու մեր խելացի այգիները։
          </h2>

          <div className="tourism__grid">
            <div className="tourism__image">
              <img src="/assets/photos/tourism-visit.png" alt="Այգու զբոսաշրջային այց" />
            </div>

            <div className="tourism__panel">
              <h3 className="tourism__title">Առաջարկվող ծառայություններ</h3>
              <ul className="tourism__services">
                {tourismServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>

              <a className="button button--ghost tourism__cta" href="#contact">
                Ամրագրել այց
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section why-choose" id="why-choose">
        <div className="shell shell--wide">
          <p className="section-title section-title--left">Ինչու ՞ ընտրել մեզ</p>

          <div className="why-grid">
            {whyChooseCards.map((card) => (
              <article
                className={`why-card ${card.offset ? "why-card--offset" : ""}`}
                key={card.title}
              >
                <img className="why-card__image" src={card.image} alt={card.title} />
                <div className="why-card__overlay">
                  <h3 className="why-card__title">{card.title}</h3>
                  <p className="why-card__text">{card.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="why-choose__summary">
            <h2 className="headline headline--compact">
              Էկոլոգիական պատասխանատվություն, նորարարական մտածելակերպ ևվ երկարաժամկետ,
              փոխշահավետ Համագործակցություն:
            </h2>

            <a className="button button--solid" href="#contact">
              Դառնալ գործընկեր
            </a>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell footer__shell">
          <div className="footer__languages" aria-label="Languages">
            <span className="is-muted">EN</span>
            <span>AM</span>
            <span className="is-muted">RU</span>
          </div>

          <div className="footer__columns">
            <section className="footer__column">
              <h3 className="footer__heading">Կապ</h3>
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
              <h3 className="footer__heading">Բաժիններ</h3>
              <div className="footer__links">
                {footerLinks.map((link) => (
                  <a href={`#${slugify(link)}`} key={link}>
                    {link}
                  </a>
                ))}
              </div>
            </section>

            <section className="footer__column">
              <h3 className="footer__heading">Մեդիա</h3>
              <div className="footer__socials">
                <a aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noreferrer">
                  <img src="/assets/icons/instagram.svg" alt="" aria-hidden="true" />
                </a>
                <a aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noreferrer">
                  <img src="/assets/icons/facebook.svg" alt="" aria-hidden="true" />
                </a>
              </div>
            </section>
          </div>

          <p className="footer__wordmark">GREEN CORE</p>
        </div>
      </footer>
    </div>
  );
}

function slugify(label) {
  if (label === "Մեր մասին") return "about";
  if (label === "Արտադրանք") return "products";
  if (label === "Գործընթաց") return "process";
  if (label === "Տուրիզմ") return "tourism";
  return "why-choose";
}
