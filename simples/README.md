# Prova de Conceito: salvar dados de formulário de contato

Baseado nas instruções de http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/
cuja planilha pública pode ser vista em https://docs.google.com/spreadsheets/d/1jNVgLi_dRPO413EmLBjr5rNTWUOt2On67OOJ6gdr5xE/edit?usp=sharing
e o formulário, para edição, visto em https://fititnt.github.io/iaf-iris-poc-google-sheets/simples/

<!--
- Planilha publica: https://docs.google.com/spreadsheets/d/1jNVgLi_dRPO413EmLBjr5rNTWUOt2On67OOJ6gdr5xE/edit?usp=sharing
- See http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/
- See https://github.com/AishwaryT/Google-app-script-crud
-->

## Como fazer você mesmo

É possível recriar em 10 minutos com as [instruções que estão na documentação
original](http://railsrescue.com/blog/2015-05-28-step-by-step-setup-to-send-form-data-to-google-sheets/).
As alterações são as seguintes:

- Há diferença na interface em inglês e na em português. São pequenas, mas
funciona (testado 2017-05-21)
- Ao realizar a etapa `Planilha de calculo > Ferramentas > Editor de Scripts`
não será necessário, no editor de scripts, fazer referência para a planilha,
a ultima versão do editor já estará relacionada.
- Caso seu idioma seja Português, em vez da planilha inicial ser `Sheet1`, será
algo como `Página1`, logo ou altere a planilha para `Sheet1` sem alterar o
[codigo-macro-google.js](codigo-macro-google.js), ou altere a segunda linha
desse código para o que está na planilha.
- Na linha 27 do [google-sheet.js](google-sheet.js) troque para a URL do script
(não é a URL da planilha, sim do script -- a macro -- que acessa a planilha)
