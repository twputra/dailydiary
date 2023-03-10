import { Flex, Heading, Input, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DiaryCard from "../components/DiaryCard";
import ModalDiary from "../components/CreateDiary";

export default function Test() {
  const [diaryData, setDiaryData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const token = localStorage.getItem("token");
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    setPageNumber(1);
  };

  const handleClose = () => {
    setOpened(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary?page=${pageNumber}&search=${search}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        setDiaryData(json.data);
        if (json.meta) {
          setTotalPages(json.meta.last_page);
        }
      } else {
        console.log("error fetching diary data");
      }
    };

    fetchData();
  }, [pageNumber, search, token]);

  const handlePrevPage = () => {
    setPageNumber((prev) => prev - 1);
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  return (
    <>
      <Flex
        flexDir="column"
        maxW={800}
        align="center"
        mx="auto"
        px={5}
        mt={24}
        mb={5}
      >
        <Heading
          fontFamily="'Work Sans', sans-serif"
          id="dateText"
          fontWeight="400"
          fontSize={"4xl"}
        >
          {moment().format("MMMM D, YYYY")}
        </Heading>
      </Flex>

      <Flex flexDir="column" align="center" px={5} mb="52px">
        <ModalDiary isOpen={opened} onClose={handleClose} />
      </Flex>

      <Flex
        flexDir="column"
        maxW={800}
        align="center"
        mx="auto"
        mt="auto"
        px={5}
        mb="250px"
      >
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Text mt={3}>
          Showing {diaryData.length} of {totalPages * 10} diary entries.
        </Text>
        {diaryData.map((diary) => (
          <DiaryCard
            diary={diary.title}
            diaryContext={diary.content}
            title={diary.title}
            timestamp={moment(diary.created_at).format("MMMM D, YYYY")}
            key={diary.id}
            id={diary.id}
          />
        ))}
        {totalPages > 1 && (
          <Flex mt={5} alignItems="center">
            <Button disabled={pageNumber === 1} onClick={handlePrevPage} mr={3}>
              Prev
            </Button>
            <Text>
              Page {pageNumber} of {totalPages}
            </Text>
            <Button
              disabled={pageNumber === totalPages}
              onClick={handleNextPage}
              ml={3}
            >
              Next
            </Button>
          </Flex>
        )}
      </Flex>
    </>
  );
}



// import { Flex, Heading, Input, Text, Button } from "@chakra-ui/react";
// import moment from "moment";
// import React, { useEffect, useState } from "react";
// import DiaryCard from "../components/DiaryCard";
// import ModalDiary from "../components/CreateDiary";
// import ReactPaginate from "react-paginate";

// export default function Test() {
//   const [diaryData, setDiaryData] = useState([]);
//   const [pageNumber, setPageNumber] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);
//   const token = localStorage.getItem("token");
//   const [opened, setOpened] = useState(false);
//   const [search, setSearch] = useState("");

//   const handleSearch = () => {
//     setPageNumber(0);
//   };

//   const handleClose = () => {
//     setOpened(false);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary?page=${
//           pageNumber + 1
//         }&search=${search}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       const json = await response.json();

//       if (response.ok) {
//         setDiaryData(json.data);
//         if (json.meta) {
//           setTotalPages(json.meta.last_page);
//         }
//       } else {
//         console.log("error fetching diary data");
//       }
//     };

//     fetchData();
//   }, [pageNumber, search, token]);

//   const handlePageClick = (selectedPage) => {
//     setPageNumber(selectedPage.selected);
//   };

//   return (
//     <>
//       <Flex
//         flexDir="column"
//         maxW={800}
//         align="center"
//         mx="auto"
//         px={5}
//         mt={24}
//         mb={5}
//       >
//         <Heading
//           fontFamily="'Work Sans', sans-serif"
//           id="dateText"
//           fontWeight="400"
//           fontSize={"4xl"}
//         >
//           {moment().format("MMMM D, YYYY")}
//         </Heading>
//       </Flex>

//       <Flex flexDir="column" align="center" px={5} mb="52px">
//         <ModalDiary isOpen={opened} onClose={handleClose} />
//       </Flex>

//       <Flex
//         flexDir="column"
//         maxW={800}
//         align="center"
//         mx="auto"
//         mt="auto"
//         px={5}
//         mb="250px"
//       >
//         <Input
//           placeholder="Search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <Text mt={3}>
//           Showing {diaryData.length} of {totalPages * 10} diary entries.
//         </Text>
//         {diaryData.map((diary) => (
//           <DiaryCard
//             diary={diary.title}
//             diaryContext={diary.content}
//             title={diary.title}
//             timestamp={moment(diary.created_at).format("MMMM D, YYYY")}
//             key={diary.id}
//             id={diary.id}
//           />
//         ))}
//         {totalPages > 1 && (
//           <Flex mt={5} alignItems="center">
//             <ReactPaginate
//               previousLabel={"Prev"}
//               nextLabel={"Next"}
//               breakLabel={"..."}
//               breakClassName={"break-me"}
//               pageCount={totalPages}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={(data) => {
//                 setPageNumber(data.selected + 1);
//               }}
//               containerClassName={"pagination"}
//               subContainerClassName={"pages pagination"}
//               activeClassName={"active"}
//             />
//           </Flex>
//             )}
        
//       </Flex>
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Text, Input } from "@chakra-ui/react";
// // import DiaryCard from "./DiaryCard";
// import axios from "axios";
// import moment from "moment";
// import ReactPaginate from "react-paginate";
// // import { Flex, Heading, Input, Text, Button } from "@chakra-ui/react";
// // import moment from "moment";
// // import React, { useEffect, useState } from "react";
// import DiaryCard from "../components/DiaryCard";
// import ModalDiary from "../components/CreateDiary";

// function DiaryList() {
//   const [diaryData, setDiaryData] = useState([]);
//   const [search, setSearch] = useState("");
//   const [pageNumber, setPageNumber] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   const diariesPerPage = 10;
//   const pagesVisited = pageNumber * diariesPerPage;

//   const getDiaryData = async () => {
//     try {
//       const response = await axios.get(
//         `https://my-diary-api.herokuapp.com/diaries?_limit=${diariesPerPage}&_page=${
//           pageNumber + 1
//         }`
//       );
//       setDiaryData(response.data);
//       setTotalPages(Math.ceil(response.headers["x-total-count"] / diariesPerPage));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handlePageClick = ({ selected }) => {
//     setPageNumber(selected);
//   };

//   const displayDiaries = diaryData
//     .filter((diary) =>
//       diary.title.toLowerCase().includes(search.toLowerCase())
//     )
//     .map((diary) => (
//       <DiaryCard
//         diary={diary.title}
//         diaryContext={diary.content}
//         title={diary.title}
//         timestamp={moment(diary.created_at).format("MMMM D, YYYY")}
//         key={diary.id}
//         id={diary.id}
//       />
//     ));

//   useEffect(() => {
//     getDiaryData();
//   }, [pageNumber]);

//   return (
//     <>
//       <Input
//         placeholder="Search"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />
//       <Text mt={3}>
//         Showing {diaryData.length} of {totalPages * diariesPerPage} diary entries.
//       </Text>
//       {displayDiaries}
//       {totalPages > 1 && (
//         <ReactPaginate
//           previousLabel={"Prev"}
//           nextLabel={"Next"}
//           breakLabel={"..."}
//           pageCount={totalPages}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       )}
//     </>
//   );
// }

// export default DiaryList;
