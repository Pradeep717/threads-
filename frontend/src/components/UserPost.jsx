import { Link } from "react-router-dom"
import { Avatar, Flex } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Image } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import  Actions  from "./Actions"
import { useState } from "react"
console.log(Actions)

function UserPost({likes, replies, postImg, postTitle}) {

  const [liked, setLiked] = useState(false)

  return (
    <Link to="/markzuckerberg/post/1">
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name="Mark Zuckerberg"
            src="../public/zuck-avatar.png"
          ></Avatar>
          <Box w={1} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="Ryan Florence"
              src="https://bit.ly/ryan-florence"
              position={"absolute"}
              top={"0px"}
              left={"25px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Segun Adebayo"
              src="https://bit.ly/sage-adebayo"
              position={"absolute"}
              top={"20px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Christian Nwamba"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              top={"0px"}
              left={"0px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"} w={"full"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text>
                <Flex fontSize={"sm"} fontWeight={"bold"}>
                  markzuckerberg
                </Flex>
              </Text>
              <Image width={4} h={4} ml={1} src={"../public/verified.png"} />
            </Flex>
            <Flex alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"} m={3}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
          <Box
            position={"relative"}
            borderRadius={"6"}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image
              src={postImg}
              alt="post"
              w={"full"}
            />
          </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex gap={3} alignItems={"center"}>
            <Text>{likes} likes</Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text>{replies} replies</Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default UserPost