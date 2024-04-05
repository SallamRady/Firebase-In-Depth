"use client";
import { Box, Menu, MenuItem, MenuList } from "@mui/material";
import { useEffect, useState } from "react";

export default function Test101() {
  // TODO::declare our state vars..
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch("https://reqres.in/api/users?page=1")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Data", data?.data);
        setDataList(data?.data);
      })
      .catch((err) => {
        console.log("Error in Fetch::", err);
      });
  }, []);

  let SingleRow = ({ idx, fname, lname }) => (
    <li>{`${idx} ${fname} ${lname}`}</li>
  );

  // * return out ui.
  return (
    <Box>
      <ol>
        {dataList.length > 0 &&
          dataList.map((ele, idx) => (
            <SingleRow
              key={ele.id}
              idx={idx + 1}
              fname={ele.first_name}
              lname={ele.last_name}
            />
          ))}
      </ol>
    </Box>
  );
}
