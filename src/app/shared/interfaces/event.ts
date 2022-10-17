export interface Event {
  title: string;
  color: string;
  from_user: From_user;
  start_date: number;
  end_date: number;
}

export interface From_user {
  username: string,
  first_name: string,
  last_name: string
}
