const USER_KEY = "users";
export interface User extends Login {
  userId?: string;
  name: string;
  role: Role;
}

export interface Login {
  email: string;
  password: string;
}

export enum Role {
  Admin = "admin",
  User = "user",
  DevOps = "devops",
}
export const LOGGED_USER_KEY = "loggedUser";
class UserService {
  static isUserLoggedIn(): boolean {
    const loggedUser = localStorage.getItem(LOGGED_USER_KEY);
    return !!loggedUser;
  }

  static register(user: User): void {
    const users = this.getUsers();
    user.userId = Date.now().toString();
    users.push(user);
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }

  static login(user: Login): boolean {
    const users = this.getUsers();
    const foundUser = users.find(
      (u) => u.email === user.email && u.password === user.password
    );
    if (foundUser) {
      localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(foundUser));
      return true;
    }
    return false;
  }

  static getLoggedUser(): User {
    const loggedUser = localStorage.getItem(LOGGED_USER_KEY);
    return JSON.parse(loggedUser!) as User;
  }
  static getUsers(): User[] {
    const users = localStorage.getItem(USER_KEY);
    return JSON.parse(users ?? "[]") as User[];
  }

  static saveUsers(users: User[]): void {
    localStorage.setItem(USER_KEY, JSON.stringify(users));
  }
  static addUser(user: User): void {
    const users = this.getUsers();
    user.userId = Date.now().toString();
    users.push(user);
    this.saveUsers(users);
  }
}
export default UserService;
