/* ============================================
   OPEN SPACE WHATSAPP CHATBOT — DEMO LOGIC
   ============================================ */

// Chatbot conversation flow
const chatFlow = {
    start: {
        botMessage: "Hi! 👋 Welcome to Open Space Support. I'm here to help resolve your issues quickly. What do you need help with?",
        quickReplies: [
            { text: "Failed Transaction", next: "transaction" },
            { text: "Account Issue", next: "account" },
            { text: "Loan Problem", next: "loan" },
            { text: "Other Complaint", next: "other" }
        ]
    },
    transaction: {
        botMessage: "I'm sorry about the transaction issue. Let me help! Could you tell me more about what happened?",
        quickReplies: [
            { text: "Money was debited but not sent", next: "transaction_debit" },
            { text: "Wrong amount charged", next: "transaction_wrong" },
            { text: "Transfer is pending too long", next: "transaction_pending" },
            { text: "Talk to an agent", next: "agent" }
        ]
    },
    transaction_debit: {
        botMessage: "I understand — money was debited but the recipient didn't receive it. This usually happens due to a network timeout.\n\n✅ Here's what I've done:\n• Checked your last 5 transactions\n• Found a ₦15,000 reversal in progress\n• Expected completion: within 24 hours\n\nIf you don't see the reversal by tomorrow, I'll escalate this automatically. Is there anything else I can help with?",
        quickReplies: [
            { text: "That helps, thank you!", next: "resolved" },
            { text: "I want to talk to an agent", next: "agent" },
            { text: "I have another issue", next: "start" }
        ]
    },
    transaction_wrong: {
        botMessage: "I see — you were charged the wrong amount. Could you provide:\n\n1. The approximate date of the transaction\n2. The expected amount\n3. The amount you were actually charged\n\nThis will help me locate the exact transaction quickly.",
        quickReplies: [
            { text: "It was today, ₦5000 instead of ₦500", next: "transaction_wrong_detail" },
            { text: "Let me talk to an agent instead", next: "agent" }
        ]
    },
    transaction_wrong_detail: {
        botMessage: "Thank you! I found a transaction today for ₦5,000.\n\n⚠️ This looks like it may need manual review. I'm creating a priority ticket for you now.\n\n🎫 Ticket #OS-2026-4891 created.\n\nA support agent will reach out to you within 2 hours. You'll receive updates right here on WhatsApp.",
        quickReplies: [
            { text: "Thank you!", next: "resolved" },
            { text: "I have another issue", next: "start" }
        ]
    },
    transaction_pending: {
        botMessage: "Pending transfers can happen when the receiving bank is experiencing downtime.\n\n🔍 I've checked your account:\n• Found 1 pending transfer (₦25,000)\n• Destination: Access Bank\n• Status: In queue at receiving bank\n\n⏱ This should clear within 30 minutes to 2 hours. If it doesn't resolve, type 'agent' and I'll connect you immediately.",
        quickReplies: [
            { text: "Okay, I'll wait", next: "resolved" },
            { text: "Connect me to an agent", next: "agent" },
            { text: "I have another issue", next: "start" }
        ]
    },
    account: {
        botMessage: "I can help with account issues! What specifically are you experiencing?",
        quickReplies: [
            { text: "Can't log in", next: "account_login" },
            { text: "Account is locked", next: "account_locked" },
            { text: "Need to update my details", next: "account_update" },
            { text: "Talk to an agent", next: "agent" }
        ]
    },
    account_login: {
        botMessage: "Login issues can be frustrating. Let's fix this!\n\n🔑 Try these steps:\n1. Tap 'Forgot Password' on the login screen\n2. Enter your registered phone number\n3. You'll receive an OTP to reset your password\n\nIf your phone number has changed, I'll need to connect you with an agent to verify your identity.\n\nDid this help?",
        quickReplies: [
            { text: "Yes, that worked!", next: "resolved" },
            { text: "My phone number changed", next: "agent" },
            { text: "Still can't log in", next: "agent" }
        ]
    },
    account_locked: {
        botMessage: "Your account may have been locked due to multiple failed login attempts or a security flag.\n\n🔒 For your security, I'll need to connect you to a support agent who can verify your identity and unlock your account.\n\nCreating a priority ticket now...\n\n🎫 Ticket #OS-2026-4892 — Account Unlock Request\n\nAn agent will contact you within 30 minutes.",
        quickReplies: [
            { text: "Thank you!", next: "resolved" },
            { text: "I have another issue too", next: "start" }
        ]
    },
    account_update: {
        botMessage: "To update your account details, you can do the following directly in the app:\n\n📱 Profile > Settings > Personal Information\n• Name\n• Email\n• Address\n\nFor BVN or phone number changes, you'll need to visit a Wema Bank branch or contact our agent.\n\nNeed more help?",
        quickReplies: [
            { text: "That's all I needed!", next: "resolved" },
            { text: "I need to change my phone number", next: "agent" },
            { text: "Another question", next: "start" }
        ]
    },
    loan: {
        botMessage: "I can help with loan-related issues. What's going on?",
        quickReplies: [
            { text: "Loan wasn't approved", next: "loan_rejected" },
            { text: "Repayment issue", next: "loan_repayment" },
            { text: "Wrong interest charged", next: "agent" },
            { text: "Talk to an agent", next: "agent" }
        ]
    },
    loan_rejected: {
        botMessage: "I'm sorry your loan wasn't approved. Here are the most common reasons:\n\n❌ Insufficient credit score\n❌ Account is below Tier 2 verification\n❌ Recent account activity is low\n\n💡 Tip: Upgrading to Tier 3 and maintaining regular transactions for 30 days significantly improves approval chances.\n\nWould you like to know how to upgrade your tier?",
        quickReplies: [
            { text: "Yes, how do I upgrade?", next: "loan_upgrade" },
            { text: "I want to appeal", next: "agent" },
            { text: "That answers my question", next: "resolved" }
        ]
    },
    loan_upgrade: {
        botMessage: "To upgrade your account tier:\n\n📋 Tier 2 → Tier 3:\n1. Open the app → Profile → Verification\n2. Upload a valid government-issued ID\n3. Complete the address verification\n4. Wait 24-48 hours for approval\n\nOnce you're Tier 3, try applying for the loan again after 7 days of regular activity. Good luck! 🍀",
        quickReplies: [
            { text: "Great, thanks!", next: "resolved" },
            { text: "I have another question", next: "start" }
        ]
    },
    loan_repayment: {
        botMessage: "For loan repayment issues, I can check your account.\n\n📊 Your current loan:\n• Outstanding: ₦45,000\n• Next payment due: Sep 20, 2026\n• Auto-debit: Enabled\n\nIs the auto-debit not working, or do you need to make a manual payment?",
        quickReplies: [
            { text: "Auto-debit failed", next: "agent" },
            { text: "I want to pay early", next: "loan_early" },
            { text: "Looks correct, thanks!", next: "resolved" }
        ]
    },
    loan_early: {
        botMessage: "Great decision! 🎉 To make an early repayment:\n\n1. Go to Loans section in the app\n2. Tap on your active loan\n3. Select 'Make Payment'\n4. Choose 'Full Repayment' or enter a custom amount\n\nEarly repayments can improve your credit score and qualify you for higher loan amounts in the future!",
        quickReplies: [
            { text: "Perfect, thanks!", next: "resolved" },
            { text: "I have another issue", next: "start" }
        ]
    },
    other: {
        botMessage: "I understand you have another type of complaint. Please describe your issue in a message and I'll do my best to help. If I can't resolve it, I'll connect you with a live agent right away.",
        quickReplies: [
            { text: "Connect me to an agent", next: "agent" }
        ]
    },
    agent: {
        botMessage: "I'm connecting you with a live support agent now. 🧑‍💻\n\n📋 Here's what's happening:\n• Your chat history has been shared with the agent\n• Priority: High\n• Estimated wait time: 2-5 minutes\n\nPlease stay on this chat — an agent will join shortly. Thank you for your patience!",
        quickReplies: [
            { text: "Thank you", next: "end" },
            { text: "I'll wait", next: "end" }
        ]
    },
    resolved: {
        botMessage: "Glad I could help! 😊 If you ever need support again, just send us a message here anytime.\n\n⭐ Rate your experience:\nType 1-5 (1 = Poor, 5 = Excellent)\n\nThank you for choosing Open Space! 💚",
        quickReplies: [
            { text: "⭐⭐⭐⭐⭐ 5", next: "rating" },
            { text: "⭐⭐⭐⭐ 4", next: "rating" },
            { text: "⭐⭐⭐ 3", next: "rating" }
        ]
    },
    rating: {
        botMessage: "Thank you for your feedback! 🙏 We're always working to improve. Have a great day! 💚",
        quickReplies: []
    },
    end: {
        botMessage: "Thank you! An agent will be with you shortly. Stay on this chat. 💚",
        quickReplies: []
    }
};

