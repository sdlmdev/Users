import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const FIRST_NAMES = [
	'Александр',
	'Сергей',
	'Дмитрий',
	'Андрей',
	'Алексей',
	'Максим',
	'Евгений',
	'Иван',
	'Михаил',
	'Артем',
	'Николай',
	'Владимир',
	'Денис',
	'Антон',
	'Павел',
	'Руслан',
	'Олег',
	'Игорь',
	'Анатолий',
	'Виктор',
	'Елена',
	'Ольга',
	'Наталья',
	'Екатерина',
	'Анна',
	'Татьяна',
	'Мария',
	'Светлана',
	'Юлия',
	'Анастасия',
	'Ирина',
	'Виктория',
	'Оксана',
	'Марина',
	'Надежда',
	'Любовь',
	'Вера',
	'Инна',
	'Яна',
	'Дарья',
];

const LAST_NAMES = [
	'Иванов',
	'Смирнов',
	'Кузнецов',
	'Попов',
	'Васильев',
	'Петров',
	'Соколов',
	'Михайлов',
	'Новиков',
	'Федоров',
	'Морозов',
	'Волков',
	'Алексеев',
	'Лебедев',
	'Семенов',
	'Егоров',
	'Павлов',
	'Козлов',
	'Степанов',
	'Николаев',
	'Орлов',
	'Андреев',
	'Макаров',
	'Никитин',
	'Захаров',
	'Зайцев',
	'Соловьев',
	'Борисов',
	'Яковлев',
	'Григорьев',
	'Кузьмин',
	'Воробьев',
	'Сергеев',
	'Фролов',
	'Александров',
	'Дмитриев',
	'Королев',
	'Гусев',
	'Киселев',
	'Ильин',
];

const GROUPS = ['management', 'accounting', 'hr', 'marketing', 'it', null];

const transliterate = (text) => {
	const map = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'e',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'ts',
		ч: 'ch',
		ш: 'sh',
		щ: 'sch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
	};
	return text
		.toLowerCase()
		.split('')
		.map((char) => map[char] || char)
		.join('');
};

const generateUser = (id) => {
	const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
	const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
	const group = GROUPS[Math.floor(Math.random() * GROUPS.length)];
	const email = `${transliterate(firstName)}.${transliterate(lastName)}.${id}@example.com`;

	return {
		id: String(id),
		firstName,
		lastName,
		email,
		group,
	};
};

const count = Number(process.argv.slice(2).pop()) || 10;
const users = Array.from({ length: count }, (_, i) => generateUser(i + 1));

const data = { users };
const targetPath = path.resolve(__dirname, '..', 'server', 'db.json');

try {
	fs.writeFileSync(targetPath, JSON.stringify(data, null, 2));
	console.log(`Successfully generated ${count} users in server/db.json`);
} catch (error) {
	console.error('Error writing to db.json:', error);
	process.exit(1);
}
