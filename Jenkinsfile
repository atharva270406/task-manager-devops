pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-manager-devops"
        CONTAINER_NAME = "task-manager-staging"
    }

    stages {

        stage("Build") {
            steps {
                echo "Building Node.js project..."

                bat "npm ci"
                bat "npm run build"

                archiveArtifacts artifacts: "*.tgz", fingerprint: true
            }
        }

        stage("Test") {
            steps {
                echo "Running automated tests..."

                bat "npm test"
            }
        }

        stage("Code Quality") {
            steps {
                echo "Running ESLint code quality checks..."

                bat "npm run lint"
            }
        }

        stage("Security") {
            steps {
                echo "Running dependency security audit..."

                bat "npm audit --audit-level=high"
            }
        }

        stage("Deploy") {
            steps {
                echo "Building Docker staging image..."

                bat "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."

                echo "Removing previous staging container if it exists..."

                bat "docker rm -f ${CONTAINER_NAME} || exit /b 0"

                echo "Starting staging container..."

                bat "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}"

                echo "Waiting for the application to start..."

                bat "ping 127.0.0.1 -n 6 >nul"

                echo "Checking application health..."

                bat "curl -f http://localhost:3000/health"
            }
        }

        stage("Release") {
            steps {
                echo "Promoting staging image to production..."

                echo "Creating release Docker tag..."

                bat "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:release-${BUILD_NUMBER}"

                echo "Removing previous production container if it exists..."

                bat "docker rm -f task-manager-production || exit /b 0"

                echo "Starting production container..."

                bat "docker run -d --name task-manager-production -p 3001:3000 ${IMAGE_NAME}:release-${BUILD_NUMBER}"

                echo "Waiting for the production application to start..."

                bat "ping 127.0.0.1 -n 6 >nul"

                echo "Checking production health..."

                bat "curl -f http://localhost:3001/health"
            }
        }

        stage("Monitoring") {
            steps {
                echo "Checking production application health..."

                bat "curl -f http://localhost:3001/health"

                echo "Monitoring check passed. Production application is healthy."
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully."
        }

        failure {
            echo "Pipeline failed. Check the stage logs for details."
        }
    }
}