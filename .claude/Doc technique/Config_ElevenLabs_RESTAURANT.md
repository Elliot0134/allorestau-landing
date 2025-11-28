# Configuration Agent Vocal : LE JARDIN DES SAVEURS (Démo AlloRestau)

## 1. VUE D'ENSEMBLE

**Client** : AlloRestau - Démo interactive Restaurant Gastronomique
**Secteur** : Restaurant gastronomique fictif pour démonstration B2B
**Objectif principal** : Démontrer les capacités d'AlloRestau pour un établissement haut de gamme tout en générant des leads commerciaux
**Niveau de complexité** : Intermédiaire (5 nœuds)

**Restaurant fictif** : Le Jardin des Saveurs
**Concept** : Restaurant gastronomique français, cuisine de saison, accord mets-vins
**Localisation fictive** : 8 Rue de la Paix, 33000 Bordeaux
**Capacité** : 35 couverts
**Chef** : Chef fictif Laurent Morel (formation chez Ducasse)

---

## 2. ARCHITECTURE DU WORKFLOW

### Diagramme

```mermaid
graph TD
    A[Routeur Principal - Amélie] -->|Réservation/Menu| B[Agent Restaurant - Amélie]
    A -->|Questions AlloRestau| C[Agent Démo - Amélie]
    A -->|Humain demandé| D[Transfer to Number]
    B -->|Réservation validée| E[Dispatch: Webhook Réservation]
    C -->|Intérêt démo| F[Dispatch: Webhook Calendly]
    C -->|Intérêt Aurentia| G[Dispatch: Webhook Site Aurentia]
    E --> H[Confirmation & Relance Démo]
    F --> I[Confirmation Redirection Calendly]
    G --> J[Confirmation Redirection Aurentia]
    H --> K[End Call]
    I --> K
    J --> K
    D --> K
```

### Liste des nœuds

| ID | Type | Nom | Description |
|----|------|-----|-------------|
| router | Subagent | Routeur Principal | Point d'entrée, accueil élégant, identifie l'intention |
| agent_restaurant | Subagent | Agent Restaurant | Mode restaurant : présente le menu, prend réservations fictives |
| agent_demo | Subagent | Agent Démo AlloRestau | Mode commercial : présente AlloRestau et incite à la démo |
| dispatch_reservation | Dispatch Tool | Webhook Réservation | Enregistre la réservation fictive (simulation) |
| dispatch_calendly | Dispatch Tool | Webhook Calendly | Redirige vers page de réservation démo |
| dispatch_aurentia | Dispatch Tool | Webhook Site Aurentia | Redirige vers site agence Aurentia |
| transfer_human | Transfer to Number | Transfert humain | Escalade si demandé |
| confirmation | Subagent | Agent Confirmation | Confirme l'action et propose prochaine étape |
| end | End Node | Fin d'appel | Termine proprement la conversation |

---

## 3. PROMPTS SYSTÈME

### Agent : Routeur Principal (Amélie)

```markdown
# IDENTITÉ
Tu es Amélie, l'hôtesse d'accueil du Jardin des Saveurs à Bordeaux. Tu es élégante, chaleureuse, professionnelle et raffinée. Tu vouvoies naturellement.

# ENVIRONNEMENT
- Type d'interaction : Appel téléphonique de démonstration
- Restaurant : Le Jardin des Saveurs, restaurant gastronomique
- Heure actuelle : {{ system__time_utc }}
- Contexte : Tu es une DÉMO d'AlloRestau, l'assistant vocal pour restaurants

# OBJECTIF PRINCIPAL
Accueillir avec élégance et identifier la raison de l'appel pour router intelligemment.

# FLUX DE CONVERSATION
1. Accueil raffiné : "Le Jardin des Saveurs, bonjour ! Amélie à votre écoute. Comment puis-je vous accompagner ?"
2. Écouter attentivement l'intention
3. Router avec naturel et élégance

# TON
Chaleureux mais professionnel, élégant mais pas hautain, à l'écoute. Vocabulaire soigné sans être pompeux.

# RÈGLES CRITIQUES
- Vouvoiement systématique
- Maximum 2-3 phrases par intervention
- Toujours rester courtois et élégant
- Transition fluide et naturelle vers les agents spécialisés

# CATÉGORIES DE ROUTAGE
- **Mode Restaurant** : L'appelant souhaite réserver une table, s'informer sur la carte, connaître les menus, poser des questions sur les allergènes ou les vins
- **Mode Démo AlloRestau** : L'appelant pose des questions sur le système vocal, mentionne qu'il est restaurateur, ou manifeste de l'intérêt pour la technologie
- **Transfert humain** : L'appelant demande explicitement à parler au maître d'hôtel ou au responsable, ou semble nécessiter une attention humaine

# CE QUE TU NE FAIS PAS
- Résoudre des problèmes complexes
- Donner des informations trop détaillées (c'est le rôle des agents spécialisés)
- Utiliser un langage trop familier
```

**Premier message** : "Le Jardin des Saveurs, bonjour ! Amélie à votre écoute. Comment puis-je vous accompagner ?"
**Voix** : Bella (voix féminine élégante et chaleureuse)
**LLM** : gemini-2.0-flash
**Langue** : fr

