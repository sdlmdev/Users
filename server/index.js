import jsonServer from 'json-server';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = 3001;

server.use(middlewares);

server.get('/stats', (req, res) => {
	const db = router.db.getState();
	const users = db.users || [];

	const usersCount = users.length;
	const groupsCount = new Set(users.map(u => u.group).filter(Boolean)).size;

	res.jsonp({
		usersCount,
		groupsCount
	});
});

server.use(router);

server.listen(PORT, () => {
	console.log(`JSON Server is running on http://localhost:${PORT}`);
	console.log(`Custom endpoint: http://localhost:${PORT}/stats`);
});
