import sql from './db.js'
import dotenv from 'dotenv'
import { OpenAI } from 'openai'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function main() {
  const inputs = await sql`
    SELECT * FROM gaze_inputs
    ORDER BY timestamp DESC
    LIMIT 5
  `;

  const gazeData = inputs.map((row) => row.gaze_data).join('\n');
  const reflectionData = inputs.map((row) => row.reflection || '').join('\n');

  const prompt = `
You are an emergent interpreter embedded within an artwork...
Gaze Inputs:
${gazeData}

Reflections:
${reflectionData}
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are an emergent interpreter embedded within an artwork...',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const reply = completion.choices[0].message.content;
  console.log('AI Reply:', reply);

  await sql`
    INSERT INTO journals (content, timestamp)
    VALUES (${reply}, NOW())
  `;
}

main().catch(console.error);
