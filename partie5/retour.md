## Premier script pour créer les droits

```bash
srio@srio-VirtualBox:~/Desktop$ ./add_perm.sh perm.json 
Dossier /dossiers/Acquisition créé.
Dossier /dossiers/Armement créé.
Dossier /dossiers/Développement créé.
Dossier /dossiers/Finances créé.
Dossier /dossiers/Graphiques créé.
Dossier /dossiers/HR créé.
Dossier /dossiers/Maintenance créé.
Dossier /dossiers/Recherche créé.
Dossier /dossiers/Sécurité créé.
Droits r appliqués sur /dossiers/Acquisition pour Abena.
Droits r appliqués sur /dossiers/Développement pour Abena.
Droits r appliqués sur /dossiers/Finances pour Abena.
Droits r appliqués sur /dossiers/Graphiques pour Abena.
Droits r appliqués sur /dossiers/HR pour Abena.
Droits r appliqués sur /dossiers/Maintenance pour Abena.
Droits rx appliqués sur /dossiers/Acquisition pour Bosco.
Droits rx appliqués sur /dossiers/Développement pour Bosco.
Droits r appliqués sur /dossiers/Finances pour Bosco.
Droits r appliqués sur /dossiers/Graphiques pour Bosco.
Droits r appliqués sur /dossiers/HR pour Bosco.
Droits rx appliqués sur /dossiers/Maintenance pour Bosco.
Droits r appliqués sur /dossiers/Acquisition pour Branktor.
Droits r appliqués sur /dossiers/Développement pour Branktor.
Droits r appliqués sur /dossiers/Finances pour Branktor.
Droits r appliqués sur /dossiers/Graphiques pour Branktor.
Droits r appliqués sur /dossiers/HR pour Branktor.
Droits r appliqués sur /dossiers/Maintenance pour Branktor.
Droits rwx appliqués sur /dossiers/Acquisition pour Jeannette.
Droits rwx appliqués sur /dossiers/Armement pour Jeannette.
Droits rwx appliqués sur /dossiers/Développement pour Jeannette.
Droits rwx appliqués sur /dossiers/Finances pour Jeannette.
Droits rwx appliqués sur /dossiers/Graphiques pour Jeannette.
Droits rwx appliqués sur /dossiers/HR pour Jeannette.
Droits rwx appliqués sur /dossiers/Maintenance pour Jeannette.
Droits rwx appliqués sur /dossiers/Recherche pour Jeannette.
Droits rwx appliqués sur /dossiers/Sécurité pour Jeannette.
Droits r appliqués sur /dossiers/Acquisition pour Joseph.
Droits r appliqués sur /dossiers/Développement pour Joseph.
Droits r appliqués sur /dossiers/Finances pour Joseph.
Droits r appliqués sur /dossiers/Graphiques pour Joseph.
Droits r appliqués sur /dossiers/HR pour Joseph.
Droits r appliqués sur /dossiers/Maintenance pour Joseph.
Droits rw appliqués sur /dossiers/Acquisition pour Kinfrack.
Droits rw appliqués sur /dossiers/Développement pour Kinfrack.
Droits r appliqués sur /dossiers/Finances pour Kinfrack.
Droits r appliqués sur /dossiers/Graphiques pour Kinfrack.
Droits r appliqués sur /dossiers/HR pour Kinfrack.
Droits rw appliqués sur /dossiers/Maintenance pour Kinfrack.
Droits x appliqués sur /dossiers/Acquisition pour Magally.
Droits x appliqués sur /dossiers/Armement pour Magally.
Droits x appliqués sur /dossiers/Développement pour Magally.
Droits x appliqués sur /dossiers/Finances pour Magally.
Droits x appliqués sur /dossiers/Graphiques pour Magally.
Droits x appliqués sur /dossiers/HR pour Magally.
Droits x appliqués sur /dossiers/Maintenance pour Magally.
Droits x appliqués sur /dossiers/Recherche pour Magally.
Droits x appliqués sur /dossiers/Sécurité pour Magally.
Droits r appliqués sur /dossiers/Acquisition pour Moyo.
Droits r appliqués sur /dossiers/Armement pour Moyo.
Droits r appliqués sur /dossiers/Développement pour Moyo.
Droits r appliqués sur /dossiers/Finances pour Moyo.
Droits r appliqués sur /dossiers/Graphiques pour Moyo.
Droits r appliqués sur /dossiers/HR pour Moyo.
Droits r appliqués sur /dossiers/Maintenance pour Moyo.
Droits r appliqués sur /dossiers/Recherche pour Moyo.
Droits r appliqués sur /dossiers/Sécurité pour Moyo.
Droits rwx appliqués sur /dossiers/Finances pour Nams.
Droits rwx appliqués sur /dossiers/Graphiques pour Nams.
Droits rwx appliqués sur /dossiers/HR pour Nams.
```

## Vérification des permissions 
```bash
srio@srio-VirtualBox:~/Desktop$ ./verif_perm.sh Moyo fake_perm.json 
Vérification des permissions pour l'utilisateur Moyo :
Armement : OK - Permissions correctes (r)
Finances : ERREUR - Permissions actuelles (r) différentes des permissions attendues (rwx)
Graphiques : ERREUR - Permissions actuelles (r) différentes des permissions attendues (rwx)
Sécurité : OK - Permissions correctes (r)

```