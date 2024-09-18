import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import axiosClient from "@/network/axiosClient";
import { useEffect, useState } from "react";
import { Registration } from "@/models/RequestModel";

const columns: ColumnDef<Registration>[] = [
  {
    accessorKey: "entityName",
    header: "Name",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
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
