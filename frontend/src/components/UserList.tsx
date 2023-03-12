import React, { useState, useEffect } from "react";

/**
 * A User is an object with an id, email, and password property, where the id is of type any, the email
 * is of type string, and the password is of type any.
 * @property {any} id - any;
 * @property {string} email - string;
 * @property {any} password - any;
 */
type User = {
  id: any;
  email: string;
  password: any;
};

const UserList = () => {
  /* Setting the state of the users to an empty array. */
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  console.log(`${process.env.REACT_APP_API_URL}/users`);

  return (
    <div style={{ backgroundColor: "#FFF" }}>
      {users.map((user) => (
        <div key={user.id}>
          <h2>{user.email}</h2>
          <p>{user.password}</p>
        </div>
      ))}
    </div>
  );
};

export default UserList;
