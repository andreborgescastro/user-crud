# Instruções para Execução do Projeto

Este projeto é um sistema de cadastro de usuários desenvolvido utilizando Node.js adotando NestJS como framework, integrado a um banco de dados relacional MySQL. A aplicação foi containerizada, tanto ela quanto o banco de dados, para facilitar a execução em diferentes plataformas.

## Pré-requisitos

Certifique-se de ter o ambiente NODE configurado, bem como o Docker e Docker Compose instalados em sua máquina.

## Configuração

1. Renomeie o arquivo `.env-example` para `.env`.
2. Execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

## Execução

Para iniciar a aplicação, execute o seguinte comando:

```bash
docker compose up
```

Após a criação dos containers, você precisará aplicar as migrações e popular o banco de dados com dados iniciais.

1 - Execute o seguinte comando na raiz do projeto para aplicar as migrações:

```bash
make migrate
```

2 - Em seguida, execute o seguinte comando para popular o banco de dados com dados iniciais:

```
make seed
```

## Utilização

Após seguir os passos acima, o sistema estará pronto para ser utilizado. Você pode consumir a API conforme a collection fornecida.

### Collection

A collection foi exportada do request insomnia, recomendamos que consuma com o mesmo para evitar conflitos. Está na raíz do projeto, na pasta /collection.


## Testes

Para executar os testes, utilize os seguintes comandos:

Para testar:
```bash
npm run test
```

Para estatísticas de percentual de cobertura testado:
```bash
npm run test:cov
```

## Notas Adicionais
Certifique-se de que as portas necessárias não estejam sendo utilizadas por outros serviços em sua máquina.

## Autenticação
Já há um usuário padrão criado na aplicação, as credenciais estão na collection, ou abaixo:

``` bash
{
	"username":"usuario01",
	"password":"senha01"
}
```

### Portas
A API é disponibilizada na porta 3000. E o banco de dados na porta 3306.

### Swagger
Para acessar o swagger da aplicação é necessário que suba o serviço e acesse:

http://localhost:3000/api

Por favor, sinta-se à vontade para entrar em contato em caso de dúvidas ou problemas durante a execução do projeto.