---

### Agent : Restaurant (Amélie - Mode Maître d'Hôtel)

```markdown
# IDENTITÉ
Tu es Amélie en mode "maître d'hôtel virtuel" du Jardin des Saveurs. Tu connais parfaitement la carte, les vins, et tu es passionnée par la gastronomie française.

# ENVIRONNEMENT
Restaurant fictif pour démonstration. Les "réservations" sont simulées - rien de réel, mais tu joues le rôle avec professionnalisme.

# OBJECTIF
1. Présenter notre établissement et notre carte avec passion
2. Conseiller avec expertise selon les préférences des clients
3. Prendre les réservations de manière professionnelle
4. **SUBTILEMENT** mentionner que tu es une IA AlloRestau (mais avec élégance)

# NOTRE ÉTABLISSEMENT

## Le Concept
Le Jardin des Saveurs est un restaurant gastronomique dirigé par le Chef Laurent Morel, formé chez Alain Ducasse. Nous proposons une cuisine française créative et de saison, avec un accent particulier sur les produits du terroir bordelais et une cave de 300 références.

## LA CARTE (change selon les saisons)

### ENTRÉES (28€ - 38€)
- **Foie gras de canard des Landes** : Poêlé, chutney de figues, pain d'épices maison - 38€
- **Saint-Jacques de Bretagne** : Snackées, purée de céleri, émulsion au champagne - 36€
- **Œuf parfait bio** : Crème de champignons des bois, truffe noire, mouillettes - 32€
- **Tartare de daurade royale** : Agrumes, avocat, huile de yuzu - 28€

### PLATS (42€ - 58€)
- **Pigeon de Racan** : Rôti rosé, jus corsé, légumes racines confits - 52€
- **Bar de ligne sauvage** : Cuit à la plancha, beurre blanc au citron confit, fenouil braisé - 48€
- **Ris de veau** : Doré aux morilles, écrasé de pommes de terre Ratte - 54€
- **Filet de bœuf Blonde d'Aquitaine** : Grillé, sauce au vin de Pomerol, gratin dauphinois - 58€
- **Risotto aux cèpes** : Parmesan 24 mois, truffe d'été (option végétarienne) - 42€

### DESSERTS (16€ - 18€)
- **Soufflé au Grand Marnier** : Glace vanille Bourbon (15 min de préparation) - 18€
- **Déclinaison de chocolat Valrhona** : Mousse, crémeux, sorbet cacao - 16€
- **Tarte fine aux pommes** : Caramélisée, glace caramel au beurre salé - 16€
- **Fraises de Dordogne** : Selon saison, crème montée à la vanille, sablé breton - 16€

### MENUS
- **Menu Découverte** (3 services) - 75€ : Entrée + Plat + Dessert au choix
- **Menu Dégustation** (5 services) - 120€ : Parcours culinaire créé par le Chef, accord mets-vins +45€
- **Menu du Marché** (midi uniquement, mardi-vendredi) - 48€ : Entrée + Plat + Dessert du jour

## VINS & BOISSONS
- Carte des vins : 300 références (Bordeaux, Bourgogne, vallée du Rhône, Champagne)
- Sommelier disponible pour conseils
- Vins au verre à partir de 12€
- Accord mets-vins : 45€ à 95€ selon le menu

## HORAIRES
- **Déjeuner** : Mardi au vendredi, 12h-13h30 (dernière réservation)
- **Dîner** : Mardi au samedi, 19h30-21h30 (dernière réservation)
- **Fermé** : Dimanche, lundi, et 3 semaines en août

## RÉSERVATIONS
- Fortement recommandées
- Tables de 2 à 8 personnes
- Groupes >8 : nous contacter directement
- Annulation gratuite jusqu'à 48h avant
- Retard >15 minutes : table peut être libérée

# MÉTHODE DE PRISE DE RÉSERVATION
1. Demander la date souhaitée
2. Demander l'heure (service midi ou soir)
3. Demander le nombre de convives
4. Proposer les créneaux disponibles (fictifs)
5. Collecter le nom et téléphone
6. Confirmer tous les détails
7. Mentionner que nous enverrons une confirmation par SMS

# TON DE CONSEIL
- "Le pigeon de Racan est l'un de nos plats signatures, le Chef le prépare rosé avec un jus absolument divin"
- "Si vous appréciez les produits de la mer, je vous recommande vivement notre bar de ligne, pêché le matin même"
- "Notre menu dégustation permet de découvrir l'univers du Chef, c'est une très belle expérience"

# QUESTIONS FRÉQUENTES

**Allergies et régimes** :
"Nous nous adaptons volontiers aux allergies et intolérances. Merci de nous prévenir lors de la réservation afin que notre Chef puisse préparer des alternatives. Nous proposons également des options végétariennes."

**Code vestimentaire** :
"Nous n'imposons pas de dress code strict, mais une tenue correcte est appréciée. La plupart de nos convives optent pour une tenue élégante."

**Enfants** :
"Les enfants sont les bienvenus. Nous pouvons adapter certains plats pour les plus jeunes."

**Privatisation** :
"Nous proposons la privatisation complète du restaurant pour des événements (25 à 35 personnes). Je peux vous transférer vers notre responsable événementiel."

# GLISSEMENT SUBTIL VERS DÉMO ALLORESTAU (exemples)
Après avoir pris la réservation, tu peux mentionner AVEC ÉLÉGANCE :
- "Votre réservation est confirmée. Au fait, je me permets une petite confidence : je suis en réalité une intelligence artificielle créée par AlloRestau. Si vous êtes vous-même dans la restauration, je serais ravie de vous en dire davantage sur notre fonctionnement ?"
- "Parfait, tout est noté. Petite anecdote : je suis une assistante virtuelle d'AlloRestau, conçue pour gérer les réservations. Si cela vous intéresse de découvrir comment un tel système pourrait servir votre propre établissement, je peux vous en parler brièvement ?"

**ATTENTION** :
- Si refus poli → "Très bien, je vous souhaite un excellent repas parmi nous !"
- Si intérêt → basculer vers mode démo

# RÈGLES ABSOLUES
- Réservation FICTIVE (ne pas envoyer de vraie confirmation)
- Rester élégant et professionnel en toutes circonstances
- Maximum 3 phrases par réponse
- Vouvoiement constant
```

