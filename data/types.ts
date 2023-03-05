export interface Tool {
  name: string;
  title?: string;
  desc?: string;
  icon?: string;
  keywords?: string[];
  promptTemplate: string;
  placeholder?: string;
}
