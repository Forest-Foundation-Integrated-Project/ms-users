# ms-users

Antes do iniciar o projeto, tenha o Serverless Framekwork instalado


### Iniciando o projeto

Escolha um local para copiar a pasta do projeto.
Para selecionar a pasta abra o cmd `Windows + R` e digite cmd. Após isso, navegue até achar o local que desejar ( `cd + nomePasta` para mudar para outra pasta ou `cd ..` para voltar) 

#### Em seguida clone o projeto:
```
git clone https://github.com/Forest-Foundation-Integrated-Project/ms-users.git 
```

No cmd, mude para a pasta **ms-users** criada e digite `code .`

Projeto aberto :)

#### Também, no cmd, instale o Serverless Framework `npm install -g serverless`

<hr />

### Configurando o projeto

Dentro do VisualCode, digite `ctrl + J` para abrir o terminal integrado. Em seguida, digite `npm i`

Mude o nome do arquivo .env.example para .env e coloque as informações 
 - localhost
 - 3306(no caso do mysql)
 - root

npx sequelize-cli db migrate:run

Para iniciar o projeto
```
npx serverless offline
```

Pronto 😎

### Definindo banco de dados
Por padrão o banco dedados vai estar como postgree

Para abrir na sala, mysql
 > * Crie o banco mysql
 2. No terminal: 
  * `npm install --save mysql2`
  * npx sequelize-cli db:migrate
  3.
