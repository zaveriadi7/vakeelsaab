import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from 'pg';
const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port=8000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public'));
import dotenv from 'dotenv';
dotenv.config();
// const pool = new Pool({
//     user: 'postgres',    
//     host: 'localhost',
//     database: 'vakeelsahab',   
//     password: 'tiger', 
//     port: 5432,               
// });
//const DB_URL = 'postgresql://vakeelsahab_user:7gFOFPP5M772yZWt9XsWtDwBR3reXKIf@dpg-ct4pvm1u0jms73a9rt50-a/vakeelsahab';

const DB_URL = process.env.DB_URL;

const pool = new Pool({
    connectionString: DB_URL,
    ssl: {
        rejectUnauthorized: false  // Set to false for self-signed certificates (if using a service like Render or AWS)
    }
});


 
  app.get('/test-db', async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW()'); // A simple query to check DB connection
      res.send(`Database Connected! Current time: ${result.rows[0].now}`);
    } catch (err) {
      console.error('Database connection error:', err);
      res.status(500).send('Failed to connect to the database');
    }
  });
app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

app.post('/contact',async (req,res)=>{
    const { name, email, number: phone_number } = req.body;

    try {
        // Insert data into the contacts table
        await pool.query(
            'INSERT INTO contact_us VALUES ($1, $2, $3)',
            [name, email, phone_number]
        );
        console.log('Contact saved:', { name, email, phone_number });

        // Redirect or respond after storing data
        res.sendFile(path.join(__dirname, 'public', 'registered.html'));
    } catch (err) {
        console.error('Error saving contact:', err);
        res.status(500).send('Error saving contact');
        res.sendFile(path.join(__dirname, 'public', 'error.html'));

    }
})

app.post('/consult',async (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'consultationrequest.html'));
})

app.post('/requestconsult',async (req,res)=>{
    const { name, email, number, issue,date,description } = req.body;
    console.log(date);
    console.log(description);
    console.log('Consult saved:', { name, email, number,issue,date,description });
    try {
        const query = `
            INSERT INTO consultations (name, email, phone_number, issue_type, dispute_date, description)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        await pool.query(query, [name, email, number, issue, date, description]);
        res.sendFile(path.join(__dirname, 'public', 'registered.html'));
        
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).send('An error occurred.');
        res.sendFile(path.join(__dirname, 'public', 'error.html'));
    }
});
    
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});