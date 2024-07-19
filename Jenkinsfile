pipeline{
    agent any
stages{
    stage("checkout"){
        Steps{
                checkout scm
        }
    }
    stage("Test"){
       Steps{
        sh 'sudo apt install npm '
        sh 'npm test'
        }
    }
    stage("Build"){
        steps{
            sh 'npm run build'
        }
    }
  }
}
