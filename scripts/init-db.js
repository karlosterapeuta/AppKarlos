const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function main() {
  // Verifica se o diretório do SQLite existe
  const dbDir = path.join(process.cwd(), '.next/sqlite');
  const dbPath = path.join(dbDir, 'prisma.db');

  console.log('Verificando diretório do banco de dados:', dbDir);
  console.log('Caminho do banco de dados:', dbPath);

  if (!fs.existsSync(dbDir)) {
    console.log('Criando diretório do banco de dados...');
    fs.mkdirSync(dbDir, { recursive: true, mode: 0o777 });
  }

  // Define permissões do diretório
  if (process.platform !== 'win32') {
    fs.chmodSync(dbDir, 0o777);
    console.log('Permissões do diretório atualizadas');
  }

  // Se o arquivo do banco não existir, cria um novo
  if (!fs.existsSync(dbPath)) {
    console.log('Criando arquivo do banco de dados...');
    fs.writeFileSync(dbPath, '', { mode: 0o666 });
  }

  // Define permissões do arquivo
  if (process.platform !== 'win32') {
    fs.chmodSync(dbPath, 0o666);
    console.log('Permissões do arquivo atualizadas');
  }

  // Tenta inicializar o Prisma Client
  try {
    const prisma = new PrismaClient();
    console.log('Testando conexão com o banco de dados...');
    
    // Tenta executar uma query simples
    await prisma.$queryRaw`SELECT 1+1 as result`;
    console.log('Conexão com o banco de dados estabelecida com sucesso');

    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('Erro durante a inicialização:', e);
    process.exit(1);
  });
