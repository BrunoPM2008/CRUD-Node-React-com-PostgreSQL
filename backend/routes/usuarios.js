const express = require('express');
const pool = require('../db');
const router = express.Router();

//Listar
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM usuarios ORDER BY id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

//Adicionar
router.post('/', async (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      error: 'Nome e email são obrigatórios',
    });
  }

  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar usuário');
  }
});

//Deletar
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM usuarios WHERE id = $1',
      [id]
    );
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao deletar usuário');
  }
});

//Editar
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({
      error: 'Nome e email são obrigatórios',
    });
  }

  try {
    await pool.query(
      'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3',
      [nome, email, id]
    );

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar usuário');
  }
});

//Fim CRUD
module.exports = router;
