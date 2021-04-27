# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um novo carro.

**RNF** => Requisitos não funcionais
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
Deve ser possível listar todos os carros disponíveis
Deve ser possível listar todos os carros disponíveis pelo nome da categoria
Deve ser possível listar todos os carros disponíveis pleo nome da marca
Deve ser possível listar todos os carros disponíveis pleo nome da carro

**RN** => Regra de negócio
O usuário não precisar estar logado no sistema.

# Cadastro de Especificação no carro

**RF**
Deve ser possível cadastrar uma especificação para um carro

**RN**
Não deve ser possível cadastrar uma cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro
Deve ser possível listar todos os carros

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel

**RNF**

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para mesmo usuário
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para mesmo carro
O usuario  deve estar logado na aplicação






