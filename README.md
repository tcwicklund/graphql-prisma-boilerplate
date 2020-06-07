GraphQL (with Prisma) Boilerplate
============

This is an open source boilerplate app powered by GraphQL and Prisma. In this example app we explore intermediate techniques:

## Setting up Boilerplate

You'll want to start by making sure the application runs on dev and test. Here's how:

1. Deploy app to dev and test environments
  - npm run deploy-dev
  - npm run deploy-test
2. Setup node-modules
  - npm install
3. Update .graphqlconfig file with appropriate default endpoints
4. Apply the new schema
  - npm run get-schema
5. Confirm things are working by running the test suite
  - npm run test
6. Run dev server
  - npm run dev
7. Get things going in Production
  - update "config/prod.env" to point to appropriate PRISMA_ENDPOINT
  - npm run deploy-prod
8. Create new app on Heroku and set config variables from config/prod.env
  - heroku Create
  - heroku config:set PRISMA_ENDPOINT=... PRISMA_SECRET=... JWT_SECRET=...
9. Commit all changes to git
  - git commit -am "Setup new project"
10. Push changes to heroku
  - git push heroku master
