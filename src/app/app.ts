// Importation des décorateurs et outils Angular
import { Component } from '@angular/core';
// Importation du composant de routage (utile si tu utilises des routes)
//import { RouterOutlet } from '@angular/router';
import { DoctorListComponent } from './Doctor/doctor-list.component'; // adapte chemin

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DoctorListComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}