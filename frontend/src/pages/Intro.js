import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { CardActions } from '@material-ui/core';

export default function Intro() {
	const indicatorStyles = {
		background: '#000',
		width: 8,
		height: 8,
		margin: '0 5px',
		display: 'inline-block',
	};

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
				stopOnHover={false}
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
