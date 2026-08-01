FROM node:22-slim

RUN apt-get update && apt-get install -y \
    glib2.0 \
    libx11-6 \
    libxrandr2 \
    libpangocairo-1.0-0 \
    libatk1.0-0 \
    libcups2 \
    libpango-1.0-0 \
    libxcb-dri3-0 \
    libgbm1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]