import { useState, useCallback } from 'react';
import { SContainer, SDiv } from './styles';
import { Link } from 'react-router-dom';
import { bigCategory, alpabet } from 'utils/bigCategory';
import { smallCategory } from 'utils/smallCategory';
import { HiOutlinePlusSm, HiOutlineMinusSm } from 'react-icons/hi';

const Sidebar = ({width=270}) => {
	const [cancel, setCancel] = useState(true);
	const [open, setOpen] = useState(Array.from({ length: bigCategory.length }, () => false));
	const [xPosition, setX] = useState(width);

	const toggleMenu = () => {
		if (xPosition > 0) {
		  setX(0);
		  setCancel(true);
		} else {
		  setX(width);
		  setCancel(false);
		}
	  };

	const onClickCategory = useCallback(idx => {
		setOpen(prev => {
			const newArray = [...prev];
			newArray[idx] = !newArray[idx];
			return newArray;
		});
	}, []);

	return (
		
		<SContainer >
			<div onClick={() => setCancel(e => !e)} className={cancel ? 'toggle active' : 'toggle'} > 
				<span className="line"></span>
				<span className="line"></span>
				<span className="line"></span>
			</div>
			<SDiv className={cancel ? 'appear' : "disappear"}>
				<Link to="/">
					전체<span>All</span>
				</Link>
				<nav>
					{bigCategory.map((big, idx) => (
						<div
							title="MeunContainer"
							onClick={() => onClickCategory(idx)}
							aria-expanded={open[idx]}
						>
							<div title="BigMenu" key={idx}>
								{big}
								<span>{alpabet[idx]}</span>
								<span>{!open[idx] ? <HiOutlinePlusSm /> : <HiOutlineMinusSm />}</span>
							</div>

							<ul
								title="smallMenu"
								aria-expanded={!open[idx]}
								style={!open[idx] ? { paddingTop: '0' } : { paddTop: '20px' }}
								onClick={e => e.stopPropagation()}
							>
								{smallCategory[idx].map((small, idex) => (
									<li key={idex}>
										{small}
										<span>{`(${idex})`}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>
			</SDiv>
		</SContainer>
	);
};

export default Sidebar;
