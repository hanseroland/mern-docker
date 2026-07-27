# mern-docker
Ce projet est une application web basée sur la stack MERN (MongoDB, Express.js, React.js, Node.js) et conteneurisée avec Docker. Il s'agit d'une architecture moderne pour le développement d'applications web full-stack, permettant une mise en production rapide et une gestion simplifiée grâce à Docker et Docker Compose.

## C'est quoi Docker ?

### Dockerfile : 
décrit comment construire une image Docker. On peut le comparer à une recette de cuisine

```
**FROM  node:20-alpine** //On part de l'image officielle Node.js 20 basée sur Alpine Linux. C'est le système d'exploitation du futur conteneur.

**WORKDIR /usr/src/app** //Définit le dossier de travail.

**COPY package\*.json ./**  //Copie uniquement les fichiers package.json et -lock.json

**RUN npm ci --only=production**  // Installe les dépendances. installe uniquement les dépendances de production.

**COPY . .** //Copie maintenant tout le projet :

**CMD [ "npm", "run", "start:dev" ]** Indique la commande exécutée lorsque le conteneur démarre.
```

### docker-compose.yaml

# Build une image docker

* **docker build -t my-app/express-api:latest-dev .** Cette commande sert à construire (build) une image Docker à partir d'un Dockerfile présent dans le répertoire courant.
docker build C'est la commande qui demande à Docker de créer une image.
* **-t** Le paramètre -t signifie tag. Il permet de donner un nom et un tag à l'image
* **:latest-dev** Après les deux-points se trouve le tag. Une même image peut exister en plusieurs versions.
* **Le point .**, C'est un élément très important. Le point représente le contexte de build (build context).
Il signifie :"Utilise le dossier courant comme source."

* **docker images** sert à lister toutes les images Docker stockées localement sur ta machine.
* **docker run my-app/express-api:latest:dev** Permet de lancer le conteneur de cette image
* **docker stop my-app/express-api:latest:dev** Permet d'arrêter un conteneur
* **docker ps** ne montre que les conteneurs en cours d'exécution.
* **docker ps -a** Cette commande affiche tous les conteneurs, qu'ils soient :en cours d'exécution ;arrêtés ;terminés avec succès ;arrêtés suite à une erreur
* **docker run --name dev-test my-app/express-api:latest:dev** --name permet d'attribuer un nom au conteneur
* **docker stop 3d85af77cacc** Arrêter un conteneur via son ID.
* **docker run** créé un nv conteneur et le démarre.
* **docker start**  Démarre un conteneur déjà existant.
* **docker container prune** Supprimer tous les containers eteitnts.
* **docker image prune** Supprimer tous les images.


## NB:
Quand on lance un conteneur docker, puis qu'on apporte les modification à notre application, il ne les enregistre pas directement. Il faut le build encore la même igmage. Il va créer une nouvelle image. DOnc si on le fait à chaque fois on va se retrouver avec bcp d'images d'une seul app


## NPM SCRIPT POUR LES COMMANDES DOCKER
Dans package.json on peut configurer les commandes docker pour:
* build notre image docker : **docker:build": "docker build -t my-app/express-api:latest-dev .**
* arrêter notre conteneur : **docker:stop": "docker stop api**
* démarrer un conteneur :  **docker:run": "docker run --name api my-app/express-api:latest-dev**

## HOT RELOADING
1. Le **hot reloading** permet à une application de détecter automatiquement les modifications du code et de se recharger sans redémarrage manuel.
2. Sans Docker, l'application lit directement les fichiers présents sur l'ordinateur.
3. Avec Docker, la commande `COPY . .` crée une **copie** du projet à l'intérieur du conteneur.
4. On se retrouvec donc avec deux versions du code : une sur le PC et une dans le conteneur.
5. Si on modifie un fichier sur le PC, celui du conteneur ne change pas automatiquement.
6. Le conteneur ne détecte donc aucune modification et le hot reloading ne fonctionne pas.
7. La solution consiste à utiliser un **bind mount (volume)** pour partager le dossier du projet avec le conteneur.
8. Ainsi, le conteneur accède directement aux fichiers de l'ordinateur au lieu d'utiliser une copie.
9. Les outils comme **nodemon**, **Vite** ou **Next.js** détectent alors immédiatement les changements et rechargent l'application.
10. En résumé, le hot reloading fonctionne avec Docker uniquement lorsque le conteneur utilise les mêmes fichiers que ceux présents sur la machine hôte grâce à un volume.

## Le volume

**docker run -v ./:/usr/src/app --name api my-app/express-api:latest-dev**
* -v ./:/usr/src/app
* -v <dossier_hôte>:<dossier_conteneur>
* ./              → dossier de ton projet sur ton ordinateur
* /usr/src/app    → dossier du projet dans le conteneur
Cela signifie que Docker relie ces deux dossiers.

          Bind Mount

Ton ordinateur                Conteneur Docker
┌──────────────────┐      ┌─────────────────────┐
│ ./               │ ───► │ /usr/src/app        │
│ ├── src          │      │ ├── src             │
│ ├── package.json │      │ ├── package.json    │
│ └── index.js     │      │ └── index.js        │
└──────────────────┘      └─────────────────────┘

Mon ordinateur                Conteneur Docker
___________________            __________________
| ./              |            | /usr/src/app   |
| |               |            | |              |
| |___src         |------>     | |__src         |
| |___package.json|            | |__package.json|
| |___index.js    |            | |__index.js    |
|_________________|            |________________|


Cette commande lance un conteneur nommé api à partir de l'image my-app/express-api:latest-dev. Grâce au volume -v ./:/usr/src/app, le dossier courant de l'ordinateur est partagé avec le dossier /usr/src/app du conteneur. Le conteneur travaille donc directement sur les fichiers du projet local, ce qui évite de reconstruire l'image après chaque modification et permet le hot reloading pendant le développement.

