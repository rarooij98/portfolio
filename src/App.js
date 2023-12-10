import React from 'react';
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from './Home';
import Single from './Single';
import './styles/App.css';

function App() {
  
  const projects = [
    //& Zoekfunctie ODL
    {name: 'navigatie-ODL', date: '21.04.2023', subject: 'jQuery, CSS, PHP, WP', title: `Vernieuwde navigatie voor de e-learning website van Online Drumles`, 
    link: 'https://www.onlinedrumles.nl/', linktext:'Bekijk live site', color: 'rgb(30, 49, 56)',
    description: 
    `Afgelopen jaar (feb-mei 2022) heb ik stage mogen lopen bij Online Drumles (ODL), een online drumcursus die beginners helpt te leren drummen. De website van ODL werkt met een custom WordPress theme. Als developer ben ik aan de slag gegaan met HTML, CSS, jQuery en PHP om aanpassingen te doen aan het theme en de plugins.
    Een veel door gebruikers aangevraagde functionaliteit voor de ODL website is de zoekfunctie. Gebruikers zouden bijvoorbeeld graag hun favorieten lessen, nummers en artiesten willen kunnen opzoeken. Dat kon eerst alleen door er zelf naar op zoek te gaan in het leersysteem. 
    Daarnaast heb ik gewerkt aan het verbeteren van de navigatie op de site. Hiervoor heb ik op basis van een eerder UX onderzoek verbeteringen geimplementeerd. Tijdens deze opdrachten heb ik veel geleerd over het werken met Wordpress templates, het testen van nieuwe functies, het verwerken van feedback van gebruikers en scrum/agile werken.
    `,
    gallery_text_1: 
    `Zoekfunctie. Met de nieuwe zoekfunctie kunnen gebruikers hun favorieten lessen, nummers en artiesten opzoeken. Tijdens deze opdracht heb ik feedback gevraagd en gebrainstormd met het team tijdens onze daily meetings. Hier kwamen nieuwe ideeën uit zoals het toevoegen van zoekfilters. 
    Daar ben ik mee aan de slag gedaan met behulp van jQuery, zodat gebruikers bijvoorbeeld kunnen zoeken op 'Hoofdstukken' als ze een nummer zoeken of 'Q&A' als ze een vraag hebben.`
    ,
    gallery_text_2:
    `Leersysteem. Het leersysteem is de omgeving waarin gebruikers drumlessen volgen. Dit wordt ondersteund door de WordPress plugin LearnDash. Door een eerdere stagiair is een herontwerp gemaakt 
    van het leersysteem en zij heeft dit toen ook gevalideerd met gebruikers. Mijn opdracht was om dit nieuwe ontwerp te implementeren op de website. De veranderingen hadden vooral te maken met 
    navigatie: gebruikers zouden makkelijker moeten kunnen navigeren naar de lessen die zij willen volgen. Ten eerste hebben we het makkelijker gemaakt om binnen het leersysteem te navigeren 
    naar andere Hoofstukken of niveau's (Stokken), zodat gebruikers hiervoor niet het leersysteem uit hoeven. Daarna hebben we de nieuwe website opnieuw gevalideerd met dezelfde gebruikers, en kregen we veel enthousiaste reacties terug.`
    ,
    gallery_text_3: 
    `MijnLessen. Daarnaast hebben we de navigatie van de website verbeterd met een nieuwe pagina: de 'Mijn Lessen' pagina. Eerst moesten gebruikers vanaf een overzichtspagina 'Alle Lessen' doorklikken naar de pagina van een bepaald Hoofdstuk en vervolgens daar de juiste les kiezen. 
    Dat kan sneller. Volgens het nieuwe ontwerp kunnen gebruikers vanaf een overzichtspagina 'Mijn Lessen' direct op een les klikken. Ook is een een button toegevoegd om direct naar de laatst afgespeelde les te gaan.`
    },
    //& School Match
    {name: 'school-match', date: '04.04.2022', subject: 'JS, CSS, MongoDB', title: `School match app voor studenten`, 
    link: 'https://github.com/rarooij98/bt_team4', linktext:'Bekijk project op Github', color: 'rgb(2, 39, 86)',
    description: 
    `Beslissen waar en wat je gaat studeren kan lastig zijn. Onze matchingsapp SchoolMatch helpt leerlingen bij het zoeken naar een nieuwe opleiding 
    door ze te matchen met scholen die aansluiten bij hun interesses. Dit is een webapp gebouwd met HTML, CSS en Javascript. We gebruikten MongoDB voor 
    onze database, Github voor versiebeheer en we gebruikten het MVC-model (model-view-controller).
    Tijdens dit project hebben we geleerd over version control, hosting en de backend, zoals het maken van een login functionaliteit en het inladen van data. 
    In een team van 6 studenten is ieder teamlid aan de slag gegaan met het bouwen van een onderdeel van de app. Aan het eind van het project hebben 
    we al onze features branches gemerged tot een samenhangend geheel.`,
    gallery_text_1: 
    `Voorkeuren. Zo werkt het: vanuit een persoonlijk account kun je jouw voorkeuren instellen. Wil je een bepaald onderwerp studeren, of moet je in een 
    bepaalde stad zijn? Aan de hand van deze informatie wordt je gekoppeld aan een aantal scholen die mogelijk bij je passen. Je kan vervolgens in contact komen 
    met een vertegenwoordiger van een school waarin je mogelijk geïnteresseerd bent, om vragen te stellen en meer informatie te verzamelen.`
    ,
    gallery_text_2: 
    `Teamwork. Vier teamleden zijn samen gaan werken aan de registratie- en login-functies die nodig waren om een ​​account aan te maken. 
    Zij hadden allemaal een individuele taak gerelateerd aan de inlogfunctie: (1) Het mogelijk maken om inloggegevens (e-mailadres en wachtwoord) te wijzigen,
    (2) Login met Google met Passport, (3) Een bevestigingsmail sturen met Nodemailer nadat iemand zich heeft geregistreerd en (4) Uitloggen, sessies starten/beëindigen.
    Ondertussen heb ik me gericht op het verkrijgen van informatie uit het formulier en het tonen van de juiste matches. 
    Een ander teamlid werkte aan het bouwen van een chat waarin gebruikers met vertegenwoordigers van de scholen konden praten.`
    ,
    gallery_text_3: 
    `Filters. Het was mijn taak om een ​​formulier te maken en de juiste matches uit onze database met scholen te laten zien.
    Eerst moesten enkele scholen aan onze database worden toegevoegd. Ik heb zo'n 15 scholen handmatig toegevoegd met gegevens over hun locatie, 
    opleidingsniveau en studierichtingen. Wanneer er een verzoek is, worden de scholen uit de database opgehaald met een request. Om deze data te filteren, heb ik bijvoorbeeld
    het gekozen niveau opgehaald uit het formulier en aan de request toegevoegd: 'const filtered = await scholen.find({niveau: keuze.niveau}, null)'. Alleen de scholen uit onze
    database die aan de voorkeuren voldoen worden nu weergegeven op de resultatenpagina.`
    },
    //& Color picker
    {name: 'color-picker', date: '25.08.2023', subject: 'React, CSS', title: `React color picker app`, link: 'https://rarooij98.github.io/ReactColorPicker', 
    linktext:'Naar live site', color: 'rgb(56, 75, 173)',
    description: 
    `Afgelopen zomer was ik op zoek naar een project om wat meer te leren over React. Dit project sprak me meteen aan vanwege alle vrolijke kleuren! 
    Deze color picker app is geinspireerd op deze site: https://materialuicolors.co/, en is gemaakt met behulp van de online React cursus van Colt Steele. 
    Gebruikers kunnen kleuren kopiëren in verschillende formats (rgb, rgba, hex) en eigen custom kleurpaletten toevoegen.`,
    gallery_text_1: 
    `ColorBoxes. Tijdens dit project heb ik kennis gemaakt met de React concepten components, props en state. Elke kleur in het kleurenpalet wordt gepresenteerd door een 'ColorBox', 
    dit is een component met de props 'name' en 'color'. Om het kleurenpalet te maken wordt er gemapt over alle ColorBoxes, zodat er voor elke kleur een box wordt weergeven. 
    Wanneer er op een kleur geklikt wordt verandert de state 'copied' naar True, en wordt een overlay weergeven met informatie over de gekopieerde kleur.`
    ,
    gallery_text_2: 
    `Navigatie. Vanaf de homepage kan naar alle bestaande kleurpaletten genavigeerd worden. Ik heb React Router gebruikt om de 'Routes' te definiëren, het pad naar elk kleurenpalet 
    kan worden gevonden met '/palette/:id'.`
    ,
    gallery_text_3: 
    `NewPaletteForm. Het toevoegen van een custom kleurenpalet is mogelijk met de functie submitPalette() in het component 'NewPaletteForm'. Deze functie voegt het nieuwe palet toe aan de lijst met alle paletten. Elke kleur die toegevoegd wordt, 
    wordt eerst gevalideerd: elke kleur en naam mag maar één keer in het palet voorkomen.`
    },
    //& Bio AR
    {name: 'AR-biologieboek', date: '18.11.2022', subject: 'Unity, C#, Blender', title: `AR app als aanvulling op de biologie les `, 
    link: 'https://vimeo.com/793366968?share=copy', linktext:'Bekijk project video', color: 'rgb(128, 55, 99)',
    description: 
    `Als onderdeel van de minor 'Designing for Emerging Technologies' heb ik een XR/AR prototype gemaakt voor gebruik in het onderwijs. Ik heb me bezig gehouden met de vraag: Hoe zou XR leerlingen kunnen helpen om de concepten in hun biologie boeken beter te begrijpen? 
    Ik vond biologie een mooi vak voor deze toepassing, want met een AR app kun je complexe biologische systemen zoals de werking van het zenuwstelsel visueel en begrijpelijk maken. 
    Het doel van deze app is om lessen extra leerzaam en leuk te maken voor de leerlingen, door biologische processen 3-dimensionaal en geanimeerd te laten zien en interactief maken.`,
    gallery_text_1: 
    `Roer-me-niet! Tijdens dit project heb ik me gefocust op het ‘roer-me-niet’ of ‘mimosa’ plantje. Deze plant is een veel gebruikt voorbeeld in biologieboeken, waarmee je het verschil kan uitleggen tussen gedrag en een impuls, want 
    deze plant sluit zijn bladeren als hij wordt aangeraakt. Met AR kunnen leerlingen zelf ervaren wat er gebeurt als ze de plant aanraken. `
    ,
    gallery_text_2: 
    `3D-model. Ik heb het prototype gemaakt in Unity met behulp van Vuforia. Het bestaat uit een Image Target, waar een 3D model bovenop komt te staan. Op die manier komt de plant bovenop het schoolboek te staan wanneer je er naar kijkt 
    met de AR app. Ik heb een afbeelding van het boek 'Biologie Voor Jou' voor havo 4 gebruikt als Image Target. In eerste instantie had ik een gratis asset gebruikt als 3D model, maar daarna heb ik mijn eigen Blender model gemaakt.
    `
    ,
    gallery_text_3: 
    `Interactie. Daarna heb ik aan dit model interactie en animatie toegevoegd. Dit heb ik gedaan door een paar regels C# te schrijven in een script dat ik heb toegevoegd aan de ARCamera van de scene. In dit script staat dat wanneer 
    de plant wordt aangeraakt, deze begint te krimpen. Wanneer de plant nog een keer aangeraakt wordt de scene gereset en is de plant weer teruggegroeid.`
    },
    //& Dashboard
    {name: 'CO2-dashboard', date: '28.09.2023', subject: 'Python, Plotly, Streamlit', title: `Live dashboard met data over hotels`, 
    link: 'https://github.com/rarooij98', linktext:'Naar live site', color: 'rgb(255 252 247)',
    description: 
    `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC,
    making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of
    the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical
    literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
    Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
    during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
    gallery_text_1: 
    `Title. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
    by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of 
    Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. `
    ,
    gallery_text_2: 
    `Title. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
    by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of 
    Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. `
    ,
    gallery_text_3: 
    `Title. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
    by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of 
    Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. `
    },
  ]
  
  const location = useLocation();
  
  // const GetProject = () => {
  //   let { project } = useParams();
  //   console.log(project);
  //   const currentProject = projects.find((x) => x.name === project);
  //   return <Single project={currentProject} key={currentProject.name} />;
  // };

  const GetProject = () => {
    const { project } = useParams();
    console.log('Project is: ', project);
  
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
            
            {/* <Route path='/' element={<Home projects={projects} />}/>
            <Route path='/:project' element={<GetProject />}/> */}
            
            <Route path={`${process.env.PUBLIC_URL}/`} element={<Home projects={projects} />} />
            <Route path={`${process.env.PUBLIC_URL}/:project`} element={<GetProject />} />
            
          </Routes>
        </AnimatePresence>
    </div>
  );
}

export default App;
