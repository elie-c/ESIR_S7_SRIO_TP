#!/bin/bash

# Vérification des paramètres
if [ "$#" -ne 2 ]; then
    echo "Usage: $0 nom_utilisateur fichier_permissions.json"
    exit 1
fi

# Paramètres d'entrée
username=$1
file=$2

# Vérification de l'existence du fichier JSON
if [ ! -f "$file" ]; then
    echo "Le fichier $file n'existe pas."
    exit 1
fi

# Vérification de l'existence de l'utilisateur
if ! id "$username" &>/dev/null; then
    echo "L'utilisateur $username n'existe pas sur le système."
    exit 1
fi

# Extraction des permissions attendues pour l'utilisateur
expected_permissions=$(jq -r ".[\"$username\"]" "$file")

# Vérification si l'utilisateur a des permissions définies dans le fichier JSON
if [ "$expected_permissions" == "null" ]; then
    echo "Aucune permission définie pour l'utilisateur $username dans le fichier $file."
    exit 0
fi

# Boucle sur chaque dossier pour vérifier les permissions
echo "Vérification des permissions pour l'utilisateur $username :"
for folder in $(echo "$expected_permissions" | jq -r 'keys[]'); do
    expected_rights=$(echo "$expected_permissions" | jq -r ".\"$folder\"")
    
    # Vérification des permissions réelles sur le dossier
    actual_rights=$(getfacl -p "/dossiers/$folder" 2>/dev/null | grep "^user:$username" | awk -F: '{print $3}')
    
    # Formatage des permissions actuelles pour compatibilité
    actual_rights=${actual_rights//-}

    # Comparaison des droits
    if [ "$actual_rights" == "$expected_rights" ]; then
        echo -e "\033[32m$folder : OK - Permissions correctes ($actual_rights)\033[0m"
    else
        echo -e "\033[31m$folder : ERREUR - Permissions actuelles ($actual_rights) différentes des permissions attendues ($expected_rights)\033[0m"
    fi
done
