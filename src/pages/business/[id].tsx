import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Business } from "@/models/BusinessModel";

const BusinessDetails = () => {
  const router = useRouter();
  const [businessDetails, setBusinessDetails] = useState<Business>();
  const [transactionsData, setTransactionsData] = useState([]);
  const { id } = router.query;

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/business/${id}`);
        setBusinessDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBusinessDetails();
  }, [id]);

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-5">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Account Details
      </span>
      <p>First Name: {businessDetails?.firstName}</p>
      <p>Last Name: {businessDetails?.lastName}</p>
      <p>Username: {businessDetails?.username}</p>
      <p>Email: {businessDetails?.email}</p>
    </div>
  );
};

export default BusinessDetails;
