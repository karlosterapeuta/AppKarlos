const fs = require('fs');
const path = require('path');

const sqliteDir = path.join(process.cwd(), '.next/sqlite');

// Cria o diretório para o SQLite se ele não existir
if (!fs.existsSync(sqliteDir)) {
  fs.mkdirSync(sqliteDir, { recursive: true });
  console.log('Diretório SQLite criado:', sqliteDir);
}

// Cria um arquivo vazio para o banco de dados se ele não existir
const dbPath = path.join(sqliteDir, 'prisma.db');
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
  console.log('Arquivo do banco de dados criado:', dbPath);
}
