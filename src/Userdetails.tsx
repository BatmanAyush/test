import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

function Userdetails(name,role) {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-800">
      <Card className="border-gray-700 p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full bg-teal-600 flex items-center justify-center mb-4">
          <User className="h-12 w-12 text-white" />
        </div>
        <CardContent className="p-0">
          <h2 className="text-2xl font-bold text-gray-400 mb-2">{name}</h2>
          <p className="text-lg text-gray-400">{role}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Userdetails;
