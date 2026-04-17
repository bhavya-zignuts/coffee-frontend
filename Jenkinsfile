pipeline {
  agent any
  environment {
    INSTANCE_IP = '16.176.139.233'
  }
  stages {
    stage('Deploy') {
      steps {
        echo 'Deployment'
        sshagent(credentials: ['zignuts-ubuntu-ssh']) {
          sh '''
            ssh -o StrictHostKeyChecking=no 'ubuntu'@${INSTANCE_IP} sh /apps/coffee/test-coffee/auto-deploy-coffee-admin-mobile.sh
          '''
        }
      }
    }
  }
  post {
    always { cleanWs() }
  }
}

