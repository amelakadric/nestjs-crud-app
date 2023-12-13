export class User {
  private static count = 0;
  id: number;
  email: string;
  name: string;
  type: number;

  constructor(email: string, name: string, type: number) {
    this.id = User.count += 1;
    this.email = email;
    this.name = name;
    this.type = type;
  }
}
