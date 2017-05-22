# Prova de Conceito 3: Entrada por voz com comando salvo em planilha, variante
Acesse <https://fititnt.github.io/iaf-iris-poc-google-sheets/poc3/> para
ver a versão atual. O formulário você deverá cadastrar com botão "Lembrar meus
dados".

## Como recriar do zero

1. Crie uma nova planilha em https://docs.google.com/spreadsheets/
2. Nesta planilha, adicione na primeira linha campos equivalentes a
  [events-metadata.tsv](events-metadata.tsv)
3. Clique em "Ferramentas > Editor de Scripts" no seu Google Planilhas.
   Irá abrir um editor de scripts
4. Copie e cole todo esse código arquivo [macro-planilha.js](macro-planilha.js) para o editor
   de scripts que abriu
5. Salve (clique no "disquete", ou aperte as telas 'Ctrl + S' se não sabe
   o que é um ícone de disquete). Qualquer nome de projeto serve. Sugerido
   "poc2"
6. Em "Select function" selecione "Setup".
7. Clique em "Run" (é um triângulo apontando para direita, entre um relógio
   e um inseto)
8. Clique em "Review Permissions" na caixa que irá aparecer. Selecione sua
   conta pessoal
9. Publish > Deploy as web app
   - "Project version" pode ser valor 1
   - Execute the app as: "me" (vai rodar como se fosse você)
   - Who has access to the app: "Anyone, even anonymous"
10. Copie a URL de "Current web app URL:" e cole na respectíva área da sua interface
