import React from 'react';
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from './Home';
import Single from './Single';
import './styles/App.css';

function App() {
  
  const projects = [
    //& 1: Zoekfunctie ODL
    {name: 'navigatie-ODL', date: '21.04.2023', subject: 'jQuery, CSS, PHP, WP', title: `Vernieuwde navigatie voor de e-learning website van Online Drumles`, 
    link: 'https://www.onlinedrumles.nl/', linktext:'Bekijk live site', color: 'rgb(30, 49, 56)',
    description: (<>
    <p>In 2022 heb ik stage mogen lopen bij Online Drumles (ODL), een online drumcursus die beginners helpt te leren drummen. De website van ODL werkt met een custom WordPress theme. Als developer ben ik aan de slag gegaan met HTML, CSS, jQuery en PHP om aanpassingen te doen aan het theme en de plugins.
    Een veel door gebruikers aangevraagde functionaliteit voor de ODL website is de zoekfunctie. Gebruikers zouden bijvoorbeeld graag hun favorieten lessen, nummers en artiesten willen kunnen opzoeken. Dat kon eerst alleen door er zelf naar op zoek te gaan in het leersysteem. 
    Daarnaast heb ik gewerkt aan het verbeteren van de navigatie op de site. Hiervoor heb ik op basis van een eerder UX onderzoek verbeteringen geimplementeerd. Tijdens deze opdrachten heb ik veel geleerd over het werken met Wordpress templates, het testen van nieuwe functies, het verwerken van feedback van gebruikers en scrum/agile werken.</p>
    </>),
    gallery_text_1: (<>
    <span className="description-title">Zoekfunctie</span> 
    <p>Met de nieuwe zoekfunctie kunnen gebruikers hun favorieten lessen, nummers en artiesten opzoeken. Tijdens deze opdracht heb ik feedback gevraagd en gebrainstormd met het team tijdens onze daily meetings. Hier kwamen nieuwe ideeën uit zoals het toevoegen van zoekfilters. 
    Daar ben ik mee aan de slag gedaan met behulp van jQuery, zodat gebruikers bijvoorbeeld kunnen zoeken op 'Hoofdstukken' als ze een nummer zoeken of 'Q&A' als ze een vraag hebben.</p>
    </>),
    gallery_text_2: (<>
    <span className="description-title">Leersysteem</span> 
    <p>Het leersysteem is de omgeving waarin gebruikers drumlessen volgen. Dit wordt ondersteund door de WordPress plugin LearnDash. Door een eerdere stagiair is een herontwerp gemaakt 
    van het leersysteem en zij heeft dit toen ook gevalideerd met gebruikers. Mijn opdracht was om dit nieuwe ontwerp te implementeren op de website. De veranderingen hadden vooral te maken met 
    navigatie: gebruikers zouden makkelijker moeten kunnen navigeren naar de lessen die zij willen volgen. Ten eerste hebben we het makkelijker gemaakt om binnen het leersysteem te navigeren 
    naar andere Hoofstukken of niveau's (Stokken), zodat gebruikers hiervoor niet het leersysteem uit hoeven. Daarna hebben we de nieuwe website opnieuw gevalideerd met dezelfde gebruikers, en kregen we veel enthousiaste reacties terug.</p>
    </>),
    gallery_text_3: (<>
    <span className="description-title">Mijn Lessen</span> 
    <p>Daarnaast hebben we de navigatie van de website verbeterd met een nieuwe pagina: de 'Mijn Lessen' pagina. Eerst moesten gebruikers vanaf een overzichtspagina 'Alle Lessen' doorklikken naar de pagina van een bepaald Hoofdstuk en vervolgens daar de juiste les kiezen. 
    Dat kan sneller. Volgens het nieuwe ontwerp kunnen gebruikers vanaf een overzichtspagina 'Mijn Lessen' direct op een les klikken. Ook is een een button toegevoegd om direct naar de laatst afgespeelde les te gaan.</p>
    </>)
    },
    //& 2: Hitte-stress
    {name: 'hitte-stress', date: '26.01.2024', subject: 'Python, QGIS', title: `Hoe kunnen we een model trainen dat de verharding van de ondergrond kan voorspellen? `, 
    link: undefined ,downloadLink: 'Eindrapport_Hittestress.pdf', linktext:'Download presentatie', color: 'rgb(80, 156, 50)',
    description: (<>
    <p>Het lectoraat 'Klimaat bestendige stad' van de Hogeschool van Amsterdam doet onderzoek naar hitte in de stad. Volgens hen is een grote oorzaak van hittestress een verharde ondergrond, zoals asfalt, betegeling of parkeerplaatsen.
    Een duidelijk ruimtelijk overzicht van waar verharde ondergrond zich bevind kan helpen om hittestress effectiever te bestrijden. Maar de verharding van de ondergrond is op dit moment alleen in kaart gebracht voor openbare ruimtes, en nog niet voor privé gebied.
    Tijdens dit project hebben wij onderzocht hoe we dit zouden kunnen achterhalen met de openbare data die beschikbaar is, zoals de Basisregistratie Grootschalige Topografie (BGT). Kunnen wij een model trainen dat kan voorspellen of een gebied een verharde of onverharde ondergrond heeft?</p>
    </>),
    gallery_text_1: (<>
    <span className="description-title">Trainingdata</span> 
    <p>De datasets die we hebben gebruikt om ons model te trainen is Basisregistratie grootschalige topografie (BGT) en Infrarood luchtfoto (8cm) en RGB luchtfoto (25cm) van het Nationaal GeoRegister.
    Elk terrein in de BGT heeft een 'Fysiek voorkomen', dat aangeeft of het verhard of onverhard is. Deze gebieden hebben we opgedeeld in een grid van vierkanten van 2 bij 2 meter. Over dit grid hebben we de luchtfoto's heengelegd en voor elk vierkant de mediaan 
    van rgb waardes berekend. Ons model kan hiervan leren welke kleurwaardes voorkomen bij welk type verharding. We zien bijvoorbeeld dat onverhard terrein gemiddeld lagere rood en blauw waardes heeft.</p>
    </>),
    gallery_text_2: (<>
    <span className="description-title">Model</span> 
    <p>Om de voorspelling te doen hebben we een Random Forest Classifier model gebruikt. In eerste instantie hebben we het model getraind op de BGT data van Amsterdam omdat de kwaliteit hiervan relatief hoog is. 
    De nauwkeurigheid van het model is bepaald door een voorspelling voor openbaar terrein te vergelijken met de werkelijke waarde voor openbaar terrein - dit is niet ideaal maar we hebben geen data van het 
    privéterrein om mee te vergelijken. Voor Amsterdam krijgen we hiervoor een naukeurigheidsscore van 92%.</p>
    <p>Het lectoraat zou graag willen weten of dit model ook voorspellingen zou kunnen doen voor andere steden dan waarop het getraind is. We hebben het model getraind op Amsterdam en getest op Middelburg en Arnhem, 
    maar hier kon het maar 4% van het verharde terrein correct identificeren. Het model lijkt alleen een goede voorspelling voor andere steden te kunnen doen als de verhouding tussen verhard en onverhard terrein vergelijkbaar is. 
    We hebben het model opnieuw getraind op data van Middelburg en we zagen dat dit ook goede voorspellingen gaf voor Arnhem.
    </p>
    </>),
    gallery_text_3: (<>
    <span className="description-title">Evaluatie</span>
    <p>Deze methode lijkt goed te werken voor het voorspellen van de verharding, maar er zijn wel limitaties. Ten eerste hebben we fouten gevonden in de BGT data, zoals terrein waarvan de verharding niet correct geclassificeerd is. Ook de luchtfoto's zijn niet 
    100% betrouwbaar, er zijn kleurverschillen door de tijd van het jaar waarin de foto genomen is. Een groot gebied aan landbouwgrond werd bijvoorbeeld geclassificeerd als verhard, omdat het in de winter een grijzige kleur krijgt. Ook schaduwen van bomen worden door het model soms als verhard gezien. 
    Ten slotte hebben we de voorspelling niet kunnen controleren met de echte verharding van het privéterrein omdat dit niet bekend is.</p>
    </>)
    },
    //& 3: Tijdlijn Marineterrein
    {name: 'tijdlijn-marineterrein', date: '02.05.2024', subject: 'WP, JS, CSS, GSAP', title: `Tijdlijn voor het 10-jarig bestaan van het Marineterrein`, 
    link: 'https://vimeo.com/949494640?share=copy/', downloadLink: undefined, linktext:'Bekijk video', color: 'rgb(237, 105, 80)',
    description: (<>
    <p>Het Marineterrein in Amsterdam is jarig! Om hun 10-jarige jubileum te vieren hebben ze borden laten ontwerpen met een visuele tijdlijn van alle highlights van de afgelopen jaren. 
    Tijdens mijn stage bij Studio Parkers heb ik deze borden uitgewerkt voor op de website van het Marineterrein, zodat dit te gekke ontwerp ook online te bekijken is.
    Het leuke van een online uitwerking vond ik dat je interacties zoals scroll animaties kan toevoegen aan het ontwerp.</p>
    </>),
    gallery_text_1: (<>
    <span className="description-title">Het design uitwerken</span> 
    <p>Om dit ontwerp uit te werken in Wordpress heb ik voor elk jaar een custom taxonomy aangemaakt. Hieraan verbonden zijn posts van het custom post type "Verhalen", 
    die ACF velden bevatten voor de teksten, afbeeldingen, linkjes, etc. Daarna heb ik dit verbonden aan een template die opgebroken is in componenten voor elk verhaal.
    Een interessant onderdeel van de styling was het maken van de gradient achtergrond; het idee was om voor elk jaar af te wisselen tussen een blauwe en rode gradient,
    en achter de gradients door loopt nog een patroon.
    </p>
    </>),
    gallery_text_2: (<>
    <span className="description-title">Animaties</span> 
    <p>We wilden hier een interactieve, levendige tijdlijn van maken. Tijdens een brainstorm kregen we de volgende ideeën: 
    (1) De jaartallen die in het vierkantje staan veranderen terwijl je scrollt, (2) Wanneer er langs een jaar wordt gescrollt, animeren de uitgelichte 
    afbeeldingen het scherm in vanuit de zijkant en groeit de sticker met een bouncy animatie. Hiervoor heb ik GSAP, ScrollTrigger en ScrollReveal gebruikt.</p>
    </>),
    gallery_text_3: (<>
    <span className="description-title">Responsiveness</span>
    <p>Ten slotte heb ik het design ook uitgewerkt voor tablet en mobile. Wat ik leuk vond om te leren was hoe je dit nog makkelijker kan maken met SCSS functies. 
    Onze functie berekent een fluid grootte voor bijvoorbeeld fontgrootte, marges of paddings, afhankelijk van de viewport breedte. Het doel is om een element vloeiend 
    te laten schalen tussen twee waarden ($minValue en $maxValue) op basis van de breedte van de viewport ($minViewportWidth en $maxViewportWidth). Zo heb ik het bijvoorbeeld 
    gebruikt om de afbeeldingen te laten meeschalen met de viewport: </p><code>width: fluid-size(200px, 400px, true);</code>
    <p>Ook hebben we ervoor gekozen om de teksten uitklapbaar te maken omdat hiervoor veel minder ruimte is op het scherm.</p>
    </>)
    },
    //& 4: Color picker
    {name: 'color-picker', date: '25.08.2023', subject: 'React, CSS', title: `React color picker app`, link: 'https://rarooij98.github.io/ReactColorPicker', 
    linktext:'Naar live site', color: 'rgb(56, 75, 173)',
    description: (<>
    <p>Afgelopen zomer was ik op zoek naar een project om wat te leren over Javascript frameworks. Dit React project leek me erg leuk vanwege alle vrolijke kleuren! 
    Deze color picker app is geinspireerd op de site van Material UI Colors: https://materialuicolors.co/.
    Gebruikers kunnen kleuren kopiëren in verschillende formats (rgb, rgba, hex) en eigen kleurpaletten toevoegen.</p>
    </>),
    gallery_text_1: (<>
    <span className="description-title">ColorBoxes</span>
    <p>Tijdens dit project heb ik kennis gemaakt met de React concepten components, props en state. Elke kleur in het kleurenpalet wordt gepresenteerd door een 'ColorBox', 
    dit is een component met de props 'name' en 'color'. Om het kleurenpalet te maken wordt er gemapt over alle ColorBoxes, zodat er voor elke kleur een box wordt weergeven. 
    Wanneer er op een kleur geklikt wordt verandert de state 'copied' naar True, en wordt een overlay weergeven met informatie over de gekopieerde kleur.</p>
    </>),
    gallery_text_2: (<>
    <span className="description-title">Navigatie</span>
    <p>Vanaf de homepage kan naar alle bestaande kleurpaletten genavigeerd worden. Ik heb React Router gebruikt om de 'Routes' te definiëren, het pad naar elk kleurenpalet 
    kan worden gevonden met '/palette/:id'.</p>
    </>),
    gallery_text_3: (<>
    <span className="description-title">NewPaletteForm</span>
    <p>Het toevoegen van een custom kleurenpalet is mogelijk met de functie submitPalette() in het component 'NewPaletteForm'. Deze functie voegt het nieuwe palet toe aan de lijst met alle paletten. Elke kleur die toegevoegd wordt, 
    wordt eerst gevalideerd: elke kleur en naam mag maar één keer in het palet voorkomen.</p>
    </>)
    },
    //& 5: School Match
    {name: 'school-match', date: '04.04.2022', subject: 'JS, CSS, MongoDB', title: `School match app voor studenten`, 
    link: 'https://github.com/rarooij98/bt_team4', linktext:'Bekijk project op Github', color: 'rgb(2, 39, 86)',
    description: (<>
    <p>Tijdens het Project Tech van CMD kregen wij de opdracht om in twee weken met ons team een matching webapp te ontwikkelen. Onze matchingsapp SchoolMatch helpt leerlingen bij het zoeken naar een nieuwe opleiding 
    door ze te matchen met scholen die aansluiten bij hun interesses. Dit is een webapp gebouwd met HTML, CSS en Javascript. We gebruikten MongoDB voor 
    onze database, Github voor versiebeheer en we gebruikten het MVC-model (model-view-controller).
    Tijdens dit project hebben we geleerd over version control, hosting en de backend, zoals het maken van een login functionaliteit en het inladen van data. 
    In een team van 6 studenten is ieder teamlid aan de slag gegaan met het bouwen van een onderdeel van de app. Aan het eind van het project hebben 
    we al onze features branches gemerged tot een samenhangend geheel.</p>
    </>),
    gallery_text_1: (<>
    <span className="description-title">Voorkeuren</span>
    <p>Zo werkt het: vanuit een persoonlijk account kun je jouw voorkeuren instellen. Wil je een bepaald onderwerp studeren, of moet je in een 
    bepaalde stad zijn? Aan de hand van deze informatie wordt je gekoppeld aan een aantal scholen die mogelijk bij je passen. Je kan vervolgens in contact komen 
    met een vertegenwoordiger van een school waarin je mogelijk geïnteresseerd bent, om vragen te stellen en meer informatie te verzamelen.</p>
    </>),
    gallery_text_2: (<>
    <span className="description-title">Teamwork</span>
    <p>Vier teamleden zijn samen gaan werken aan de registratie- en login-functies die nodig waren om een ​​account aan te maken. 
    Zij hadden allemaal een individuele taak gerelateerd aan de inlogfunctie: (1) Het mogelijk maken om inloggegevens (e-mailadres en wachtwoord) te wijzigen,
    (2) Login met Google met Passport, (3) Een bevestigingsmail sturen met Nodemailer nadat iemand zich heeft geregistreerd en (4) Uitloggen, sessies starten/beëindigen.
    Ondertussen heb ik me bezig gehouden met het verkrijgen van informatie uit het formulier en het tonen van de juiste matches uit onze database. 
    Een ander teamlid werkte aan het bouwen van een chat waarin gebruikers met vertegenwoordigers van de scholen konden praten.</p>
    </>),
    gallery_text_3: (<>
    <span className="description-title">Filters</span>
    <p>Het was mijn taak om een ​​formulier te maken en de juiste matches uit onze database met scholen te laten zien.
    Eerst moesten enkele scholen aan onze database worden toegevoegd. Ik heb zo'n 15 scholen handmatig toegevoegd met gegevens over hun locatie, 
    opleidingsniveau en studierichtingen. Wanneer er een verzoek is, worden de scholen uit de database opgehaald met een request. Om deze data te filteren, heb ik bijvoorbeeld
    het gekozen niveau opgehaald uit het formulier en aan de request toegevoegd:</p> <code>{`const filtered = await scholen.find({niveau: keuze.niveau}, null);`}</code><p>Alleen de scholen uit onze
    database die aan de voorkeuren voldoen worden nu weergegeven op de resultatenpagina.</p>
    </>)
    },
    //& Data Dashboard
    // {name: 'data-dashboard', date: '28.09.2023', subject: 'Python, Plotly, Streamlit', title: `Data dashboard voor elektrische laadpalen`, 
    // link: 'https://elektrische-laadpalen-dashboard.streamlit.app/', linktext:'Naar live site', color: 'rgb(112, 159, 219)',
    // description: 
    // `Tijdens de minor Data Science aan de HvA heb ik in een klein team van studenten mogen werken aan interessante cases, over onderwerpen zoals CO2 uitstoot, elektrisch rijden en de klimaatbestendigde stad.
    // Dit dashboard gaat over de elektrische laadpalen in Nederland, en laat zien waar laadpalen staan en hoe ze gebruikt worden. Wist je bijvoorbeeld dat elektrische auto's gemiddeld 3x zo lang verbonden zijn met 
    // de laadpaal dan dat ze daadwerkelijk opladen? En dat de stad met de meeste laadpalen Den Haag is, gevolgd door Amsterdam en Rotterdam?`,
    // gallery_text_1: 
    // `Spitsuur. Wanneer wordt er het meest opgeladen? Volgens onze dataset met een sample van 10186 laadsessies, is het om 7 uur 's ochtends het drukst. Om 1 uur 's nachts is het daarentegen het rustigst, met slechts 4 oplaadsessies. 
    // Er lijken pieken te zijn wanneer mensen 's morgens de deur uitgaan (06:00-08:00), tijdens de lunch (11:00) en aan het einde van de werkdag (16:00).`
    // ,
    // gallery_text_2:
    // `Locaties. Met een kaart weergeven we de verdeling van laadpalen over Nederland in een bepaald jaar. Het jaar is aan te passen met een slider om te zien hoe de verdeling verandert. 
    // Tussen 2012 en 2014 werden er bijvoorbeeld vooral in Zuid-Holland en Brabant veel nieuwe laadpalen geregistreerd, daarna kwamen er ook in Zuid-Holland een flink aantal bij.
    // Er kan ingezoomd worden op een specifieke provincie om de verdeling van laadpalen binnen dit gebied te zien.`
    // ,
    // gallery_text_3: 
    // `Voertuigen. Wat voor voertuigen maken gebruik van deze laadpalen? Deze histogram laat de verdeling zien van de meest voorkomende elektrische automerken op basis van de voertuigenregistratie.
    // De meest voorkomende merken zijn de Tesla Model 3 en Tesla Model Y, meestal in het zwart of wit. De kans is dus groot dat je deze auto wel eens bij een laadpaal hebt zien staan.`
    // },
     //& Bio AR
    //  {name: 'AR-biologieboek', date: '18.11.2022', subject: 'Unity, C#, Blender', title: `AR app als aanvulling op de biologie les `, 
    //  link: 'https://vimeo.com/793366968?share=copy', linktext:'Bekijk project video', color: 'rgb(128, 55, 99)',
    //  description: 
    //  `Als onderdeel van de minor 'Designing for Emerging Technologies' heb ik een XR/AR prototype gemaakt voor gebruik in het onderwijs. Ik heb me bezig gehouden met de vraag: Hoe zou XR leerlingen kunnen helpen om de concepten in hun biologie boeken beter te begrijpen? 
    //  Ik vond biologie een mooi vak voor deze toepassing, want met een AR app kun je complexe biologische systemen zoals de werking van het zenuwstelsel visueel en begrijpelijk maken. 
    //  Het doel van deze app is om lessen extra leerzaam en leuk te maken voor de leerlingen, door biologische processen 3-dimensionaal en geanimeerd te laten zien en interactief maken.`,
    //  gallery_text_1: 
    //  `Roer-me-niet! Tijdens dit project heb ik me gefocust op het ‘roer-me-niet’ of ‘mimosa’ plantje. Deze plant is een veel gebruikt voorbeeld in biologieboeken, waarmee je het verschil kan uitleggen tussen gedrag en een impuls, want 
    //  deze plant sluit zijn bladeren als hij wordt aangeraakt. Met AR kunnen leerlingen zelf ervaren wat er gebeurt als ze de plant aanraken. `
    //  ,
    //  gallery_text_2: 
    //  `3D-model. Ik heb het prototype gemaakt in Unity met behulp van Vuforia. Het bestaat uit een Image Target, waar een 3D model bovenop komt te staan. Op die manier komt de plant bovenop het schoolboek te staan wanneer je er naar kijkt 
    //  met de AR app. Ik heb een afbeelding van het boek 'Biologie Voor Jou' voor havo 4 gebruikt als Image Target. In eerste instantie had ik een gratis asset gebruikt als 3D model, maar daarna heb ik mijn eigen Blender model gemaakt.
    //  `
    //  ,
    //  gallery_text_3: 
    //  `Interactie. Daarna heb ik aan dit model interactie en animatie toegevoegd. Dit heb ik gedaan door een paar regels C# te schrijven in een script dat ik heb toegevoegd aan de ARCamera van de scene. In dit script staat dat wanneer 
    //  de plant wordt aangeraakt, deze begint te krimpen. Wanneer de plant nog een keer aangeraakt wordt de scene gereset en is de plant weer teruggegroeid.`
    //  },
  ]
  
  const location = useLocation();
  
  const GetProject = () => {
    const { project } = useParams();
    const currentProject = projects.find((x) => x.name === project);
    if (!currentProject) {
      // Handle case when project is not found, for example, redirect to a 404 page
      return <div>Project not found</div>;
    }
    return <Single project={currentProject} key={currentProject.name} />;
  };
  
  return (
    <div className="App">
      <AnimatePresence initial={true} mode='wait'>
          <Routes location={location} key={location.pathname}>
            <Route path={`${process.env.PUBLIC_URL}/`} element={<Home projects={projects} />} />
            <Route path={`${process.env.PUBLIC_URL}/:project`} element={<GetProject />} />
          </Routes>
        </AnimatePresence>
    </div>
  );
}

export default App;
