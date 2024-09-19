import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Customer } from "@/models/CustomerModel";

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customerDetails, setCustomerDetails] = useState<Customer>();
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/customer/${id}`);
        setCustomerDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCustomerDetails();
  }, [id]);

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Account Details
      </span>
      <p>Name: {customerDetails?.fullName}</p>
      <p>Email: {customerDetails?.email}</p>
      <p>Username: {customerDetails?.username}</p>
      <p>EXP: {customerDetails?.exp}</p>

      {/* <div>
        <b>Transaction History</b>
        <DataTable columns={columns} data={DUMMY_TRANSACTIONS}></DataTable>
      </div> */}
    </div>
  );
};

export default CustomerDetails;
