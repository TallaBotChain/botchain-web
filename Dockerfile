FROM node:8

ENV SRV_DIR /srv
ENV APP_DIR $SRV_DIR/app
RUN mkdir -p $SRV_DIR $APP_DIR

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive apt-get install -q -y \
        netcat \
        vim \
        less \
        curl \
        python-dev \
        python-pip \
        && \
    rm -rf /var/lib/apt/lists/*

RUN pip install awscli

# react-static build doesn't seem to work with an external node_modules with
# PATH/NODE_PATH set accordingly, so install in app dir
RUN npm install yarn
WORKDIR $APP_DIR
COPY package*.json $APP_DIR/
RUN yarn install

# node_modules excluded from copy due to .dockerignore
COPY . $APP_DIR/

ENV PATH $APP_DIR/node_modules/.bin:$PATH

RUN yarn build

ENTRYPOINT ["/srv/app/docker-entrypoint.sh"]
