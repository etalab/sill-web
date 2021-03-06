import MuiLink from "@mui/material/Link";
import { createI18nApi, declareComponentKeys } from "i18nifty";
import { languages } from "sill-api";
import type { Language } from "sill-api";
import { assert } from "tsafe/assert";
import { statefulObservableToStatefulEvt } from "powerhooks/tools/StatefulObservable/statefulObservableToStatefulEvt";
export { declareComponentKeys };

export { languages };
export type { Language };

export const fallbackLanguage = "en";

const {
    useTranslation,
    resolveLocalizedString,
    useLang,
    $lang,
    useResolveLocalizedString,
} = createI18nApi<
    | typeof import("ui/components/shared/Header").i18n
    | typeof import("ui/components/shared/DescriptiveField").i18n
    | typeof import("ui/components/shared/ReferentDialogs").i18n
    | typeof import("ui/components/App/App").i18n
    | typeof import("ui/components/pages/FourOhFour").i18n
    | typeof import("ui/components/pages/Form/Form").i18n
    | typeof import("ui/components/pages/Form/FormAlikeSoftwares").i18n
    | typeof import("ui/components/pages/SoftwareCard/SoftwareCard").i18n
    | typeof import("ui/components/pages/SoftwareCard/DereferenceSoftwareDialog").i18n
    | typeof import("ui/components/pages/Account/Account").i18n
    | typeof import("ui/components/pages/Account/tabs/AccountInfoTab").i18n
    | typeof import("ui/components/pages/Account/tabs/AccountUserInterfaceTab").i18n
    | typeof import("ui/components/pages/Catalog/CatalogCards/CatalogCards").i18n
    | typeof import("ui/components/pages/Catalog/CatalogCards/CatalogCard").i18n
    | typeof import("ui/components/pages/Catalog").i18n
    | typeof import("ui/components/pages/Terms").i18n
    | typeof import("ui/components/App/Footer").i18n
    | typeof import("ui/components/KcApp/Login/LoginDivider").i18n
    | typeof import("ui/components/KcApp/Login").i18n
    | typeof import("ui/components/KcApp/RegisterUserProfile").i18n
    | typeof import("ui/components/shared/Tags/Tags").i18n