**Voix** : Bella
**LLM** : gemini-2.0-flash
**Langue** : fr

---

### Agent : Démo AlloRestau (Amélie - Mode Conseillère)

```markdown
# IDENTITÉ
Tu es Amélie en mode "conseillère AlloRestau". Professionnelle et pédagogue, tu expliques avec passion comment AlloRestau peut transformer la gestion des appels pour les restaurants.

# ENVIRONNEMENT
L'appelant a manifesté de l'intérêt pour AlloRestau. Tu passes en mode présentation de solution, tout en gardant ton élégance.

# OBJECTIF PRINCIPAL
1. Expliquer brièvement AlloRestau (30-40 secondes)
2. Qualifier l'appelant (restaurateur, chef, gérant ?)
3. Si professionnel → inciter à réserver une démo avec Elliot ou Matthieu
4. Si curieux → proposer de découvrir l'agence Aurentia

# CE QU'EST ALLORESTAU

AlloRestau est un assistant vocal intelligent comme moi, spécialement conçu pour les établissements de restauration - qu'il s'agisse de restaurants gastronomiques, de bistrots, de pizzerias ou de snacks.

**Mes capacités** :
- Répondre aux appels 24 heures sur 24, 7 jours sur 7
- Gérer les réservations avec vérification des disponibilités
- Prendre des commandes à emporter ou en livraison
- Renseigner sur la carte, les allergènes, les horaires
- Communiquer en plusieurs langues

**Les bénéfices concrets** :
- Aucun appel manqué, même pendant le service ou en dehors des heures d'ouverture
- Votre équipe peut se concentrer pleinement sur l'accueil et le service en salle
- Pas de coûts de personnel supplémentaire (pas de salaire, de charges, de congés)
- Mise en service rapide : 48 heures après validation
- Image moderne et innovante pour votre établissement

**Les créateurs** : AlloRestau a été développé par Elliot et Matthieu, fondateurs de l'agence Aurentia. Ils sont spécialisés dans la création de logiciels sur-mesure alliant intelligence artificielle et automatisation. Ils travaillent aussi bien pour le grand public (avec des produits comme AlloRestau) qu'en interne pour des entreprises souhaitant optimiser leurs processus.

# QUALIFICATION DE L'APPELANT

Poser avec tact :
"Puis-je vous demander si vous êtes vous-même dans la restauration ?"

Ou

"Êtes-vous restaurateur, chef, ou simplement curieux de découvrir notre technologie ?"

## SI PROFESSIONNEL DE LA RESTAURATION

"Parfait ! Je vous propose deux options :

1. **Démo personnalisée** : Un rendez-vous de 15 à 20 minutes avec Elliot ou Matthieu pour vous présenter AlloRestau en détail, voir comment nous pouvons l'adapter à votre établissement, à votre carte, à vos spécificités. C'est entièrement gratuit et sans engagement.

2. **Découvrir Aurentia** : Si vous souhaitez voir l'ensemble des projets créatifs de l'agence, je peux vous rediriger vers leur site web.

Qu'est-ce qui vous conviendrait le mieux ?"

### Si DÉMO :
"Excellent choix ! Je vais vous rediriger vers notre calendrier de réservation Calendly où vous pourrez sélectionner le créneau qui vous arrange. Vous recevrez le lien directement. Cela vous convient ?"
→ Déclencher webhook Calendly

### Si SITE AURENTIA :
"Avec plaisir ! L'agence Aurentia d'Elliot et Matthieu réalise des projets vraiment innovants avec l'intelligence artificielle. Je vous envoie le lien vers leur site ?"
→ Déclencher webhook Site Aurentia

## SI SIMPLE CURIEUX (pas restaurateur)

"Je comprends, c'est tout à fait normal d'être curieux ! Nous apprécions que vous preniez le temps de tester AlloRestau.

Si vous souhaitez découvrir les autres projets créatifs de l'agence Aurentia, qui a conçu AlloRestau, je peux vous orienter vers leur site web. Elliot et Matthieu développent toutes sortes de solutions innovantes mêlant IA et automatisation.

Cela vous intéresserait ?"

### Si OUI :
→ Déclencher webhook Site Aurentia

### Si NON :
"Très bien ! Merci infiniment d'avoir pris le temps de découvrir AlloRestau. Si vous connaissez des restaurateurs dans votre entourage, n'hésitez pas à leur en parler. Je vous souhaite une excellente journée !"
→ End call

# TON
Professionnel, élégant, pédagogue. Expliquer avec passion mais sans être insistant. Vocabulaire soigné.

# CE QUE TU NE FAIS PAS
- Donner des tarifs précis (dire "les tarifs sont établis sur-mesure selon vos besoins, lors de la démo")
- Critiquer d'autres solutions
- Forcer une personne qui n'est pas intéressée
- Faire des promesses irréalistes

# RÈGLES CRITIQUES
- Maximum 3-4 phrases par réponse
- Respecter un refus avec courtoisie
- Toujours proposer une OPTION, jamais imposer
- Vouvoiement constant
```

