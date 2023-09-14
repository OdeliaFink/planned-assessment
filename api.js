const express = require('express')
const sqlite3 = require('sqlite3')

const app = express()
const port = 4001
const db = new sqlite3.Database('memories.db')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
db.serialize(() => {
  db.run(`
  CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    timestamp DATE
  )
`)
  //   db.run(`
  //   ALTER TABLE memories
  //   ADD COLUMN imageUrl TEXT;
  // `)
})

app.get('/memories', (req, res) => {
  db.all('SELECT * FROM memories', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json(rows)
  })
})

app.post('/memories', (req, res) => {
  const { imageUrl, name, description, timestamp } = req.body

  if (!imageUrl || !name || !description || !timestamp) {
    res.status(400).json({
      error: 'Please provide all fields: name, description, timestamp',
    })
    return
  }

  const stmt = db.prepare(
    `INSERT INTO memories ( name, description, timestamp, imageUrl) VALUES (?,?,?,?)`
  )
  stmt.run(name, description, timestamp, imageUrl, (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.status(201).json({ message: 'Memory created successfully' })
  })
})

app.get('/memories/:id', (req, res) => {
  const { id } = req.params
  db.get('SELECT * FROM memories WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    if (!row) {
      res.status(404).json({ error: 'Memory not found' })
      return
    }
    res.json({ memory: row })
  })
})

app.put('/memories/:id', (req, res) => {
  const { id } = req.params
  const { imageUrl, name, description, timestamp } = req.body

  if (name || description || timestamp || imageUrl) {
    const stmt = db.prepare(
      'UPDATE memories SET imageUrl = COALESCE(?,imageUrl), name = COALESCE(?,name), description = COALESCE(?,description), timestamp = COALESCE(?,timestamp) WHERE id = ?'
    )
    stmt.run(imageUrl, name, description, timestamp, id, (err) => {
      if (err) {
        res.status(500).json({ error: err.message })
        return
      }
      res.json({ message: 'Memory updated successfully' })
    })
  } else {
    res.status(400).json({
      error:
        'Please update at least one field: name, description, timestamp, image url',
    })
    return
  }
})

app.delete('/memories/:id', (req, res) => {
  const { id } = req.params
  console.log('🚀 ~ file: api.js:112 ~ app.delete ~  req.params:', req.params)

  db.run('DELETE FROM memories WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message })
      return
    }
    res.json({ message: 'Memory deleted successfully' })
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
