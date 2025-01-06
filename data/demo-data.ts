export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  {
    id: "f9e1d42",
    amount: 125,
    status: "success",
    email: "doe@exmapl.com",
  },
  {
    id: "32134sd",
    amount: 125,
    status: "failed",
    email: "averyadav@dexter.com",
  },
  {
    id: "f9e3222",
    amount: 125,
    status: "success",
    email: "nda@adfasd.com",
  },
];
