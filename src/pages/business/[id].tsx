import { DataTable } from "@/components/DataTable";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import { Business } from "@/models/BusinessModel";
import { Transaction, transactionColumns } from "@/models/TransactionModel";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

const BusinessDetails = () => {
  const router = useRouter();
  const [businessDetails, setBusinessDetails] = useState<Business>();
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [remarks, setRemarks] = useState<string>("Payment failed.");
  const [isBanned, setIsBanned] = useState<boolean>(false);
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

  const onAddRemarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.target.value);
  };

  const onBanBusiness = async () => {
    setIsBanned(true);
  };
  const onUnbanBusiness = async () => {
    setIsBanned(false);
  };

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
      {!isBanned ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-700 hover:bg-red-700 w-fit">
              Ban Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Proceed to ban account?</AlertDialogTitle>
              <AlertDialogDescription>
                Please provide remarks/reasons for the business.
              </AlertDialogDescription>
              <Input onChange={onAddRemarks}></Input>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onBanBusiness}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-green-700 hover:bg-green-700 w-fit">
              Unban Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Proceed to unban account?</AlertDialogTitle>
              <AlertDialogDescription>
                Please confirm previously reported issue has been resolved:
              </AlertDialogDescription>
              <AlertDialogDescription>{remarks}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onUnbanBusiness}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
      <div className="flex flex-col gap-4">
        <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white text-xl">
          All Transactions
        </span>
        <DataTable columns={transactionColumns} data={transactionsData} />
      </div>
    </div>
  );
};

export default BusinessDetails;
