const cool = require('cool-ascii-faces');
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const {Pool} = require('pg');

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/times', (req, res) => res.send(showTimes()))
  .get('postage', (req, res) => res.send('public/postage.html'))
  .get('postjs', (req, res) => res.send('public/stylesheets/postage.js'))
  .get('postcss', (req, res) => res.send('public/postage.css'))
  .get('price', (req, res) => res.send('pages/price'))	 
  .get('/db', async (req, res) => {
	  try {
		  const client = await pool.connect();
		  const result = await client.query('SELECT * FROM test_table');
		  const results = {'results':(result) ? result.rows : null};
		  res.render('pages/db', results);
		  client.release();
	  }catch (err) {
		  console.error(err);
		  res.send("Error " + err);
	  }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

showTimes = () => {
	let result = '';
	const times = process.env.TIMES || 5;
	for (i=0; i < times; i++) {
		result += i + '';
	}
	return result;
}
const pool = new Pool({
	connectionString: process.env.DATABASE_URL, 
	ssl: {
		rejectUnauthorized: false
	}
});