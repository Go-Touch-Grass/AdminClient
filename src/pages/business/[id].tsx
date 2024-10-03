import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Business } from "@/models/BusinessModel";
import { Transaction } from "@/models/TransactionModel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowUpDown } from "lucide-react";

const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transaction_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const dateValue = getValue() as string;
      return dateValue.substring(0, 10); // Display only the first 5 characters
    },
  },

  {
    accessorKey: "currency_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Currency Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gems_added",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gems Added
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "gems_deducted",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gems Deducted
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const value = getValue();
      if (value == null) {
        return 0;
      }
      return value;
    },
  },
];

const BusinessDetails = () => {
  const router = useRouter();
  const [businessDetails, setBusinessDetails] = useState<Business>();
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const { id } = router.query;

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/business/${id}`);
        setBusinessDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusinessDetails();
  }, [id]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/business/${id}/transactions`);
        setTransactionsData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [id]);

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-5">
      <div className="flex flex-row w-full gap-2">
        <Button
          onClick={() => router.back()}
          className="bg-blue-500 py-2 px-4 rounded-lg tracking-widest"
        >
          <ArrowLeft />
        </Button>
        <div className="w-full bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white text-2xl">
          Account Details
        </div>
      </div>
      <p>First Name: {businessDetails?.firstName}</p>
      <p>Last Name: {businessDetails?.lastName}</p>
      <p>Username: {businessDetails?.username}</p>
      <p>Email: {businessDetails?.email}</p>
      <div className="flex flex-col gap-4">
        <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white text-xl">
          All Transactions
        </span>
        <DataTable columns={columns} data={transactionsData} />
      </div>
    </div>
  );
};

export default BusinessDetails;
