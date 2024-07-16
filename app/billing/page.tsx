"use client";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { useEffect } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { redirect } from "next/navigation";
import { Button } from "@nextui-org/button";

import largeDataset from "./fakeData";
import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";

const fetchBills = async () => {
  return;
};

export default function Page() {
  const data = largeDataset;

  const handleBillClick = (date: string, billId: number) => {
    console.log(`clicked on bill with${date} and ${billId}`);
    redirect(`/billing/${date}/${billId}`);
  };

  useEffect(() => {
    // fetchBills();
  }, []);

  return (
    <>
      {/* <Breadcrumbs variant="solid">
        <BreadcrumbItem>Billing</BreadcrumbItem>
        <BreadcrumbItem>Date</BreadcrumbItem>
      </Breadcrumbs>
      <br /> */}

      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
        Billing
      </h1>
      <Divider />

      <div className="gap-3 grid grid-cols-2 sm:grid-cols-4 py-4">
        {data.map((dayBilling, index) => (
          <Card key={index} className="items-center" shadow="lg">
            <CardHeader className="justify-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {new Date(dayBilling.date).toDateString()}
              </h1>
            </CardHeader>
            <Divider />
            <CardBody className="text-center py-4 h-52 overflow-scroll">
              {dayBilling.bills.map((bill, index) => (
                <div key={index} className="justify-between py-1 snap-start">
                  <Card
                    isBlurred
                    isHoverable
                    isPressable
                    className="w-full"
                    shadow="md"
                  >
                    <Link
                      className="w-full"
                      href={`/billing/${dayBilling.date}/${bill.billId}`}
                    >
                      <CardBody
                        className="text-center relative group"
                        // onClick={() => {
                        //   console.log(
                        //     `clicked on bill with${dayBilling.date} and ${bill.billId}`
                        //   );
                        //   handleBillClick(dayBilling.date, bill.billId);
                        // }}
                      >
                        <div className="flex flex-row justify-between">
                          <div className="text-gray-700 dark:text-gray-300">
                            BillId: {bill.billId.toString().slice(0, 4)}
                          </div>
                          <div className="flex flex-row justify-between items-center font-light text-gray-600 dark:text-gray-400">
                            ₹{" "}
                            <span className="font-bold text-lg">
                              {bill.items.reduce(
                                (acc, item) => acc + item.amount,
                                0
                              )}
                            </span>
                            <div className="text-gray-700  dark:text-gray-300 -rotate-90  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ChevronDownIcon />
                            </div>
                          </div>
                        </div>

                        {/* <div className="relative group">
                          <div className="p-4 bg-blue-500 text-white">
                            Hover over me
                          </div>

                          <div className="absolute left-0 top-0 mt-10 p-4 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            I am visible on hover
                          </div>
                        </div> */}
                      </CardBody>
                    </Link>
                  </Card>
                </div>
              ))}
            </CardBody>
            <Divider />

            <CardFooter className="justify-between">
              <p className="text-lg font-bold text-gray-500 dark:text-gray-400">
                Amount:-
              </p>
              <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
                {"₹ "}
                {dayBilling.bills.reduce(
                  (acc, bill) =>
                    acc +
                    bill.items.reduce((acc, item) => acc + item.amount, 0),
                  0
                )}
              </p>
            </CardFooter>
          </Card>
        ))}
        <br />
      </div>
    </>
  );
}
