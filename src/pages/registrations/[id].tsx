import { useRouter } from "next/router";
import { Registration } from "@/models/RequestModel";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
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

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [remarks, setRemarks] = useState<string>("");
  const [registrationDetails, setRegistrationDetails] =
    useState<Registration>();

  useEffect(() => {
    const fetchRegistrationDetails = async () => {
      if (!id) return null;
      try {
        const { data } = await axiosClient.get(`/registration/${id}`);
        setRegistrationDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRegistrationDetails();
  }, [id]);

  const onApproveRegistration = async () => {
    const responseBody = {
      status: "approved",
      remarks: "",
    };
    try {
      await axiosClient.put(`/registration/${id}`, responseBody);
      router.push("/registrations");
    } catch (error) {
      console.log(error);
    }
  };

  const onRejectRegistration = async () => {
    const responseBody = {
      status: "rejected",
      remarks: remarks,
    };
    try {
      await axiosClient.put(`/registration/${id}`, responseBody);
      router.push("/registrations");
    } catch (error) {
      console.log(error);
    }
  };

  const onAddRemarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.target.value);
  };

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Registration Details
      </span>
      <p>Name: {registrationDetails?.entityName}</p>
      <p>Category: {registrationDetails?.category}</p>
      <p>Location: {registrationDetails?.location}</p>
      <p>
        Remarks:
        {registrationDetails?.remarks ? registrationDetails?.remarks : "-"}
      </p>
      <p>Status: {registrationDetails?.status}</p>
      <div className="flex flex-row gap-5">
        <Button
          onClick={onApproveRegistration}
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
              <AlertDialogAction onClick={onRejectRegistration}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default CustomerDetails;
