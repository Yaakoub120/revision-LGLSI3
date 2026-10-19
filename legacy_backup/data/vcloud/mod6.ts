import type { Module } from '../types'

// ═══════════════════════════════════════════════════════════════
// VIRTUALISATION & CLOUD — Module 14 : Kubernetes
// (Partie 6 — slides 251-277)
// ═══════════════════════════════════════════════════════════════

export const vmod14: Module = {
  id: 'v14',
  num: 14,
  title: 'Kubernetes',
  subtitle: 'Origine, architecture master/node, Pod, Deployment, Service, kubectl & minikube',
  icon: '☸️',
  color: 'violet',
  source: 'Partie 6 — Kubernetes (slides 251-277)',
  sections: [
    {
      id: 'v14s1',
      title: 'Présentation et origine',
      blocks: [
        { type: 'kv', items: [
          { k: 'Étymologie', v: 'Mot d\u2019origine grecque signifiant « Timonier » : celui qui dirige le bateau.' },
          { k: 'Origine', v: 'Inspiré du projet Borg dont Google se sert depuis des années pour gérer ses conteneurs.' },
          { k: 'Développement', v: 'Développé par Google avec ses partenaires : Redhat, CoreOS, IBM, Microsoft, MesoSphere, Vmware, HP, etc.' },
          { k: 'Langage', v: 'Écrit en langage Go.' },
          { k: 'Environnements', v: 'Peut tourner en : Local, Cloud (GCE, Azure, AWS, …), Machines Physiques.' },
          { k: 'API', v: 'Kubernetes REST API pour exposer ses fonctionnalités.' },
        ] },
        { type: 'definition', term: 'Objectif de Kubernetes', def: 'Gérer directement des applications et non pas des machines (gestion des applications indépendamment de l\u2019infrastructure).' },
      ],
    },
    {
      id: 'v14s2',
      title: 'Qu\u2019est-ce qu\u2019on peut faire avec Kubernetes ?',
      blocks: [
        { type: 'list', items: [
          'Déployer une application sous forme de conteneurs d\u2019une manière très rapide et prévisible.',
          'Automatiser le déploiement et la réplication des containers.',
          'Organiser les conteneurs en groupes et faire du Load balancing (équilibrage de charge).',
          'Déclarer l\u2019architecture cible (nombre de pods, contenu, stratégie de mise à jour, etc.) et laisser le système atteindre et maintenir cette cible.',
          'Faire des mises à jour sans interrompre le service.',
          'Séparer l\u2019application de l\u2019architecture sous-jacente.',
          'Détecter les problèmes et les résoudre tout seul.',
        ] },
      ],
    },
    {
      id: 'v14s3',
      title: 'Concepts de base',
      blocks: [
        { type: 'kv', items: [
          { k: 'Cluster', v: 'Ensemble de machines physiques ou virtuelles utilisées par Kubernetes pour faire tourner des applications.' },
          { k: 'Node', v: 'Une machine physique ou virtuelle dans laquelle seront déployés des Pods. Chaque Node doit exécuter un Container Engine comme Docker.' },
          { k: 'Pod', v: 'Groupe de containers déployés ensemble.' },
          { k: 'Namespace', v: 'Permet de segmenter Pod, Volume, secrets, …' },
          { k: 'Kubectl', v: 'Application en ligne de commande permettant d\u2019interagir avec Kubernetes.' },
        ] },
      ],
    },
    {
      id: 'v14s4',
      title: 'Architecture : le Master (plan de contrôle)',
      blocks: [
        { type: 'paragraph', text: 'Kubernetes suit l\u2019architecture maître/esclave. Les composants peuvent être divisés en ceux qui gèrent un nœud individuel et ceux qui font partie du plan de contrôle. Le Kubernetes Master est l\u2019unité de contrôle principale qui gère la charge de travail et dirige les communications dans le système. Le plan de contrôle consiste en plusieurs composants, chacun avec son propre processus, qui peuvent s\u2019exécuter sur un seul Node maître ou sur plusieurs maîtres (clusters haute disponibilité).' },
        { type: 'kv', items: [
          { k: 'Etcd', v: 'Unité de stockage distribuée, persistante et légère : la configuration, l\u2019état du cluster, les événements qui se produisent…' },
          { k: 'API Server', v: 'API REST de communication avec les composants internes et externes.' },
          { k: 'Scheduler', v: 'L\u2019ordonnanceur qui sélectionne quel Node devrait faire tourner un Pod (récolte en temps réel des informations sur l\u2019état des nœuds : occupation mémoire, capacité disque, taux d\u2019utilisation CPU).' },
          { k: 'Controller Manager', v: 'Processus dans lequel s\u2019exécutent les contrôleurs principaux de Kubernetes, tels que DaemonSet Controller (service principal) et le Replication Controller.' },
        ] },
        { type: 'diagram', diagram: 'v-k8s-arch' },
      ],
    },
    {
      id: 'v14s5',
      title: 'Architecture : le Node (Worker)',
      blocks: [
        { type: 'paragraph', text: 'Le Node, aussi appelé Worker, est une machine unique (ou une machine virtuelle) où des conteneurs (charges de travail) sont déployés. Chaque Node du cluster doit exécuter le programme de conteneurisation (par exemple Docker Engine), ainsi que les composants pour communiquer avec les composants du plan de contrôle du Master.' },
        { type: 'kv', items: [
          { k: 'Kubelet', v: 'Responsable de l\u2019état d\u2019exécution du nœud : assurer que tous les conteneurs sur un nœud sont en bonne santé, organisés en Pods sous la direction du plan de contrôle.' },
          { k: 'Kube-proxy', v: 'Responsable d\u2019effectuer le routage du trafic vers le conteneur approprié, en se basant sur l\u2019adresse IP et le numéro de port de la requête entrante.' },
          { k: 'cAdvisor', v: 'Agent qui surveille et récupère les données de consommation des ressources et des performances (processeur, mémoire, utilisation disque et réseau) des conteneurs du Node.' },
        ] },
        { type: 'paragraph', text: 'Les nœuds communiquent via un plugin réseau (Flannel, Weavenet, etc.).' },
      ],
    },
    {
      id: 'v14s6',
      title: 'Le Pod',
      blocks: [
        { type: 'definition', term: 'Pod', def: 'Groupe de containers déployés ensemble.' },
        { type: 'list', items: [
          'Les containers du Pod sont toujours démarrés, arrêtés et répliqués EN GROUPE.',
          'Ils partagent le même Network, Namespace, IP et Ports.',
          'Ils peuvent communiquer ensemble (un conteneur peut contacter un autre sur le même pod) en utilisant localhost.',
          'Ils peuvent partager des données via des shared volumes.',
          'Le Pod est l\u2019entité de base qu\u2019on va répliquer et qu\u2019on va mettre sur différents nœuds du cluster.',
        ] },
        { type: 'diagram', diagram: 'v-k8s-pod' },
      ],
    },
    {
      id: 'v14s7',
      title: 'Le Volume',
      blocks: [
        { type: 'definition', term: 'Volume', def: 'Espace de stockage qui peut être attaché à un conteneur, ou à un groupe de conteneurs dans un même Pod. Il peut persister indépendamment du conteneur.' },
        { type: 'paragraph', text: 'Par exemple, il permet aux conteneurs de partager un même répertoire dans un même Pod.' },
      ],
    },
    {
      id: 'v14s8',
      title: 'Le Déploiement (contrôleur)',
      blocks: [
        { type: 'definition', term: 'Déploiement du contrôleur', def: 'Élément central de Kubernetes. C\u2019est le fichier dans lequel on décrit l\u2019architecture cible que l\u2019on veut atteindre : les conteneurs qu\u2019on veut mettre dans le Pod, les détails de réplication, les stratégies utilisées pour les mises à jour. C\u2019est le déploiement du contrôleur de Kubernetes qui va se charger de MAINTENIR cet état.' },
        { type: 'paragraph', text: 'Par exemple, s\u2019il y a un Pod qui plante, il va le désactiver, l\u2019enlever du load balancer et créer un autre à côté pour démarrer sur un autre nœud, pour que ça puisse continuer à fonctionner dans les mêmes conditions exigées dans le descripteur de déploiement.' },
        { type: 'code', lang: 'yaml', caption: 'myDeployment.yaml — exemple complet du cours (slides 262-263)', code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.7.9
        ports:
        - containerPort: 80

$ kubectl create -f myDeployment.yaml` },
        { type: 'list', items: [
          'Un déploiement nommé nginx est créé : champ metadata:name.',
          'Le déploiement crée trois pods répliqués : champ replicas.',
          'Le modèle de pod (spec: template) indique que ses pods sont libellés app:nginx.',
          'La spécification du modèle (template: spec) indique que les pods exécutent un conteneur nginx, qui exécute l\u2019image nginx en version 1.7.9.',
          'Le déploiement ouvre le port 80 pour une utilisation par les pods.',
        ] },
        { type: 'note', title: 'En résumé, les instructions du modèle de pod', text: 'Chaque pod est libellé app:nginx · Créez un conteneur et nommez-le nginx · Exécutez l\u2019image nginx dans la version 1.7.9 · Ouvrez le port 80 pour envoyer et recevoir du trafic.' },
        { type: 'diagram', diagram: 'v-k8s-reconcile' },
      ],
    },
    {
      id: 'v14s9',
      title: 'Le Service',
      blocks: [
        { type: 'paragraph', text: 'Le Service permet d\u2019accéder à un groupe de Pods avec une même adresse IP statique — un peu plus qu\u2019un load balancer. On identifie les Pods par des labels (Selectors) qui seront les cibles du load balancer. Il peut faire du load balancing.' },
        { type: 'table', headers: ['Type', 'Rôle', 'Exemple du cours'], rows: [
          ['ClusterIP', 'Expose le service à l\u2019intérieur du cluster via une adresse IP interne', 'Un service de base de données accessible uniquement par d\u2019autres applications dans le cluster'],
          ['NodePort', 'Expose le service via un port spécifique sur chaque nœud du cluster', 'Une application web simple accessible depuis votre réseau local'],
          ['LoadBalancer', 'Expose le service via un load balancer externe', 'Une application web en production accessible publiquement avec plusieurs pods derrière le load balancer'],
        ], caption: 'Les 3 types de Service (slide 264)' },
      ],
    },
    {
      id: 'v14s10',
      title: 'Installation : kubectl & minikube',
      blocks: [
        { type: 'paragraph', text: 'Kubectl est l\u2019outil en ligne de commande de Kubernetes : il permet d\u2019exécuter des commandes dans les clusters (déployer des applications, inspecter et gérer les ressources du cluster, consulter les logs…).' },
        { type: 'definition', term: 'Minikube', def: 'Outil qui fait tourner un cluster Kubernetes à un nœud unique dans une machine virtuelle sur votre machine. C\u2019est une VM qui embarque l\u2019essentiel des packages de Docker et Kubernetes.' },
        { type: 'list', items: [
          'Pour installer minikube, il faut disposer d\u2019un hyperviseur de virtualisation.',
          'Si votre version de Windows ne dispose pas de l\u2019hyperviseur Hyper-V, il est recommandé d\u2019installer VirtualBox.',
          'Pour vérifier si votre système supporte la virtualisation : commande systeminfo (Hyper-V Requirements: VM Monitor Mode Extensions: Yes, Virtualization Enabled In Firmware: Yes…).',
        ] },
        { type: 'table', headers: ['Système d\u2019exploitation', 'Hyperviseurs supportés'], rows: [
          ['macOS', 'VirtualBox, VMware Fusion, HyperKit'],
          ['Linux', 'VirtualBox, KVM'],
          ['Windows', 'VirtualBox, Hyper-V'],
        ], caption: 'Hyperviseurs supportés par minikube (slide 267)' },
        { type: 'code', lang: 'bash', caption: 'Installation avec Chocolatey + démarrage (slides 268)', code: `# La façon la plus simple d'installer Minikube sur Windows :
# Chocolatey (exécuter avec les droits administrateur) : https://chocolatey.org
> choco install minikube kubernetes-cli
# Une fois l'installation terminée, fermez la session CLI et redémarrez
# (Minikube est ajouté au PATH automatiquement).
# Sinon : télécharger l'exécutable depuis
# https://github.com/kubernetes/minikube/releases/latest

C:\\Users\\med> minikube start
* minikube v1.3.1 on Microsoft Windows 10 Home 10.0.17134 Build 17134
* Starting existing virtualbox VM for "minikube" ...
* Waiting for the host to be provisioned ...
* Preparing Kubernetes v1.15.2 on Docker 18.09.8 ...
* Relaunching Kubernetes using kubeadm ...
* Waiting for: apiserver proxy etcd scheduler controller dns
* Done! kubectl is now configured to use "minikube"
# Boot2Docker : image de VM légère contenant tous les outils docker et kubernetes,
# création d'une configuration de démarrage et démarrage du cluster kubernetes` },
      ],
    },
    {
      id: 'v14s11',
      title: 'Configurer l\u2019environnement docker client (docker-env)',
      blocks: [
        { type: 'paragraph', text: 'Pour connecter le client docker à Docker Engine fourni par Minikube, nous avons besoin de changer la variable d\u2019environnement pour qu\u2019elle pointe vers le host de la machine virtuelle Minikube. La commande minikube docker-env retourne les variables d\u2019environnement nécessaires pour utiliser le Docker daemon à l\u2019intérieur de Minikube.' },
        { type: 'code', lang: 'bash', caption: 'docker-env (slide 269)', code: `$ echo $(minikube docker-env)
export DOCKER_TLS_VERIFY="1" export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="C:\\Users\\med\\.minikube\\certs"
# Run this command to configure your shell: # eval $(minikube docker-env)

$ eval $(minikube docker-env)
$ echo $DOCKER_HOST
tcp://192.168.99.100:2376` },
      ],
    },
    {
      id: 'v14s12',
      title: 'Démo complète : Hello World Node.js sur Kubernetes',
      blocks: [
        { type: 'paragraph', text: 'Exemple montrant comment exécuter une simple application Hello World Node.js sur Kubernetes en utilisant Minikube. L\u2019image de conteneur est construite à partir de deux fichiers : server.js et Dockerfile.' },
        { type: 'code', lang: 'javascript', caption: 'server.js (slide 270)', code: `var http = require('http');

var handleRequest = function(request, response) {
    console.log('Received request for URL: ' + request.url);
    response.writeHead(200);
    response.end('Hello World!');
};
var www = http.createServer(handleRequest);
www.listen(8080);` },
        { type: 'code', lang: 'dockerfile', caption: 'Dockerfile (slide 270)', code: `FROM node:6.14.2
EXPOSE 8080
COPY server.js .
CMD node server.js` },
        { type: 'code', lang: 'bash', caption: 'Build de l\u2019image (slide 271)', code: `$ cd c: && cd Apps/TestNode && ls
app.js  Dockerfile  TestNode.iml

$ docker build . -t app-test:v1
Sending build context to Docker daemon  15.87kB
Step 1/4 : FROM node:6.14.2        ---> 00165cd5d0c0
Step 2/4 : EXPOSE 8080             ---> Using cache
Step 3/4 : COPY app.js .           ---> Using cache
Step 4/4 : CMD node app.js         ---> Using cache
Successfully built 5a5e5b3c1675
Successfully tagged app-test:v1` },
        { type: 'code', lang: 'bash', caption: 'Déploiement dans un pod (slide 272)', code: `$ kubectl create deployment app-test --image=app-test:v1
deployment.apps/app-test created

$ kubectl get deployments
NAME                READY  UP-TO-DATE  AVAILABLE  AGE
app-test            1/1    1           1          14s
hello-minikube      1/1    1           1          3h3m
kubernetes-bootcamp 1/1    1           1          127m

$ kubectl get pods
NAME                                 READY  STATUS   RESTARTS  AGE
app-test-5f78dcf7f8-2ts2w            1/1    Running  0         34s
hello-minikube-6fb6cb79cc-pnmg8      1/1    Running  1         3h4m
kubernetes-bootcamp-75bccb7d87-ltgv5 1/1    Running  1         127m` },
        { type: 'code', lang: 'bash', caption: 'Exposer le port 8080 (slide 273)', code: `$ kubectl expose deployment app-test --type=NodePort --port=8080
service/app-test exposed

$ kubectl describe service app-test
Name:                     app-test
Namespace:                default
Labels:                   app=app-test
Selector:                 app=app-test
Type:                     NodePort
IP:                       10.108.16.123
Port:                     <unset>  8080/TCP
TargetPort:               8080/TCP
NodePort:                 <unset>  31708/TCP
Endpoints:                172.17.0.11:8080
Session Affinity:         None
External Traffic Policy:  Cluster` },
        { type: 'code', lang: 'bash', caption: 'Consulter le service (slides 274-276)', code: `# À distance :
$ minikube service app-test
| NAMESPACE |   NAME   |            URL              |
|  default  | app-test | http://192.168.99.100:31708 |
* Opening kubernetes service default/app-test in default browser...
→ le navigateur affiche : Hello World!

# En local, depuis le pod :
$ winpty kubectl exec -ti app-test-5f78dcf7f8-2ts2w bash
root@app-test-5f78dcf7f8-2ts2w:/# ls
app.js  boot  etc  lib  media  opt  root  sbin  sys  usr …
root@app-test-5f78dcf7f8-2ts2w:/# curl http://localhost:8080
Hello World!` },
        { type: 'code', lang: 'bash', caption: 'Nettoyage (slide 277)', code: `$ kubectl delete service app-test
service "app-test" deleted

$ minikube stop
* Stopping "minikube" in virtualbox ...
* "minikube" stopped.

$ minikube delete
* Deleting "minikube" in virtualbox ...
* The "minikube" cluster has been deleted.` },
      ],
    },
  ],
}
