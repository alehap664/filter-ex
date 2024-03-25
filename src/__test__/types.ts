export interface Student {
  student_id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  major: string;
  gpa: number;
  enrollment_date: string;
  graduation_date: string;
  advisor: string;
  awards: Award[];
  sports: string[];
}

export interface Award {
  count: number;
  name: string;
  year: number;
}
