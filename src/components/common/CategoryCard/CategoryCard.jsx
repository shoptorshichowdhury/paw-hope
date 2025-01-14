const CategoryCard = ({image, title}) => {
    return (
        <div>
            <div>
                <img src={image} alt={title} />
            </div>
        </div>
    );
};

export default CategoryCard;