import Skeleton from "react-loading-skeleton";

const PublicSkeletonCard = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="w-full h-full border border-gray-200 rounded-xl p-2 space-x-1 md:space-y-3">
        <div>
          <Skeleton height={300}></Skeleton>
        </div>
        <div className="space-y-3">
          <div>
            <Skeleton count={3}></Skeleton>
          </div>
          <div>
            <Skeleton width={150} height={50} count={1}></Skeleton>
          </div>
        </div>
      </div>
    ));
};

export default PublicSkeletonCard;
