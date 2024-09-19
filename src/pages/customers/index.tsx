import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Customer } from "@/models/CustomerModel";

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "exp",
    header: "EXP",
  },
];

export default function Index() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<Customer[]>([]);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data } = await axiosClient.get(`/customer`);
        setCustomerData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomerData();
  }, []);
  const onRowClick = (id: string) => {
    router.push(`/customers/${id}`);
  };
  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Customer Accounts Overview
      </span>
      <DataTable
        columns={columns}
        data={customerData}
        onRowClick={onRowClick}
      />
    </div>
  );
}
