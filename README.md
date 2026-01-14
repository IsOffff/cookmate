# CookMate — Infrastructure NoSQL 

## Contexte

Ce projet s’inscrit dans le cadre du TP de bases de données avancées . L’objectif principal est de mettre en place une **architecture multi-bases NoSQL  conteneurisée

Ma responsabilité porte sur la conception, le déploiement et la démonstration** de l’infrastructure NoSQL suivante :

* **Redis** : cache clé/valeur
* **MongoDB** : base de documents
* **ChromaDB** : base vectorielle (recherche sémantique)

L’ensemble est orchestré avec Docker Compose**.

---

## Objectifs pédagogiques

* Comprendre les différences entre plusieurs types de bases NoSQL
* Justifier l’utilisation de chaque base selon son usage
* Mettre en place une architecture reproductible
* Fournir des preuves de fonctionnement
* Être capable d’expliquer chaque choix

---

## Architecture

```
Client / Terminal
        │
    
Docker Compose
 ├── Redis   (cache rapide)
 ── MongoDB (documents flexibles)
 └── Chroma  (recherche vectorielle)
```

Chaque service est isolé dans son propre conteneur.

---

## Rôle de chaque base

### Redis

Redis est une base clé/valeur en mémoire, extrêmement rapide. Elle est utilisée ici comme **cache**, par exemple pour stocker temporairement des recherches fréquentes.

Avantages :

* Très faible latence
* Accès ultra-rapide
* Simplicité

---

### MongoDB

MongoDB est une base orientée documents (JSON/BSON). Elle permet de stocker des données **semi-structurées** sans schéma strict.

Dans ce projet, elle est utilisée pour stocker des **commentaires utilisateurs** liés à des recettes.

Avantages :

* Schéma flexible
* Facile à faire évoluer
* Adaptée aux données hétérogènes

---

### ChromaDB

Chroma est une base vectorielle. Elle est conçue pour effectuer des recherches par **similarité sémantique**.

Contrairement aux bases classiques, elle ne compare pas seulement des mots-clés mais des vecteurs représentant le sens.

Avantages :

* Recherche intelligente
* Recommandation
* Similarité de contenus

---

## Lancement du projet

### 1. Démarrer les services

```bash
docker compose up -d
```

### 2. Vérifier que tout est lancé

bash
docker ps

---

## Preuves de fonctionnement

### Redis — preuve de cache

bash
docker exec -it cookmate_redis redis-cli
SET last_search "pasta carbonara"
GET last_search
exit

---

### MongoDB — lecture des données seedées

bash
docker exec -it cookmate_mongo mongosh --quiet --eval 'const dbc=db.getSiblingDB("cookmate"); printjson(dbc.comments.find().limit(10).toArray())'


---------

### Chroma — vérification du service

bash
curl http://localhost:8000/api/v2/heartbeat


---

## Seed des données MongoDB

Un script Python permet d’initialiser MongoDB avec des données de test.

bash
python3 backend/seed/seed_mongo.py


Il insère automatiquement des commentaires dans la base `cookmate`.

---

## Justification des choix

| Besoin                 | Solution | Raison                  |
| ---------------------- | -------- | ----------------------- |
| Accès rapide           | Redis    | Cache en mémoire        |
| Données flexibles      | MongoDB  | Documents JSON          |
| Recherche intelligente | Chroma   | Vecteurs sémantiques    |
| Reproductibilité       | Docker   | Isolation & portabilité |

---

## Ce que j’ai réalisé

* Conception de l’architecture NoSQL
* Mise en place des conteneurs Docker
* Scripts de seed MongoDB et Chroma
* Tests et preuves de fonctionnement
* Documentation

---

## Limites

Cette partie concerne uniquement l’infrastructure NoSQL. Le backend métier et la base SQL relèvent d’une autre partie du projet.

----------------

## Conclusion

Cette infrastructure démontre l’utilisation cohérente de plusieurs bases NoSQL, chacune ayant un rôle précis. Elle est fonctionnelle, testable et démontrable.


