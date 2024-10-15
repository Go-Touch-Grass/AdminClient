import { useRouter } from "next/router";
import { ItemRequest } from "@/models/ItemRequestModel";
import { useEffect, useState } from "react";
import axiosClient from "@/network/axiosClient";
import AvatarRenderer from "@/components/AvatarRenderer";
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
import { ItemType, Item } from "@/models/ItemRequestModel";

const RequestsDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [remarks, setRemarks] = useState<string>("");
  const [itemDetails, setItemDetails] = useState<ItemRequest>();
  const [avatarCustomization, setAvatarCustomization] = useState<{
    [ItemType.BASE]: Item | null;
    [ItemType.HAT]: Item | null;
    [ItemType.SHIRT]: Item | null;
    [ItemType.BOTTOM]: Item | null;
  }>({
    [ItemType.BASE]: null,
    [ItemType.HAT]: null,
    [ItemType.SHIRT]: null,
    [ItemType.BOTTOM]: null,
  });

  const fetchBase = async () => {
    try {
        const {data} = await axiosClient.get("/api/items", {baseURL: "http://localhost:8080"})
        //Set default base item
        const baseItem = data.find((item: ItemRequest) => item.type === ItemType.BASE && item.id === 1);
        if (baseItem) {
            setAvatarCustomization(prev => ({
                ...prev,
                [ItemType.BASE]: baseItem
            }));
        }
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};

const fetchItemDetails = async () => {
  if (!id) return null;
  try {
    const { data } = await axiosClient.get(`/item_requests/${id}`);
    setItemDetails(data);
    setAvatarCustomization(prev => ({
      ...prev,
      [data.type]: data
  }))
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchBase()
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

      {/* <p>Preview: </p>
      {itemDetails && <Image
                            src={itemDetails.filepath}
                            alt={itemDetails.name}
                            width={200}
                            height={200}
                            className="rounded border"
                        />} */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center space-y-6 md:space-y-0 md:space-x-8">
        <div className="relative w-[170px] h-[170px]">
          <AvatarRenderer
            customization={avatarCustomization}
            width={170}
            height={170}
          />
        </div>
      </div>
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
