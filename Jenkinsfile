pipeline {
    agent any

    tools {
        nodejs "NodeJS 20.x" // Use the Node.js tool configured in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                stash name: 'workspace', includes: '**/*'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    unstash 'workspace'
                    if (isUnix()) {
                        sh 'npm install'
                    } else {
                        bat 'npm install'
                    }
                    stash name: 'workspace', includes: '**/*'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    unstash 'workspace'
                    if (isUnix()) {
                        sh 'npm test'
                    } else {
                        bat 'npm test'
                    }
                    stash name: 'workspace', includes: '**/*'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    unstash 'workspace'
                    if (isUnix()) {
                        sh 'npm run build'
                    } else {
                        bat 'npm run build'
                    }
                    stash name: 'workspace', includes: '**/*'
                }
            }
        }
    }
}
