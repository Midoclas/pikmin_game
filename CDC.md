Monaie (Pièce d'or):
    obtention : vente de trésors (déchets)
    Sert à acheter des upgrades

Trésor :
    - requiert : un nombre de force pour le transporter
        - maximum = minimum * 2
        - Plus on s'approche du maximum, plus c'est rapide
    - Lancement d'une recherche de trésor
        - Dure un temps donné (fix)
    - Lorsque la recherche est fini, un trésor est assigné avec un pourcentage de chance
    - Les trésors les plus lourd ne sont pas forcément les plus rentable
    - Nombre limité de recherche ?
    - Donne des pièces d'or


Pikmins :
    - State de force (pour porter des trésors)
    - State de combat (Pour les dongeons et les boss)
    - résistance à un attribut
    - durée de pousse
    - les pikmins doivent loger dans des oignons. Ils doivent donc être débloqué
    - upgrade par type (durée d'améliration ou instant ?):
        - Augmente une stat de combat
        - Augmente la stat de force 
        - diminue le temps de pousse
        - Transforme les feuilles en bourgeon (augmente le max des stats)
        - Transforme les bourgeons en fleurs (augmente le max des stats)
    - Les pikmins plus faibles ne pourront jamais atteindre les stats des plus fort (gros cap ?)

Oignons :
    - Sert de logement pour les pikmins
    - Nombre de stockage
    - upgrade :
        - Augmente la capacité d'un oignon
        - Augmente le temps de récupération après un combat

Dongeons :
    - Possède des Attributs
    - Le calcule du taux de réussite dépend :
        - Nombre de pikmin
        - stats des pikmins
        - Attribut du pikmin
    - Nombre de pikmins recommandé par attribut pour avoir 100% de réussite 
    - pourcentage de réussite selon le nombre de pikmin (diminu très vite jusqu'à 0 (pour moins de 50% des pikmins recommandés ?))
        - Si echec, perte de pikmin aléatoire en fonction du taux de réussite
    - récompenses : (monaie, trésors, pikmins, oignons) ?
    - Durée


// TODO
// Sauvegarder instance de trésor pour getting si changement de fenêtre