pipeline {
    agent any

    environment {
        IMAGE_NAME = "coffee_frontend"
        CONTAINER_NAME = "coffee-container"
        PORT = "5173"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/bhavya-zignuts/coffee-frontend.git'
            }
        }

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
                    sh 'docker build -t $IMAGE_NAME .'
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