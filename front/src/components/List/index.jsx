import React from 'react';
import ListItem from './List-item';
import styles from './List.modules.scss';

function List() {
	return (
		<div className={styles.container}>
			<ListItem />
		</div>
	);
}

export default List;
