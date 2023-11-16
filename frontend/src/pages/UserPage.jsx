import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
function UserPage() {
  return (
    <>
    <UserHeader/>
    <UserPost likes={1200} replies={423} postImg="/post1.png" postTitle="Let's talk about threads"/>
    <UserPost likes={234} replies={153} postImg="/post2.png" postTitle="Nice utorial"/>
    <UserPost likes={2345} replies={234} postImg="/post3.png" postTitle="I love this guy"/>
    <UserPost likes={453} replies={363} postTitle="This is my thread"/>

    </>
    )
}

export default UserPage