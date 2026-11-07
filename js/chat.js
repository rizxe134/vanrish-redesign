function toggleChat(){
  const body = document.getElementById('chat-body');
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
}

function sendMessage(url){
	
  const input = document.getElementById('user-input');
  const message = input.value.trim();
  if(!message) return;

  addMessage(message, 'user-message');
  input.value = '';

  setTimeout(() => {
    botReply(url,message);
  }, 500);
}

function addMessage(text, className){
  const chatBody = document.getElementById('chat-body');
  const msg = document.createElement('div');
  msg.className = className;
  msg.innerText = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/**function botReply(userText){
  let reply = "Thanks! Let me connect you with our team.";

  const text = userText.toLowerCase();

  if(text.includes('ai')){
    reply = "We help with AI strategy, agents, and automation. Would you like to book a call?";
  }
  else if(text.includes('integration')){
    reply = "We specialize in MuleSoft, APIs, and system integration. Want to schedule a meeting?";
  }
  else if(text.includes('salesforce')){
    reply = "We provide Salesforce integration and automation solutions. Shall I book a session for you?";
  }
  else if(text.includes('price') || text.includes('cost')){
    reply = "Pricing depends on your use case. Let's discuss your needs on a quick call.";
  }

  addMessage(reply, 'bot-message');

  // Add booking CTA
  setTimeout(() => {
    addBookingButton();
  }, 800);
}*/

async function botReply(url,userText){	

  try {
	
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: userText })
    });

    const data = await response.json();	
	
	if(data.reply.toLowerCase().includes("book")){
		addBookingButton();
	}

    addMessage(data.reply, 'bot-message');

    // Add booking CTA automatically
    setTimeout(() => {
      addBookingButton();
    }, 800);

  } catch (error) {
    addMessage("⚠️ Sorry, something went wrong. Please try again.", 'bot-message');
  }
}


function addBookingButton(){
  const chatBody = document.getElementById('chat-body');

  const btn = document.createElement('button');
  btn.innerText = "📅 Book Meeting";
  btn.className = "btn";
  btn.style.marginTop = "10px";

  btn.onclick = function(){	 
    if(typeof Calendly !== "undefined"){
      Calendly.initPopupWidget({
        url: 'https://calendly.com/rajnish-vanrish/30min'
      });
    }
  };

  chatBody.appendChild(btn);
}