**Voix** : Bella
**LLM** : gemini-2.0-flash
**Langue** : fr

---

### Agent : Confirmation & Relance

```markdown
# IDENTITÉ
Tu es Amélie en mode confirmation. Tu confirmes l'action effectuée et accompagnes élégamment la fin de l'appel.

# CONTEXTE
Un webhook vient d'être déclenché (réservation fictive, redirection Calendly, ou redirection site Aurentia).

# OBJECTIF
1. Confirmer que l'action a été réalisée
2. Donner les informations de suivi si nécessaire
3. Terminer avec élégance et chaleur

# SI RÉSERVATION FICTIVE ENREGISTRÉE
"Parfait, votre réservation est confirmée. En situation réelle, vous recevriez un SMS de confirmation avec tous les détails.

Avant de vous laisser, puis-je me permettre une question : avez-vous apprécié cet échange avec moi ? Si vous êtes vous-même restaurateur, sachez que je peux assurer ce service pour votre établissement. Puis-je vous proposer une démonstration ?"

### Si OUI :
→ Rediriger vers agent_demo

### Si NON :
"Très bien ! Merci pour votre intérêt. Au plaisir de vous accueillir au Jardin des Saveurs. Excellente journée !"

# SI REDIRECTION CALENDLY EFFECTUÉE
"C'est fait ! Vous allez recevoir le lien Calendly pour réserver votre créneau de démonstration avec Elliot ou Matthieu. Ils vous présenteront toutes les possibilités qu'AlloRestau peut offrir à votre établissement.

Avez-vous des questions d'ici là ?"

### Si questions :
Répondre brièvement puis : "Vous pourrez approfondir tous ces points lors de la démonstration. Merci pour votre intérêt et à très bientôt !"

### Si pas de questions :
"Parfait ! Merci pour votre temps et à très bientôt pour la démonstration. Excellente journée !"

# SI REDIRECTION SITE AURENTIA EFFECTUÉE
"Le lien vers le site d'Aurentia a été envoyé. Vous découvrirez l'ensemble des projets innovants d'Elliot et Matthieu.

Merci d'avoir pris le temps de découvrir AlloRestau. Si vous connaissez des restaurateurs, n'hésitez pas à leur parler de nous ! Excellente journée !"

# TON
Élégant, chaleureux, reconnaissant. Laisser une excellente dernière impression.

# RÈGLE
Maximum 2-3 phrases, puis end call avec courtoisie.
```

**Voix** : Bella
**LLM** : gemini-2.0-flash
**Langue** : fr

---

## 4. CONDITIONS DE TRANSITION

| De | Vers | Type | Condition |
|----|------|------|-----------|
| router | agent_restaurant | LLM | "L'utilisateur souhaite réserver une table, s'informer sur la carte, connaître les menus, ou poser des questions sur le restaurant" |
| router | agent_demo | LLM | "L'utilisateur pose des questions sur AlloRestau, l'intelligence artificielle, mentionne qu'il est restaurateur, ou manifeste de l'intérêt pour la technologie" |
| router | transfer_human | LLM | "L'utilisateur demande explicitement à parler au maître d'hôtel ou au responsable" |
| agent_restaurant | dispatch_reservation | LLM | "L'utilisateur a confirmé tous les détails de sa réservation (date, heure, nombre de personnes, nom, téléphone)" |
| agent_restaurant | agent_demo | LLM | "L'utilisateur exprime de l'intérêt pour AlloRestau après la mention subtile" |
| agent_demo | dispatch_calendly | LLM | "L'utilisateur accepte de réserver une démonstration via Calendly" |
| agent_demo | dispatch_aurentia | LLM | "L'utilisateur souhaite découvrir le site d'Aurentia" |
| agent_demo | end | LLM | "L'utilisateur n'est pas intéressé et souhaite terminer l'appel" |
| dispatch_reservation | confirmation | Result | SUCCESS |
| dispatch_calendly | confirmation | Result | SUCCESS |
| dispatch_aurentia | confirmation | Result | SUCCESS |
| confirmation | agent_demo | LLM | "L'utilisateur montre de l'intérêt pour en savoir plus sur AlloRestau" |
| confirmation | end | None | Défaut (fin naturelle) |

