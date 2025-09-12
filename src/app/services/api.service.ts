import { Injectable } from '@angular/core'; // Permet de marquer la classe comme injectable
import { HttpClient } from '@angular/common/http'; // Permet de faire des requêtes HTTP
import { Observable } from 'rxjs'; // Permet de gérer les flux de données asynchrones
import {Doctor} from '../model/doctor.model';
import {Slot} from '../model/slot.model';

@Injectable({
  providedIn: 'root' // Rend le service disponible partout dans l'application
})
export class ApiService {

  constructor(private http: HttpClient) {} // Injection du client HTTP

  lien = 'http://localhost:9000';

  // Méthode GET pour récupérer la liste des médecins
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.lien +'/doctors');
  }

  getSlotsByDoctors(idDoctor: number): Observable<Slot[]>{
    return this.http.get<Slot[]>(this.lien +'/doctors/${idDoctor}/slots')
  }

getSlotsByDoctorsAndPatient(idDoctor: number, idPatient: number): Observable<Slot[]> {
  return this.http.get<Slot[]>(this.lien +`/slots/${idDoctor}/${idPatient}`);
}

}

