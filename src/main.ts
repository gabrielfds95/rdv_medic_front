// Fonction pour démarrer l’application Angular
import { bootstrapApplication } from '@angular/platform-browser';
// Configuration de l’application (fichier séparé)
import { appConfig } from './app/app.config';
// Composant racine
import { App } from './app/app';

// Démarrage de l’application avec le composant racine et la config
bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); // Gestion des erreurs de démarrage