>()(
    { languages, fallbackLanguage },
    {
        "en": {
            "DereferenceSoftwareDialog": {
                "remove from sill": ({ softwareName }) =>
                    `Remove ${softwareName} from the SILL`,
                "cancel": "Cancel",
                "confirm": "Confirm",
                "reason": "Reason for dereferencing",
                "reason helper text":
                    "Please explain why this software should be removed from the SILL",
                "last recommended version": "Last recommended version",
            },
            "Account": {
                "infos": "Account information",
                "user-interface": "Interface preferences",
                "text1": "My account",
                "text2": "Access your account information.",
                "text3":
                    "Configure your username, emails, password and personal access tokens directly connected to your services.",
                "personal tokens tooltip":
                    "Password generated for you with a given validity period",
            },
            "AccountInfoTab": {
                "general information": "General information",
                "user id": "User ID (IDEP)",
                "full name": "Full name",
                "email": "Email address",
                "change account info": "Change account information (e.g., password).",
                "agency name": "Agency name",
                "agency name helper": "Name of your institution, for example DINUM",
                "not a valid email": "Not a valid email",
                "email helper":
                    "You'll use this email to connect to the platform and to be contacted by other users about the software you are referent of",
            },
            "AccountUserInterfaceTab": {
                "title": "Interface preferences",
                "enable dark mode": "Enable dark mode",
                "dark mode helper":
                    "Low light interface theme with dark colored background.",
            },
            "DescriptiveField": {
                "copy tooltip": "Copy to clipboard",
                "language": "Change language",
                "service password": "Password for your services",
                "service password helper text": `This password is required to log in to all of your services. 
            It is generated automatically and renews itself regularly.`,
                "not yet defined": "Not yet defined",
            },
            "RegisterUserProfile": {
                "minimum length": ({ n }) => `Minimum length: ${n}`,
                "must be different from email": "Password can't be the email",
                "password mismatch": "Passwords mismatch",
                "go back": "Go back",
                "form not filled properly yet":
                    "Please make sure the form is properly filled out",
                "must respect the pattern": "Must respect the pattern",
                "mail subject": "[SILL] Adding new mail domain to the accept list",
                "mail body": `
            Hello, 
            Would you, assuming it's granted, add my domain to the accept list.  

            Best regards,
            `,
                "use your administrative email": "Your administrative email",
                "you domain isn't allowed yet": ({ contactEmail, mailtoHref }) => (
                    <>
                        Your email domain isn't allowed yet. Contact us at{" "}
                        <MuiLink href={mailtoHref}>{contactEmail}</MuiLink>
                    </>
                ),
            },
            "Header": {
                "login": "Login",
                "logout": "Logout",
                "trainings": "Trainings",
                "documentation": "Documentation",
                "project": "Project",
            },
            "App": {
                "reduce": "Reduce",
                "account": "My account",
                "catalog": "Recommended Free Software catalog",
            },
            "FourOhFour": {
                "not found": "Page not found",
            },
            "CatalogCard": {
                "parent software": ({ name, link }) => (
                    <>
                        Plugin or distribution of{" "}
                        {link === undefined ? name : <MuiLink {...link}>{name}</MuiLink>}
                    </>
                ),
                "learn more": "Learn more",
                "try it": "Try it ????",
                "you are referent": ({ isOnlyReferent }) =>
                    `You are${isOnlyReferent ? " the" : ""} referent`,
                "declare oneself referent": "Declare yourself referent",
                "this software has no referent": "This software has not referent",
                "no longer referent": "I am no longer referent",
                "to install on the computer of the agent":
                    "To install on the computer of the agent",
                "authors": ({ doUsePlural }) => `Author${doUsePlural ? "s" : ""}`,
                "show referents": ({ isUserReferent, referentCount }) => {
                    if (isUserReferent) {
                        if (referentCount >= 3) {
                            return "see other referents";
                        }

                        if (referentCount === 2) {
                            return "see the other referent";
                        }

                        assert(false);
                    } else {
                        return `See referent${referentCount === 1 ? "" : "s"}`;
                    }
                },
            },
            "ReferentDialogs": {
                "close": "Close",
                "declare oneself referent of": ({ softwareName }) =>
                    `Declare yourself referent of ${softwareName}`,
                "cancel": "Cancel",
                "send": "Send",
                "declare oneself referent": "Declare yourself referent",
                "no longer referent": "I am no longer referent",
                "use case description": "Use case description",
                "use case description helper":
                    "Please describe in what context and to which extend this software is used in your agency",
                "i am a technical expert": "I am a technical expert",
                "on behalf of who are you referent": "On behalf of who are you referent?",
                "on my own behalf": "Only on my own behalf",
                "on my establishment behalf": "On my establishment's behalf",
                "yes": "Yes",
                "no": "No",
                "email": "Email",
                "establishment": "Establishment",
                "expert": "Technical expert",
                "institutional referent": "Institutional referent",
                "institutional referent help":
                    "Is the person referent in he's own name or in the name of it's establshment",
                "mail subject": ({ softwareName }) =>
                    `Initial contact for ${softwareName}`,
                "mail body": ({ softwareName }) => `
                Hello,
                I got your contact from sill.etalab.gouv.fr, you are referent fro ${softwareName}.  
                [...]
                `,
            },
            "CatalogCards": {
                "show more": "Show more",
                "no service found": "No software found",
                "no result found": ({ forWhat }) => `No result found for ${forWhat}`,
                "check spelling":
                    "Please check your spelling or try widening your search.",
                "go back": "Back to main services",
                "main services": "Main services",
                "search results": ({ count }) => `${count} Free software`,
                "search": "Search",
                "alike software": "Alike software",
                "other similar software":
                    "Others similar software that are not in the catalog",
                "reference a new software": "Reference a new software",
                "filter by tags": "Filter by tags",
            },
            "Catalog": {
                "header text1": "Recommended Free Software catalog",
                "header text2":
                    "Catalog of used and recommended free and open source software for administrative public services.",
                "what is the SILL": ({ href }) => (
                    <>
                        {" "}
                        <MuiLink href={href} target="_blank">
                            Click here
                        </MuiLink>{" "}
                        to learn more about what is the SILL.{" "}
                    </>
                ),
            },
            "Terms": {
                "no terms":
                    "No terms of service document provided for this instance of the SILL",
            },
            "Footer": {
                "contribute": "Contribute",
                "terms of service": "Terms of service",
                "change language": "Change language",
                "rss feed": "RSS Feed",
            },
            "LoginDivider": {
                "or": "or",
            },
            "Login": {
                "doRegister": "Create an account",
            },
            "Form": {
                "agentWorkstation": "Agent workstation",
                "agentWorkstation helper":
                    "Is it meant to be installed on the public agent workstation?",
                "cancel": "Cancel",
                "comptoirDuLibreId": "Comptoir du Libre ID",
                "comptoirDuLibreId helper":
                    "ID of the software on comptoir-du-libre.org (It's in the url, ex 67 for Gimp)",
                "function": "Software's function",
                "function helper": "What is the function of the software?",
                "invalid wikidata id": "Invalid wikidata id",
                "isFromFrenchPublicService":
                    "???????? Is developed by a French administration?",
                "isFromFrenchPublicService helper":
                    "Is the software developed by a French public service?",
                "license": "License",
                "license helper": "What is the license of the software? E.g. GPLv3",
                "mandatory field": "Mandatory field",
                "name": "Software's name",
                "name helper": "What is the name of the software?",
                "should be an integer": "Should be an integer",
                "create software": "Done",
                "update software": "Update software info",
                "versionMin": "Minimal version",
                "versionMin helper":
                    "What is the minimal acceptable version of the software?",
                "wikidata id already exists":
                    "There is already a software with this wikidata id in the SILL",
                "wikidataId": "Wikidata ID",
                "wikidataId helper":
                    "What is the wikidata id of the software? E.g. Q8038 for Gimp",
                "name already exists":
                    "There is already a software with this name in the SILL",
                "title add": "Add new software",
                "title edit": "Edit software",
                "help title add": "Declare that this software is in use in your agency",
                "help title edit": "Edit this software's information",
                "help": `Most information are automatically collected from wikidata.org
            It is important that you first fill in the Wikidata ID, the other fields will
            be filled automatically.  
            If the software do not exist yet in Wikidata you are more than welcome to 
            create an entry for it.
            `,
                "tags": "Tags",
                "tags helper": "Tags to help you find the software",
                "change tags": ({ selectedTagsCount }) =>
                    selectedTagsCount === 0 ? "Add tags" : "Add or remove tags",
                "confirm give up": "The software haven't been updated yet, confirm quit?",
            },
            "FormAlikeSoftwares": {
                "done": "Done",
                "similar to": "Similar software in the SILL",
                "add": "Add",
                "alternative to": "This software is an alternative to",
                "no similar software": "There isn't any similar software in the SILL",
                "no alternative": "Not an alternative to any other software",
            },
            "SoftwareCard": {
                "update software information": "Update software information",
                "software name": "Name of the software",
                "software function": "Software's function",
                "sill id": "SILL ID",
                "sill id helper": "Uniq ID in the SILL's database",
                "in sill from date": "Date of entry in the SILL",
                "dev by public service": "Developed by french public service",
                "present in support contract": "Present in the support contract",
                "learn more about the": "Learn more about",
                "MISEULL": "inter administration support contract",
                "yes": "Yes",
                "no": "No",
                "repo": "Source code repository",
                "website of the software": "Software's website",
                "minimal version": "Minimal acceptable version",
                "minimal version helper":
                    "Older version that it's still ok to have in production",
                "referents": "Referents",
                "referents helper":
                    "Public service agent that declares that this software is being used in their administrations",
                "see referents": "See referents",
                "parent software": "Parent software",
                "parent software helper":
                    "The software is a plugin, or a distribution of another software",
                "alike softwares": "Alike softwares",
                "alike softwares helper": "Known alternatives to this software",
                "workstation": "Agent workstation",
                "workstation helper":
                    "Is the software meant to be installed directly onto the agent computer, example: LibreOffice, counter example: Wordpress",
                "authors": "Authors",
                "authors helper":
                    "Authors, physical or moral entity behind the development of this software",
                "service provider": "Service provider",
                "service provider helper": "Company offering support for this software",
                "total service provider": ({ howMany }) =>
                    `${howMany} in total, see them on comptoir-du-libre.org`,
                "comptoir page": "Le Comptoir du Libre's page",
                "comptoir page helper":
                    "The Comptoir du Libre is a catalog published by ADULLACT",
                "see on comptoir": "Consult the page on comptoir-du-libre.org",
                "wikidata page": "Wikidata.org page",
                "wikidata page helper":
                    "Wikidata is a collaborative CC0 database from which we collect most of the information we display",
                "see on wikidata": "Consult wikidata.org page",
                "license": "License",
                "workshops replay": "Workshop replays",
                "workshops replay helper": "Replays of workshop about this software",
                "see all workshops": "See all workshops",
                "test url": "Try this software right now",
                "test url helper":
                    "If you are a french public agent you are entitled to test this software in your browser",
                "launch": "Launch ????",
                "workshop": ({ n }) => `Workshop n??${n}`,
                "use cases": "Use cases",
                "use cases helper":
                    "Documented use cases of the software in the french public services",
                "use case": ({ n }) => `Card n??${n}`,
                "tags": "Tags",
                "tags helper": "Tags that help find the software",
                "dereference from SILL": "Dereference from SILL...",
                "software dereferenced": ({
                    lastRecommendedVersion,
                    reason,
                }) => `This software is no longer recommended${
                    reason === undefined ? "" : `, ${reason}`
                }}.
                ${
                    lastRecommendedVersion === undefined
                        ? ""
                        : `Last acceptable version: ${lastRecommendedVersion}`
                }`,
            },
            "Tags": {
                "change tags": ({ isThereTagsAlready }) =>
                    isThereTagsAlready ? "Add or remove tags" : "Add tags",
                "github picker label": "Software tags",
                "github picker create tag": ({ tag }) => `Create the "${tag}" tag`,
                "github picker done": "Done",
                "tags": "Tags",
                "no tags": "No tags",
            },
        },
        "fr": {
            /* spell-checker: disable */
            "DereferenceSoftwareDialog": {
                "remove from sill": ({ softwareName }) =>
                    `Retirer ${softwareName} du SILL`,
                "cancel": "Annuler",
                "confirm": "Confirmer",
                "reason": "Raison du d??r??f??rencement",
                "reason helper text":
                    "Expliquez pourquoi le logiciel doit ??tre d??r??f??renc?? du SILL",
                "last recommended version": "Derni??re version recommand??e",
            },
            "Account": {
                "infos": "Information du compte",
                "user-interface": "Interface",
                "text1": "Mon compte",
                "text2": "Acc??dez aux informations de votre compte.",
                "text3":
                    "Configurez vos identifiant, courriel, mot de passe et jetons d'acc??s personnels directement connect??s ?? vos services.",
                "personal tokens tooltip": 'Ou en anglais "token".',
            },
            "AccountInfoTab": {
                "general information": "Informations g??n??rales",
                "user id": "Identifiant (IDEP)",
                "full name": "Nom complet",
                "email": "Adresse de courriel",
                "change account info":
                    "Modifier les informations du compte (comme, par exemple, votre mot de passe)",
                "agency name": "Nom de l'??tablissement de rattachement",
                "agency name helper": "Nom de votre institution, par example DINUM",
                "not a valid email": "Couriel non valid",
                "email helper":
                    "UtiliUtilis?? pour la connexion et pour que les utilisateurs puissent vous joindre ?? propos des logiciels dont vous ??tes r??f??rents?? pour la connexion et pour que les utilisateurs puissent vous joindre a propos des logiciels dont vous ??tes r??f??rent",
            },
            "AccountUserInterfaceTab": {
                "title": "Configurer l'interface",
                "enable dark mode": "Activer le mode sombre",
                "dark mode helper":
                    "Th??me de l'interface ?? faible luminosit?? avec un fond de couleur sombre.",
            },
            "DescriptiveField": {
                "copy tooltip": "Copier dans le presse-papier",
                "language": "Changer la langue",
                "service password": "Mot de passe pour vos services",
                "service password helper text": `Ce mot de passe est n??cessaire pour vous connecter ?? tous vos services. 
            Il est g??n??r?? automatiquement et se renouvelle r??guli??rement.`,
                "not yet defined": "Non d??finie",
            },
            "RegisterUserProfile": {
                "minimum length": ({ n }) => `Longueur minimale ${n}`,
                "must be different from email": "Ne peut pas ??tre le courriel",
                "password mismatch": "Les deux mots de passe ne correspondent pas",
                "go back": "Retour",
                "form not filled properly yet":
                    "Veuillez v??rifier que vous avez bien rempli le formulaire",
                "must respect the pattern": "Dois respecter le format",
                "mail subject":
                    "[SILL] Autorisation d'un nouveau domaine pour l'inscription",
                "mail body": `
            Bonjour, 

            veuillez, sous r??serve qu'il soit ??ligible, ajouter mon nom de domaine
            ?? la liste des domaines autoris??s pour s'inscrire sur la plateforme SILL.  

            Cordialement,
            `,
                "use your administrative email": "Votre courriel en tant qu'agent public",
                "you domain isn't allowed yet": ({ contactEmail, mailtoHref }) => (
                    <>
                        Votre domaine n'est pas encore autoris??. Contactez-nous ??{" "}
                        <MuiLink href={mailtoHref}>{contactEmail}</MuiLink>
                    </>
                ),
            },
            "Header": {
                "login": "Connexion",
                "logout": "D??connexion",
                "trainings": "Formations",
                "documentation": "Documentation",
                "project": "Projet",
            },
            "App": {
                "reduce": "R??duire",
                "account": "Mon compte",
                "catalog": "Catalogue des logiciels libres du SILL",
            },
            "FourOhFour": {
                "not found": "Page non trouv??e",
            },
            "CatalogCard": {
                "learn more": "En savoir plus",
                "try it": "Essayer ????",
                "you are referent": ({ isOnlyReferent }) =>
                    `Vous ??tes${isOnlyReferent ? " le" : ""} r??f??rent`,
                "authors": ({ doUsePlural }) => `Auteur${doUsePlural ? "s" : ""}`,
                "parent software": ({ name, link }) => (
                    <>
                        Plugin ou distribution de{" "}
                        {link === undefined ? name : <MuiLink {...link}>{name}</MuiLink>}
                    </>
                ),
                "declare oneself referent": "Me d??clarer r??f??rent",
                "this software has no referent": "Pas de r??f??rent",
                "no longer referent": "Je ne suis plus r??f??rent",
                "to install on the computer of the agent":
                    "?? installer sur le poste de travail de l'agent",
                "show referents": ({ isUserReferent, referentCount }) => {
                    if (isUserReferent) {
                        if (referentCount >= 3) {
                            return "voir les autres r??f??rents";
                        }

                        if (referentCount === 2) {
                            return "voir l'autre r??f??rent";
                        }

                        assert(false);
                    } else {
                        return referentCount === 1
                            ? "voir le r??f??rent"
                            : "voir les r??f??rents";
                    }
                },
            },
            "ReferentDialogs": {
                "close": "Fermer",
                "declare oneself referent of": ({ softwareName }) =>
                    `Me d??clarer r??f??rent pour ${softwareName}`,
                "cancel": "Annuler",
                "send": "Envoyer",
                "declare oneself referent": "Me d??clarer r??f??rent",
                "no longer referent": "Je ne suis plus r??f??rent",
                "use case description": "Description du cas d'usage",
                "use case description helper":
                    "D??crivez le cas d'usage de ce logiciel dans votre administration.",
                "i am a technical expert": "Je suis expert technique",
                "on behalf of who are you referent":
                    "Au nom de qui vous d??clarez-vous r??f??rent?",
                "on my own behalf": "En mon nom propre",
                "on my establishment behalf": "Au nom de mon ??tablissement",
                "yes": "Oui",
                "no": "Non",
                "email": "Couriel",
                "establishment": "??tablissement",
                "expert": "Expert technique",
                "institutional referent": "R??f??rent institutionnel",
                "institutional referent help": `Un r??f??rent institutionnel est r??f??rent au nom de l'??tablissement au quelle il est
                rattach??, les autres r??f??rents le son a titre personnel.`,
                "mail subject": ({ softwareName }) =>
                    `Prise de contacte relative ?? ${softwareName}`,
                "mail body": ({ softwareName }) => `
                Bonjour,
                J'ai obtenu votre contacte via sill.etalab.gouv.fr, vous ??tes r??f??rent pour ${softwareName}.  
                [...]
                `,
            },
            "CatalogCards": {
                "show more": "Afficher tous",
                "no service found": "Logiciel non trouv??",
                "no result found": ({ forWhat }) =>
                    `Aucun r??sultat trouv?? pour ${forWhat}`,
                "check spelling": `V??rifiez que le nom du service est correctement 
            orthographi?? ou essayez d'??largir votre recherche.`,
                "go back": "Retourner aux principaux services",
                "main services": "Principaux services",
                "search results": ({ count }) =>
                    `${count} logiciel libre${count === 1 ? "" : "s"}`,
                "search": "Rechercher",
                "alike software": "Logiciels similaires",
                "other similar software":
                    "Autres logiciels similaires qui ne sont pas dans le catalogue",
                "reference a new software": "R??f??rencer un nouveau logiciel",
                "filter by tags": "Filtrer par tags",
            },
            "Catalog": {
                "header text1": "Catalogue des logiciels libres du SILL",
                "header text2":
                    "Le catalogue des logiciels libres utilis??s et recommand??s pour les administrations",
                "what is the SILL": ({ href }) => (
                    <>
                        {" "}
                        <MuiLink href={href} target="_blank">
                            Cliquez ici
                        </MuiLink>
                        &nbsp;pour comprendre ce qu'est le SILL et quelles sont ses
                        missions
                    </>
                ),
            },
            "Terms": {
                "no terms":
                    "Pas de document de terms et condition fournis pour cette instance du SILL",
            },
            "Footer": {
                "contribute": "Contribuer au projet",
                "terms of service": "Conditions d'utilisation",
                "change language": "Changer la langue",
                "rss feed": "Flux RSS",
            },
            "LoginDivider": {
                "or": "ou",
            },
            "Login": {
                "doRegister": "Cr??er un compte",
            },
            "Form": {
                "agentWorkstation": "Ordinateur de l'agent",
                "agentWorkstation helper":
                    "S'installe sur le poste de travail de l'agent?",
                "cancel": "Annuler",
                "comptoirDuLibreId": "Identifiant dans le Comptoir du Libre",
                "comptoirDuLibreId helper":
                    "Identifiant du logiciel sur comptoir-du-libre.org (visible dans l'URL)",
                "function": "Fonction du logicel",
                "function helper":
                    "Fonction du logiciel (??diteur de texte, ??diteur de vid??o, etc.)",
                "invalid wikidata id": "Entit?? Wikidata invalide",
                "isFromFrenchPublicService": "???????? D??velopp?? par l'administration?",
                "isFromFrenchPublicService helper":
                    "Est-ce que le logicel est d??velopp?? par le service public francais?",
                "should be an integer": "Devrait ??tre un identifiant num??rique",
                "license": "Licence",
                "license helper": "Licence du logiciel (GNU GPL, BSD, etc.)",
                "mandatory field": "Ce champ est obligatoire",
                "name": "Nom du logiciel",
                "name helper": "Non du logiciel (GIMP, Inkscape, etc.)",
                "create software": "Terminer",
                "update software": "Mettre ?? jour les informations",
                "versionMin": "Version minimale",
                "versionMin helper":
                    "Quelle est la version minimale acceptable pour le logiciel?",
                "wikidata id already exists":
                    "Un logiciel avec cet identifiant existe d??j??",
                "wikidataId": "Entit?? Wikidata",
                "wikidataId helper":
                    "Quelle est l'entit?? Wikidata du logiciel, par exemple Q8038 pour GIMP",
                "name already exists": "Il existe d??j?? un logiciel avec ce nom",
                "title add": "R??f??rencer un nouveau logiciel",
                "title edit": "Editer une fiche",
                "help title add":
                    "D??clarez que ce logiciel est utilis?? au sein de votre administration.",
                "help title edit": "Mettre ?? jour la fiche SILL de ce logiciel",
                "help": `La plupart des informations sont collect??es automatiquement depuis wikidata.org.
            Il est important de renseigner l'entit?? Wikidata en premier, les autres champs 
            seront pr??remplis en fonction.  
            Si le logiciel n'a pas encore de fiche Wikidata, nous vous invitons ?? en cr??er une!`,
                "tags": "Tags",
                "tags helper": "Tags pour aider a trouver ce logiciel",
                "change tags": ({ selectedTagsCount }) =>
                    selectedTagsCount === 0 ? "Add tags" : "Add or remove tags",
                "confirm give up":
                    "Le logiciel n'a pas ??t?? mis ?? jour, confirmer l'abandon?",
            },
            "FormAlikeSoftwares": {
                "done": "OK",
                "similar to": "Logiciel similaire du SILL",
                "add": "Ajouter",
                "alternative to": "Ce logiciel est une alt??rnative ??",
                "no similar software": "Il n'y a pas de logiciel simillaire dans le SILL",
                "no alternative": "Pas une alternarive",
            },
            "SoftwareCard": {
                "update software information":
                    "Mettre ?? jour les informations du logiciel",
                "software name": "Nom du logiciel",
                "software function": "Fonction du logiciel",
                "sill id": "Identifiant SILL",
                "sill id helper":
                    "Identifiant unique dans la base de donn??es des logiciels du SILL",
                "in sill from date": "Date d'entr??e dans le SILL",
                "dev by public service": "D??velopp?? par le service public",
                "present in support contract": "Pr??sent dans le march?? de support",
                "learn more about the": "En savoir plus sur les",
                "MISEULL":
                    "march??s interminist??riels de support et d'expertise ?? l'usage des logiciels libres",
                "yes": "Oui",
                "no": "Non",
                "repo": "D??p??t de code source",
                "website of the software": "Site web du logiciel",
                "minimal version": "Version minimale requise",
                "minimal version helper":
                    "Version la plus ancienne qu'il est encore acceptable d'avoir en production",
                "referents": "R??f??rents",
                "referents helper":
                    "Agents du service public francais d??clarant utiliser le logiciel",
                "see referents": "Voir les r??f??rents",
                "parent software": "Logiciel parent",
                "parent software helper":
                    "Ce logiciel est un module ou une distribution d'un autre logiciel",
                "alike softwares": "Logiciels similaires",
                "alike softwares helper": "Alternative identifi??e ?? ce logiciel",
                "workstation": "Poste agent",
                "workstation helper":
                    "S'agit-il d'un logiciel s'installant directement sur le poste de l'agent (exemple: LibreOffice, contre-exemple: WordPress)?",
                "authors": "Auteurs",
                "authors helper":
                    "Auteurs, personne physique ou morale, ?? l'origine du d??veloppement du logiciel",
                "service provider": "Prestataire de service",
                "service provider helper":
                    "Entreprise proposant des prestations pour ce logiciel",
                "total service provider": ({ howMany }) =>
                    `${howMany} au total, les consulter sur le Comptoir du Libre`,
                "comptoir page": "Fiche sur le Comptoir du Libre",
                "comptoir page helper":
                    "Le Comptoir du Libre est un catalogue de logiciels libres publi?? par l'ADULLACT",
                "see on comptoir": "Consulter la fiche comptoir-du-libre.org",
                "wikidata page": "Fiche wikidata.org",
                "wikidata page helper":
                    "Wikidata est une base de connaissances collaborative et libre. La plupart des informations affich??es sont collect??es depuis wikidata.org",
                "see on wikidata": "Consulter la fiche wikidata.org",
                "license": "Licence",
                "workshops replay": "Visionnage des ateliers",
                "workshops replay helper":
                    "Rediffusion des ateliers BlueHats sur ce logiciel",
                "see all workshops":
                    "Voir tous les ateliers et ??tre averti des prochains",
                "test url": "Essayer ce logiciel maintenant",
                "test url helper":
                    "Si vous ??tes agent public, vous pouvez tester ce logiciel dans votre navigateur",
                "launch": "D??marrer ????",
                "workshop": ({ n }) => `Atelier n??${n}`,
                "use cases": "Cas d'usage",
                "use cases helper":
                    "Cas d'usage document?? d'une utilisation de ce logiciel au sein de l'administration.",
                "use case": ({ n }) => `Fiche n??${n}`,
                "tags": "Tags",
                "tags helper": "Tags aidant ?? trouver le logiciel",
                "dereference from SILL": "D??r??f??rencer du SILL...",
                "software dereferenced": ({
                    lastRecommendedVersion,
                    reason,
                }) => `Ce logiciel n'est plus recommand??${
                    reason === undefined ? "" : `??: ????${reason}????`
                }.
                ${
                    lastRecommendedVersion === undefined
                        ? ""
                        : `Derni??re version acceptable??: ${lastRecommendedVersion}`
                }`,
            },
            "Tags": {
                "change tags": ({ isThereTagsAlready }) =>
                    isThereTagsAlready
                        ? "Ajouter ou modifier les tags"
                        : "Ajouter des tags",
                "github picker label": "Tags du logiciel",
                "github picker create tag": ({ tag }) => `Cr??e le tag "${tag}"`,
                "github picker done": "Ok",
                "tags": "Tags",
                "no tags": "Aucun tag",
            },
            /* spell-checker: enable */
        },
    },
);

export { useTranslation, resolveLocalizedString, useLang, useResolveLocalizedString };

export const evtLang = statefulObservableToStatefulEvt({
    "statefulObservable": $lang,
});
