# Project Name

> Backend Project for Crowdfunding Application (campaign service)

## Related Projects

- https://github.com/Team-Ozai/SDC-Don-Proxy
- https://github.com/Team-Ozai/SDC-Shraya-Service (updates and comments service)
- https://github.com/Team-Ozai/SDC-Kana-Service (banner service)
- https://github.com/Team-Ozai/SDC-Michael-Service (pledges service)

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> This application can be launched directly from your local but you can also use docker-compose to set up your database and service separately.
> If you would like to deploy your database and service on different instances, check out the "docker" & "service" branches of this repo for db and service respectively.

## Requirements

- postgres (used as main db)
- webpack (used for bundling jsx files into js)
- see package.json for further requirements

## Development

DB setup and launch directly from local (at your root directory, run these commands in sequence):

```sh
npm run install
npm run pg:build
npm run start
```

If you would like to use docker compose, run these commands instead of npm run start:

```sh
docker-compose build
docker-compose up
```

### Installing Dependencies

From within the root directory:

```sh
npm install
```
