import { Box, VStack, Text, Flex, Avatar, Link, MenuButton, } from '@chakra-ui/react'
import { Menu, Portal, MenuList, MenuItem } from '@chakra-ui/react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'
import { useToast } from "@chakra-ui/react";
function UserHeader() {

    const toast = useToast();


    const copyURL = () => {
        const currentURL = window.location.href;
        console.log(window.location.href);
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                title: "Copied to clipboard",
                description: "Profile Link Coppied",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
        })
    }

  return (
    <VStack spacing={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Mark Zuckerberg
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={{
                base: "xs",
                md: "sm",
                'lg': "md",
            
            }} color={"gray.500"}>
              @zuck
            </Text>
            <Text
              fontSize={"sm"}
              bg={"gray.dark"}
              color={"gray.light"}
              p={1}
              borderRadius={"full"}
            >
              threads.next
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              31m
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            name="Mark Zuckerberg"
            src="../public/zuck-avatar.png"
            size={{
              base: "md",
              md: "xl",
            }}
          />
        </Box>
      </Flex>
      <Text fontSize={"xl"} fontWeight={"bold"}>
        Co-founder, executive chairman and CEO of Meta Platform
      </Text>
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            1.5k Followers
          </Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>
          <Box className="icon-container">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
                <Portal>
                  <MenuList bg={"gray.dark"}>
                    <MenuItem bg={"gray.dark"} onClick={copyURL}>Copy Link</MenuItem>
                  </MenuList>
                </Portal>
              </MenuButton>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
      <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} paddingBottom={3} cursor={"pointer"}>
            <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} paddingBottom={3} cursor={"pointer"}>
            <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader