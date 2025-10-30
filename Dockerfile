FROM node:20-alpine as build

ENV AWS_ACCESS_KEY_ID=""
ENV AWS_SECRET_ACCESS_KEY=""
ENV AWS_DEFAULT_REGION=""
ENV AUTH_COGNITO_ID=""
ENV AUTH_COGNITO_SECRET=""
ENV AUTH_COGNITO_ISSUER=""
ENV AUTH_SECRET=""
ENV AUTH_TRUST_HOST=""
ENV AUTH_ORIGIN=""

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create the final production image
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from the build stage
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build

ENV NODE_ENV production

EXPOSE 8080

CMD ["node", "build"]