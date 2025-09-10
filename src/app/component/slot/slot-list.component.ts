import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Slot } from '../../model/slot.model';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-slot-list',
  imports: [NgIf, NgFor], // Importation des composants nécessaires (ici pour les directives structurelles)
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.scss']
})
export class SlotListComponent implements OnInit {

  slots: Slot[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du médecin depuis la route
    const doctorId = Number(this.route.snapshot.paramMap.get('id'));
    if (doctorId) {
      this.apiService.getSlotsByDoctors(doctorId).subscribe({
        next: (data) => {
          this.slots = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors du chargement des créneaux';
          console.error(err);
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Médecin non trouvé';
      this.loading = false;
    }
  }
}
