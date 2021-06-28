import React from 'react';

/* 모달 사용하고 싶은 곳에서 아래처럼 쓰면 됨!
<Button onClick={() => setModal(true)}>modal</Button>
<Modal open={modal} close={() => setModal(false)} header="비회원 정보 입력">
	hi
</Modal>
*/

function Modal(props) {
	const { open, close, header } = props;
	return (
		<div className={open ? 'openModal modalC' : 'modalC'}>
			{ open ? (
				<section>
					<header>
						{header}
						<button type="button" className="close" onClick={close}>&times;</button>
					</header>
					<main>
						{props.children}
					</main>
					<footer>
						<button type="button" className="close" onClick={close}>close</button>
					</footer>
				</section>
			) : null }
		</div>
	);
}

export default Modal;
