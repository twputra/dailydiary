import { Flex, Heading, Input, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DiaryCard from "../components/DiaryCard";
import ModalDiary from "../components/CreateDiary";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [diaryData, setDiaryData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(3);
  const token = localStorage.getItem("token");
  const [opened, setOpened] = useState(false);
  const [search, setSearch] = useState("");
  const PAGE_SIZE = 10;
  const firstIndex = (pageNumber - 1) * PAGE_SIZE + 1;
  const lastIndex = Math.min(pageNumber * PAGE_SIZE, totalPages * PAGE_SIZE);
  const navigate = useNavigate();

  const handleSearch = () => {
    setPageNumber(1);
  };

  const handleClose = () => {
    setOpened(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://private-anon-6c979ab426-halfwineaid.apiary-proxy.com/diary?page=${pageNumber}&per_page=${PAGE_SIZE}&search=${search}`,
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
        {/* <Text mt={3}>
          Showing {diaryData.length} of {totalPages * 10} diary entries.
        </Text> */}
        <Text mt={3}>
          Showing {firstIndex} to {lastIndex} of {totalPages * PAGE_SIZE} diary
          entries.
        </Text>
        {diaryData.map((diary) => (
          <DiaryCard
          onClick={() => navigate(`/detail-diary/${diary.id}`)}
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
        {/* {totalPages > 1 && (
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
        )} */}
      </Flex>
    </>
  );
}
