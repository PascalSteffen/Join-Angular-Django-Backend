export interface Ticket {
  id: number;
  title: string;
  date: number;
  from_user: From_user;
  assigned_to: Assigned_to;
  ticket_message: string;
}

export interface From_user {
  username: string,
  first_name: string,
  last_name: string
}

export interface Assigned_to {
  username: string,
  first_name: string,
  last_name: string
}
