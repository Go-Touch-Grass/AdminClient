import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import axiosClient from "@/network/axiosClient";
import { useEffect, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemRequest } from "@/models/ItemRequestModel";

const columns: ColumnDef<ItemRequest>[] = [
  {
    accessorKey: "name",
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
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
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
  const [requests, setRequests] = useState<ItemRequest[]>([]);

  //fetching all business item requests
  useEffect(() => {
    const fetchRequestsData = async () => {
      try {
        const { data } = await axiosClient.get(`/item_requests`);
        setRequests(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRequestsData();
  }, []);
  const onRequestRowClick = (id: string) => {
    router.push(`/requests/${id}`);
  };

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white text-2xl">
        All Pending Business Item Request
      </span>

      <DataTable
        columns={columns}
        data={requests}
        onRowClick={onRequestRowClick}
      />
    </div>
  );
}
