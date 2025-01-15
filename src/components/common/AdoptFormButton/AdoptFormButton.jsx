import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdoptFormButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Adopt Me</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">Brized Coco</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* pet id */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label className="font-medium">Pet ID:</Label>
            <p className="col-span-3">993453454</p>
          </div>
          {/* pet name */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label className="font-medium">Pet Name:</Label>
            <p className="col-span-3">Brized coco</p>
          </div>
          {/* pet image */}
          <div className="grid grid-cols-4 gap-4 items-center">
            <Label className="font-medium">Pet Image:</Label>
            <p className="col-span-3">http://sdfisdflkj</p>
          </div>
          {/* user name */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">User Name</Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              disabled
            />
          </div>
          {/* user email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">User Email</Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
              disabled
            />
          </div>
          {/* user phone number */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Phone Number</Label>
            <Input
              type="number"
              id="phoneNumber"
              defaultValue="01817"
              className="col-span-3"
            />
          </div>
          {/* address */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Address</Label>
            <Input
              type="text"
              id="address"
              defaultValue="Dhaka"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant={`cardBtn`} type="submit">Adopt</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdoptFormButton;
