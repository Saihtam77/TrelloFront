import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commentaire } from '../../../Data_types/Projets_types';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private commentairesSubject = new BehaviorSubject<Commentaire[]>([]);
  commentaires$ = this.commentairesSubject.asObservable();
  url = "http://localhost:5147";
  
  constructor(private http: HttpClient) { }

  //Commentaire request
  getCommentaires() {
    this.http.get<Commentaire[]>(`${this.url}/commentaires`).subscribe(
      commentaires => this.commentairesSubject.next(commentaires)
    );
    return this.commentaires$;
  }

  getCommentaireById(id: number) {
    return this.http.get<Commentaire>(`${this.url}/commentaires/${id}`);
  }

  getCommentaireByTacheId(Tacheid: number) {
    this.commentaires$.subscribe(commentaires => commentaires.filter(commentaire => commentaire.tacheId === Tacheid));
    return this.commentaires$;
  }

  deleteCommentaire(id: number) {
    this.http.delete(`${this.url}/commentaires/${id}`).subscribe(
      () => this.getCommentaires()
    );
  }

  createCommentaire(commentaire: Commentaire) {
    this.http.post<Commentaire>(`${this.url}/commentaires`, commentaire).subscribe(
      () => this.getCommentaires()
    );
  }

  updateCommentaire(id: number, commentaire: Commentaire) {
    this.http.put<Commentaire>(`${this.url}/commentaires/${id}`, commentaire).subscribe(
      () => this.getCommentaires()
    );
  }
}
