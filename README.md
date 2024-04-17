\# Express Server with Docker Compose

This project sets up an Express.js server with Docker Compose for easy deployment and management of PostgreSQL, pgAdmin, and InfluxDB containers.

\## Table of Contents

1. \[Installation\]\(\#installation\)
2. \[Usage\]\(\#usage\)
3. \[Configuration\]\(\#configuration\)
4. \[Docker Setup\]\(\#docker-setup\)
5. \[License\]\(\#license\)

\## Installation

To install project dependencies, run:

\`\`\`bash
npm install
\`\`\`

\## Usage

To start the server, run:

\`\`\`bash
npm start
\`\`\`


To start developer mode the server, run:

\`\`\`bash
npm run start:watch
\`\`\`

\## Configuration

Ensure you have a \`.env\` file in the \`config\`, you have sample of this file:

\`\`\`plaintext
NODE_ENV=
PORT=
FRONTEND_APP_HOST=
DATABASE_USER=
DATABASE_HOST=
DATABASE_NAME=
DATABASE_PASSWORD=
DATABASE_PORT=
EMAIL_ADDRESS
EMAIL_PASSWORD=
JWT_SECRET=
JWT_EXPIRE=
INFLUX_URL=
INFLUX_TOKEN=
INFLUX_ORG=
INFLUX_BUCKET=
\`\`\`

\## Docker Setup

To set up the project with Docker, ensure you have Docker installed on your machine. Then, run the following command in \`./platform/\`:

\`\`\`bash
docker-compose up -d
\`\`\`

This will spin up PostgreSQL, pgAdmin, and InfluxDB containers with the required configurations.

\## License

This project is licensed under the \[MIT License\]\(LICENSE\).
