#!/bin/bash


# Vérification du paramètre
if [ "$#" -ne 3 ]; then
    echo "Le nombre de paramètres n'est pas bon. On attent le fichier en premier et n en deuxième et m en troisième"
    exit 1
fi

# Paramètres d'entrée
file=$1          # Fichier JSON contenant la description des dossiers
security_level=$2 # Niveau de sécurité maximum
duration=$3       # Durée en secondes pour la surveillance

# Vérification de l'existence du fichier JSON
if [ ! -f "$file" ]; then
    echo "Le fichier $file n'existe pas."
    exit 1
fi

# Extraction des dossiers dont le niveau de sécurité est ≤ au niveau donné
directories=$(jq -r "to_entries[] | select(.value.niveau_securite <= $security_level) | .key" "$file")

if [ -z "$directories" ]; then
    echo "Aucun dossier avec un niveau de sécurité ≤ $security_level n'a été trouvé dans $file."
    exit 0
fi

# Création du fichier log
log_file="dossier_surveilles.log"
echo "Début de la surveillance pour une durée de $duration secondes. Les logs seront enregistrés dans $log_file."

# Fonction pour surveiller un dossier et enregistrer les accès
monitor_directory() {
    local dir=$1
    sudo inotifywait -m -e ACCESS -t $duration -o $log_file $dir
}

# Lancement de la surveillance en arrière-plan pour chaque dossier
for dir in $directories; do
    if [ -d "$dir" ]; then
        monitor_directory "$dir" &
    else
        echo "Dossier $dir non trouvé, il sera ignoré."
    fi
done

# Attente de la durée spécifiée puis arrêt de la surveillance
sleep "$duration"
echo "Fin de la surveillance après $duration secondes."

# Arrêt des processus de surveillance
kill $(jobs -p)
echo "Les processus de surveillance ont été arrêtés."




