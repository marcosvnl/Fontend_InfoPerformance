# Usar uma imagem Node.js LTS como base
FROM node:20-alpine AS development

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Instalar dependências
RUN npm ci

# Copiar o código fonte
COPY . .

# Expor a porta que o Vite usa por padrão
EXPOSE 5173

# Comando para desenvolvimento (com hot reload)
CMD ["npm", "run", "dev", "--", "--host"]

# Estágio de produção
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tsconfig.node.json ./

# Instalar dependências (incluindo devDependencies para construção)
RUN npm ci

# Copiar o código fonte
COPY . .

# Construir a aplicação para produção
RUN npm run build

# Estágio final de produção
FROM nginx:alpine AS production

# Copiar os arquivos construídos
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]