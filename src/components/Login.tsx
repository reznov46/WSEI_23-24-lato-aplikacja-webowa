import { useState } from "react";
import UserService from "../services/UserService";

export interface LoginProps {
  changePage: () => void;
  onLogin: () => void;
}
export const Login: React.FC<LoginProps> = ({ changePage, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const login = { email, password };
    UserService.login(login);
    onLogin();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={changePage}>Register</button>
    </div>
  );
};
