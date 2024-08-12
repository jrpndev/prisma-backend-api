FROM node:20.16.0
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . .

RUN npm install

RUN npm install -g prisma

EXPOSE 5000

CMD ["npm", "run", "dev"]
