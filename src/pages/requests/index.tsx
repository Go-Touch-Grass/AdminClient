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
    accessorKey: "business_id",
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
];

export default function Index() {
  const router = useRouter();
  const [requestData, setRequestData] = useState<Registration[]>([]);

  //fetching all avatar/collectables requests
  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const { data } = await axiosClient.get(`/avatarRequests`);
        setRequestData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRegistrationData();
  }, []);
  const onRequestRowClick = (id: string) => {
    router.push(`/requests/${id}`);
  };

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white text-2xl">
        All Pending Requests (Avatar & Collectables)
      </span>
      <DataTable
        columns={columns}
        data={requestData}
        onRowClick={onRequestRowClick}
      />
    </div>
  );
}
