import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { favouriteThunks } from "@/lib/features/favourite/favouriteThunks";

interface FavouriteButtonProps {
  doctorId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ doctorId }) => {
  const dispatch = useAppDispatch();
  const [isFavourite, setIsFavourite] = useState(false);

  const { allFavourites, loading } = useAppSelector((state) => state.favourite);
  const { userId } = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    setIsFavourite(allFavourites.some((fav) => fav.favouriteId === doctorId));
  }, [allFavourites, doctorId, userId]);

  const toggleWishlist = async () => {
    isFavourite
      ? await dispatch(
          favouriteThunks.removeFavourite({ doctorId, patientId: userId })
        )
      : await dispatch(
          favouriteThunks.addFavourite({ doctorId, patientId: userId })
        );
  };

  if (loading) {
    return (
      <Button
        size={"icon"}
        variant={"secondary"}
        className="animate-pulse rounded-full"
      >
        <HeartFilledIcon className="stroke-primary fill" />
      </Button>
    );
  }

  return (
    <Button
      size={"icon"}
      onClick={toggleWishlist}
      className={cn("bg-primary rounded-full", {
        "text-white": isFavourite,
        "text-black": !isFavourite,
      })} // removed hover:text, instead changed based on state
    >
      <HeartFilledIcon
        className={cn("stroke-white fill-primary", {
          "stroke-primary fill-white": isFavourite,
          "stroke-white fill-primary": !isFavourite, // ensure other state is properly handled
        })}
      />
    </Button>
  );
};

export default FavouriteButton;
