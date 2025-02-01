FROM node:21

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

WORKDIR /app


COPY package.json package-lock.json ./


RUN npm install


COPY . .

EXPOSE 3000


CMD ["npm", "run", "dev"]