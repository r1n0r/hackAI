const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
let loadingMessage;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = input.value;
  console.log("User message:", userMessage); // Debugging log

  addMessage('You', userMessage);
  input.value = '';

  // Show loading indicator
  loadingMessage = addMessage('GPT', 'Typing...');
  
  // Make API request
  try {
    const response = await fetch(`https://free-unoficial-gpt4o-mini-api-g70n.onrender.com/chat/?query=${userMessage}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });
    console.log("API response:", response); // Debugging log
    const data = await response.json();
    console.log("Parsed response:", data); // Debugging log

    // Replace loading message with API response
    loadingMessage.textContent = `GPT: ${data.results || 'No response from the API'}`;
  } catch (error) {
    console.error("Error fetching API:", error); // Debugging log
    loadingMessage.textContent = 'GPT: Failed to fetch API';
  }
});

function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', sender === 'You' ? 'user' : 'gpt');
  messageElement.textContent = `${sender}: ${message}`;
  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
  return messageElement;
}
