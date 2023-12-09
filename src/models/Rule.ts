export interface Rule {
  required?: boolean;
  pattern?: string;
  minValue?: number;
  maxValue?: number;
  minLength?: number;
  maxLength?: number;
}