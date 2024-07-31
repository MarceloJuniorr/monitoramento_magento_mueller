SELECT
    tray.produto as ID_TRAY,
    no as PRODUTO,
    grade as GRADE,
    tray.preco as PRECO_TRAY,
    ROUND(prp.refprice/100,2) as PRECO_NERUS,
    ROUND(tray.peso/1000, 3) as PESO_TRAY,
    ROUND(weight, 3) as PESO_NERUS,
    tray.comprimento as COMPRIMENTO_TRAY,
    prd.m4 as COMPRIMENTO_NERUS,
    tray.altura as ALTURA_TRAY,
    prd.m5 as ALTURA_NERUS,
    tray.largura as LARGURA_TRAY,
    prd.m6 as LARGURA_NERUS
FROM
    sqldados.prd
    LEFT JOIN sqldados.prdbar ON (prd.no = prdbar.prdno)
    LEFT JOIN sqldados.prp ON (prd.no = prp.prdno AND prp.storeno=5)
    INNER JOIN sqlmonitoramento.tray ON (
        produto = prdbar.l1
        OR produto = prd.l11
    )
WHERE
    tray.preco != prp.refprice/100 OR
    ROUND(tray.peso/1000, 3) != ROUND(weight, 3) OR
    tray.comprimento != prd.m4 OR
    tray.altura != prd.m5 OR
    tray.largura != prd.m6
group by
    1,2;

