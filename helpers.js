const listaEstados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
  "DF",
];

const mensagemFiltro =
  "Filtros usados nos participantes para cálculo das médias: Notas objetivas não nulas(NU_NOTA_CH > 0, NU_NOTA_LC > 0, NU_NOTA_MT > 0, NU_NOTA_CN > 0). CO_ESCOLA presente. Concluintes no ensino médio (TP_ST_CONCLUSAO == 2). Tipo de ensino regular (TP_ENSINO == 1). Mais informações acesse: https://github.com/paimfp/mediasENEM";
export { listaEstados, mensagemFiltro };
