# base image
FROM node:18.17

# set working directory
RUN mkdir /3d_portfolio/src/app
WORKDIR /3d_portfolio/src/app

# add `/3d_portfolio/src/app/node_modules/.bin` to $PATH
ENV PATH /3d_portfolio/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . .
RUN npm install
RUN npm install react-scripts -g

# start app
CMD ["npm", "start"]