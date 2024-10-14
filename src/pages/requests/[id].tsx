import { useRouter } from "next/router";
import { ItemRequest } from "@/models/ItemRequestModel";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft } from "lucide-react";

const RequestsDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [remarks, setRemarks] = useState<string>("");
  const [itemDetails, setItemDetails] =
    useState<ItemRequest>();

  useEffect(() => {
    const fetchItemDetails = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/item_requests/${id}`);
        setItemDetails(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItemDetails();
  }, [id]);

  const onApproveRequest = async () => {
    const responseBody = {
      status: "approved",
      remarks: "",
    };
    try {
      await axiosClient.put(`/item_requests/${id}`, responseBody);
      router.push("/requests");
    } catch (error) {
      console.log(error);
    }
  };

  const onRejectRequest = async () => {
    const responseBody = {
      status: "rejected",
      remarks: remarks,
    };
    try {
      await axiosClient.put(`/item_requests/${id}`, responseBody);
      router.push("/requests");
    } catch (error) {
      console.log(error);
    }
  };

  const onAddRemarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.target.value);
  };

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
          Item Request Details
        </div>
      </div>
    
      <p>Name: {itemDetails?.name}</p>
      <p>Type: {itemDetails?.type}</p>

      <p>Preview: </p>
      {itemDetails && <Image
                            src={itemDetails.filepath}
                            alt={itemDetails.name}
                            width={200}
                            height={200}
                            className="rounded border"
                        />}
      <p>
        Remarks:
        {itemDetails?.remarks ? itemDetails?.remarks : "-"}
      </p>
      <p>Status: {itemDetails?.status}</p>
      <div className="flex flex-row gap-5">
        <Button
          onClick={onApproveRequest}
          className="bg-green-700 hover:bg-green-700"
        >
          Approve
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="bg-red-700 hover:bg-red-700">Reject</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Proceed to reject registration?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Please provide remarks/reasons for the business.
              </AlertDialogDescription>
              <Input onChange={onAddRemarks}></Input>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onRejectRequest}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default RequestsDetails;
