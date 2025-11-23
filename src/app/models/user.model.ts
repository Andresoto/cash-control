export class User {

  static fromFirebase({ uid, email, username }: UsuarioDataFirebase): User {
    return new User(uid, username, email);
  }

  constructor(
    public uid: string,
    public username: string,
    public email: string
  ) {}
}

export interface UsuarioDataFirebase{
  username: string;
  email: string;
  uid: string;
}
