export interface TodoItem {
  done?: boolean;
  text: string;
  createdAt?: number;
  updatedAt?: number;
  isEditing?: boolean;
}
