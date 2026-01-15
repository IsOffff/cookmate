Présentation du projet
CookMate est une application backend conçue pour démontrer l’utilisation combinée de plusieurs bases de données spécialisées, chacune répondant à un besoin précis.
L’objectif est de montrer une architecture moderne, modulaire et reproductible grâce à Docker.

Le projet repose sur une séparation claire des responsabilités :
Données relationnelles → MySQL
Données flexibles → MongoDB
Cache rapide → Redis
Recherche sémantique → ChromaDB


Architecture
Le projet est composé de plusieurs services isolés dans des conteneurs Docker :
Backend Node.js (Express)
MySQL : stockage relationnel des recettes
MongoDB : stockage des commentaires
Redis : système de cache
ChromaDB : base vectorielle pour la similarité
Docker Compose : orchestration de l’ensemble
Chaque service est indépendant mais communicant via un réseau Docker commun.
Rôle des bases de données
MySQL — Base relationnelle
Utilisée pour :
Stocker les recettes
Gérer les relations
Garantir l’intégrité des données
Utiliser un schéma structuré
MongoDB — Base NoSQL orientée document
Utilisée pour :
Stocker les commentaires
Gérer des structures flexibles
Permettre des tableaux de taille variable
Éviter un schéma rigide
Redis — Cache clé-valeur
Utilisée pour :
Accélérer l’accès aux données
Mettre en cache les résultats SQL
Réduire les appels répétés à MySQL
Améliorer les performances
ChromaDB — Base vectorielle
Utilisée pour :
Gérer des embeddings
Faire de la recherche par similarité
Comparer des recettes sémantiquement
Implémenter des recommandations
Pourquoi plusieurs bases ?
Chaque base est optimisée pour un usage précis :
Besoin	Technologie
Structure relationnelle	MySQL
Données flexibles	MongoDB
Rapidité	Redis
Similarité sémantique	ChromaDB
Utiliser une seule base pour tout serait inefficace.
Pourquoi Docker ?
Docker permet :
L’isolation des services
La reproductibilité
L’absence de conflits de dépendances
Le déploiement simple
Un environnement identique pour tous
Lancement du projet
Démarrage
docker compose up -d
Vérification
docker ps
Démonstrations API
MySQL — Recettes
curl http://localhost:3000/sql/recipes
curl -X POST http://localhost:3000/sql/recipes \
  -H "Content-Type: application/json" \
  -d '{"title":"Pasta","description":"Simple","ingredients":["pasta","egg"],"steps":["boil","mix"]}'
Redis — Cache
curl http://localhost:3000/cache/1/cache
1ère fois → source SQL
2ème fois → source Redis
MongoDB — Commentaires
curl http://localhost:3000/recipes/1/comments
ChromaDB — Service actif
curl http://localhost:8000/api/v2/heartbeat

Preuve de fonctionnement
Toutes les bases sont réellement actives dans des conteneurs Docker.
Les requêtes sont exécutées en temps réel.
Les réponses API sont mesurables et démontrables.
Objectif pédagogique

Ce projet a pour but de démontrer :

Une architecture multi-bases
Une séparation claire des responsabilités
Une approche moderne du backend
L’usage de Docker
La complémentarité SQL / NoSQL
Le cache
La recherche sémantique
Défense orale — Résumé
MySQL → données relationnelles
MongoDB → documents
Redis → cache
Chroma → similarité
Docker → orchestration
Node.js → API

Conclusion

CookMate est une démonstration fonctionnelle d’une architecture backend distribuée utilisant plusieurs technologies spécialisées.
Chaque choix est justifié par un besoin technique précis.