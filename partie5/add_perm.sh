#!/bin/bash

# Vérification du paramètre
if [ "$#" -ne 1 ]; then
    echo "Usage du fichier : $0 fichier.json"
    exit 1
fi

# Chargement du fichier JSON en paramètre
file=$1

# Vérification si le fichier existe
if [ ! -f "$file" ]; then
    echo "Le fichier $file n'existe pas."
    exit 1
fi

# Création des dossiers (récupérés dynamiquement du fichier JSON)
directories=$(jq -r '.[] | keys[]' "$file" | sort -u)
for dir in $directories; do
  if [ ! -d "/dossiers/$dir" ]; then
    sudo mkdir -p "/dossiers/$dir"
    echo "Dossier /dossiers/$dir créé."
  fi
done

# Création des utilisateurs et application des droits
users=$(jq -r 'keys[]' "$file")
for user in $users; do
  # Vérifier si l'utilisateur existe, sinon le créer
  if ! id "$user" &>/dev/null; then
    sudo useradd -m "$user"
    echo "Utilisateur $user créé."
  fi

  # Récupérer les permissions de l'utilisateur pour chaque dossier
  for folder in $(jq -r ".[\"$user\"] | keys[]" "$file"); do
    rights=$(jq -r ".[\"$user\"][\"$folder\"]" "$file")
    
    # Appliquer les permissions avec setfacl
    sudo setfacl -m u:"$user":"$rights" "/dossiers/$folder"
    echo "Droits $rights appliqués sur /dossiers/$folder pour $user."
  done
done