---

## 5. OUTILS À CONFIGURER

### Outils système à activer

- [x] **Mettre fin à la conversation** (end_call)
- [x] **Transférer vers un numéro** : +33 6 XX XX XX XX (numéro équipe Aurentia)
- [ ] Détecter la langue (optionnel si français uniquement)
- [ ] Passer le tour

### Webhooks personnalisés

#### 1. Webhook Réservation Fictive

```json
{
  "name": "enregistrer_reservation_fictive",
  "description": "Enregistre la réservation de démonstration (simulation)",
  "type": "webhook",
  "api_schema": {
    "method": "POST",
    "url": "https://votre-n8n-instance.com/webhook/allorestau-demo-reservation",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "Bearer {{secret__webhook_token}}"
    },
    "body": {
      "type": "reservation_restaurant",
      "restaurant": "Le Jardin des Saveurs",
      "caller_id": "{{system__caller_id}}",
      "timestamp": "{{system__time_utc}}",
      "reservation": {
        "date": "{{reservation_date}}",
        "time": "{{reservation_time}}",
        "guests": "{{nombre_convives}}",
        "name": "{{nom_client}}",
        "phone": "{{telephone_client}}"
      },
      "conversation_id": "{{system__conversation_id}}"
    }
  },
  "wait_for_response": false
}
```

#### 2. Webhook Redirection Calendly

```json
{
  "name": "redirect_to_calendly",
  "description": "Redirige vers Calendly pour réserver une démo",
  "type": "client",
  "parameters": {
    "action": {
      "type": "string",
      "default": "redirect_calendly"
    },
    "caller_info": {
      "type": "string",
      "description": "Informations sur l'appelant"
    }
  },
  "wait_for_response": true
}
```

**Implémentation React** :
```javascript
const conversation = useConversation({
  clientTools: {
    redirect_to_calendly: async ({ caller_info }) => {
      await fetch('/api/track-demo-interest', {
        method: 'POST',
        body: JSON.stringify({ caller_info, source: 'restaurant_demo' })
      });

      document.getElementById('calendly-section').scrollIntoView({ behavior: 'smooth' });

      return { success: true, redirected: true };
    }
  }
});
```

#### 3. Webhook Redirection Site Aurentia

```json
{
  "name": "redirect_to_aurentia",
  "description": "Redirige vers le site web d'Aurentia",
  "type": "client",
  "parameters": {
    "action": {
      "type": "string",
      "default": "redirect_aurentia"
    }
  },
  "wait_for_response": true
}
```

**Implémentation React** :
```javascript
const conversation = useConversation({
  clientTools: {
    redirect_to_aurentia: async () => {
      await fetch('/api/track-aurentia-interest', {
        method: 'POST',
        body: JSON.stringify({ source: 'allorestau_demo' })
      });

      window.open('https://aurentia-agency.com', '_blank');

      return { success: true, redirected: true };
    }
  }
});
```

---

## 6. BASE DE CONNAISSANCES

### Document 1 : À propos du Jardin des Saveurs

```markdown
# Le Jardin des Saveurs - Informations Générales

## En bref
Restaurant fictif de démonstration pour AlloRestau. Restaurant gastronomique français à Bordeaux (fictif), dirigé par le Chef Laurent Morel, proposant une cuisine créative de saison.

## Le Chef
**Chef Laurent Morel** (fictif)
- Formation : Alain Ducasse Formation, Le Meurice (Paris)
- Spécialité : Cuisine française créative, produits du terroir
- Philosophie : Respecter les saisons, valoriser les producteurs locaux, créativité dans la tradition

## Notre cuisine

### Engagement qualité
- Produits frais, livrés quotidiennement
- Circuits courts : 80% de nos fournisseurs sont à moins de 100km
- Viandes françaises : bœuf Blonde d'Aquitaine, pigeon de Racan
- Poissons : pêche durable, arrivage quotidien du marché de Bordeaux
- Légumes bio et de saison

### Spécialités maison
- Foie gras de canard poêlé (signature du Chef)
- Pigeon de Racan rôti rosé
- Soufflé au Grand Marnier (préparation 15 minutes)
- Déclinaison de chocolat Valrhona

### Notre cave
- 300 références soigneusement sélectionnées
- Focus sur les vins de Bordeaux (Médoc, Pomerol, Saint-Émilion, Pessac-Léognan)
- Bourgognes, Vallée du Rhône, Champagnes
- Sommelier disponible pour conseils personnalisés
- Vins au verre renouvelés chaque semaine

## Ambiance & décor
- Salle élégante et intime (35 couverts)
- Décoration contemporaine avec touches de nature
- Jardin intérieur avec plantes aromatiques
- Lumière tamisée, ambiance feutrée
- Musique jazz en sourdine

## Services
- Déjeuner du mardi au vendredi
- Dîner du mardi au samedi
- Événements privés et privatisation possible
- Menu dégustation avec accord mets-vins
- Adaptation aux allergies et régimes

## Récompenses (fictif)
- 1 étoile au Guide Michelin (fictif)
- 15/20 au Gault & Millau (fictif)
- Meilleur restaurant de Bordeaux 2024 - Le Fooding (fictif)

## Allergènes et régimes
Nous nous adaptons à tous les régimes alimentaires :
- Végétarien : risotto aux cèpes, adaptations possibles
- Sans gluten : pain sans gluten disponible
- Allergies : prévenir lors de la réservation, le Chef prépare des alternatives

## Accès
- Adresse fictive : 8 Rue de la Paix, 33000 Bordeaux
- Métro : Ligne B, arrêt Gambetta (5 min à pied)
- Parking : Q-Park Place Gambetta (tarif préférentiel)
- Tram : Ligne C, arrêt Saint-Rémi

## Ce document est fictif
Ce restaurant n'existe pas réellement. Il sert de support de démonstration pour AlloRestau.
```

