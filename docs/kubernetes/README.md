# Kubernetes

## AWS EKS에서 Kubernetes 사용하기

### Todo List

- [x] Amazon EKS 클러스터를 생성하기 전에 Kubernetes가 AWS 리소스를 생성할 수 있도록 IAM 역할을 생성해야 한다. ( Kubernetes가 계정에 Elastic Load Balancing 로드 밸런서를 생성할 수 있어야한다. )
- [ ] 더욱 효율적인 네트워크 격리를 위해 각 EKS 클러스터에 별도의 VPC 및 보안 그룹을 사용하는 것이 좋다. ( Virtual Private Cloud(VPC)는 사용자의 AWS 계정 전용 가상 네트워크 )
- [ ] Amazon EKS에 대한 kubectl을 설치하고 구성한다. (  Amazon EKS 클러스터는 Kubernetes 클러스터에 대한 IAM 인증을 위해 Kubernetes용 AWS IAM Authenticator를 필요로 한다. )
- [ ] Amazon EKS 클러스터를 생성한다.
- [ ] AWS CLI update-kubeconfig 명령으로 클러스터에 대한 kubeconfig 파일을 생성한다. ( 또는 수동으로  kubeconfig 파일을 생성한다. )
