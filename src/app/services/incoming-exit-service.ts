import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc, collection, collectionSnapshots, deleteDoc } from '@angular/fire/firestore';
import { IncomeExit, IncomeExitFirebase } from '../models/income-exit';
import { AuthService } from './authService';
import { Store } from '@ngrx/store';
import { IncomingExitState } from '../incoming-exit/incoming-exit.reducer';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IncomingExitService {
  private readonly firestore = inject(Firestore);
  private readonly userService = inject(AuthService);
  private readonly store = inject(Store<IncomingExitState>);

  async saveIncomeExit(data: IncomeExit) {
    const uid = this.userService.user?.uid;
    const colectionRef = collection(this.firestore, `${uid}/income-exit/items`);
    const newDocRef = doc(colectionRef);
    try {
      return await setDoc(newDocRef, { ...data });
    } catch (e) {
      console.error('Error al añadir documento: ', e);
    }
  }

  initIncomeExitListener(userUid: string) {
    const collectionRef = collection(this.firestore, `${userUid}/income-exit/items`);

    return collectionSnapshots(collectionRef)
    .pipe(
      map( (snapshot) => {
        console.log(snapshot);
        return snapshot.map((doc) => {
          return IncomeExit.fromFirebase({uid: doc.id, ...doc.data() } as IncomeExitFirebase);
        });
      })
    )
  }

  deleteIncomeExit(uid: string) {
    const userUid = this.userService.user?.uid;
    const docRef = doc(this.firestore, `${userUid}/income-exit/items/${uid}`);
    return deleteDoc(docRef);
  }
}
