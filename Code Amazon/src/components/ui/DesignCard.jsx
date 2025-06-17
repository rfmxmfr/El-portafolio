import React from 'react';
import { Card, Image, Flex, Text, Badge, View } from '@aws-amplify/ui-react';

/**
 * A design card component that can be customized in Amplify Studio.
 * This component displays a fashion design with image, title, and category.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Design title
 * @param {string} props.category - Design category
 * @param {string} props.imageUrl - URL to the design image
 * @param {string} props.description - Design description
 * @param {function} props.onClick - Click handler function
 * @returns {React.ReactElement} The DesignCard component
 */
export const DesignCard = ({ 
  title = "Fashion Design",
  category = "Casual",
  imageUrl = "https://placeholder.com/300x200",
  description = "A beautiful fashion design",
  onClick = () => {},
  ...rest
}) => {
  return (
    <Card
      padding="1rem"
      borderRadius="medium"
      variation="elevated"
      onClick={onClick}
      cursor="pointer"
      width="300px"
      {...rest}
    >
      <Image
        src={imageUrl}
        alt={title}
        objectFit="cover"
        width="100%"
        height="200px"
        borderRadius="medium"
      />
      <Flex direction="column" gap="0.5rem" marginTop="1rem">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontWeight="bold" fontSize="large">
            {title}
          </Text>
          <Badge variation="success">
            {category}
          </Badge>
        </Flex>
        <Text color="font.secondary" fontSize="small">
          {description}
        </Text>
      </Flex>
    </Card>
  );
};

export default DesignCard;