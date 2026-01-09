def app

pipeline {
    agent any
    environment {
        NEXT_PUBLIC_BASE_URL = $NEXT_PUBLIC_BASE_URL
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY = $NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        NEXT_PUBLIC_BASE_DOMAIN = $NEXT_PUBLIC_BASE_DOMAIN
        ENV_TYPE = "production"
        PORT = 4074
        NAMESPACE = "unitygram-ru"
        REGISTRY_HOSTNAME = "mariasemenova1705"
        REGISTRY = "registry.hub.docker.com"
        PROJECT = "unitygram"
        DEPLOYMENT_NAME = "unitygram-deployment"
        IMAGE_NAME = "${env.BUILD_ID}_${env.ENV_TYPE}_${env.GIT_COMMIT}"
        DOCKER_BUILD_NAME = "${env.REGISTRY_HOSTNAME}/${env.PROJECT}:${env.IMAGE_NAME}"
    }

    stages {
        stage('Clone repository') {
            steps {
                checkout scm
            }
        }
        stage('Build docker image') {
            steps {
                echo "Build image started..."
                    script {
                        app = docker.build("${env.DOCKER_BUILD_NAME}",
                       "--build-arg NEXT_PUBLIC_BASE_URL=${env.NEXT_PUBLIC_BASE_URL} " +
                                               "--build-arg NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY} " +
                                               "--build-arg NEXT_PUBLIC_BASE_DOMAIN=${env.NEXT_PUBLIC_BASE_DOMAIN} " +
                                               "."
                                           )
                    }
                echo "Build image finished..."
            }
        }
        stage('Push docker image') {
             steps {
                 echo "Push image started..."
                     script {
                          docker.withRegistry("https://${env.REGISTRY}", 'unitygram-ru') {
                            app.push("${env.IMAGE_NAME}")
                        }
                     }
                 echo "Push image finished..."
             }
       }
       stage('Delete image local') {
             steps {
                 script {
                    sh "docker rmi -f ${env.DOCKER_BUILD_NAME}"
                 }
             }
        }
        stage('Preparing deployment') {
             steps {
                 echo "Preparing started..."
                     sh 'ls -ltr'
                     sh 'pwd'
                     sh "chmod +x preparingDeploy.sh"
                     sh "./preparingDeploy.sh ${env.REGISTRY_HOSTNAME} ${env.PROJECT} ${env.IMAGE_NAME} ${env.DEPLOYMENT_NAME} ${env.PORT} ${env.NAMESPACE}"
                     sh "cat deployment.yaml"
             }

        }
        stage('Deploy to Kubernetes') {
             steps {
                 withKubeConfig([credentialsId: 'prod-kubernetes']) {
                    sh 'kubectl apply -f deployment.yaml'
                    sh "kubectl rollout status deployment/${env.DEPLOYMENT_NAME} --namespace=${env.NAMESPACE}"
                    sh "kubectl get services -o wide"
                 }
             }
        }
    }
}
