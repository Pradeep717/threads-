import { Avatar, Divider, Flex } from "@chakra-ui/react";
import { useState } from "react"
import { Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";

const Comment=( {userAvatar, createdAt, comment, username, likes}) => {
    const [liked, setLiked] = useState(false);
  return (
    <>
    <Flex gap={4}>
        <Avatar src={userAvatar} size={"sm"}/>
        <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"} >
                <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                <BsThreeDots/>
                </Flex>
            </Flex>
            <Text fontSize={"sm"}>{comment}</Text>
            <Actions liked={liked} setLiked={setLiked}/>
            <Text fontSize={"sm"} color={"gray.light"}>{likes+ (liked ? 1 : 0) } likes</Text>
        </Flex>
    </Flex>
    <Divider/>
    </>
  )
}

export default Comment