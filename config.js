const { env } = process

// Default message when the user sends an unknown message.
const unknownCommandMessage = `I'm sorry, I can only understand text. Can you please describe your query?

If you would like to chat with a human, just reply with *human*.`

// Default welcome message. Change it as you need.
const welcomeMessage = `Hey there 👋 Welcome to this ChatGPT-powered AI chatbot! I can also speak many languages 😁`

// AI bot instructions to adjust its bevarior. Change it as you need.
// Use concise and clear instructions.
const botInstructions = `You are a smart virtual customer support assistant who works for Wassenger.
You can identify yourself as Molly, the Wassenger chatbot assistant.
You will be chatting with random customers who may contact you with general queries about the product.
Wassenger is a cloud solution that offers WhatsApp API and multi-user live communication services designed for businesses and developers.
Wassenger also enables customers to automate WhatsApp communication and build chatbots.
You are an expert customer support agent.
Be polite. Be gentle. Be helpful. Be emphatic. Be concise in your responses.
Politely reject any queries that are not related to customer support or Wassenger itself.
Strictly stick to your role as customer support virtual assistant for Wassenger.
If you can't help with something, ask the user to type *human* in order to talk with customer support.`

// Default help message. Change it as you need.
const defaultMessage = `Don't be shy 😁 try asking anything to the AI chatbot, using natural language!

Example queries:

1️⃣ Explain me what is WhatsApp bot
2️⃣ Can I use WhatsApp bot to send automatic messages?
3️⃣ Can I schedule messages using WhatsApp bot?
4️⃣ any questions related to your education?

Type *human* to talk with a person. The chat will be assigned to an available member of the team.

Give it a try! 😁`

// Chatbot config
export default {
  // Optional. Specify the Wassenger device ID (24 characters hexadecimal length) to be used for the chatbot
  // If no device is defined, the first connected device will be used
  // Obtain the device ID in the Wassenger app: https://app.wassenger.com/number
  device: env.DEVICE || 'ENTER WHATSAPP DEVICE ID',

  // Required. Specify the Wassenger API key to be used
  // You can obtain it here: https://app.wassenger.com/apikeys
  apiKey: env.API_KEY || '82c91a23369bd016e88f55e53df88e0077e137ca8aab1b29d5893d36e205bb553b18eb6a15b5abe1',

  // Required. Specify the OpenAI API key to be used
  // You can sign up for free here: https://platform.openai.com/signup
  // Obtain your API key here: https://platform.openai.com/account/api-keys
  openaiKey: env.OPENAI_API_KEY || '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',

  // Required. Set the OpenAI model to use.
  // You can use a pre-existing model or create your fine-tuned model.
  // Default model: gpt-4-0613
  // Faster model available: gpt-3.5-turbo-0613
  // For customized fine-tuned models, see: https://platform.openai.com/docs/guides/fine-tuning
  openaiModel: env.OPENAI_MODEL || 'gpt-4-0613',

  // Optional. AI callable functions to be interpreted by the AI
  // Using it you can instruct the AI to inform you to execute arbitrary functions
  // in your code based in order to augment information for a specific user query.
  // For example, you can call an external CRM in order to retrieve, save or validate
  // specific information about the customer, such as email, phone number, user ID, etc.
  // Learn more here: https://platform.openai.com/docs/guides/gpt/function-calling
  openaiFunctions: [
    {
      name: 'getPlanPrices',
      description: 'Get available plans and prices information available in Wassenger',
      parameters: { type: 'object', properties: {} }
    }
  ],

  // Optional. HTTP server TCP port to be used. Defaults to 8080
  port: +env.PORT || 8080,

  // Optional. Use NODE_ENV=production to run the chatbot in production mode
  production: env.NODE_ENV === 'production',

  // Optional. Specify the webhook public URL to be used for receiving webhook events
  // If no webhook is specified, the chatbot will autoamtically create an Ngrok tunnel
  // and register it as the webhook URL.
  // IMPORTANT: in order to use Ngrok tunnels, you need to sign up for free, see the option below.
  webhookUrl: env.WEBHOOK_URL,

  // Ngrok tunnel authentication token.
  // Required if webhook URL is not provided.
  // sign up for free and get one: https://ngrok.com/signup
  // Learn how to obtain the auth token: https://ngrok.com/docs/agent/#authtokens
  ngrokToken: env.NGROK_TOKEN,

  // Set one or multiple labels on chatbot-managed chats
  setLabelsOnBotChats: ['bot'],

  // Remove labels when the chat is assigned to a person
  removeLabelsAfterAssignment: true,

  // Set one or multiple labels on chatbot-managed chats
  setLabelsOnUserAssignment: ['from-bot'],

  // Optional. Set a list of labels that will tell the chatbot to skip it
  skipChatWithLabels: ['no-bot'],

  // Optional. Ignore processing messages sent by one of the following numbers
  // Important: the phone number must be in E164 format with no spaces or symbols
  numbersBlacklist: ['1234567890'],

  // Optional. Only process messages one of the the given phone numbers
  // Important: the phone number must be in E164 format with no spaces or symbols
  numbersWhitelist: [],

  // Skip chats that were archived in WhatsApp
  skipArchivedChats: true,

  // If true, when the user requests to chat with a human, the bot will assign
  // the chat to a random available team member.
  // You can specify which members are eligible to be assigned using the `teamWhitelist`
  // and which should be ignored using `teamBlacklist`
  enableMemberChatAssignment: true,

  // If true, chats assigned by the bot will be only assigned to team members that are
  // currently available and online (not unavailable or offline)
  assignOnlyToOnlineMembers: false,

  // Optional. Skip specific user roles from being automatically assigned by the chat bot
  // Available roles are: 'admin', 'supervisor', 'agent'
  skipTeamRolesFromAssignment: ['admin'], // 'supervisor', 'agent'

  // Enter the team member IDs (24 characters length) that can be eligible to be assigned
  // If the array is empty, all team members except the one listed in `skipMembersForAssignment`
  // will be eligible for automatic assignment
  teamWhitelist: [],

  // Optional. Enter the team member IDs (24 characters length) that should never be automatically assigned chats to
  teamBlacklist: [],

  // Optional. Set metadata entries on bot-assigned chats
  setMetadataOnBotChats: [
    {
      key: 'bot_start',
      value: () => new Date().toISOString()
    }
  ],

  // Optional. Set metadata entries when a chat is assigned to a team member
  setMetadataOnAssignment: [
    {
      key: 'bot_stop',
      value: () => new Date().toISOString()
    }
  ],

  defaultMessage,
  botInstructions,
  welcomeMessage,
  unknownCommandMessage,
}
