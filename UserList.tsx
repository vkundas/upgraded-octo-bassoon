import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedUsers, setSortedUsers] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
      fetch(`https://jsonplaceholder.typicode.com/users?name_like=${searchTerm}`)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
  }, [searchTerm]);

  useEffect(() => {
    setSortedUsers(
      users.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      }
    ));
  }, [sortOrder]);

  return (
    <div>
      <input
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={() => setSortOrder(() => (sortOrder === 'asc' ? 'desc' : 'asc'))}>
        Sort by name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
      </button>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <ul>
          {sortedUsers.map((user) => (
            <li>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
