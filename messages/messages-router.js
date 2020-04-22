const express = require('express');
const db = require('../data/config');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		// translates to SELECT * FROM "messages";
		const messages = await db.select('*').from('messages');
		res.json(messages);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		// SELECT * FROM "messages" WHERE "id" = ? LIMIT 1;
		// const [message] = await db.select('*').from('messages').where('id', req.params.id).limit(1);;
		const message = await db('messages').where('id', req.params.id).first();
		res.json(message);
	} catch (error) {
		next(error);
	}
});

router.post('/', async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		};
		// INSERT INTO "messages" ("title", "contents") VALUES (?, ?)
		const [id] = await db('messages').insert(payload);
		const message = await db('messages').where('id', id).first();
		res.json(message);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const payload = {
			title: req.body.title,
			contents: req.body.contents,
		};
		// UPDATE "messages" SET "title" = ? AND "contents" = ? WHERE "id" = ?
		await db('messages').where('id', req.params.id).update(payload);
		const updatedMessage = await db('messages')
			.where('id', req.params.id)
			.first();
		res.json(updatedMessage);
	} catch (error) {
		next(error);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		// DELETE FROM "messages" WHERE "id"=?;
		await db('messages').where('id', req.params.id).del();
		res.status(204).end();
	} catch (error) {
		next(error);
	}
});

module.exports = router;