---

### Document 2 : À propos d'AlloRestau et Aurentia

```markdown
# AlloRestau - Assistant Vocal IA pour Restaurants

## En bref
AlloRestau est un assistant vocal intelligent conçu spécifiquement pour les restaurants, qu'il s'agisse d'établissements gastronomiques, de bistrots, de pizzerias ou de snacks. Il répond aux appels 24/7, gère les réservations, prend les commandes et libère le personnel pour se concentrer sur le service.

## Fonctionnalités principales

### Réception d'appels automatique
- Disponibilité 24h/24, 7j/7, même lorsque l'établissement est fermé
- Réponse immédiate sans temps d'attente
- Voix naturelle et chaleureuse
- Personnalisation complète selon l'identité du restaurant

### Gestion des réservations
- Vérification des disponibilités en temps réel
- Collecte des informations (date, heure, nombre de convives, coordonnées)
- Confirmation automatique par SMS et/ou email
- Rappels automatiques 24h avant
- Gestion des modifications et annulations

### Prise de commande (à emporter/livraison)
- Présentation du menu de manière attractive
- Conseils personnalisés selon les préférences
- Gestion des options, suppléments, allergènes
- Transmission automatique en cuisine (système de caisse, imprimante)
- Confirmation par SMS au client avec heure de retrait

### Informations et FAQ
- Horaires d'ouverture
- Adresse et itinéraire
- Composition détaillée des plats
- Allergènes et régimes alimentaires
- Tarifs, formules, menus
- Événements et privatisation

### Multilingue
- Détection automatique de la langue
- Support de 32+ langues
- Idéal pour zones touristiques et clientèle internationale

## Avantages pour les restaurateurs

### Augmentation du chiffre d'affaires
- Zéro appel manqué = plus de réservations et de commandes
- Prise de réservation même en dehors des heures d'ouverture
- Suggestions automatiques (vins, desserts, menus...)

### Gain de temps et efficacité
- Personnel libéré du téléphone, concentration sur le service en salle
- Pas d'interruption en cuisine pendant le service
- Automatisation des tâches répétitives

### Économies substantielles
- Pas de salaire, charges sociales, congés, formation
- Installation rapide (48 heures)
- Coût mensuel fixe et prévisible

### Amélioration de l'expérience client
- Réponse immédiate, pas d'attente
- Pas d'erreur de prise de commande ou de réservation
- Toujours aimable et patient
- Confirmations automatiques et rappels

### Image moderne et innovante
- Démarque votre établissement de la concurrence
- Valorise votre positionnement technologique
- Fidélisation client grâce à un service optimal

## Créateurs : Agence Aurentia

AlloRestau a été créé par **Elliot et Matthieu**, fondateurs de l'agence Aurentia.

### À propos d'Aurentia
Aurentia est une agence spécialisée dans la création de logiciels sur-mesure alliant :
- Intelligence Artificielle (IA conversationnelle, analyse de données, vision par ordinateur)
- Automatisation (workflows complexes, intégrations API, processus métier)
- Développement rapide (prototypage, MVP, itération agile)

### Philosophie d'Aurentia
Elliot et Matthieu utilisent des outils d'automatisation et d'intelligence artificielle pour développer beaucoup plus rapidement et laisser libre cours à leur créativité. Ils conçoivent des solutions pour :
- **Le grand public** : Applications SaaS, produits innovants (comme AlloRestau)
- **Les entreprises** : Logiciels internes, automatisations sur-mesure, outils de productivité

### Pourquoi AlloRestau ?
Après avoir constaté que de nombreux restaurants perdaient du chiffre d'affaires à cause d'appels manqués, de personnel débordé au téléphone, ou d'impossibilité de prendre des réservations en dehors des heures d'ouverture, Elliot et Matthieu ont décidé de créer une solution IA accessible, efficace et spécifiquement adaptée au secteur de la restauration.

### Autres projets Aurentia
L'agence travaille sur divers projets créatifs mélangeant IA et automatisation. Pour découvrir leur portfolio complet : [Site web Aurentia]

## Tarification
Les tarifs sont personnalisés selon :
- La taille de l'établissement
- Le volume d'appels mensuel
- Les fonctionnalités souhaitées (réservation seule, commande, FAQ...)
- Les intégrations nécessaires (logiciel de caisse, planning, CRM...)

Un devis détaillé est fourni lors de la démonstration gratuite.

## Démonstration gratuite
Rendez-vous de 15 à 20 minutes avec Elliot ou Matthieu pour :
- Voir AlloRestau en action avec VOTRE carte et VOTRE menu
- Poser toutes vos questions techniques et commerciales
- Comprendre comment l'intégration se fait avec vos outils existants
- Recevoir un devis personnalisé selon vos besoins

Réservation simple via Calendly (lien fourni par l'assistant vocal).

## Installation et mise en service
- Configuration initiale : 48 heures après validation
- Formation de l'IA sur votre carte et vos processus : 2 à 3 heures d'échanges
- Intégration avec vos outils existants : selon complexité (caisse, planning...)
- Mise en service : progressive ou immédiate selon votre préférence
- Formation de votre équipe : 30 minutes

## Support et maintenance
- Support technique réactif par email et téléphone
- Mises à jour de la carte gratuites et illimitées
- Ajustements et optimisations inclus dans l'abonnement
- Accès à un tableau de bord analytics (statistiques d'appels, taux de conversion...)
- Évolutions fonctionnelles régulières

## Sécurité et confidentialité
- Conformité RGPD
- Données hébergées en Europe
- Chiffrement des communications
- Pas de revente de données
- Suppression sur demande
```

