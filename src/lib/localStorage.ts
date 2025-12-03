import type { QuestionnaireData } from '@/types';

const STORAGE_KEY = 'nird_questionnaire_data';
const STORAGE_TIMESTAMP_KEY = 'nird_questionnaire_timestamp';

export const saveQuestionnaireData = (data: Partial<QuestionnaireData>): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_TIMESTAMP_KEY, Date.now().toString());
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadQuestionnaireData = (): Partial<QuestionnaireData> | null => {
  if (typeof window === 'undefined') return null;

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;

    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

export const getDataTimestamp = (): number | null => {
  if (typeof window === 'undefined') return null;

  try {
    const timestamp = localStorage.getItem(STORAGE_TIMESTAMP_KEY);
    return timestamp ? parseInt(timestamp) : null;
  } catch (error) {
    console.error('Error loading timestamp:', error);
    return null;
  }
};

export const clearQuestionnaireData = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TIMESTAMP_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const hasStoredData = (): boolean => {
  if (typeof window === 'undefined') return false;

  return localStorage.getItem(STORAGE_KEY) !== null;
};
