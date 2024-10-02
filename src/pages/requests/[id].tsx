import { useRouter } from "next/router";
import { Registration } from "@/models/RequestModel";
import { useEffect, useState, useRef } from "react";
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
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

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
        const { data } = await axiosClient.get(`/avatarRequests/1`);
        setRegistrationDetails(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRegistrationDetails();
  }, [id]);

  //for rendering of 3d models
  const containerRef = useRef<HTMLDivElement>(null);
  const loader = new GLTFLoader();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      loader.load(
        "../../../public/burger/glb",
        function (gltf) {
          scene.add(gltf.scene);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );

      // const geometry = new THREE.BoxGeometry();
      // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // const cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);

      // Render the scene and camera
      renderer.render(scene, camera);

      // const renderScene = () => {
      //   cube.rotation.x += 0.01;
      //   cube.rotation.y += 0.01;
      //   renderer.render(scene, camera);
      //   requestAnimationFrame(renderScene);
      // };

      // Call the renderScene function to start the animation loop
      // renderScene();

      const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const onApproveRegistration = async () => {
    // const responseBody = {
    //   status: "approved",
    //   remarks: "",
    // };
    // try {
    //   await axiosClient.put(`/avatarRequests/${id}`, responseBody);
    //   router.push("/requests");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onRejectRegistration = async () => {
    // const responseBody = {
    //   status: "rejected",
    //   remarks: remarks,
    // };
    // try {
    //   await axiosClient.put(`/registration/${id}`, responseBody);
    //   router.push("/requests");
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const onAddRemarks = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(e.target.value);
  };

  return (
    <div className="main-content-with-navbar flex flex-col p-10 gap-10">
      <span className="bg-blue-500 py-2 px-4 font-bold rounded-lg tracking-widest text-white">
        Request Details
      </span>

      <div ref={containerRef}></div>

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
