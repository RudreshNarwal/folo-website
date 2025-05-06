// src/ai/flows/personalized-financial-tips.ts
'use server';

/**
 * @fileOverview Provides personalized financial tips based on user spending habits.
 *
 * - getPersonalizedFinancialTips - A function that generates personalized financial tips for a user.
 * - PersonalizedFinancialTipsInput - The input type for the getPersonalizedFinancialTips function.
 * - PersonalizedFinancialTipsOutput - The return type for the getPersonalizedFinancialTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFinancialTipsInputSchema = z.object({
  spendingData: z
    .string()
    .describe(
      'A string containing the user spending data, including categories, amounts, and dates.'
    ),
});
export type PersonalizedFinancialTipsInput = z.infer<
  typeof PersonalizedFinancialTipsInputSchema
>;

const PersonalizedFinancialTipsOutputSchema = z.object({
  tips: z
    .string()
    .describe(
      'A string containing personalized financial tips based on the user spending data.'
    ),
});
export type PersonalizedFinancialTipsOutput = z.infer<
  typeof PersonalizedFinancialTipsOutputSchema
>;

export async function getPersonalizedFinancialTips(
  input: PersonalizedFinancialTipsInput
): Promise<PersonalizedFinancialTipsOutput> {
  return personalizedFinancialTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFinancialTipsPrompt',
  input: {schema: PersonalizedFinancialTipsInputSchema},
  output: {schema: PersonalizedFinancialTipsOutputSchema},
  prompt: `You are a personal finance expert. Analyze the following spending data and provide personalized financial tips to help the user identify potential savings and improve their financial well-being.\n\nSpending Data: {{{spendingData}}}`,
});

const personalizedFinancialTipsFlow = ai.defineFlow(
  {
    name: 'personalizedFinancialTipsFlow',
    inputSchema: PersonalizedFinancialTipsInputSchema,
    outputSchema: PersonalizedFinancialTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
