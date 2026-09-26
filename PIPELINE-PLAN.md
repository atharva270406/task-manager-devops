# 7.3HD Pipeline Plan

1. Build - npm build and Jenkins artifact archive
2. Test - Jest + Supertest automated API tests
3. Code Quality - ESLint
4. Security - npm audit
5. Deploy - Docker staging container
6. Release - versioned Docker release tag
7. Monitoring - application health endpoint checked by Jenkins

The project can later be extended with SonarQube and Prometheus if required by the final HD evidence.
