import React, { useEffect, useState, useRef } from 'react';
import api from '../services/api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const nomeRef = useRef();
  const idadeRef = useRef();
  const emailRef = useRef();

  useEffect(() => {
    async function fetchUsuarios() {
      const response = await api.get('/usuarios');
      setUsuarios(response.data);
    }
    fetchUsuarios();
  }, []);

  async function handleCadastrar() {
    const novoUsuario = {
      nome: nomeRef.current.value,
      idade: idadeRef.current.value,
      email: emailRef.current.value,
    };
    await api.post('/usuarios', novoUsuario);
    // Atualiza lista
    const response = await api.get('/usuarios');
    setUsuarios(response.data);
  }

  return (
    <div>
      <h2>Cadastro de Usuários</h2>
      <input ref={nomeRef} placeholder="Nome" />
      <input ref={idadeRef} placeholder="Idade" type="number" />
      <input ref={emailRef} placeholder="E-mail" />
      <button onClick={handleCadastrar}>Cadastrar</button>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nome} ({u.idade}) - {u.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Usuarios;
