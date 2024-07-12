import { ChangeEvent, useState } from "react";
import UserService, { Role, User } from "../services/UserService";
import { SelectChangeEvent } from "@mui/material";
import { LoginProps } from "./Login";

export const Register: React.FC<Omit<LoginProps, "onLogin">> = ({
  changePage,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<Role>(Role.User);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const user: User = { email, password, name, role };
    UserService.register(user);
    changePage();
  };

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setRole(value as Role);
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
        <label htmlFor="name">Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="name"
          name="name"
        />
        <label htmlFor="name">Role</label>
        <select onChange={handleRoleChange}>
          {Object.values(Role).map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <button type="submit">Register</button>
      </form>
      <button onClick={changePage}>Login</button>
    </div>
  );
};
