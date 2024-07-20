import { ChevronDownIcon } from "@/components/icons";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";

type Billing = {
  id: number;
  BillItem: {
    id: number;
    batchId: string;
    name: string;
    type: string;
    price: number;
    quantity: number;
    expiry: string;
    amount: number;
    billId: number;
  }[];
};

const Bill = ({ bill, date }: { bill: Billing; date: string }) => {
  return (
    <div className="justify-between py-1 snap-start">
      <Card
        isBlurred
        isHoverable
        isPressable
        className="w-full border-1.5 border-slate-200  dark:border-zinc-800/75  shadow-md transition-transform duration-300 hover:scale-105"
      >
        <Link className="w-full" href={`/billing/${date}/${bill.id}`}>
          <CardBody className="text-center group overflow-x-hidden">
            <div className="flex flex-row justify-between">
              <div className="text-gray-700 dark:text-gray-300">
                Id: {bill.id.toString().slice(0, 4)}
              </div>
              <div className="ml-20 group-hover:ml-0 flex flex-row justify-between items-center font-light text-gray-600 dark:text-gray-400  translate-x-5 group-hover:translate-x-0 transition-all">
                ₹{" "}
                <span className="font-bold text-lg">
                  {bill.BillItem.reduce((acc, item) => acc + item.amount, 0)}
                </span>
                <div className="text-gray-700 dark:text-gray-300 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform ">
                  <ChevronDownIcon />
                </div>
              </div>
            </div>
          </CardBody>
        </Link>
      </Card>
    </div>
  );
};

export default Bill;
