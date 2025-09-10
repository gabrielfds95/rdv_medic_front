// Importation des décorateurs et outils Angular
import { Component, OnInit } from '@angular/core';
// Importation du composant de routage (utile si tu utilises des routes)
//import { RouterOutlet } from '@angular/router';
// Importation de ton service API (adapte le chemin si nécessaire)
import { ApiService } from '../services/api.service';  // adapte le chemin si besoin
import { Doctor } from './doctor.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-doctor-list',// Nom du composant utilisé dans le HTML
  standalone: true, // Indique que ce composant est standalone (pas besoin d'etre dans un module)
  imports: [NgIf, NgFor], // Importation des composants nécessaires (ici le routeur)
  templateUrl: './doctor-list.component.html', // Fichier HTML associé au composant
  styleUrls: ['./doctor-list.component.scss']     // Fichier SCSS associé au composant
})
export class DoctorListComponent implements OnInit{
  
  doctors: Doctor[] = [];      // Liste des médecins à afficher
  loading: boolean = true;       // Indicateur de chargement
  errorMessage: string = '';     // Message d'erreur éventuel

  constructor(private apiService: ApiService) {}

  // Appel de l'API dès le chargement du composant
  ngOnInit(): void {
    this.apiService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des médecins';
        console.error(err);
        this.loading = false;
      }
    });
  }
}