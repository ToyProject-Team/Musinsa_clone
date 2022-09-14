import react, { useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { SContainer, SDiv } from './styles';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';

const Sidebar = () => {
	const [cancel, setCancel] = useState(true);
	const [plus, setPlus] = useState(true);

	return (
		<SContainer>
			<SDiv>
				<h1 onClick={() => setCancel(e => !e)}>{cancel ? <GiHamburgerMenu /> : <CgClose />}</h1>
				<Link to="/">
					<button>전체</button>
				</Link>
				<nav>
					{bigCategory.map((big, idx) => (
						<div title="MeunContainer">
							<div title="BigMenu" key={idx}>
								{big}
								<span>{alpabet[idx]}</span>
								<span onClick={() => setPlus(e => !e)}>
									{plus ? <HiOutlinePlusSm /> : <HiOutlineMinusSm />}
								</span>
							</div>

							{plus && (
								<ul title="smallMenu" style={{ display: 'none' }}>
									{smallCategory[idx].map((small, idex) => (
										<li key={idex}>
											{small}
											<span>{`(${idex})`}</span>
										</li>
									))}
								</ul>
							)}
							{!plus && (
								<ul title="smallMenu">
									{smallCategory[idx].map((small, idex) => (
										<li key={idex}>
											{small}
											<span>{`(${idex})`}</span>
										</li>
									))}
								</ul>
							)}
						</div>
					))}
				</nav>
			</SDiv>
		</SContainer>
	);
};

export default Sidebar;
