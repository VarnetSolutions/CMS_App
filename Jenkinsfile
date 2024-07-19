pipeline {
    agent any

    tools {
        nodejs "NodeJS 20.x" // Use the Node.js tool configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Checkout the code from the repository
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm install' // Install dependencies on Unix-based systems
                    } else {
                        bat 'npm install' // Install dependencies on Windows
                    }
                }
            }
        }

        stage('Run Unit Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm test' // Run unit tests on Unix-based systems
                    } else {
                        bat 'npm test' // Run unit tests on Windows
                    }
                }
            }
        }

        stage('Run Integration Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test:integration' // Run integration tests on Unix-based systems
                    } else {
                        bat 'npm run test:integration' // Run integration tests on Windows
                    }
                }
            }
        }

        stage('Run End-to-End Tests') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run test:e2e' // Run end-to-end tests on Unix-based systems
                    } else {
                        bat 'npm run test:e2e' // Run end-to-end tests on Windows
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    if (isUnix()) {
                        sh 'npm run build' // Build the project on Unix-based systems
                    } else {
                        bat 'npm run build' // Build the project on Windows
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded'
        }
        failure {
            echo 'Pipeline failed'
        }
    }
}
