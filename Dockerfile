# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Gera o client do Prisma
RUN npx prisma generate

# Build do NestJS
RUN npm run build



FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário
COPY package*.json ./
RUN npm install --omit=dev

# Copia arquivos compilados
COPY --from=builder /app/dist ./dist

# Copia prisma
COPY --from=builder /app/prisma ./prisma

# Gera novamente o client do Prisma
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "dist/src/main"]