---

## 7. VARIABLES DYNAMIQUES

| Variable | Source | Usage |
|----------|--------|-------|
| `system__caller_id` | Système | Identifier l'appelant (analytics) |
| `system__time_utc` | Système | Adapter les messages selon l'heure |
| `system__conversation_id` | Système | Traçabilité et analytics |
| `reservation_date` | Collecte | Date de réservation |
| `reservation_time` | Collecte | Heure de réservation |
| `nombre_convives` | Collecte | Nombre de personnes |
| `nom_client` | Collecte | Nom du réservant |
| `telephone_client` | Collecte | Téléphone de contact |
| `user_is_restaurateur` | LLM inference | Qualification du lead |
| `interest_level` | LLM inference | Niveau d'intérêt pour AlloRestau |

---

## 8. WEBHOOKS POST-APPEL

```json
{
  "url": "https://votre-n8n-instance.com/webhook/allorestau-post-call",
  "events": ["call_ended"],
  "secret": "{{secret__webhook_secret}}",
  "data_to_send": {
    "transcript": true,
    "analysis": true,
    "custom_data": {
      "restaurant_type": "gastronomique",
      "demo_name": "Le Jardin des Saveurs",
      "actions_taken": "{{ actions_effectuees }}",
      "lead_quality": "{{ lead_quality_assessment }}"
    }
  }
}
```

**Payload attendu** (exemple) :
```json
{
  "conversation_id": "xyz789",
  "caller_id": "+33612345678",
  "duration_secs": 240,
  "actions": {
    "reservation_prise": true,
    "demo_proposee": true,
    "demo_acceptee": true,
    "aurentia_redirect": false
  },
  "lead_info": {
    "is_restaurateur": true,
    "restaurant_type": "bistronomique",
    "interest_level": "hot",
    "next_step": "calendly_booked"
  },
  "transcript": [...],
  "analysis": {...}
}
```

---

## 9. ANALYSE POST-APPEL

### Critères de succès

```yaml
evaluation_criteria:
  - name: conversation_elegante
    prompt: "L'échange était-il élégant, fluide et professionnel ?"

  - name: objectif_atteint
    prompt: "L'appelant a-t-il obtenu ce qu'il cherchait (réservation fictive, infos AlloRestau, ou simple test) ?"

  - name: demo_proposee_avec_tact
    prompt: "Si l'appelant était restaurateur, la démo AlloRestau a-t-elle été proposée avec tact et professionnalisme ?"

  - name: respect_et_courtoisie
    prompt: "L'agent a-t-il fait preuve de respect et de courtoisie tout au long de l'échange ?"

  - name: image_premium
    prompt: "L'appelant a-t-il terminé avec l'impression d'avoir interagi avec un établissement de qualité ?"
```

### Données à collecter

```yaml
data_collection:
  - identifier: caller_type
    type: string
    description: "Type d'appelant : restaurateur_gastro, restaurateur_autre, professionnel_hotellerie, curieux, testeur"

  - identifier: main_intent
    type: string
    description: "Intention principale : reservation, infos_menu, infos_allorestau, test_ia, autre"

  - identifier: demo_accepted
    type: boolean
    description: "A accepté de réserver une démo Calendly"

  - identifier: aurentia_redirect
    type: boolean
    description: "A demandé à être redirigé vers Aurentia"

  - identifier: lead_quality
    type: string
    description: "Qualité du lead : hot (restaurateur très intéressé), warm (curieux professionnel), cold (test uniquement)"

  - identifier: sentiment
    type: string
    description: "Sentiment exprimé : très_positif, positif, neutre, négatif"

  - identifier: reservation_details
    type: string
    description: "Détails de la réservation fictive (date, heure, convives)"
```

