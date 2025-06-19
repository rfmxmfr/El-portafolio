import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { handler as chatHandler } from './function/chat';
import { handler as generateHandler } from './function/generate';

// Define the schema
const schema = a.schema({
  // Define your data models here
  FashionDesign: a
    .model({
      title: a.string().required(),
      description: a.string(),
      imageUrl: a.string(),
      category: a.string(),
      tags: a.array(a.string()),
      createdAt: a.datetime(),
      updatedAt: a.datetime()
    })
    .authorization(allow => {
      allow.public().to(['read']);
      allow.authenticated().to(['create', 'read', 'update', 'delete']);
    }),

  // Add AI capabilities
  AIAssistant: a
    .model({
      prompt: a.string().required(),
      response: a.string(),
      createdAt: a.datetime()
    })
    .authorization(allow => {
      allow.authenticated().to(['create', 'read']);
    })
    // Add generative AI routes
    .routes(routes => {
      // Add conversation capability
      routes.conversation('/chat', {
        description: 'Chat with an AI assistant about fashion design',
        handler: chatHandler
      });
      
      // Add generation capability
      routes.generation('/generate', {
        description: 'Generate fashion design ideas',
        handler: generateHandler
      });
    })
});

export type Schema = ClientSchema<typeof schema>;

// Define the data
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});