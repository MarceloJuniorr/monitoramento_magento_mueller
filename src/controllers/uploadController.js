import { read, utils } from 'xlsx';
import { inserirPedidosMagento, limparTabelaMagento } from './queryController.js';

async function processarPlanilhaMagento(buffer) {
    // Leia a planilha com a configuração de codepage para UTF-8
    const workbook = read(buffer, { type: 'buffer', codepage: 65001 });
    const sheetName = workbook.SheetNames[0];
    const pedidos = utils.sheet_to_json(workbook.Sheets[sheetName], { raw: false });

    // Limpa a tabela Magento antes de inserir novos pedidos
    await limparTabelaMagento();


    // Insere cada pedido no banco de dados
    for (const pedido of pedidos) {
        await inserirPedidosMagento(pedido);
        console.log(pedido);
    }

    return pedidos;
}

export { processarPlanilhaMagento };