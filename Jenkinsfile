// pipeline {
//     agent any

//     tools {
//         nodejs 'node-20'
//     }

//     environment {
//         IMAGE_NAME = "coffee_frontend"
//         CONTAINER_NAME = "coffee-container"
//         PORT = "5173"
//     }

//     stages {

//         stage('Install Dependencies') {
//             steps {
//                 dir('coffee-ui') {
//                     sh 'npm install'
//                 }
//             }
//         }

//         stage('Build App') {
//             steps {
//                 dir('coffee-ui') {
//                     sh 'npm run build'
//                 }
//             }
//         }

//         stage('Build Docker Image') {
//             steps {
//                 dir('coffee-ui') {
//                     sh '/usr/local/bin/docker build -t $IMAGE_NAME .'
//                 }
//             }
//         }

//         stage('Run Container') {
//             steps {
//                 sh '''
//                     /usr/local/bin/docker stop $CONTAINER_NAME || true
//                     /usr/local/bin/docker rm $CONTAINER_NAME || true
//                     /usr/local/bin/docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME
//                 '''
//             }
//         }
//     }
// }

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

        // ---------------- SONARQUBE ----------------
      stage('SonarQube Analysis') {
    steps {
        dir('coffee-ui') {
            withSonarQubeEnv('sonar') {
                sh '''
                /opt/homebrew/bin/sonar-scanner \
                -Dsonar.projectKey=coffee-ui \
                -Dsonar.sources=.
                '''
            }
        }
    }
}

        // ---------------- TRIVY FS SCAN ----------------
        stage('Trivy FS Scan') {
            steps {
                dir('coffee-ui') {
                    sh 'trivy fs .'
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

        // ---------------- TRIVY IMAGE SCAN ----------------
        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image $IMAGE_NAME'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                    /usr/local/bin/docker stop $CONTAINER_NAME || true
                    /usr/local/bin/docker rm $CONTAINER_NAME || true
                    /usr/local/bin/docker run -d -p $PORT:80 --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }
}