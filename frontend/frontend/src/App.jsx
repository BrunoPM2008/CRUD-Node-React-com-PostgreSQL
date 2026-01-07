import { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  function carregarUsuarios() {
    fetch('http://localhost:3001/usuarios')
      .then(res => res.json())
      .then(data => setUsuarios(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function editarUsuario(user) {
    setNome(user.nome || '');
    setEmail(user.email || '');
    setEditandoId(user.id);
  }

  function deletarUsuario(id) {
    fetch(`http://localhost:3001/usuarios/${id}`, {
        method: 'DELETE',
      }).then(() => {
        carregarUsuarios();
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const url = editandoId
      ? `http://localhost:3001/usuarios/${editandoId}`
      : 'http://localhost:3001/usuarios';

    const method = editandoId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email }),
    })
      .then(() => {
        setNome('');
        setEmail('');
        setEditandoId(null);
        carregarUsuarios();
      });
  }


  return (
    <>
  <form onSubmit={handleSubmit}>
      <input
        placeholder='Nome:'
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder='Email:'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button type="submit">
        {editandoId ? 'Atualizar' : 'Cadastrar'}
      </button>

      {editandoId && (
        <button
          type="button"
          onClick={() => {
            setNome('');
            setEmail('');
            setEditandoId(null);
          }}
        >
          Cancelar
        </button>
      )}
    </form>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Editar</th>
          <th>Excluir</th>
        </tr>
      </thead>

      <tbody>
        {usuarios.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.nome}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => editarUsuario(user)}>
                <FaEdit />
              </button>
            </td>
            <td>
              <button onClick={() => deletarUsuario(user.id)}>
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}

export default App;