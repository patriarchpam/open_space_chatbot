require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Webhook verification endpoint (for WhatsApp Cloud API setup)
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_secure_verify_token';

    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.status(400).send('Missing hub.mode or hub.verify_token');
    }
});

// Endpoint to receive messages
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object) {
        if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0]) {
            const phoneNumberId = body.entry[0].changes[0].value.metadata.phone_number_id;
            const from = body.entry[0].changes[0].value.messages[0].from; // Extract the phone number from the sender
            const msgBody = body.entry[0].changes[0].value.messages[0].text.body; // Extract the message text

            console.log(`Received message from ${from}: ${msgBody}`);

            // AI / Complaint Handling Logic
            processComplaint(msgBody, from, phoneNumberId);
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Mock AI / Intent Handling Logic
async function processComplaint(message, from, phoneNumberId) {
    const lowerMessage = message.toLowerCase();
    let replyText = "";

    // Simple keyword-based intent parsing (Mocking AI)
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        replyText = "Hi! Welcome to Open Space Support. How can I help you today?";
    } else if (lowerMessage.includes('complaint') || lowerMessage.includes('issue') || lowerMessage.includes('problem')) {
        replyText = "I'm sorry to hear you're experiencing an issue. Could you please provide more details about your complaint?";
    } else if (lowerMessage.includes('transaction') || lowerMessage.includes('money') || lowerMessage.includes('transfer')) {
        replyText = "It seems you have an issue with a transaction. Let me check your recent activity. ... Everything seems fine on my end, but if you're still having trouble, I can connect you to an agent.";
    } else if (lowerMessage.includes('agent') || lowerMessage.includes('human') || lowerMessage.includes('help')) {
        replyText = "I am escalating your issue to a human agent. They will contact you shortly on this number.";
        await escalateToAgent(message, from);
    } else {
        replyText = "I'm not sure I understand. Could you please rephrase, or type 'agent' to speak to a human representative?";
    }

    // In a real scenario, we would send 'replyText' back to WhatsApp via the API
    console.log(`[WhatsApp API Mock] Sending reply to ${from}: ${replyText}`);
    // Example: sendWhatsAppMessage(phoneNumberId, from, replyText);
}

// Mock Agent Escalation Handoff
async function escalateToAgent(lastMessage, userPhone) {
    console.log(`[Agent Escalation] Creating ticket for user ${userPhone}.`);
    console.log(`[Agent Escalation] Last message: "${lastMessage}"`);
    // In a real scenario, this would call Zendesk, Slack, or another platform's API
    // e.g. await createZendeskTicket(userPhone, chatHistory);
    console.log(`[Agent Escalation] Ticket created successfully.`);
}

app.listen(PORT, () => {
    console.log(`Webhook server is listening, port ${PORT}`);
});
