import React from "react";
import { IconType } from "react-icons/lib";

interface MiniCardProps {
  icon: React.ReactNode;
  label: string;
  data: number | string;
}

function MiniCard({ icon, label, data }: MiniCardProps) {
  return (
    <div className="bg-primary/10 flex items-center justify-start gap-3 rounded-md p-4">
      <div className="bg-primary/20 rounded- full flex h-12 w-12 items-center justify-center rounded-full p-3">
        {icon}
      </div>
      <div>
        <p className="font-bold">{data}</p>
        <p className="text-xs">{label}</p>
      </div>
    </div>
  );
}

export default MiniCard;
