import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Customer } from "@/models/CustomerModel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Transaction } from "@/models/TransactionModel";

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [customerDetails, setCustomerDetails] = useState<Customer>();
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
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

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/customer/${id}/transactions`);
        // setTransactionsData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransactions();
  }, [id]);

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
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
      <p>Name: {customerDetails?.fullName}</p>
      <p>Email: {customerDetails?.email}</p>
      <p>Username: {customerDetails?.username}</p>
      <p>EXP: {customerDetails?.exp}</p>

      <div className="flex flex-col gap-4">
        <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white text-xl">
          All Transactions
        </span>
        <DataTable columns={[]} data={[]} />
      </div>
    </div>
  );
};

export default CustomerDetails;
