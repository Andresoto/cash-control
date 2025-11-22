import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  authState,
} from '@angular/fire/auth';
import { map, Observable } from 'rxjs';
import { User } from '../auth/models/user.model';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);
  private readonly firestore = inject(Firestore);

  async createUser(username: string, email: string, password: string) {
    const { user } = await createUserWithEmailAndPassword(this.auth, email, password);
    const newUser = new User(user.uid, username, user.email || '');

    try {
      await setDoc(doc(this.firestore, `${newUser.uid}/user`), {...newUser});
    } catch (e) {
      console.error('Error al añadir documento: ', e);
    }

    return user;
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser() {
    return this.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return authState(this.auth).pipe(
      map((user) => user != null)
    );
  }

  getErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'El correo electrónico ya está en uso',
      'auth/invalid-email': 'El correo electrónico no es válido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es muy débil',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/invalid-credential': 'Credenciales inválidas',
    };

    return errorMessages[errorCode] || 'Ocurrió un error inesperado. Intenta nuevamente.';
  }
}
