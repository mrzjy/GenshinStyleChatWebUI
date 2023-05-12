window.onload = () => {
  // Add mousemove event listener to adjust background image
  const bgVideo = document.getElementById('bg-video');
  const chatContainer = document.getElementById('chat-container');

  const handleMouseMove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const videoWidth = bgVideo.offsetWidth;
    const videoHeight = bgVideo.offsetHeight;

    // Check if mouse pointer is within bounds of video
    if (mouseX >= 0 && mouseX <= videoWidth && mouseY >= 0 && mouseY <= videoHeight) {
      const xPercent = (mouseX / videoWidth) * 50;
      const yPercent = (mouseY / videoHeight) * 50;

      bgVideo.style.transformOrigin = `${xPercent}% ${yPercent}%`;
      bgVideo.style.transform = `scale(1.4)`;
    }
  };

  chatContainer.addEventListener('mouseenter', () => {
    document.removeEventListener('mousemove', handleMouseMove);
  });

  chatContainer.addEventListener('mouseleave', () => {
    document.addEventListener('mousemove', handleMouseMove);
  });

  document.addEventListener('mousemove', handleMouseMove);
};

const messageContainer = document.getElementById('message-container');
const userInput = document.getElementById('user-input');
const historyMessageContainer = document.getElementById('history-message');
const characterName = document.querySelector("#chat-container h1").textContent;

function getReplyMessage(userMessage) {
  if (userMessage.length > 0) {
    historyMessageContainer.textContent += "你：" + userMessage + "\n";
  }
  
  const replyMessage = "Hello traveler! How can I assist you today?";
  const replyMessageElement = document.createElement('div');
  replyMessageElement.classList.add('message');
  replyMessageElement.classList.add('reply-message');
  messageContainer.appendChild(replyMessageElement);

  let i = 0;
  return new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (i < replyMessage.length) {
        replyMessageElement.textContent += replyMessage.charAt(i);
        i++;
      } else {
        clearInterval(intervalId);
        resolve();
      }
    }, 20);
  }).then(() => {
    // Update dialogue history and display in historyMessageContainer
    
    historyMessageContainer.textContent += characterName + "：" + replyMessageElement.textContent + "\n";
  });
}

// Display initial reply message
getReplyMessage('')
userInput.addEventListener('keydown', async (event) => {
  if (event.key === 'Enter') {
    const userMessage = userInput.value;
    const replyMessagePromise = getReplyMessage(userMessage);
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('message');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    messageContainer.appendChild(userMessageElement);
    userInput.value = '';

    // Check if there is already a reply message element
    const previousReplyMessageElement = messageContainer.querySelector('.reply-message');
    const previousUserMessageElement = messageContainer.querySelector('.user-message');
    if (previousReplyMessageElement) {
      messageContainer.removeChild(previousReplyMessageElement);
    }
    if (previousUserMessageElement) {
      messageContainer.removeChild(previousUserMessageElement);
    }

    const replyMessage = await replyMessagePromise;
    const replyMessageElement = document.createElement('div');
    replyMessageElement.classList.add('message');
    replyMessageElement.classList.add('reply-message');
    replyMessageElement.textContent = replyMessage;
    messageContainer.appendChild(replyMessageElement);
  }
});

    
const historyContainer = document.getElementById('history-container');
const toggleButton = document.getElementById('toggle-button');

toggleButton.addEventListener('click', () => {
  historyContainer.classList.toggle('open');
});