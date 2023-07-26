import React, { FC } from 'react';
import styles from './index.module.css';
import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';

const FullScreenLoader: FC<{ loading: boolean }> = ({ loading }) => (

	<Modal isCentered isOpen={loading} onClose={() => null} >
		<ModalOverlay
			bg='blackAlpha.300'
			backdropFilter='blur(10px) hue-rotate(90deg)'
		/>
		<ModalContent style={{ background: 'none', boxShadow: 'none' }}>
			<div id="loader" className={`${styles.spinner}`}></div>
		</ModalContent>
	</Modal>
);

export default FullScreenLoader;