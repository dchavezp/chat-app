import Image from "next/image";

interface AvatarProps {
  srcImg?: string;
}
function Avatar({
  srcImg = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  onClick,
  className = "",
}: AvatarProps & React.ComponentProps<"div">) {
  return (
    <div className={`avatar border-primary`} onClick={onClick}>
      <div className={`cursor-pointer rounded-full  ${className}`}>
        <Image src={srcImg} alt={srcImg} height={40} width={40} />
      </div>
    </div>
  );
}

export default Avatar;
