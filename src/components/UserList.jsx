import React, { useState, useEffect } from "react";
import UserArray from "../js/UserArray";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/styles.css";
import { UserCreate } from "./UserCreate";
export const UserList = () => {
  const [users, setUsers] = useState(UserArray);

  useEffect(() => {
    UsersGet();
  }, []);

  const UsersGet = () => {
    fetch("https://www.melivecode.com/api/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  };

  const UpdateUser = (id) => {
    window.location = "/update/" + id;
  };

  const UserDelete = (id) => {
    var data = {
      id: id,
    };
    fetch("https://www.melivecode.com/api/users/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert(result["message"]);
        if (result["status"] === "ok") {
          UsersGet();
        }
      });
  };

  return (
    <div className="todo">
      <div className="table-container">
        <div className="encabezado">
          <h2>Usuarios</h2>
          <Link to="/create" element={<UserCreate />}>
            <Button variant="contained" color="primary">
              Crear
            </Button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nombre de Usuario</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody className="table-item">
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img
                    src={user.avatar}
                    alt={`Avatar de ${user.fname} ${user.lname}`}
                  />
                </td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.username}</td>
                <td style={{ textAlign: "center" }}>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Button onClick={() => UpdateUser(user.id)}>Editar</Button>
                    <Button onClick={() => UserDelete(user.id)}>Borrar</Button>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
