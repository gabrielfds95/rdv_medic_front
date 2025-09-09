import { Injectable } from '@angular/core'; // Permet de marquer la classe comme injectable
import { HttpClient } from '@angular/common/http'; // Permet de faire des requêtes HTTP
import { Observable } from 'rxjs'; // Permet de gérer les flux de données asynchrones
import {Doctor} from '../Doctor/doctor.model';

@Injectable({
  providedIn: 'root' // Rend le service disponible partout dans l'application
})
export class ApiService {
  // URL de l'API backend Spring Boot
  private apiUrl = 'http://localhost:9000/doctors';

  constructor(private http: HttpClient) {} // Injection du client HTTP


  // Méthode GET pour récupérer la liste des médecins
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }
}

