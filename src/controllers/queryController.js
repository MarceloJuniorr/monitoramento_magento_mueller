import { createPool } from 'mysql2/promise';
import config from '../config.js'


const pool = createPool(config.database);

async function limparTabelaMagento() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const deleteSql = `DELETE FROM ${config.database.name}.${config.tabelaMagento}`;
    await connection.execute(deleteSql);

    await connection.commit();

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log({ message: error.message });
    return error.message;

  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function inserirPedidosMagento(pedido) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();



    const insertData = {
      pedido: pedido['Id.'],
      data: pedido['Data da Compra'],
      situacao: pedido['Situação'],
      grupo_cliente: pedido['Grupo de clientes']
      
    };

    const fields = Object.keys(insertData);
    const sql = `INSERT IGNORE INTO ${config.database.name}.${config.tabelaMagento} (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`;
    const values = fields.map(field => insertData[field]);
    await connection.execute(sql, values);

  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.log({message: error.message});
    return (error.message);

  } finally {
    if (connection) {
      connection.release();
    }
  }
}


async function verificacaoTabelas() {
  console.log('Iniciando verificação de tabelas');

  try {
    const connection = await pool.getConnection();

    try {
      const sqlCriarTabelaMagento = `
      CREATE TABLE IF NOT EXISTS ${config.database.name}.${config.tabelaMagento} (
        pedido         varchar(100),
        data           varchar(200),
        situacao       varchar(100),
        grupo_cliente  varchar(100),
        primary key    (pedido)
        )
      `

      await connection.query(sqlCriarTabelaMagento);
      console.log(`Verificação de tabelas concluidas`);
    } catch (error) {
      console.error('Erro ao executar consulta:', error.message);
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    if (error.code === 'ENOTFOUND') {
      console.error('Erro: O host especificado não pode ser encontrado.');
    } else {
      console.error('Erro desconhecido ao conectar ao banco de dados:', error.message);
    }
    throw error;
  }
}

export { verificacaoTabelas, inserirPedidosMagento, limparTabelaMagento };