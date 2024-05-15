FROM node:20-slim
WORKDIR /home/node/app
USER node
RUN usermod -u 1000 node
#CMD [ "tail", "-f", "/dev/null" ]
