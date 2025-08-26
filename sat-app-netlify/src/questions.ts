// src/questions.ts
export type Label = 'A' | 'B' | 'C' | 'D';

export interface Option { label: Label; text: string; }
export interface VocabItem { word: string; translation: string; synonyms: string; }
export interface Question {
  passage: string;
  graphic?: string;
  question: string;
  options: Option[];
  correct_answer: Label;
  explanation: string;
  vocabulary?: VocabItem[];
  question_type: string;
}
export type QuestionsArray = Question[];
