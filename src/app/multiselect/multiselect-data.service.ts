import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class MultiSelectDataService implements InMemoryDbService {

  decodeHTMLEntities(text) {
    const entities = [
      ['amp', '&'],
      ['apos', '\''],
      ['#x27', '\''],
      ['#x2F', '/'],
      ['#39', '\''],
      ['#47', '/'],
      ['lt', '<'],
      ['gt', '>'],
      ['nbsp', ' '],
      ['quot', '"']
    ];

    for (let i = 0, max = entities.length; i < max; ++i) {
      text = text.replace(new RegExp('&' + entities[i][0] + ';', 'g'), entities[i][1]);
    }
    return text;
  }

  createDb() {
    const categories = [];
    const _categories = [
      'Literatuur &amp; Romans',
      'Thrillers',
      'Fantasy',
      'Kinderboeken',
      'Young Adult',
      'Kookboeken',
      'Reisboeken',
      'Kunst, Fotografie &amp; Architectuur',
      'Psychologie',
      'Gezin &amp; Gezondheid',
      'Managementboeken',
      'Alle boeken',
      'Nederlandstalige boeken',
      'Engelstalige boeken',
      'Duits',
      'Frans',
      'Spaans',
      'Ebooks &amp; E-readers',
      'Nieuw: Kobo Plus abonnement',
      'Kobo Plus ebooks',
      'Ebooks',
      'De voordelen van ebooks',
      'Top 100 Engelstalig',
      'Top 1000 Nederlandstalig',
      'Nieuw verschenen',
      'Te reserveren',
      'Boekenzomer',
      'Tweedehands boeken',
      'Verkoop je boeken',
      'Zelf je boek uitgeven',
      'Lees Magazine',
      'Outlet',
      'Muziek',
      'Cd&#x27;s',
      'Lp&#x27;s',
      'Dvd&#x27;s &amp; Blu-rays',
      'Top 100 album',
      'Alle muziek',
      'Films &amp; Tv-series',
      'Film',
      'Tv-series',
      'Documentaires',
      'Top 100 films &amp; tv-series',
      'Blu-rays',
      'Alle films &amp; tv-series',
      'Games',
      'Playstation 4',
      'Xbox One',
      'Nintendo Switch',
      'PC Gaming',
      'Nintendo 2DS/3DS',
      'Alle platformen',
      'Virtual Reality',
      'Gamedownloads',
      'Te reserveren ',
      'Gameconsoles &amp; -accessoires',
      'Alle games',
      'Fanshops',
      'Disney shop',
      'HBO shop',
      'Alle fanshops',
      'Advies over consoles',
      'Festival musthaves',
      'New Music Friday',
      'Muziek- &amp; Filmdeals',
      'Computer',
      'Laptops',
      'Desktops',
      'Monitoren',
      'Pc-accessoires',
      'Tassen &amp; Hoezen',
      'Inktcartridges &amp; Toners',
      'Software',
      'Netwerk &amp; Internet',
      'Alle computerartikelen',
      'Telefonie',
      'Telefoonaccessoires',
      'Smartphones',
      'Tablets',
      'Tabletaccessoires',
      'Activity trackers',
      'Smartwatches',
      'E-readers',
      'Domotica',
      'Gps-systemen',
      'Audio &amp; Hifi',
      'Draadloze speakers',
      'Soundbars',
      'Koptelefoons',
      'Bluetoothspeakers',
      'Alle audio &amp; hifi',
      'Televisies',
      'Receivers &amp; Versterkers',
      'Home Cinema',
      'Fotocamera&#x27;s',
      'Videocamera&#x27;s',
      'Huishoudelijke apparaten',
      'Tuin- &amp; Klusgereedschap',
      'Persoonlijke verzorging',
      'Speelgoed',
      'Puzzels',
      'Spellen',
      'Baby &amp; Peuter',
      'Bouwen &amp; Constructie',
      'Voertuigen',
      'Poppen &amp; Knuffels',
      'Educatief speelgoed',
      'Rollenspel',
      'Houten speelgoed',
      'Speelfiguren',
      'Alle speelgoed',
      'Verkleedkleding',
      'Feestartikelen',
      'Buitenspeelgoed',
      'Loopfietsen',
      'Stepjes',
      'Trampolines',
      'Alle buitenspeelgoed',
      'Hobby &amp; Creatief',
      'Knutselen voor kinderen',
      'Schilderen &amp; Tekenen',
      'Textiel &amp; Handwerken',
      'Home deco',
      'Modelbouw',
      'Modelspoor',
      'RC voertuigen',
      'Drones',
      'Alle hobby &amp; creatief',
      'Populaire personages',
      'Bekend van TV',
      'Fidget spinners',
      'Hoverboards',
      'LEGO',
      'PLAYMOBIL',
      'VTech',
      'Fisher-Price',
      'NERF',
      'Speelgoedacties',
      'Kinderkleding',
      'Babykleding',
      'Meisjeskleding',
      'Jongenskleding',
      'Nieuw binnen',
      'Communiekleding',
      'Sale',
      'Kleding voor mama',
      'Zwangerschapskleding',
      'Voedingskleding',
      'Luiers &amp; Verzorging',
      'Luiers',
      'In bad',
      'Alle verzorging',
      'Babyfoons',
      'Babykamer',
      'Kinderkamer',
      'Beddengoed',
      'Stoeltjes',
      'Wipstoeltjes',
      'Veiligheid',
      'Babyboxen',
      'Baby- &amp; Peuterspeelgoed',
      'Eten &amp; Drinken',
      'Babyvoeding',
      'Borstkolven',
      'Babyflesjes',
      'Alle eten &amp; drinken',
      'Onderweg',
      'Autostoeltjes',
      'Fietsstoeltjes',
      'Buggy&#x27;s',
      'Kinderwagens',
      'Draagzakken &amp; -doeken',
      'Alles voor onderweg',
      'Geboortegeschenken',
      'Babycadeaus',
      'Geboortelijst',
      'Alle babyartikelen',
      'Luxe cosmetica',
      'Make-up',
      'Damesparfum',
      'Herenparfum',
      'Alle parfum',
      'Luxe verzorging',
      'Lichaamsverzorging',
      'Haarverzorging',
      'Gezichtsverzorging',
      'Scheren &amp; Ontharen',
      'Mondverzorging',
      'Zonbescherming',
      'Alle persoonlijke verzorging',
      'Gezondheid',
      'Voedingssupplementen',
      'Oordopjes',
      'Afslanken',
      'Zwangerschapstests',
      'Optiek',
      'Erotiek',
      'Alle gezondheid',
      'Apparatuur',
      'Elektrische tandenborstels',
      'Scheren &amp; Trimmen',
      'Elektrisch ontharen',
      'Haarstyling',
      'Bloeddrukmeters',
      'Alle apparatuur',
      'Nieuwe producten',
      'Luxe collectie',
      'Top 10 damesgeuren',
      'Drogisterij acties',
      'Huishoudmiddelen',
      'Stijl Magazine',
      'Merken',
      'Rituals',
      'L&#x27;Oréal Paris',
      'Alle luxe merken',
      'Alle Mooi &amp; Gezond',
      'Juwelen',
      'Damesjuwelen',
      'Herenjuwelen',
      'Kinderjuwelen',
      'Nieuwe collectie',
      'Horloges ',
      'Dameshorloges',
      'Herenhorloges',
      'Kinderhorloges',
      'Handtassen &amp; Lederwaren',
      'Damestassen',
      'Herentassen',
      'Kindertassen',
      'Portemonnees',
      'Creditcardhouders',
      'Modeaccessoires',
      'Zonnebrillen',
      'Riemen',
      'Handschoenen',
      'Beenmode',
      'Sloffen',
      'Cadeautips',
      'Luxe assortiment',
      'Back to school',
      'Michael Kors',
      'Casio',
      'Guess',
      'Ti Sento',
      'Melano',
      'Ray-Ban',
      'Sport',
      'Fitness &amp; Yoga',
      'Voetbal',
      'Strand &amp; Zwemmen',
      'Sporthorloges',
      'Alle sporten',
      'Sportkleding',
      'Dames',
      'Heren',
      'Kinderen',
      'Sportschoenen',
      'Sneakers',
      'Slippers',
      'Alle sportschoenen',
      'Outdoor',
      'Kamperen',
      'Kleding &amp; Schoenen',
      'Alles voor outdoor',
      'Reiskoffers &amp; Tassen',
      'Reiskoffers',
      'Rugzakken &amp; Backpacks',
      'Reisaccessoires',
      'Alle reisartikelen',
      'Fietsen',
      'Complete fietsen',
      'Onderdelen &amp; Accessoires',
      'Alles voor fietsen',
      'Nike',
      'adidas',
      'Under Armour',
      'PUMA',
      'Eastpak',
      'Samsonite',
      'Vakantie',
      'Festival',
      'Nieuwe sportkleding',
      'Nieuwe koffers &amp; tassen',
      'Kantoor',
      'Papier',
      'Schrijfgerief',
      'Notitieboeken',
      'Bureau-accessoires',
      'Whiteboards &amp; Prikborden',
      'Archiveren &amp; Organiseren',
      'Verpakken &amp; Verzenden',
      'Geldverwerking',
      'Alle kantoorartikelen',
      'Agenda’s &amp; Kalenders',
      'Agenda’s',
      'Kalenders',
      'Agendavullingen',
      'Schoolspullen',
      'Schoolagenda&#x27;s',
      'Rekenmachines',
      'Schriften',
      'Schrijfblokken',
      'Schrijfwaren',
      'Etuis',
      'Mappen',
      'Schoolboeken',
      'Studieboeken',
      'Rugzakken',
      'Alle schoolspullen',
      'Computers &amp; Laptops',
      'Computers',
      'Dataopslag',
      'Printers',
      'Laptoptassen &amp; -hoezen',
      'Bureaus',
      'Bureaustoelen',
      'Beamers',
      'Bureauverlichting',
      'Archiefkasten',
      'Wonen',
      'Zetels',
      'Tafels',
      'Stoelen',
      'Kasten',
      'Bedden &amp; Matrassen',
      'Woonaccessoires',
      'Badtextiel',
      'Raamdecoratie',
      'Verlichting',
      'Vloerkleden',
      'Alles voor wonen',
      'Koken &amp; Tafelen',
      'Potten &amp; Pannen',
      'Barbecues',
      'Kookbenodigdheden',
      'Servies',
      'Glazen',
      'Bestek',
      'Koffie',
      'Alle koken &amp; tafelen',
      'Keukenapparaten',
      'Koffiemachines',
      'Keukenmachines',
      'Koelen &amp; Vriezen',
      'Microgolfovens',
      'Alle keukenapparaten',
      'Huishouden',
      'Vuilbakken',
      'Droogmolens',
      'Opbergen',
      'Schoonmaken',
      'Strijken',
      'Voedsel bewaren',
      'Stofzuigers',
      'Droogkasten',
      'Wasmachines',
      'Alle huishouden',
      'Alle huishoudelijke apparaten',
      'Tuin',
      'Tuinmeubelen',
      'Bewatering',
      'Zonwering',
      'Vijvers',
      'Bloemen &amp; Planten',
      'Tuinaanleg',
      'Insecten &amp; Ongedierte',
      'Buitenverlichting',
      'Grond &amp; Bemesting',
      'Onkruidbestrijding',
      'Tuininrichting',
      'Partytenten',
      'Terrasverwarmers',
      'Alles voor de tuin',
      'Tuingereedschap',
      'Hogedrukreinigers',
      'Grasmaaiers',
      'Snoeigereedschap',
      'Alle tuingereedschap',
      'Elektrisch gereedschap',
      'Handgereedschap',
      'Accuboormachines',
      'Verf',
      'Behang',
      'Deuren &amp; Ramen',
      'Badkamer &amp; Sanitair',
      'Keuken',
      'Centrale verwarming',
      'Elektra',
      'Inbraakbeveiliging',
      'Brandbeveiliging',
      'Opbergen &amp; Verhuizen',
      'Bouwmaterialen',
      'IJzerwaren',
      'Werkkleding &amp; Bescherming',
      'Alles om te klussen',
      'Hond',
      'Hondenvoer',
      'Verzorging',
      'Manden &amp; Kussens',
      'Hondenspeelgoed',
      'Riemen &amp; Accessoires',
      'Alles voor puppy&#x27;s',
      'Alles voor honden',
      'Paard',
      'Paardendekens',
      'Zadeldekjes',
      'Halsters',
      'Alles voor paarden',
      'Kat',
      'Kattenvoer',
      'Kattenbakken &amp; Accessoires',
      'Kattenbakvulling',
      'Krabpalen',
      'Alles voor kittens',
      'Alles voor katten',
      'Ruiter',
      'Laarzen &amp; Schoenen',
      'Paardrijcaps',
      'Paardrijhandschoenen',
      'Paardrijbroeken',
      'Alles voor ruiters',
      'Alles voor vissen',
      'Alles voor reptielen',
      'Alles voor knaagdieren',
      'Alles voor konijnen',
      'Alles voor kippen',
      'Alles voor binnenvogels',
      'Alles voor buitenvogels',
      'Dier- &amp; Drogisterijacties'
    ];

    _categories.sort( (a, b) => {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }).forEach((category, index) =>
      categories.push(
        Object.assign({}, { id: index, name: ( category.indexOf('&') > -1 ) ? this.decodeHTMLEntities(category) : category })
      )
    );

    return { categories };
  }
}

