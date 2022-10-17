export interface Task {
  id: number,
  title: string;
  description: string;
  assigned_to: Assigned_to;
  category: string;
  priority: string;
  upcoming_deadline: number;
  todo: boolean;
  in_progress: boolean;
  awaiting_feedback: boolean;
  done: boolean;
  history: boolean;
}

export interface Assigned_to {
  username: string,
  first_name: string,
  last_name: string
}
