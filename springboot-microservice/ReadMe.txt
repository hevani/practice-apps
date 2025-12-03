After you start minikube
# If using minikube, you can also build inside its Docker daemon:
# eval $(minikube docker-env)
# docker build -t dockercap123/springboot-microservice:0.0.1 .

# Tag for your registry
docker tag springboot-microservice:0.0.1 dockercap123/springboot-microservice:0.0.1
docker login
docker push dockercap123/springboot-microservice:0.0.1
————



kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

# If you have an ingress controller:
kubectl apply -f k8s/ingress.yaml

# Verify
kubectl get pods
kubectl describe pod <pod name>

kubectl get svc springboot-microservice

# Port-forward (if no ingress)
kubectl port-forward svc/springboot-microservice 8080:80
curl http://localhost:8080/api/hello
