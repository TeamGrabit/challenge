const getInfo = (challenge) => {
	if (challenge) {
		db.collection("challenges").findOne({ _id: id })
			.then((result) => {
				console.log("challengeInfo 받음");
				console.log(id);
				res.send(result)
			})
			.catch((err) => {
				console.error(err);
			})
	} else {
		res.send('false');
		throw new Error('Not founded challenge');
	}
}

Challenge.findOneById(id)
	.then(getInfo)



const fix = (challenge) => {
	if (challenge) {
		if (name !== undefined) {
			db.collection("challenges").updateOne({ _id: id }, {
				$set: {
					name: name
				}
			})
				.then(() => {
					console.log("challenge 이름 수정");
					console.log(id);
				})
		}
		if (challenge_start !== undefined) {
			db.collection("challenges").updateOne({ _id: id }, {
				$set: {
					challenge_start: challenge_start
				}
			})
				.then(() => {
					console.log("challenge 시작날짜 수정");
					console.log(id);
				})
		}
		if (challenge_end !== undefined) {
			db.collection("challenges").updateOne({ _id: id }, {
				$set: {
					challenge_end: challenge_end
				}
			})
				.then(() => {
					console.log("challenge 마지막날짜 수정");
					console.log(id);
				})
		}
		if (challenge_user_num !== undefined) {
			db.collection("challenges").updateOne({ _id: id }, {
				$set: {
					challenge_user_num: challenge_user_num
				}
			})
				.then(() => {
					console.log("challenge 사용자 수 수정");
					console.log(id);
				})
		}
		if (challenge_leader !== undefined) {
			db.collection("challenges").updateOne({ _id: id }, {
				$set: {
					challenge_leader: challenge_leader
				}
			})
				.then(() => {
					console.log("challenge 리더 수정");
					console.log(id);
				})
		}
	} else {
		res.send('false');
		throw new Error('Not founded challenge');
	}
	db.collection("challenges").findOne({ _id: id }) // 수정된 challenge를 반환하기 위함.
		// 이름만 수정되서 res로 전달, 다른 것은 이전 것이 res로 전달 됨.(??)
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.error(err);
		})
}

Challenge.findOneById(id)
	.then(fix)


const removeChallenge = (challenge) => {
	if (challenge) {
		db.collection("challenges").deleteOne({ _id: id })
			.then((res) => {
				console.log("challenge 삭제");
				console.log(id);
			}).then(res.send(challenge));
	} else {
		res.send('false');
		throw new Error('Not founded challenge');
	}
}

Challenge.findOneById(id)
	.then(removeChallenge)


const join = (challenge) => {
	// challenge에 userId 추가.
	userArray = challenge.challenge_users;
	userCount = challenge.challenge_user_num + 1;
	userArray.push(userId);
	db.collection("challenges").updateOne({ _id: id }, {
		$set: {
			challenge_users: userArray,
			challenge_user_num: userCount
		}
	})
		.then(() => {
			console.log("challenge에 user 추가");
			console.log(id);
		})

	// userDB에 challengeId 추가.

	// commitCount에 user 추가.

	res.send(req.body);

}


Challenge.findOneById(id)
	.then(join)