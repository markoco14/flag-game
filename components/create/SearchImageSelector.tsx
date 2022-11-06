import Image from 'next/image';
import { SearchImage } from '../../mirage/models'

type SearchImageProps = {
    images: SearchImage[],
    setImage: Function,
}

export default function SearchImageSelector(props: SearchImageProps) {
    function selectImage(url: string) {
        console.log(url);
        props.setImage(url);
    }

    return(
        <>
            {props.images.map((image, index) => (
                <Image
                    key={index+1}
                    src={image.image}
                    width={100}
                    height={100}
                    alt='An image of some dogs'
                    objectFit='cover'
                    onClick={() => {selectImage(image.image)}}
                ></Image>
            ))}
        </>
    );
}