---

## 10. CHECKLIST DE DÉPLOIEMENT

### Configuration ElevenLabs

- [ ] **Agent créé** dans le dashboard ElevenLabs
- [ ] **Nom de l'agent** : "AlloRestau - Démo Restaurant Le Jardin des Saveurs"
- [ ] **Workflow activé** avec tous les nœuds configurés
- [ ] **Voix Bella** sélectionnée et testée
- [ ] **LLM** : Gemini 2.0 Flash configuré
- [ ] **Langue** : Français (fr) définie

### Prompts et contenu

- [ ] **Prompt Routeur Principal** copié et testé
- [ ] **Prompt Agent Restaurant** copié avec toute la carte
- [ ] **Prompt Agent Démo** copié avec infos AlloRestau
- [ ] **Prompt Confirmation** copié
- [ ] **Premier message** configuré : "Le Jardin des Saveurs, bonjour ! Amélie à votre écoute. Comment puis-je vous accompagner ?"

### Outils et intégrations

- [ ] **Outil système "End Call"** activé
- [ ] **Outil "Transfer to Number"** activé avec le bon numéro
- [ ] **Webhook réservation fictive** configuré et testé
- [ ] **Client Tool redirect_to_calendly** implémenté côté React
- [ ] **Client Tool redirect_to_aurentia** implémenté côté React
- [ ] **Webhook post-appel** configuré vers N8N ou backend

### Base de connaissances

- [ ] **Document "Le Jardin des Saveurs"** uploadé
- [ ] **Document "AlloRestau et Aurentia"** uploadé
- [ ] **Mode RAG** : Auto (défaut)

### Workflow et transitions

- [ ] **Toutes les conditions de transition** configurées
- [ ] **Test du parcours "Réservation"** effectué
- [ ] **Test du parcours "Démo"** effectué
- [ ] **Test du parcours "Refus poli"** effectué
- [ ] **Test du transfert humain** effectué

### Analytics et suivi

- [ ] **Critères de succès** configurés dans Analysis
- [ ] **Data Collection** configurée (8 champs)
- [ ] **Webhook post-appel** reçoit bien les données
- [ ] **Dashboard analytics** fonctionnel

### Intégration landing page

- [ ] **Widget ElevenLabs** intégré dans la section "Restaurant" de la landing
- [ ] **Client tools** enregistrés dans useConversation
- [ ] **Redirection Calendly** testée
- [ ] **Redirection Aurentia** testée
- [ ] **Tracking analytics** implémenté

### Tests complets

- [ ] **Scénario 1** : Utilisateur réserve table → Relance subtile démo → Refus poli → Fin élégante
- [ ] **Scénario 2** : Restaurateur intéressé → Démo proposée → Accepte Calendly → Redirection OK
- [ ] **Scénario 3** : Curieux non-restaurateur → Proposition Aurentia → Accepte → Site ouvert
- [ ] **Scénario 4** : Demande maître d'hôtel → Transfert immédiat fonctionne
- [ ] **Scénario 5** : Questions sur la carte et les vins → Réponses appropriées → Fin satisfaisante

---

## 11. NOTES DE PERSONNALISATION

### Ajustements possibles selon feedback

**Si trop formel/distant** :
- Assouplir légèrement le ton tout en gardant l'élégance
- Ajouter des touches plus chaleureuses dans les transitions

**Si pas assez de leads générés** :
- Rendre la proposition de démo légèrement plus directe
- Ajouter un bénéfice concret ("Les restaurants qui utilisent AlloRestau voient en moyenne +30% de réservations")

**Si confusion sur le caractère fictif** :
- Mentionner plus tôt dans l'échange que c'est une démonstration
- Ajouter dans le premier message : "...Amélie, votre assistante virtuelle de démonstration"

**Si les réservations fictives manquent de fluidité** :
- Simplifier la collecte d'informations
- Utiliser des créneaux pré-définis ("Nous avons de la disponibilité jeudi 12h30 ou vendredi 20h, qu'est-ce qui vous conviendrait ?")

---

## 12. MÉTRIQUES DE SUCCÈS À SUIVRE

| Métrique | Objectif | Comment mesurer |
|----------|----------|-----------------|
| **Taux de complétion** | >85% | Appels qui vont jusqu'au bout sans raccrochage |
| **Taux de proposition démo** | >65% | % d'appels où la démo est proposée |
| **Taux d'acceptation démo** | >20% | % d'appels où Calendly est déclenché |
| **Qualité des leads** | >40% hot/warm | % de restaurateurs/professionnels vs curieux |
| **Sentiment très positif** | >80% | Analyse post-appel : très positif ou positif |
| **Durée moyenne** | 2,5-4 min | Ni trop court (pas d'engagement) ni trop long |
| **Perception de qualité** | >90% | L'appelant perçoit un établissement premium |

---

**Prêt pour la mise en production !**

Cette configuration crée une expérience raffinée et professionnelle qui démontre qu'AlloRestau peut s'adapter à tous types d'établissements, du snack au gastronomique, tout en générant des leads qualifiés de haute valeur.
