FROM node:18

COPY . .

RUN npm ci

RUN npm run build

CMD ["npm", "start"]