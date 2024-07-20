"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import { Button } from "@nextui-org/button";

import { DeleteIcon } from "@/svg/edit";
import Bill from "./_components/Bill";

type dayBilling = {
  id: number;
  date: string;
  Billing: {
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
  }[];
};

export default function Page() {
  const [dailyBills, setDailyBills] = useState<dayBilling[]>([]);
  const [isLoaded, setIsloaded] = useState(true);

  const fetchDayBills = async () => {
    setIsloaded(false);
    const responce = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/billing/`
    );

    const data = await responce.json();
    const fetchedDailyBills = data.data;

    console.log(dailyBills);
    console.log(fetchedDailyBills);
    setDailyBills(fetchedDailyBills);

    setIsloaded(true);
  };

  useEffect(() => {
    fetchDayBills();
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Billing
        </h1>
        <Link href="/billing/new-bill">
          <Button color="primary">New Bill</Button>
        </Link>
      </div>
      {/* <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Billings</BreadcrumbItem>
      </Breadcrumbs> */}
      <Divider className="animate-pulse" />

      {dailyBills.length == 0 ? (
        <div>
          <br />
          <Card className="py-24 bg-slate-50 dark:bg-zinc-900 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              No Bills Found
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              There are currently no bills available.
            </p>
          </Card>
        </div>
      ) : (
        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 py-4 ">
          {dailyBills.map((dayBilling, index) => (
            <Card
              key={index}
              className="h-80 items-center border-1.5 border-slate-300/90  dark:border-zinc-800 shadow-lg transform transition-transform duration-300 hover:scale-105"
            >
              <CardHeader className="flex flex-row justify-between bg-slate-100 dark:bg-zinc-900 z-10 shadow-sm">
                {/* <CardHeader className="justify-center"> */}
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {new Date(dayBilling.date).toDateString()}
                </h1>
                <button
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={async () => {
                    await fetch(`/api/billing/${dayBilling.id}`, {
                      method: "DELETE",
                    });
                    fetchDayBills();
                  }}
                >
                  <DeleteIcon />
                </button>
              </CardHeader>
              <Divider />
              <CardBody
                className="bg-slate-50 dark:bg-zinc-900 text-center py-4 h-52 overflow-scroll overflow-x-hidden "
                style={{
                  scrollbarWidth: "thin",
                  // scrollbarColor: "transparent transparent",
                }}
              >
                {dayBilling.Billing.map((bill, index) => (
                  <Bill key={index} bill={bill} date={dayBilling.date} />
                  // <h1 key={index}>hi</h1>
                  // <div key={index} className="justify-between py-1 snap-start">
                  //   <Card
                  //     isBlurred
                  //     isHoverable
                  //     isPressable
                  //     className="w-full border-1.5 border-slate-200  dark:border-zinc-800/75  shadow-md transition-transform duration-300 hover:scale-105"
                  //   >
                  //     <Link
                  //       className="w-full"
                  //       href={`/billing/${dayBilling.date}/${bill.id}`}
                  //     >
                  //       <CardBody className="text-center group overflow-x-hidden">
                  //         <div className="flex flex-row justify-between">
                  //           <div className="text-gray-700 dark:text-gray-300">
                  //             Id: {bill.id.toString().slice(0, 4)}
                  //           </div>
                  //           <div className="ml-20 group-hover:ml-0 flex flex-row justify-between items-center font-light text-gray-600 dark:text-gray-400  translate-x-5 group-hover:translate-x-0 transition-all">
                  //             ₹{" "}
                  //             <span className="font-bold text-lg">
                  //               {bill.BillItem.reduce(
                  //                 (acc, item) => acc + item.amount,
                  //                 0
                  //               )}
                  //             </span>
                  //             <div className="text-gray-700 dark:text-gray-300 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform ">
                  //               <ChevronDownIcon />
                  //             </div>
                  //           </div>
                  //         </div>
                  //       </CardBody>
                  //     </Link>
                  //   </Card>
                  // </div>
                ))}
              </CardBody>
              <Divider />
              <CardFooter className="justify-between bg-slate-100 dark:bg-zinc-900">
                <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                  Amount:-
                </p>
                <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {"₹ "}
                  {dayBilling.Billing.reduce(
                    (acc, bill) =>
                      acc +
                      bill.BillItem.reduce((acc, item) => acc + item.amount, 0),
                    0
                  )}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      <br />
    </>
  );
}
