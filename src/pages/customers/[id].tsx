import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";

//DUMMY DATA
const DUMMY_CUSTOMER = {
  id: 1,
  name: "xinyi",
  email: "xinyi@gmail",
  money: 22,
};

type Transaction = {
  id: number;
  date: string;
  amount: number;
  details: string;
};

//missing api call to get data, DUMMY DATA for now
const DUMMY_TRANSACTIONS: Transaction[] = [
  {
    id: 1,
    date: "01-03-24",
    amount: 110,
    details: "NIL",
  },
  {
    id: 2,
    date: "01-07-23",
    amount: 250,
    details: "details",
  },
];
const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "details",
    header: "Details",
  },
];

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  //fetch customer details from api using id via useEffect

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <b>{DUMMY_CUSTOMER.name}</b>
      <p>{DUMMY_CUSTOMER.email}</p>
      <p>{DUMMY_CUSTOMER.money}</p>

      <div>
        <b>Transaction History</b>
        <DataTable columns={columns} data={DUMMY_TRANSACTIONS}></DataTable>
      </div>
    </div>
  );
};

export default CustomerDetails;