let currentStep = "start";

function openChatDemo() {
    const overlay = document.getElementById('demo-overlay');
    overlay.classList.add('active');
    
    // Reset chat
    const chatContainer = document.getElementById('demo-chat');
    chatContainer.innerHTML = '<div class="wa-date-badge">Today</div>';
    currentStep = "start";
    
    // Start the conversation
    setTimeout(() => {
        addBotMessage(chatFlow.start.botMessage);
        showQuickReplies(chatFlow.start.quickReplies);
    }, 500);
}

function closeChatDemo(event) {
    if (event && event.target !== document.getElementById('demo-overlay')) return;
    document.getElementById('demo-overlay').classList.remove('active');
}

// If called without event (from button), always close
document.querySelector('.demo-close')?.addEventListener('click', () => {
    document.getElementById('demo-overlay').classList.remove('active');
});

function addBotMessage(text) {
    const chat = document.getElementById('demo-chat');
    const msg = document.createElement('div');
    msg.className = 'wa-msg received';
    
    const formattedText = text.replace(/\n/g, '<br>');
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    msg.innerHTML = `<p>${formattedText}</p><span class="wa-time">${time}</span>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function addUserMessage(text) {
    const chat = document.getElementById('demo-chat');
    const msg = document.createElement('div');
    msg.className = 'wa-msg sent';
    
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
    msg.innerHTML = `<p>${text}</p><span class="wa-time">${time}</span>`;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

function showTypingIndicator() {
    const chat = document.getElementById('demo-chat');
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    chat.appendChild(typing);
    chat.scrollTop = chat.scrollHeight;
}

function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
}

function showQuickReplies(replies) {
    const container = document.getElementById('quick-replies');
    container.innerHTML = '';
    
    if (!replies || replies.length === 0) return;
    
    replies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply-btn';
        btn.textContent = reply.text;
        btn.onclick = () => handleQuickReply(reply.text, reply.next);
        container.appendChild(btn);
    });
}

function handleQuickReply(text, nextStep) {
    // Clear quick replies
    document.getElementById('quick-replies').innerHTML = '';
    
    // Add user message
    addUserMessage(text);
    
    // Show typing
    showTypingIndicator();
    document.getElementById('demo-status').textContent = 'typing...';
    
    // Bot responds
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
        removeTypingIndicator();
        document.getElementById('demo-status').textContent = 'online';
        
        currentStep = nextStep;
        const step = chatFlow[nextStep];
        
        if (step) {
            addBotMessage(step.botMessage);
            showQuickReplies(step.quickReplies);
        }
    }, delay);
}

function sendDemoMessage() {
    const input = document.getElementById('demo-input');
    const text = input.value.trim();
    if (!text) return;
    
    input.value = '';
    document.getElementById('quick-replies').innerHTML = '';
    addUserMessage(text);
    
    // Show typing
    showTypingIndicator();
    document.getElementById('demo-status').textContent = 'typing...';
    
    const lower = text.toLowerCase();
    let nextStep = 'other';
    
    if (lower.includes('transaction') || lower.includes('transfer') || lower.includes('money') || lower.includes('debit')) {
        nextStep = 'transaction';
    } else if (lower.includes('account') || lower.includes('login') || lower.includes('password') || lower.includes('locked')) {
        nextStep = 'account';
    } else if (lower.includes('loan') || lower.includes('borrow') || lower.includes('repay')) {
        nextStep = 'loan';
    } else if (lower.includes('agent') || lower.includes('human') || lower.includes('person') || lower.includes('speak')) {
        nextStep = 'agent';
    } else if (lower.includes('thank') || lower.includes('thanks') || lower.includes('ok') || lower.includes('bye')) {
        nextStep = 'resolved';
    } else if (lower.includes('hi') || lower.includes('hello') || lower.includes('hey')) {
        nextStep = 'start';
    }
    
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
        removeTypingIndicator();
        document.getElementById('demo-status').textContent = 'online';
        
        currentStep = nextStep;
        const step = chatFlow[nextStep];
        
        if (step) {
            addBotMessage(step.botMessage);
            showQuickReplies(step.quickReplies);
        }
    }, delay);
}

// Close demo on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('demo-overlay').classList.remove('active');
    }
});
