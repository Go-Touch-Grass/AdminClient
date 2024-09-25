import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import axiosClient from "@/network/axiosClient";
import { useEffect, useState } from "react";
import { Registration } from "@/models/RequestModel";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<Registration>[] = [
  {
    accessorKey: "entityName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export default function Index() {
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const { data } = await axiosClient.get(`/registration`);
        setRegistrationData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRegistrationData();
  }, []);
  const onRowClick = (id: string) => {
    router.push(`/registrations/${id}`);
  };
  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Registration Overview
      </span>
      <DataTable
        columns={columns}
        data={registrationData}
        onRowClick={onRowClick}
      />
    </div>
  );
}
