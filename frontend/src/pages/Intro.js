import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Intro() {
	return (
		<div className="Intro">
			<Carousel
				className="box"
				showArrows={true}
				showThumbs={false}
				infiniteLoop={true}
				autoPlay={true}
				centerMode={true}
				centerSlidePercentage={90}
			>
				<div>
					<img className="box-img" src="/image/캐러셀1.jpg" alt="캐러셀1" />
				</div>
				<div>
					<img className="box-img" src="/image/캐러셀2.jpg" alt="캐러셀2" />
				</div>
				<div>
					<img className="box-img" src="/image/캐러셀1.jpg" alt="캐러셀3" />
				</div>
				<div>
					<img className="box-img" src="/image/캐러셀2.jpg" alt="캐러셀4" />
				</div>
			</Carousel>
		</div>
	);
}
