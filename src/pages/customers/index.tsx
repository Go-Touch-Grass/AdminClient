import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
//dummy data, will change when customer entity/attributes are confirmed
type Customer = {
  id: number;
  name: string;
  email: string;
  money: number;
};

//missing api call to get data, DUMMY DATA for now
const DUMMY_DATA: Customer[] = [
  {
    id: 1,
    name: "xinyi",
    email: "xinyi@gmail",
    money: 22,
  },
  {
    id: 1,
    name: "kenneth",
    email: "kenneth@gmail",
    money: 33,
  },
  {
    id: 1,
    name: "zed",
    email: "zed@gmail",
    money: 44,
  },
  {
    id: 1,
    name: "jinyuen",
    email: "jinyuen@gmail",
    money: 55,
  },
  {
    id: 1,
    name: "tony",
    email: "tony@gmail",
    money: 66,
  },
  {
    id: 1,
    name: "adriel",
    email: "adriel@gmail",
    money: 77,
  },
];
const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "money",
    header: "Money",
  },
];

export default function Index() {
  const router = useRouter();
  const onRowClick = (id: string) => {
    router.push(`/customers/${id}`);
  };
  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Customer Accounts Overview
      </span>
      <DataTable columns={columns} data={DUMMY_DATA} onRowClick={onRowClick} />
    </div>
  );
}
