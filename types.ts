export interface StandardField {
  key: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;
  description: string;
}

export interface ColumnMapping {
  sourceHeader: string;
  targetFieldKey: string | null;
  confidence: number; // 0 to 1
  isConfirmed: boolean;
}

export interface UploadedFileState {
  fileName: string;
  rawHeaders: string[];
  rawRows: string[][]; // Simple string matrix for preview
  fileSize: string;
}

export enum AppStep {
  UPLOAD = 'UPLOAD',
  MAPPING = 'MAPPING',
  REVIEW = 'REVIEW',
  SUCCESS = 'SUCCESS',
  DASHBOARD = 'DASHBOARD',
}

export interface MappingSuggestionResponse {
  mappings: {
    source: string;
    target: string;
    reasoning: string;
  }[];
}
