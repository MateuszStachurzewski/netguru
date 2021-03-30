Requirements
------------

Before you start, take time to install the required tools.

1. [Docker](https://docs.docker.com/install/)

How to run
----------

From `/Netguru`
1. Run `cp env_example .env`
2. Run `docker build -t eobuwie_tests .`
3. Run `docker run --env-file .env eobuwie_tests`