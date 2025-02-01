FROM node:22.13.0-alpine

WORKDIR /usr/src/app

# Add wait-for-it script
RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

# Add wait and start script
CMD sh -c 'while ! pg_isready -h postgres -p ${DATABASE_PORT} -U ${DATABASE_USERNAME}; do sleep 1; done; \
    npm run migration:run && npm run seed:run:relational && npm run start:dev'
