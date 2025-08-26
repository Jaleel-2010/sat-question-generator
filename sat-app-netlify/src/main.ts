// src/main.ts
import { generateQuestionsProxy } from './api';

document.addEventListener('DOMContentLoaded', async () => {
  const btn = document.createElement('button');
  btn.textContent = 'Generate';
  btn.onclick = async () => {
    try {
      const qs = await generateQuestionsProxy({prompt: "test"});
      console.log("Questions:", qs);
    } catch (e) {
      console.error(e);
    }
  };
  document.body.appendChild(btn);
});
