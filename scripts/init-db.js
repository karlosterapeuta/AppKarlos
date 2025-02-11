const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function main() {
  const dbDir = path.join(process.cwd(), '.next/sqlite');
  const dbPath = path.join(dbDir, 'prisma.db');

  console.log('Verificando diretório do banco de dados:', dbDir);
  console.log('Caminho do banco de dados:', dbPath);

  // Verificar se o diretório e arquivo existem
  if (!fs.existsSync(dbDir) || !fs.existsSync(dbPath)) {
    console.error('Erro: Diretório ou arquivo do banco de dados não encontrado');
    process.exit(1);
  }

  // Verificar permissões
  try {
    const dirStats = fs.statSync(dbDir);
    const fileStats = fs.statSync(dbPath);
    console.log('Permissões atuais:');
    console.log('- Diretório:', dirStats.mode.toString(8));
    console.log('- Arquivo:', fileStats.mode.toString(8));
  } catch (error) {
    console.error('Erro ao verificar permissões:', error);
    process.exit(1);
  }

  // Verificar se o arquivo é gravável
  try {
    fs.accessSync(dbPath, fs.constants.W_OK);
    console.log('Arquivo tem permissão de escrita');
  } catch (error) {
    console.error('Erro: Arquivo não tem permissão de escrita:', error.message);
    process.exit(1);
  }

  // Inicializar Prisma Client
  try {
    const prisma = new PrismaClient();

    console.log('Testando conexão com o banco de dados...');
    
    // Testar conexão
    await prisma.$queryRaw`SELECT 1+1 as result`;
    console.log('Conexão com o banco de dados estabelecida com sucesso');

    // Executar migrations se necessário
    try {
      await prisma.$executeRaw`PRAGMA foreign_keys = ON`;
      console.log('Foreign keys habilitadas');
    } catch (error) {
      console.warn('Aviso ao habilitar foreign keys:', error.message);
    }

    await prisma.$disconnect();
  } catch (error) {
    console.error('Erro durante a inicialização do banco de dados:', error);
    process.exit(1);
  }
}

main()
  .catch((e) => {
    console.error('Erro durante a inicialização:', e);
    process.exit(1);
  });
