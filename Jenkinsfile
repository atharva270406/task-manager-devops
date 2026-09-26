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
                sh "npm ci"
                sh "npm run build"
                archiveArtifacts artifacts: "*.tgz", fingerprint: true
            }
        }

        stage("Test") {
            steps {
                echo "Running automated tests..."
                sh "npm test"
            }
        }

        stage("Code Quality") {
            steps {
                echo "Running ESLint code quality checks..."
                sh "npm run lint"
            }
        }

        stage("Security") {
            steps {
                echo "Running dependency security audit..."
                sh "npm audit --audit-level=high"
            }
        }

        stage("Deploy") {
            steps {
                echo "Building and deploying Docker staging container..."
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                sh "docker rm -f ${CONTAINER_NAME} || true"
                sh "docker run -d --name ${CONTAINER_NAME} -p 3000:3000 ${IMAGE_NAME}:${BUILD_NUMBER}"
                sh "sleep 5"
                sh "curl -f http://localhost:3000/health"
            }
        }

        stage("Release") {
            steps {
                echo "Creating a release tag for the successful build..."
                sh "docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:release-${BUILD_NUMBER}"
            }
        }

        stage("Monitoring") {
            steps {
                echo "Checking production/staging health endpoint..."
                sh "curl -f http://localhost:3000/health"
                echo "Monitoring check passed. Application is healthy."
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
