#!/bin/bash

# Vérification du paramètre
if [ "$#" -ne 1 ]; then
    echo "Le nombre de paramètres n'est pas bon. On attend le fichier JSON avec le nom des dossiers"
    exit 1
fi

# Paramètre d'entrée
file=$1          # Fichier JSON contenant la description des dossiers

# Vérification de l'existence du fichier JSON
if [ ! -f "$file" ]; then
    echo "Le fichier $file n'existe pas."
    exit 1
fi

# Extraction des dossiers
directories=$(jq -r "to_entries[] | .key" "$file")
if [ -z "$directories" ]; then
    echo "Le fichier $file ne contient aucun dossier."
    exit 0
fi

# Initialisation des tableaux
labels=()
values=()

# Remplissage des tableaux `labels` et `values` avec les dossiers et le nombre d'accès
for dir in $directories; do
    if [ -d "$dir" ]; then
        labels+=("$dir")
        count=$(grep "$dir" dossier_surveilles.log | wc -l)
        values+=("$count")
        echo "Dossier $dir avec $count lignes dans le log."
    else
        echo "Dossier $dir non trouvé, il sera ignoré."
    fi
done

# Affichage du titre
tput clear
printf " %10s " ""
tput setaf 7; tput smul
printf "%s\n\n" "Analyse des accès du fichier ($1)"
tput rmul

# Affichage des résultats
for index in "${!labels[@]}"; do
    tput setaf $((index + 1))  # Ne pas utiliser 0 (noir)
    printf " %10s " "${labels[index]}"
    eval "printf '█%.0s' {1..${values[index]}}"
    printf " %s \n\n" "${values[index]}"
done

# Réinitialisation des couleurs
tput sgr0
