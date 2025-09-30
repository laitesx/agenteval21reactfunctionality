import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import RoleIcon0 from './Images/RoleIcon0.jpg'
import RoleIcon1 from './Images/RoleIcon1.jpg'
import RoleIcon2 from './Images/RoleIcon2.jpg'
import RoleIcon3 from './Images/RoleIcon3.jpg'

function App() {
  const [users, setUsers] = useState([]);

  function User({ user }) {
    if (user.roles.includes("admin")) {
      return <li key={user.userId}>
        {user.firstName} {user.lastName} <button onClick={(e) => ShowUserDetails(user.userId)}>Show</button> <img src={RoleIcon0} width={140} height={35} alt={'Admin'}></img>
      </li>;
    }
    else if (user.roles.includes("moderator")) {
      return <li key={user.userId}>
        {user.firstName} {user.lastName} <button onClick={(e) => ShowUserDetails(user.userId)}>Show</button> <img src={RoleIcon2} width={140} height={35} alt={'Moderator'}></img>
      </li>;
    }
    else if (user.roles.includes("user")) {
      return <li key={user.userId}>
        {user.firstName} {user.lastName} <button onClick={(e) => ShowUserDetails(user.userId)}>Show</button> <img src={RoleIcon2} width={140} height={35} alt={'Regular User'}></img>
      </li>;
    }
    else if (user.roles.includes("banned")) {
      return <li key={user.userId}>
        {user.firstName} {user.lastName} <button onClick={(e) => ShowUserDetails(user.userId)}>Show</button> <img src={RoleIcon1} width={140} height={35} alt={'Banned User'}></img>
      </li>;
    }
    else {
      return <li key={user.userId}>
        {user.firstName} {user.lastName} <button onClick={(e) => ShowUserDetails(user.userId)}>Show</button> No Roles
      </li>;
    }
  }

  function Role({ role }) {
    if (role === 'admin') {
      return <li><img src={RoleIcon0} width={140} height={35} alt={'Admin'}></img></li>;
    }
    else if (role === 'moderator') {
      return <li><img src={RoleIcon2} width={140} height={35} alt={'Moderator'}></img></li>;
    }
    else if (role === 'user') {
      return <li><img src={RoleIcon3} width={140} height={35} alt={'Regular User'}></img></li>;
    }
    else if (role === 'banned') {
      return <li><img src={RoleIcon1} width={140} height={35} alt={'Banned User'}></img></li>;
    }
  }

  function ShowUserDetails(userId) {
    var userDetailsBox = createRoot(document.getElementById('displayUserBox'));

    if (userId > 0) {
      userDetailsBox.render(<div></div>);
    }
    else {
      fetch('http://localhost:8080/users/user/' + userId).then(response => response.json()).then(data => {
        userDetailsBox.render(<div>
          <h2>{data.firstName} {data.lastName}</h2>
          <h3>{data.occupation}</h3>
          <h3>Roles</h3>
          <ul>
            {data.roles.map(role => (<Role role={role} />))}
          </ul>
        </div>);
      });
    }
  }

  useEffect(() => {
    fetch('http://localhost:8080/users/list').then(response => response.json()).then(data => { setUsers(data); });
  }, []);

  return (
    <div className="App">
      <div id="usersBox">
        <ul>
          {users.map(user => (
              <User user={user} />
          ))}
        </ul>
      </div>
      <div id="displayUserBox"></div>
    </div>
  );
}

export default App;
