// api.ts
import { Injectable } from '@angular/core'; // Permet de marquer la classe comme injectable
import { HttpClient } from '@angular/common/http'; // Permet de faire des requêtes HTTP
import { Observable } from 'rxjs'; // Permet de gérer les flux de données asynchrones

@Injectable({
  providedIn: 'root' // Rend le service disponible partout dans l'application
})
export class ApiService {
  constructor(private http: HttpClient) {} // Injection du client HTTP

  getData(): Observable<any> {
    // Méthode qui retourne un Observable contenant les données récupérées via GET
    return this.http.get('http://localhost:9000/dotors'); // Url GET
  }
}
