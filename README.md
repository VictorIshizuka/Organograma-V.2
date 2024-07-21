## Projeto voltado para estudo

O Organograma V.2 visa ser superior a um projeto criado no inicio deste ano com mais funcinalidades e libs que auxiliaram no desenvolvimento.

O foco do projeto é no frontend e tem como objetivo  crescimento pessoal.

## Funcionalidades atuais para interação enquanto o backend nâo está pronto
- Página de login (mockado), forgotpassword (mockado), resetpassword(mockado)
- Página de cadastro funcionado apenas para criqaçção e e listagem simples sem validações e erros...
- Página de perfil apenas mostra o usuario logado
- O login é so uma verificação booleana, pois caso der refresh a tela volta para o login 
- Função de deletar so esta deletando a apenas um usuario do array usando filter, quando tenta deletar outro ele reseta lista deletando usuario atual escolhido e trazendo o anterior de volta para a lista


## Adicionar fucnionalidades
- filtro para buscar colaboradores
- paginação por de colaboradores por time para evitar uso do scroll 
- admin mockado para dar permisao de deletar
- adicionar loading na listagem, botões que geram acões
- adicionar mask para fotos apenas do github sem nesssicade de tratar dados em base64
- adicionar avalidações e tratamento de erros (yup e react hook form)

(APÓS ESTES EXERCÍCIOS O PROJETO ESTARÁ FINALIZADO)

### Tecnologias
- React-router-dom
- React-hook-form
- React.ts + Vite 
- Material ui
- uuid
- yup


## Para iniciar a aplicação 
`npm i`
`npm run dev`