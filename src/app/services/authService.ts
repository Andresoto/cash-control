import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private auth = inject(Auth);

  createUser(username: string, email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  loginUser(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser() {
    return this.auth.signOut();
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
