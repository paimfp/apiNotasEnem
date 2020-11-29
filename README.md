# apiNotasEnem

## Endpoints
Existem endpoints para acesso aos dados de uma só escola(pelo Código INEP) e para acessar uma lista com os dados de todas as escolas de um estado(pela sigla do estado).
Anos disponíveis:  
✔ 2019  
✔ 2018  
✔ 2017  
✔ 2016  
✔ 2015  
✔ 2014  
✔ 2013  
✔ 2012  
✔ 2011  
✔ 2010  
✔ 2009  

### UMA ESCOLA
Para acessar dados de uma única escola, use o código INEP no endpoint:  
**GET** ```https://mediasenem-com-br.umbler.net/apiNotasEnem/```[**ano**] ```/``` **[codInep]**

**Resposta com sucesso**
```
// GET https://mediasenem-com-br.umbler.net/apiNotasEnem/2019/31291030

{
  "encontrado": true,
  "ano": "2019",
  "escola": {
    "codInep": 31291030,
    "nome": "COLEGIO MILITAR DE BELO HORIZONTE",
    "municipio": "Belo Horizonte",
    "estado": "MG",
    "participantes": 63,
    "mediaCH": 646.46,
    "mediaCN": 614.82,
    "mediaLC": 622.93,
    "mediaMT": 763.7,
    "mediaObj": 661.98,
    "mediaRed": 816.83,
    "mediaGeral": 692.95
  },
  "mensagem": "Filtros usados nos participantes para cálculo das médias: Notas objetivas não nulas(NU_NOTA_CH > 0, NU_NOTA_LC > 0, NU_NOTA_MT > 0, NU_NOTA_CN > 0). CO_ESCOLA presente. Concluintes no ensino médio (TP_ST_CONCLUSAO == 2). Tipo de ensino regular (TP_ENSINO == 1). Mais informações acesse: https://github.com/paimfp/mediasENEM"
}
```

**Resposta com erro**
```
// GET https://mediasenem-com-br.umbler.net/apiNotasEnem/2019/00000000

{
  "encontrado": false,
  "mensagem": "Código INEP não encontrado"
}
```

### TODAS ESCOLAS DE UM ESTADO
Para acessar os dados de todas as escolas de um estado, use:  
**GET** ```https://mediasenem-com-br.umbler.net/apiNotasEnem/```[**ano**] ```/estado/``` **[siglaEstado]**

**Resposta com sucesso**
```
// GET https://mediasenem-com-br.umbler.net/apiNotasEnem/2019/estado/GO

{
  "encontrado": true,
  "ano": "2019",
  "estado": "GO",
  "registros": 956,
  "escolas": [
    {
      "codInep": 52068986,
      "nome": "COLEGIO WR",
      "municipio": "Goiânia",
      "estado": "GO",
      "participantes": 237,
      "mediaCH": 653.99,
      "mediaCN": 647.08,
      "mediaLC": 619.29,
      "mediaMT": 775,
      "mediaObj": 673.84,
      "mediaRed": 888.52,
      "mediaGeral": 716.78
    },
    {
      "codInep": 52213358,
      "nome": "",
      "municipio": "Inhumas",
      "estado": "GO",
      "participantes": 1,
      "mediaCH": 672.6,
      "mediaCN": 682.6,
      "mediaLC": 617.8,
      "mediaMT": 719.7,
      "mediaObj": 673.18,
      "mediaRed": 860,
      "mediaGeral": 710.54
    },
    ... ,
    ... ,
  "mensagem": "Filtros usados nos participantes para cálculo das médias: Notas objetivas não nulas(NU_NOTA_CH > 0, NU_NOTA_LC > 0, NU_NOTA_MT > 0, NU_NOTA_CN > 0). CO_ESCOLA presente. Concluintes no ensino médio (TP_ST_CONCLUSAO == 2). Tipo de ensino regular (TP_ENSINO == 1). Mais informações acesse: https://github.com/paimfp/mediasENEM"
}
```

**Resposta com erro**
```
// GET https://mediasenem-com-br.umbler.net/apiNotasEnem/2019/estado/GG

{
  "encontrado": false,
  "mensagem": "Sigla inválida para o estado"
}
```

**Detalhamento do cálculo das médias:** https://github.com/paimfp/mediasENEM


