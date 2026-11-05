// Schede erbe – lotto 1. Testi riformulati in chiave di tradizione erboristica.
const ERBE_LOTTO_1 = [
  {
    slug: "cannella",
    nome: "Cannella",
    titolo: "Cannella: uso tradizionale, proprietà e avvertenze",
    intro: "Già citata nella Bibbia e usata dagli antichi Egizi nelle pratiche di imbalsamazione, la cannella è una delle spezie più antiche conosciute. Nell'antichità era considerata più preziosa dell'oro: i mercanti arabi, per proteggere il monopolio del commercio, raccontavano storie fantastiche sulla sua origine. Originaria dello Sri Lanka, si è poi diffusa in Madagascar, Malesia e Antille.",
    varieta: "Esistono due tipi principali. La Ceylon (Cinnamomum verum), più pregiata e delicata, contiene pochissima cumarina. La Cassia (Cinnamomum cassia), più economica e diffusa, ne contiene quantità molto più elevate: la cumarina, assunta in dosi elevate e continuative, può essere dannosa per il fegato. Per un consumo quotidiano e prolungato, la Ceylon è la scelta più sicura.",
    proprieta: [
      "Contiene cinnamaldeide, eugenolo, tannini e polifenoli, oltre all'olio essenziale che ne determina l'aroma",
      "Tradizionalmente attribuita a digestione e alleviamento del gonfiore",
      "Tradizionalmente attribuita a carminazione (riduzione dei gas intestinali)",
      "Tradizionalmente attribuita al metabolismo degli zuccheri: il tannino è oggetto di studi preliminari",
      "Ricca di antiossidanti, oggetto di studi di laboratorio",
      "L'olio essenziale mostra attività antimicrobica in laboratorio, tradizionalmente sfruttata per il benessere del cavo orale",
      "Tradizionalmente considerata riscaldante e stimolante della circolazione"
    ],
    usi: "Tradizionalmente si prepara come tisana o tintura madre dopo un pasto abbondante. Nelle bevande calde invernali si usa insieme a zenzero e chiodi di garofano.",
    controindicazioni: "Un consumo eccessivo e continuativo di cassia può affaticare fegato e reni, a causa della cumarina: evitarne un uso elevato in caso di ridotta funzionalità epatica o renale. Chi assume farmaci anticoagulanti o per la glicemia dovrebbe evitare estratti e integratori senza il parere di un professionista. L'uso come spezia in cucina, nelle quantità abituali, è considerato sicuro per la maggior parte delle persone.",
    prodotti: [
      { nome: "Cannella in polvere 35 g", link: "https://www.erbedimauro.it/it/spezie/175-cannella-in-polvere.html?affp=66578" }
    ],
    immagine: "cannella.jpg"
  },
  {
    slug: "achillea",
    nome: "Achillea",
    titolo: "Achillea: uso tradizionale, proprietà e avvertenze",
    intro: "Il nome deriva dal mito di Achille, l'eroe della guerra di Troia. Secondo Plinio, il centauro Chirone consigliò ad Achille di usarla per curare le ferite dei soldati. In campagna la pianta era usata anche per conservare il vino.",
    proprieta: [
      "Contiene olio essenziale, flavonoidi, acidi fenolici, cumarine, tannini e lattoni sesquiterpenici",
      "Tradizionalmente attribuita a digestione e sostegno delle funzioni del fegato (azione amara e colagoga)",
      "Tradizionalmente attribuita a sollievo dei crampi digestivi (azione spasmolitica)",
      "Tradizionalmente usata per le ferite e la pelle irritata (azione cicatrizzante e astringente)",
      "L'olio essenziale è oggetto di studi di laboratorio su dolori muscolari e tensioni"
    ],
    usi: "Tradizionalmente si prepara come infuso al 5% prima dei pasti, anche con anice o basilico. Per uso esterno si usano infusi e decotti su piccole ferite, punture di insetto e pelle arrossata. Nella tradizione erboristica si usa anche per il ciclo mestruale irregolare.",
    controindicazioni: "Possibili allergie, soprattutto in chi è allergico alle Asteraceae. Evitare in gravidanza e allattamento per precauzione. Può interagire con anticoagulanti e antipertensivi. Dopo applicazione cutanea può causare fotosensibilità: evitare l'esposizione solare. L'olio essenziale non va usato in età pediatrica.",
    prodotti: [
      { nome: "Achillea Millefoglie, tisana 50 g, 500 g e 1 kg", link: "https://www.erbedimauro.it/it/tisane-depurative/69-273-achillea-millefoglie-tisana.html?affp=66578#/confezione-50_g" },
      { nome: "Super Depur, tisana con achillea, calendula e ortica", link: "https://www.erbedimauro.it/it/tisane-depurative/45-342-tisana-super-depur.html?affp=66578#/confezione-50_g" }
    ],
    immagine: "achillea.jpg"
  },
  {
    slug: "aglio",
    nome: "Aglio",
    titolo: "Aglio: uso tradizionale, proprietà e avvertenze",
    intro: "Nel mondo greco-romano l'aglio era associato alla protezione e alla purificazione. I soldati romani lo portavano nelle battaglie come portafortuna. Nella mitologia greca era legato a Ecate, dea della magia.",
    proprieta: [
      "Ricco di allicina e garlicina, composti solforati oggetto di studi di laboratorio per l'attività antimicrobica",
      "Tradizionalmente attribuito al sostegno del sistema immunitario",
      "Oggetto di studi sul controllo della pressione arteriosa e del profilo lipidico",
      "Antiossidante, oggetto di studi di laboratorio",
      "Tradizionalmente attribuito al sostegno del cuore e della circolazione",
      "Studi preliminari suggeriscono un possibile effetto prebiotico sul microbiota intestinale"
    ],
    usi: "Consumato crudo o cotto come alimento, in piccole quantità. Tradizionalmente si usa anche come integratore sotto forma di aglio fermentato, come quello nero.",
    controindicazioni: "Il suo effetto ipotensivo può causare capogiri in chi ha la pressione bassa. Ha una leggera azione anticoagulante: attenzione se si assumono FANS o anticoagulanti, o in caso di flusso mestruale abbondante. Evitarlo in caso di emorroidi, perché un consumo costante può infiammare. Il contatto diretto con la pelle o le mucose può causare irritazioni.",
    prodotti: [
      { nome: "Aglio Nero Italiano, fermentato, 100 g", link: "https://www.erbedimauro.it/it/superfood/5-aglio-nero-voghiera.html?affp=66578" }
    ],
    immagine: "aglio.jpg"
  },
  {
    slug: "agrimonia",
    nome: "Agrimonia",
    titolo: "Agrimonia: uso tradizionale, proprietà e avvertenze",
    intro: "Conosciuta fin dall'antichità greca e romana. Il nome latino eupatoria deriva da Mitridate VI Eupatore, re del Ponto, noto per le sue conoscenze di erboristeria. Nella medicina ippocratica e galenica era considerata una pianta per 'purificare il sangue' e riequilibrare gli umori.",
    proprieta: [
      "Contiene triterpeni, tannini e acido ursolico",
      "Tradizionalmente attribuita al sostegno del fegato e della bile (azione coleretica e colagoga)",
      "Oggetto di studi preliminari sul metabolismo degli zuccheri, con effetti limitati a casi lievi",
      "Tradizionalmente usata su pelle e ferite per la sua azione astringente e cicatrizzante",
      "Oggetto di studi di laboratorio per attività antinfiammatoria e antisettica",
      "Tradizionalmente usata per il benessere di gola e vie respiratorie (azione decongestionante e astringente)"
    ],
    usi: "Tradizionalmente si usano le sommità fiorite in infuso. Per uso esterno si impiega come lavanda o impacco su piccole lesioni cutanee.",
    controindicazioni: "Se usata per breve periodo, di solito non dà effetti collaterali. È sconsigliata durante gravidanza e allattamento.",
    prodotti: [],
    immagine: "agrimonia.jpg"
  },
  {
    slug: "alchechengi",
    nome: "Alchechengi",
    titolo: "Alchechengi: uso tradizionale, proprietà e avvertenze",
    intro: "Nota già a Dioscoride e Galeno, la pianta è diffusa in Asia, Europa e nel Mediterraneo. Nella tradizione simboleggia la protezione e la vita che permane oltre la morte. Nell'antichità era sacra a Venere e usata per la protezione della casa.",
    proprieta: [
      "Contiene vitamina C in quantità notevole, carotenoidi e luteina, antiossidanti oggetto di studi di laboratorio",
      "Contiene tannini e mucillagini, responsabili delle proprietà astringenti",
      "Tradizionalmente attribuito a un'azione diuretica",
      "Tradizionalmente usato come sostegno delle vie urinarie: studi preliminari suggeriscono un ruolo nella prevenzione dei calcoli",
      "Oggetto di studi di laboratorio per attività antimicrobica e antinfiammatoria",
      "I carotenoidi sono associati alla salute della vista"
    ],
    usi: "Il frutto è considerato un alimento sicuro, da consumare in quantità moderate nell'ambito di un'alimentazione varia. Tradizionalmente il frutto essiccato e polverizzato è usato come integratore.",
    controindicazioni: "Il frutto non presenta particolari controindicazioni, ma può interferire con alcuni farmaci, come i diuretici. Le foglie che circondano il frutto contengono solanina, tossica in dosi elevate: non vanno consumate.",
    prodotti: [],
    immagine: "alchechengi.jpg"
  },
  {
    slug: "alliaria",
    nome: "Alliaria",
    titolo: "Alliaria: uso tradizionale, proprietà e avvertenze",
    intro: "Usata fin dai tempi antichi per la medicazione delle piaghe. Nel 1666 Simon Pauli la descriveva come capace di pulire le ulcere, e Leclerc la indicava per i geloni ulceranti. Cresce spontanea lungo i sentieri.",
    proprieta: [
      "Contiene carotenoidi, oli essenziali, mirosa sinigrina e saponine",
      "Tradizionalmente attribuita all'azione espettorante, utile nelle tossi catarrali",
      "Tradizionalmente usata per la pulizia di ferite e geloni (azione antisettica)",
      "Tradizionalmente attribuita a un'azione diuretica",
      "Tradizionalmente usata su pelle e mucose (azione vulneraria)",
      "Ricca di vitamina C"
    ],
    usi: "Tradizionalmente si usa il succo fresco su piaghe, con medicazioni giornaliere. Gli infusi di foglie e fiori si usano per il catarro. I semi, simili a quelli della senape, si usano come condimento.",
    controindicazioni: "Non ci sono controindicazioni specifiche. Va consumata con moderazione: un consumo eccessivo può causare disturbi gastrointestinali lievi. Chi è allergico alle Brassicaceae deve usarla con cautela.",
    prodotti: [],
    immagine: "alliaria.jpg"
  },
  {
    slug: "altea",
    nome: "Altea",
    titolo: "Altea: uso tradizionale, proprietà e avvertenze",
    intro: "Conosciuta anche come la Fata Verde, l'altea (Althaea officinalis) ha una lunga storia nelle tradizioni erboristiche. Era piantata nei giardini dei monasteri, e nella tradizione popolare era usata come dono e come simbolo di purezza.",
    proprieta: [
      "Ricca di mucillagini e polisaccaridi, responsabili delle sue proprietà",
      "Tradizionalmente attribuita a un'azione emolliente, utile per gola e tosse irritativa",
      "Tradizionalmente attribuita a un'azione antinfiammatoria sulle mucose gastriche e intestinali",
      "Tradizionalmente attribuita a un'azione cicatrizzante su pelle secca e irritata",
      "I polisaccaridi della radice sono oggetto di studi di laboratorio per un possibile effetto immunomodulante"
    ],
    usi: "Tradizionalmente si usa il decotto di radice o foglie per gargarismi e risciacqui della bocca. Per uso esterno si usa su pelle irritata e punture d'insetto. Nella tradizione popolare la radice veniva data ai bambini durante la dentizione, avendo cura che non venisse inghiottita.",
    controindicazioni: "È un rimedio sicuro se si rispettano i normali dosaggi. Va evitata in caso di allergia. Le mucillagini possono ridurre l'assorbimento di alcuni farmaci e nutrienti: assumere a distanza dai farmaci e chiedere consiglio al medico.",
    prodotti: [],
    immagine: "altea.jpg"
  },
  {
    slug: "anemone-pulsatilla",
    nome: "Anemone Pulsatilla",
    titolo: "Anemone Pulsatilla: uso tradizionale, proprietà e avvertenze",
    intro: "Detta anche 'fiore del vento', è una delle prime piante a fiorire in primavera, spesso ancora sulla neve. Conosciuta anche come 'erba del diavolo' per la sua tossicità allo stato fresco, è una pianta che non va mai raccolta né preparata in casa.",
    proprieta: [
      "Contiene anemonina, un alcaloide irritante allo stato puro",
      "Nella pratica omeopatica e fitoterapica standardizzata è tradizionalmente usata per il ciclo femminile e i disturbi premestruali",
      "Tradizionalmente attribuita a un'azione antispasmodica",
      "Tradizionalmente usata come calmante e per il sonno nei preparati omeopatici",
      "Tradizionalmente attribuita a un'azione diaforetica e diuretica"
    ],
    usi: "Non si usa fresca. I preparati in commercio derivano da fiori essiccati, in tintura madre o granuli omeopatici, prodotti industrialmente. Qualsiasi uso va fatto solo con la supervisione di un medico o di un omeopata.",
    controindicazioni: "La pianta fresca è tossica: il contatto con pelle o mucose può irritare, e l'ingestione può causare nausea, vomito, diarrea e, in dosi elevate, disturbi cardiaci e respiratori. È controindicata in gravidanza, allattamento, gastrite, malattie del fegato ed emorragie intestinali.",
    prodotti: [],
    immagine: "anemone.jpg"
  },
  {
    slug: "anice",
    nome: "Anice",
    titolo: "Anice: uso tradizionale, proprietà e avvertenze",
    intro: "Già usato dagli antichi Egizi, legato alla dea Iside. Greci e Romani lo consideravano un afrodisiaco e un rimedio per gli incubi infantili. Plinio il Vecchio ne scrisse diffusamente.",
    proprieta: [
      "Tradizionalmente attribuito all'azione antifermentativa e carminativa, utile contro il meteorismo",
      "Tradizionalmente attribuito all'azione colagoga, che favorisce la secrezione biliare",
      "Tradizionalmente attribuito all'azione spasmolitica e mucolitica, utile per la tosse e i catarri",
      "Tradizionalmente attribuito alla secrezione del latte (azione galattogoga)",
      "Oggetto di studi in cui sono state usate dosi molto superiori a quelle alimentari, con effetti sul metabolismo degli zuccheri"
    ],
    usi: "Tradizionalmente si usa come estratto, semi o decotto, dopo i pasti. È una spezia usata anche in cucina.",
    controindicazioni: "È considerato sicuro se usato come spezia nelle quantità tipiche di un'alimentazione varia. Il limite considerato sicuro come integratore è di circa 20 g al giorno, una quantità molto superiore al consumo abituale.",
    prodotti: [],
    immagine: "anice.jpg"
  }
];
