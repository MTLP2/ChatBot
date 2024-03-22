
import React, { useState } from 'react';

function Chatbot() {
  const [currentState, setCurrentState] = useState('start');
  const [messages, setMessages] = useState([{ id: Date.now(), text: "Bonjour, que souhaitez-vous faire ?", sender: 'bot' }]);
  const [adminMessage, setAdminMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const conversationFlow = {
    start: {
      question: "Que souhaites-tu faire ?",
      responses: {
        "Créer un compte": "createAccount",
        "Changer mon profil": "changeProfile",
        "Envoyer un message à l'admin": "contactAdmin",
      },
    },
    createAccount: {
      question: "Pour créer un compte, visite notre page d'inscription. As-tu une autre question ?",
      responses: {
        "Oui": "start",
        "Non": "end",
      },
    },
    changeProfile: {
      question: "Tu peux changer ton profil dans les paramètres de ton compte. As-tu une autre question ?",
      responses: {
        "Oui": "start",
        "Non": "end",
      },
    },
    contactAdmin: {
        question: "Tu souhaites envoyer un message à l'admin. Tape ton message ci-dessous :",
        responses: {},
      },
    end: {
      question: "Merci d'avoir utilisé notre aide. À bientôt !",
      responses: {},
    },
  };

  const sendMessage = (text, email) => {
    // Efface les messages d'erreur précédents
    setEmailError('');
    if (currentState === 'contactAdmin') {
      // Vérifie si l'email est fourni et valide
      const emailRegex = /\S+@\S+\.\S+/;
      if (!email || !emailRegex.test(email)) {
        setEmailError('Merci d\'entrer une adresse e-mail valide.');
        return; // Arrête la fonction si l'email n'est pas valide
      }
  
      // Logique pour envoyer le message et l'e-mail à l'admin
      const data = {
        message: adminMessage,
        email: email,
      };
  
      // Envoie les données au serveur via fetch
      fetch('http://localhost:5174/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setMessages(messages => [...messages, { id: Date.now() + 1, text: "Ton message a été envoyé à l'admin.", sender: 'bot' }]);
        setCurrentState('end');
        setAdminMessage('');
        setUserEmail('');
      })
      .catch((error) => {
        console.error('Error:', error);
        setEmailError('Une erreur est survenue lors de l\'envoi du message.');
      });
    } else {
      const nextStateKey = conversationFlow[currentState].responses[text];
      const nextState = conversationFlow[nextStateKey];
      setMessages(messages => [...messages, { id: Date.now() + 1, text: nextState.question, sender: 'bot' }]);
      setCurrentState(nextStateKey);
    }
  };

  return (
    <>
      <h2 className='title'>ChatBot</h2>
      <div className='chatContainer'>
        <ul className='chatbotContainer'>
          {messages.map((message) => (
            <li key={message.id}>{message.sender === 'user' ? "Vous" : "Bot"}: {message.text}</li>
          ))}
        </ul>
        {currentState === 'contactAdmin' ? (
          <div>
            <input
              type="text"
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
              placeholder="Tape ton message ici"
            />
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Ton adresse e-mail"
            />
            {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            <button onClick={() => sendMessage(adminMessage, userEmail)} disabled={isLoading}>Envoyer</button>
          </div>
        ) : (
          currentState !== 'end' && (
            <div className='choiceContainer'> {/* Ajout de cette div pour englober les boutons */}
              {Object.keys(conversationFlow[currentState].responses).map((response) => (
                  <button className='chatbuttonBox' key={response} onClick={() => sendMessage(response)}>
                    {response}
                  </button>
              ))}
            </div>
          )
        )}
      </div>
    
    
    </>
  );
}

export default Chatbot;
