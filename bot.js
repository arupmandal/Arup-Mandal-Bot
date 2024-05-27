const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config(); 

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name || '';
  const lastName = msg.from.last_name || '';
  const username = msg.from.username ? `@${msg.from.username}` : '';

  // Create a welcome message
  const welcomeMessage = `Welcome, ${firstName} ${lastName} ${username}! 👋\n\n` +
    `Here are some options for you:`;

  // Inline keyboard options
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: 'Instagram 📸', callback_data: 'instagram' },
          { text: 'Facebook 📘', callback_data: 'facebook' }
        ],
        [
          { text: 'Twitter 🐦', callback_data: 'twitter' },
          { text: 'LinkedIn 🔗', callback_data: 'linkedin' }
        ],
        [
          { text: 'Donate Me 💰', callback_data: 'donate' }
        ]
      ]
    }
  };

  // Send the welcome message with inline buttons
  bot.sendMessage(chatId, welcomeMessage, options);

  // Send the copyright message
  const copyrightMessage = `© 2024 by Arup Mandal. All rights reserved. For more info, visit [this link](https://arupmandal.github.io/).`;
  bot.sendMessage(chatId, copyrightMessage, { parse_mode: 'Markdown' });
});

// Handle callback queries
bot.on('callback_query', (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;
  let url;
  let followMessage;

  switch (data) {
    case 'instagram':
      url = 'https://www.instagram.com/iamarupmandal/';
      followMessage = `You can follow on this platform: [Follow Here](${url})`;
      break;
    case 'facebook':
      url = 'https://www.facebook.com/iamarupmandal/';
      followMessage = `You can follow on this platform: [Follow Here](${url})`;
      break;
    case 'twitter':
      url = 'https://www.twitter.com/iamarupmandal/';
      followMessage = `You can follow on this platform: [Follow Here](${url})`;
      break;
    case 'linkedin':
      url = 'https://www.linkedin.com/in/iamarupmandal/';
      followMessage = `You can follow on this platform: [Follow Here](${url})`;
      break;
    case 'donate':
      url = 'https://arupmandal.github.io/Donate-Me/';
      followMessage = `Support us by making a donation: [Donate Here](${url})`;
      break;
    default:
      url = '';
  }

  if (url) {
    const followOptions = {
      reply_markup: {
        inline_keyboard: [
          [{ text: data === 'donate' ? 'Donate Now' : 'Follow Now', url: url }]
        ]
      },
      parse_mode: 'Markdown'
    };
    bot.sendMessage(message.chat.id, followMessage, followOptions).catch(error => {
      console.error('Error sending message:', error);
    });
  }
});

// Log any polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});
