//import UserPost from "../components/UserPost"

import { Avatar, Button, Divider, Flex,} from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comment from "../components/Comment";

function PostPage() {
  const [liked, setLiked] = useState(false);
  return <>
   <Flex>
    <Flex w={"full"} alignItems={"center"} gap={3}>
      <Avatar
        size={"md"}
        name="Mark Zuckerberg"
        src="/zuck-avatar.png"
      ></Avatar>
      <Flex alignItems={"center"}>
        <Text fontSize={"sm"} fontWeight={"bolt"}>markzuckerberg</Text>
        <Image src="/verified.png" w={4} h={4} ml={2}/>
      </Flex>
    </Flex>
    <Flex alignItems={"center"} gap={4}>
      <Text fontSize={"md"} color={"gray.light"}>1d</Text>
      <BsThreeDots/>
    </Flex>
   </Flex>
   <Text my={3}>Lets talk about Treads</Text>
   <Box
            position={"relative"}
            borderRadius={"6"}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image
              src={"/post1.png"}
              alt="post"
              w={"full"}
            />
   </Box>

   <Flex gap={3} my={3}>
    <Actions liked={liked} setLiked={setLiked}/>
   </Flex>
   <Flex gap={2} alignItems={"center"}>
    <Text color={"gray.light"} fontSize={"sm"}>1200 likes</Text>
    <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
    <Text color={"gray.light"} fontSize={"sm"} >{200 + (liked ? 1 : 0)} replies</Text>
   </Flex>
   <Divider my={4}/>
   <Flex justifyContent={"space-between"}>
    <Flex alignItems={"center"} gap={2}>
      <Text fontSize={"2xl"}>👋</Text>
      <Text color={"gray.light"}>Get this app to like, reply and posrt</Text>
    </Flex>
    <Button>Get</Button>
   </Flex>
   <Divider my={4}/>
   <Comment 
    comment ="Hey this looks great"
    createdAt = "1d"
    likes = {100}
    username = "Dan Abrahmov"
    userAvatar = "https://bit.ly/dan-abramov"
   />
    <Comment 
      comment ="nice"
      createdAt = "1d"
      likes = {120}
      username = "Kent Dodds"
      userAvatar = "https://bit.ly/tioluwani-kolawole" 
    />
     <Comment 
      comment ="looks great"
      createdAt = "2d"
      likes = {230}
      username = "Ryan Florence"
      userAvatar = "https://bit.ly/kent-c-dodds" 
    />


  </>;
}

export default PostPage