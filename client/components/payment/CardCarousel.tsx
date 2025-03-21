import CardBackground2 from '@/components/payment/images/CardBackground2'
import PaymentCard from '@/components/payment/PaymentCard'
import { TCardSchema } from '@/components/payment/schema'
import * as React from 'react'
import { Dimensions, View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import Carousel, {
    ICarouselInstance,
    Pagination,
} from 'react-native-reanimated-carousel'

const width = Dimensions.get('window').width

type CardCarouselProps = {
    data: TCardSchema[]
    onCardSelect?: (card: TCardSchema) => void
}

function CardCarousel({ data, onCardSelect }: CardCarouselProps) {
    const ref = React.useRef<ICarouselInstance>(null)
    const progress = useSharedValue<number>(0)

    const onPressPagination = (index: number) => {
        ref.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        })
    }

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={ref}
                width={width}
                height={width / 2}
                data={data}
                onProgressChange={progress}
                onSnapToItem={index => {
                    onCardSelect?.(data[index])
                }}
                snapEnabled
                loop={false}
                renderItem={({ index }) => (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {data[index].id !== '-1' ? (
                            <PaymentCard card={data[index]} />
                        ) : (
                            <View
                                className="relative"
                                style={{ width: 350, height: 205 }}
                            >
                                <CardBackground2 width={350} height={205} />
                            </View>
                        )}
                    </View>
                )}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.88,
                }}
            />

            <Pagination.Basic
                progress={progress}
                data={data}
                dotStyle={{
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    borderRadius: 50,
                }}
                activeDotStyle={{
                    backgroundColor: '#98243C',
                }}
                containerStyle={{ gap: 5, marginTop: 10 }}
                onPress={onPressPagination}
            />
        </View>
    )
}

export default CardCarousel
