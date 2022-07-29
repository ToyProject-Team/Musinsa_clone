import React from 'react';
import LikeItem from './Like-item';
import styles from './Like.modules.scss';

function Like() {
	return (
		<div className={styles.container}>
			<LikeItem />
		</div>
	);
}

export default Like;
