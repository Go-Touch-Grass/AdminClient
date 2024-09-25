import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Business } from "@/models/BusinessModel";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<Business>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export default function Index() {
  const [businessData, setBusinessData] = useState<Business[]>([]);
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const { data } = await axiosClient.get(`/business`);
        setBusinessData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusinessData();
  }, []);
  const router = useRouter();
  const onRowClick = (id: string) => {
    router.push(`/business/${id}`);
  };
  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Business Accounts Overview
      </span>

      <DataTable
        columns={columns}
        data={businessData}
        onRowClick={onRowClick}
      />
    </div>
  );
}
