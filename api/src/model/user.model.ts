import { JWTPayload } from "jose";

export interface Employee {
  EMPLOYEE_ID: number;
  USERNAME: string;
  ROLE: boolean;
  POSITION: string;
  DEPARTMENT: string;
}

