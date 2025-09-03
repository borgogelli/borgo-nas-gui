# Usa un'immagine Node ufficiale
FROM node:20-alpine

# Imposta directory di lavoro
WORKDIR /app

# Copia dipendenze
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

# Copia il resto del codice
COPY . .

# Costruisci l'app
RUN npm run build

# Esponi la porta Next.js
EXPOSE 3000

# Avvia l'app in produzione
CMD ["npm", "start"]
