FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]


# RUN npm run build # Add this line if using TypeScript
# CMD [ "node", "dist/app.js" ] # Ensure you run the compiled JS file