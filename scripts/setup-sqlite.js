const fs = require('fs');
const path = require('path');

// Determina o diretório base com base no ambiente
const baseDir = process.env.NODE_ENV === 'production' 
  ? path.join(process.cwd(), '.next/sqlite')
  : path.join(process.cwd(), '.next/sqlite');

console.log('Criando diretório SQLite em:', baseDir);

// Cria o diretório para o SQLite se ele não existir
if (!fs.existsSync(baseDir)) {
  try {
    fs.mkdirSync(baseDir, { recursive: true });
    console.log('Diretório SQLite criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar diretório SQLite:', error);
    process.exit(1);
  }
}

// Cria um arquivo vazio para o banco de dados se ele não existir
const dbPath = path.join(baseDir, 'prisma.db');
if (!fs.existsSync(dbPath)) {
  try {
    fs.writeFileSync(dbPath, '');
    console.log('Arquivo do banco de dados criado com sucesso');
  } catch (error) {
    console.error('Erro ao criar arquivo do banco de dados:', error);
    process.exit(1);
  }
}

// Define as permissões corretas para o diretório e arquivo no Linux/Unix
if (process.platform !== 'win32') {
  try {
    fs.chmodSync(baseDir, '755');
    fs.chmodSync(dbPath, '644');
    console.log('Permissões definidas com sucesso');
  } catch (error) {
    console.warn('Aviso: Não foi possível definir as permissões:', error.message);
  }
}

console.log('Setup do SQLite concluído com sucesso');
