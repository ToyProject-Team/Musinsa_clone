import react from 'react';
import { SContainer, SDiv } from './styles';
import { GiHamburgerMenu } from 'react-icons/gi';

const Sidebar = () => {
	return (
		<SContainer>
			<SDiv>
				<h1>
					<button>전체</button>
				</h1>
			</SDiv>
		</SContainer>
	);
};

export default Sidebar;
