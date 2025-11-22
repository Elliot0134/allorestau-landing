export type ThemeType = 'pizzeria' | 'snack' | 'restaurant';

export interface ThemeContent {
  name: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: string[];
  benefits: string[];
}

export const themeContents: Record<ThemeType, ThemeContent> = {
  pizzeria: {
    name: 'Pizzerias',
    icon: '🍕',
    heroTitle: 'Trop de commandes pendant le rush du vendredi soir ?',
    heroSubtitle: "AlloRestau prend toutes vos commandes de pizzas pendant que vous vous concentrez sur votre four. Margherita, 4 fromages, suppléments... L'IA connaît votre carte par cœur.",
    painPoints: [
      'Impossible de répondre quand je fais 20 pizzas en même temps',
      'Je perds des commandes tous les vendredis soir',
      'Les clients raccrochent et vont chez le concurrent',
      'Mon four est parfait mais mon téléphone me tue'
    ],
    benefits: [
      "L'IA connaît tous vos ingrédients et garnitures",
      'Gère les suppléments (double fromage, sans oignons, etc.)',
      'Disponible pendant vos heures de rush',
      'Prend les commandes pour le lendemain'
    ]
  },
  snack: {
    name: 'Snacks',
    icon: '🍔',
    heroTitle: 'Le rush de midi vous déborde ?',
    heroSubtitle: "AlloRestau gère vos appels pendant que vous préparez vos kebabs et burgers. Menus, formules, sauces... Tout est pris en compte, même dans le bruit de la cuisine.",
    painPoints: [
      "Entre 12h et 14h, je ne peux pas répondre au téléphone",
      "Trop de bruit, je n'entends rien",
      "Les clients sont pressés, je ne peux pas les faire attendre",
      'Je perds des commandes tous les midis'
    ],
    benefits: [
      'Prend les commandes même avec bruit de fond',
      'Comprend les formules et menus',
      'Gestion des sauces et accompagnements',
      'Commandes pour emporter ou sur place'
    ]
  },
  restaurant: {
    name: 'Restaurants',
    icon: '🍽️',
    heroTitle: 'Votre personnel en salle, pas au téléphone',
    heroSubtitle: "AlloRestau prend les réservations et commandes à emporter pendant que votre équipe s'occupe de vos clients en salle. Service impeccable, aucun appel manqué.",
    painPoints: [
      'Mon personnel est occupé avec les clients en salle',
      'On manque les réservations en dehors des horaires',
      'Les appels perturbent le service',
      'On veut moderniser sans perdre notre âme'
    ],
    benefits: [
      'Gestion élégante des réservations',
      'Commandes à emporter sans déranger le service',
      'Ton professionnel et chaleureux',
      "S'intègre à votre standing"
    ]
  }
};
