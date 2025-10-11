Frontend CI/CD

GitHub Actions Workflow (frontend.yml):

name: Frontend CI Build and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install Dependencies
        run: npm ci
      - name: Run Linter
        run: npm run lint
      - name: Run Tests
        run: npm test -- --watchAll=false
      - name: Build Project
        run: npm run build

  deploy-frontend-staging:
    needs: build-and-test
    if: github.ref == 'refs/heads/main' && needs.build-and-test.result == 'success'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Install Vercel CLI
        run: npm install -g vercel@latest
      - name: Deploy to Staging
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}


Key Commands

Install dependencies: npm ci

Run linter: npm run lint

Run unit tests: npm test -- --watchAll=false

Build: npm run build

Deploy: vercel deploy --prebuilt --prod

Backend CI/CD

GitHub Actions Workflow (backend.yml):

name: Backend CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: test_pharmalink
        ports: [5432:5432]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v4
        with:
          python-version: '3.12'
      - run: pip install -r requirements.txt
      - run: python manage.py makemigrations
      - run: python manage.py migrate
      - run: python manage.py test --verbosity=2

  deploy-production:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_PRODUCTION_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}


**Key Commands**

Install dependencies: pip install -r requirements.txt

Run migrations: python manage.py makemigrations && python manage.py migrate

Run tests: python manage.py test --verbosity=2

Deploy: GitHub Actions + Render deploy action

Rollback Strategy

Deploy only if tests pass in staging.

Redeploy last stable commit if production fails.

Monitoring

Frontend: Vercel Analytics

Backend: Render Logs and API response checks