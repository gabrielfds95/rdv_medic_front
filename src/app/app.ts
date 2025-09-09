// Importation des décorateurs et outils Angular
import { Component, signal, inject } from '@angular/core';
// Importation du composant de routage (utile si tu utilises des routes)
import { RouterOutlet } from '@angular/router';
// Importation de ton service API (adapte le chemin si nécessaire)
import { ApiService } from './api.service.spec';

@Component({
  selector: 'app-root', // Nom du composant utilisé dans le HTML
  standalone: true,     // Indique que ce composant est standalone (pas dans un module)
  //imports: [RouterOutlet], // Importation des composants nécessaires (ici le routeur)
  templateUrl: './app.html', // Fichier HTML associé au composant
  styleUrl: './app.scss'     // Fichier SCSS associé au composant
})
export class App {
  // Création d’un signal pour le titre (réactif)
  protected readonly title = signal('rdv_medic_front');

  // Variable simple pour afficher un texte
  test = 'prise de rdv medical';

  // Injection du service API via la fonction `inject`
  private apiService = inject(ApiService);

  // Signal pour stocker les données récupérées via l’API
  data = signal<any>(null);

  // Le constructeur est appelé à la création du composant
  constructor() {
    // Appel de la méthode `getData()` du service
    this.apiService.getData().subscribe({
      next: (res: any) => {
        // En cas de succès, on stocke les données dans le signal
        this.data.set(res);
        console.log('Données reçues :', res);
      },
      error: (err: any) => {
        // En cas d’erreur, on affiche un message dans la console
        console.error('Erreur lors du GET :', err);
      }
    });
  }
}
