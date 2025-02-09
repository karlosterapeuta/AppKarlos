const fs = require('fs');
const path = require('path');

// Determina o diretório base com base no ambiente
const baseDir = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), '.netlify/sqlite')
  : path.join(process.cwd(), '.next/sqlite');

// Cria o diretório para o SQLite se ele não existir
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
  console.log('Diretório SQLite criado:', baseDir);
}

// Cria um arquivo vazio para o banco de dados se ele não existir
const dbPath = path.join(baseDir, 'prisma.db');
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '');
  console.log('Arquivo do banco de dados criado:', dbPath);
}

// Define as permissões corretas para o diretório e arquivo
if (process.platform !== 'win32') {
  try {
    fs.chmodSync(baseDir, '755');
    fs.chmodSync(dbPath, '644');
    console.log('Permissões definidas corretamente');
  } catch (error) {
    console.warn('Aviso: Não foi possível definir as permissões:', error.message);
  }
}
