import {Children, FunctionComponent, PropsWithChildren, useState} from 'react'
import ControlButton from './controlButton.tsx'
import CarouselContainer from './carouselContainer.tsx'

interface CarouselProps extends PropsWithChildren{

}

const Carousel: FunctionComponent<CarouselProps> = ({children}) => {
    const [activeSlide, setActiveSlide] = useState<number>(0)
    const childrenArray = Children.toArray(children)

    return (
        <CarouselContainer>
            <div style={{'display': 'none'}}>
                {children}
            </div>
            <ControlButton $prev={true} onClick={() => setActiveSlide(x => x == 0 ? childrenArray.length - 1 : x-1)}>
                &lt;
            </ControlButton>
            {childrenArray[activeSlide]}
            <ControlButton $prev={false} onClick={() => setActiveSlide(x => (x + 1) % childrenArray.length)}>
                &gt;
            </ControlButton>
        </CarouselContainer>
    )
}

export default Carousel