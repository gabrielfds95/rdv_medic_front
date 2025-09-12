// Import des éléments nécessaires à Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Pour récupérer les paramètres de l'URL
import { ApiService } from '../../services/api.service'; // Ton service pour appeler l'API backend
import { Slot } from '../../model/slot.model'; // Le modèle de données pour les créneaux
import { Doctor } from '../../model/doctor.model';


// Import des directives Angular standalone pour utiliser @if, @for, pipes, etc.
import {CommonModule,DatePipe} from '@angular/common';

// Déclaration du composant Angular standalone
@Component({
  selector: 'app-slot-list', // Nom du composant
  standalone: true, // Indique que le composant est standalone (pas besoin de module)
  imports: [CommonModule, DatePipe], // Directives nécessaires pour le HTML
  templateUrl: './slot-list.component.html', // Fichier HTML associé
  styleUrls: ['./slot-list.component.scss'] // Fichier de styles associé
})
export class SlotListComponent implements OnInit {
  // ID du médecin récupéré depuis l'URL
  doctorId!: number;

  // ID du patient (temporaire, à remplacer plus tard par une vraie logique)
  patientId: number = 1;

  // Liste des créneaux déjà pris
  takenSlots: Slot[] = [];

  // Pour gérer l'affichage conditionnel
  loading = false;
  errorMessage = '';

  // Date du lundi de la semaine affichée
  currentWeekStart: Date = this.getMonday(new Date());

  //nom dcoteur
  doctorLastName!: Doctor;

  // Liste des jours de la semaine (lundi à vendredi)
  weekDays: Date[] = [];

  // Liste des heures (toutes les 30 minutes entre 8h et 18h)
  hours: string[] = [];

  // Constructeur avec injection des services nécessaires
  constructor(
    private route: ActivatedRoute, // Pour accéder aux paramètres de route
    private apiService: ApiService // Pour appeler les méthodes du backend
  ) {}

  // Méthode appelée à l'initialisation du composant
  ngOnInit(): void {
    // Récupère l'ID du médecin depuis l'URL
    this.doctorId = Number(this.route.snapshot.paramMap.get('id'));

    //recupere info medecin
    this.apiService.getDoctorById(this.doctorId).subscribe((doctor: Doctor) => {
      this.doctorLastName = doctor;

    });


    // Génère les heures de la journée
    this.generateHours();

    // Génère les jours de la semaine à partir du lundi
    this.generateWeekDays();

    // Charge les créneaux déjà pris depuis l'API
    this.loadTakenSlots();
  }

  // Retourne le lundi de la semaine à partir d'une date donnée
  getMonday(date: Date): Date {
    const day = date.getDay(); // 0 = dimanche, 1 = lundi, etc.
    const diff = day === 0 ? -6 : 1 - day; // Si dimanche, recule à lundi précédent
    const monday = new Date(date);
    monday.setDate(date.getDate() + diff);
    return monday;
  }

  // Génère les 5 jours de la semaine (lundi à vendredi)
  generateWeekDays(): void {
    this.weekDays = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(this.currentWeekStart);
      day.setDate(this.currentWeekStart.getDate() + i);
      this.weekDays.push(day);
    }
  }

  // Génère les heures de la journée toutes les 30 minutes entre 8h et 18h
  generateHours(): void {
    const startHour = 8;
    const endHour = 18;
    for (let hour = startHour; hour < endHour; hour++) {
      this.hours.push(`${this.pad(hour)}:00.00`);
      this.hours.push(`${this.pad(hour)}:30.00`);
    }
  }

  // Ajoute un zéro devant les heures < 10 (ex : 08 au lieu de 8)
  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }

  // Charge les créneaux déjà pris pour le médecin et le patient
  loadTakenSlots(): void {
    this.loading = true;
    this.apiService.getSlotsByDoctorsAndPatient(this.doctorId, this.patientId).subscribe({
      next: (slots) => {
        this.takenSlots = slots; // Stocke les créneaux récupérés
        this.loading = false;
        console.log(slots);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des créneaux :', err);
        this.errorMessage = 'Impossible de charger les créneaux.';
        this.loading = false;
      }
    });
  }

  // Vérifie si un créneau est déjà pris (même date et même heure)
  isSlotTaken(date: Date, time: string): boolean {
    return this.takenSlots.some(slot => {
      const slotDate = new Date(slot.slotDate);
      return (
        slotDate.toDateString() === date.toDateString() &&
        slot.slotTime === time
      );
    });
  }

  // Passe à la semaine précédente
  previousWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() - 7);
    this.generateWeekDays();
    this.loadTakenSlots();
  }

  // Passe à la semaine suivante
  nextWeek(): void {
    this.currentWeekStart.setDate(this.currentWeekStart.getDate() + 7);
    this.generateWeekDays();
    this.loadTakenSlots();
  }

  // Méthode appelée quand on clique sur un créneau (à compléter plus tard)
  openForm(day: Date, hour: string): void {
    console.log(`Créneau sélectionné : ${day.toDateString()} à ${hour}`);
    // Tu pourras ouvrir un formulaire ici plus tard
  }
}
