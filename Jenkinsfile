pipeline {
    agent any

    tools {
        nodejs 'node-20'
    }

    environment {
        IMAGE_NAME = "coffee_frontend"
        CONTAINER_NAME = "coffee-container"
        PORT = "5173"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                dir('coffee-ui') {
                    sh 'npm install'
                }
            }
        }

        stage('Build App') {
            steps {
                dir('coffee-ui') {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                dir('coffee-ui') {
                    sh '/usr/local/bin/docker build -t $IMAGE_NAME .'
                }
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}