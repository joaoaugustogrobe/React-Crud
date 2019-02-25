# Crud
Projeto de cadastro de usuarios feito em React.
O projeto foi desenvolvido durante o curso de React - Cod3r, porém todo o backend foi alterado, não usando o processo visto no curso.
![Projeto](https://i.imgur.com/7OX4xmb.png)

## Objetivos:
Criar uma aplicação Web feita em React que faça as 4 operações basicas de um cadastro (Criar, Ler, Atualizar e Deletar) usuários.


## Execução:
Este projeto foi dividido em duas partes:

~~Servidor json:
Servidor simples que trata as requisições feitas pela aplicação front-end.
Este servidor também gerencia um arquivo .json que armazena todos os dados dos usuarios~~

### Servidor Express
Após criar o servidor json (visto dentro do curso) decidi criar meu proprio servidor usando Express e MySql (o mesmo se encontra em meu outro repositório) e integrar com este projeto React. Mais informações sobre o backend, acesse: https://github.com/joaoaugustogrobe/Express-CRUD-Backend


#### Front-end / React
Parte responsavel por disponibilizar uma interface grafica para o usuário e fazer as requisições com o servidor.


## O que aprendi:
Durante este projeto, consolidei melhor os conceitos:

- [x] requisições HTML através do Axios;
- [x] componentes do React;
- [x] Noções basicas sobre o bootstrap;
- [x] Biblioteca font-awesome;
- [x] Navegação utilizando React-router;



## Proxima etapa / Indo além do curso
Após terminar o curso, pretendo alterar o back-end do servidor, utilizando um banco SQL e um banco NoSQL, para testar as diferenças de desempenho entre as 3 formas e a facilidade de criação do ambiente em cada uma das formas.
- [x] Back-end
- [x] Banco de dados Sql (MySql)
- [ ] Banco de dados NoSQL
- [x] Invalidar input vazio
- [ ] Validação do campo de email (necessario sintaxe <>@<>.<> ou similar)



## Executando o serviço:
* Para executar este projeto é necessario baixar o servidor backend (link já postado anteriormente).

Entra no diretorio frontend e executa a aplicação react - http://localhost:3000 * Entrar neste link para visualizar a aplicação
```
cd frontend && npm start
```

~~Entra no diretorio backend e executa o servidor json - http://localhost:3001
cd backend && npm start~~



