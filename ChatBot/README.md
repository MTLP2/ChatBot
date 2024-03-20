Documentation du Composant Chatbot

Le composant Chatbot est une interface interactive permettant aux utilisateurs de naviguer à travers un ensemble de questions-réponses prédéfinies et d'envoyer des messages personnalisés à un administrateur. Ce guide détaille comment personnaliser et étendre les fonctionnalités du composant Chatbot.

Fonctionnalités
Navigation Interactive: Les utilisateurs peuvent choisir parmi une série de questions prédéfinies pour obtenir des réponses instantanées.
Contact Admin: Option permettant aux utilisateurs d'envoyer un message personnalisé à l'administrateur, avec la possibilité d'inclure leur adresse e-mail pour une réponse directe.
Validation d'Email: Avant l'envoi d'un message à l'administrateur, une validation de format d'email est effectuée pour s'assurer que l'adresse fournie est valide.
Personnalisation
Modification des Questions et Réponses Prédéfinies
Le flux de conversation est défini dans l'objet conversationFlow. Pour personnaliser les questions et les réponses :

Modifier l'Objet conversationFlow : Ajoutez, modifiez ou supprimez des paires clé-valeur dans cet objet pour ajuster les questions-réponses disponibles.

const conversationFlow = {
  start: {
    question: "Votre question personnalisée ici",
    responses: {
      "Option 1": "nextStep",
      // Ajoutez ou modifiez les options ici
    },
  },
  // Continuez à personnaliser les autres étapes selon vos besoins
};

Personnalisation de l'Envoi de Message à l'Admin
Pour ajuster la fonctionnalité d'envoi de messages à l'administrateur :

URL de l'API: Changez l'URL dans l'appel fetch de la fonction sendMessage pour pointer vers votre propre endpoint d'API.

fetch('VOTRE_ENDPOINT_API', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

Données Envoyées: Modifiez l'objet data pour inclure toute information supplémentaire que vous souhaitez envoyer à l'administrateur.
Validation d'Email
La validation de l'email est effectuée via une expression régulière basique. Pour une validation plus spécifique ou stricte, modifiez l'expression régulière dans la fonction sendMessage.

const emailRegex = /\S+@\S+\.\S+/; // Modifiez selon vos critères
Déploiement
Pour intégrer et déployer le composant Chatbot dans votre application :

Intégration: Incluez le composant Chatbot dans le fichier souhaité de votre projet React.
Configuration du Serveur: Assurez-vous que votre backend est configuré pour recevoir et traiter les requêtes d'envoi d'email.
