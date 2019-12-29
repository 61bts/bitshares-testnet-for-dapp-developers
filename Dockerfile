FROM alpine:3.9
WORKDIR /app
ADD . /app
RUN apk --no-cache add nodejs npm && npm install && npm run build
ENV PRIV_KEY=
ENV API_URL=ws://127.0.0.1:18090/ws
ENV CHAIN_ID=2d20869f3d925cdeb57da14dec65bbc18261f38db0ac2197327fc3414585b0c5
ENV CORE_ASSET=TEST
EXPOSE 3000
CMD ["npm", "run", "serve"]
