# k6 operator

Ref: https://k6.io/blog/running-distributed-tests-on-k8s/

```bash
kubectl create configmap crocodile-stress-test --from-file /path/to/our/test.js
```

## Creating our custom resource (CR)

```yaml
apiVersion: k6.io/v1alpha1
kind: K6
metadata:
  name: k6-sample
spec:
  parallelism: 4
  script:
    configMap:
      name: crocodile-stress-test
      file: test.js

```

```bash
kubectl apply -f /path/to/our/k6/custom-resource.yml
```